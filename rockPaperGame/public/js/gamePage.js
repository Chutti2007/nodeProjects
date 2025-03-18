// const { pid } = require("process");

const ioNow = io();
console.log(ioNow);

let joinRoomButton = document.getElementById("joinRoom");
let parent = document.getElementById("allChoices");
let roomName;
let ownId1;
let ownId2;

let winnerDiv = document.getElementById("win");

joinRoomButton.addEventListener("click", () => {
    let roomId = "";

    try {
        if (document.getElementById("roomName").value != "") {
            roomId = document.getElementById("roomName").value;
        }

        if (roomId != "") {

            roomName = roomId;

            ioNow.emit("join", roomId, (ack) => {
                console.log(ack);


                let displayNone = document.getElementById("giveRoom");
                displayNone.style.display = "none";


                parent.style.display = "block";
                let button = document.createElement("button");
                button.id = ("leave");
                button.textContent = "leave room";

                button.onclick = function () {
                    leaveButtonEvent();
                };

                parent.append(button);
                leaveButton = document.getElementById("leave");
            })
        }
        else {
            console.log("You have to give room name");
        }
    }
    catch (err) {
        console.log("Error Occured :\n" + err);
    }

})


function leaveButtonEvent() {
    ioNow.emit("leave", roomName, (ack) => {
        console.log(ack);
        roomName = "";
        console.log(leaveButton);
        leaveButton.remove();
    })
}


ioNow.on("socket", (msg, callback) => {
    console.log("Socket room members : " + msg);
})



let rounds = document.querySelectorAll("#choiceAvailable .round");
console.log(rounds);

for (let round of rounds) {

    round.addEventListener("click", (event) => {
        console.log(event.target.id);
       
        if (roomName != "") {

            let parent = event.target.id;
            // console.log("Parent : ",document.getElementById(parent));
            let child = document.getElementById(parent).firstElementChild.id;
    
            console.log("Child : ",child);
            
            let choose = child;

            ioNow.emit("choose", choose, (ack) => {
                console.log(ack);
            })
        }
    })
}




ioNow.on("choiceN", (msg, callback) => {
    console.log(msg);
})


ioNow.on("notJoin", (msg, callback) => {
    console.log(msg);
})



let firstId;

let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");


ioNow.on("id", (msg, callback) => {
    console.log("Message Id : ", msg);

    if (msg.countOfSockets == 1) {
        p1.textContent = msg.id;
    }
    else {
        console.log(firstId);
        p1.textContent = firstId;
        p2.textContent = msg.id;
    }
})



ioNow.on("one", (msg, callback) => {
    firstId = msg;
})

let choiceOfP1 = document.getElementById("p1Choice");
let choiceOfP2 = document.getElementById("p2Choice");
let winnerFinal;



ioNow.on("choice", (message, callback) => {


    let play1 = document.getElementById("play1");
    let play2 = document.getElementById("play2");


    let i = 0;
    console.log("Message of choice : ", message);

    for (let mess of message) {
        
        console.log("Object key : ",Object.keys(mess)[0]);   
        // console.log("Content : ", p1.textContent);

        console.log("True : ", (Object.keys(mess)[0] == p1.textContent));

        let key = Object.keys(mess)[0];
        console.log("Content : ", mess[key]);


        if (Object.keys(mess)[0] == p1.textContent) {

            let join = "/images/icon-"+mess[key]+".svg";
            play1.src = join;

            choiceOfP1.textContent = mess[key];


        }
        else {
            let join = "/images/icon-"+mess[key]+".svg";
            play2.src = join;

            choiceOfP2.textContent = mess[key];
        }
        console.log(i);
        i++;


    }

})


ioNow.on("winner", (winner)=>{
    console.log("Winner : ",winner);

    setTimeout((e)=>{
        winnerDiv.style.display = "flex";
        winnerDiv.textContent = "Winner : "+winnerFinal;
    }, 2000);
 

})

ioNow.on("winnerFind", (winner)=>{

    if(p1.textContent == winner){
     
        winnerFinal= p1.previousElementSibling.innerText;
    }
    else{
        winnerFinal= p2.previousElementSibling.innerText;
    }
   
})

ioNow.on("left", (msg)=>{
    if(p1.textContent == msg){
        let current = p1.nextElementSibling;
        current.innerHTML = "Player 1 left the room"; 
    }
    else{
        let current = p2.nextElementSibling;
        current.innerHTML = "Player 2 left the room"; 
    }
    roomName = "";
})