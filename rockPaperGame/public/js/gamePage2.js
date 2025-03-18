// const { pid } = require("process");

const ioNow = io();
console.log(ioNow);

let joinRoomButton = document.getElementById("joinRoom");
let parent = document.getElementById("allChoices");
let roomName;
let ownId1;
let ownId2;
let leaveButton;


let displayNone;
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

                displayNone = document.getElementById("giveRoom");
                displayNone.style.display = "none";

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
        console.log(roomName);

        if (roomName != "") {

            let parent = event.target.id;
            let child = document.getElementById(parent).firstElementChild.id;


            console.log("Parent : ", document.getElementById(parent));
            console.log("Child : ", child);

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

    console.log("Message of choice : ", message);

    let play1 = document.getElementById("play1");
    let play2 = document.getElementById("play2");


    let i = 0;


    for (let mess of message) {

        // console.log("Object key : ", Object.keys(mess)[0]);
        // // console.log("Content : ", p1.textContent);

        // console.log("True : ", (Object.keys(mess)[0] == p1.textContent));

        let key = mess.choice;
        let idofp = mess.id;
        // console.log("Content : ", mess[key]);


        if (idofp == p1.textContent) {

            let join = "/images/icon-" + key + ".svg";
            console.log("Source : ", join);

            play1.src = join;

            choiceOfP1.textContent = key;


        }
        else {

            console.log("I came inside : ", Object.keys(mess)[0]);

            let join = "/images/icon-" + key + ".svg";

            console.log("Source : ", join);

            play2.src = join;

            choiceOfP2.textContent = key;
        }

        console.log(i);
        i++;


    }

})


ioNow.on("winner", (winner) => {
    console.log("Winner : ", winner);

    setTimeout((e) => {
        winnerDiv.style.display = "flex";
        winnerDiv.textContent = "Winner : " + winnerFinal;
    }, 700);


})

ioNow.on("winnerFind", (winner) => {

    if (p1.textContent == winner) {

        winnerFinal = p1.previousElementSibling.innerText;
    }
    else {
        winnerFinal = p2.previousElementSibling.innerText;
    }

})

// ioNow.on("left", (msg) => {
//     if (p1.textContent == msg) {
//         let current = p1.nextElementSibling;
//         current.innerHTML = "Player 1 left the room";
//     }
//     else {
//         let current = p2.nextElementSibling;
//         current.innerHTML = "Player 2 left the room";
//     }
//     roomName = "";
// })


ioNow.on("print", (msg, callback) => {
    console.log("Room object : ", msg);
})




















let createRoomButton = document.getElementById("create");

createRoomButton.addEventListener("click", () => {
    let roomId = "";

    try {
        if (document.getElementById("createroom").value != "") {
            roomId = document.getElementById("createroom").value;
        }

        if (roomId != "") {

            roomName = roomId;

            console.log("Create room inside");

            ioNow.emit("createRoom", roomId, (ack) => {
                console.log(ack);


                displayNone = document.getElementById("giveRoom");
                displayNone.style.display = "none";

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





// ioNow.on("joinSuccess1", (msg, callback)=>{

//     console.log("Join Object Id : ", msg);

//     let ids;

//     // for (let r of msg) {
//     //     if (r.room == roomName) {
//     //         console.log("Room Name : ",roomName);
//     //         ids = r.id;
//     //     }
//     // }



//     parent.style.display = "block";
//     // userName = prompt("Give your user name");


//     // console.log("Room id : ",ids);

//     let button = document.createElement("button");
//     button.id = ("leave");
//     button.textContent = "leave room";

//     button.onclick = function () {
//         leaveButtonEvent();
//     };

//     parent.append(button);
//     leaveButton = document.getElementById("leave");


//     if (ids.length == 1) {
//         p1.innerText = ids[0];
//     }
//     else {
//         p1.innerText = ids[0];
//         p2.innerText = ids[1];
//     }
// })




ioNow.on("joinSuccess", (msg, callback) => {

    console.log("Join Object : ", msg);


    let ids = [];

    for (let r of msg) {
        if (r.room == roomName) {
            console.log("Room Name : ", roomName);
            ids = r.id;
        }
    }



    parent.style.display = "block";
    // userName = prompt("Give your user name");


    console.log("Room id : ", ids);

    let button = document.createElement("button");
    button.id = ("leave");
    button.textContent = "leave room";

    button.onclick = function () {
        leaveButtonEvent();
    };

    parent.append(button);
    leaveButton = document.getElementById("leave");


    if (ids.length >= 1) {
        p1.innerText = ids[0];
    }
    if (ids.length >= 2) {
        p2.innerText = ids[1];
    }

})





ioNow.on("joinSuccess1", (msg, callback) => {

    console.log("Join Object : ", msg);


    let ids = [];

    for (let r of msg) {
        if (r.room == roomName) {
            console.log("Room Name : ", roomName);
            ids = r.id;
        }
    }



    parent.style.display = "block";

    console.log("Room id : ", ids);


    if (ids.length >= 1) {
        p1.innerText = ids[0];
    }
    if (ids.length >= 2) {
        p2.innerText = ids[1];
    }

})














ioNow.on("cho", (msg, callback) => {
    console.log(msg);
})


ioNow.on("choice1", (msg, callback) => {
    console.log("Choice : ", msg[0]);
    // console.log("Choice - who : ", msg.id);
    // console.log("Choice : ", msg.choice);

    let play1 = document.getElementById("play1");
    let play2 = document.getElementById("play2");

    let join = "/images/icon-" + msg[0].choice + ".svg";

    console.log("Source : ", join);

    if (p1.innerText == msg[0].id) {
        play1.src = join;
    }
    else {
        play2.src = join;
    }

})

ioNow.on("choice2", (obj, callback) => {
    console.log("Choice : ", obj);


    let play1 = document.getElementById("play1");
    let play2 = document.getElementById("play2");


    console.log("Inner text 1 : ", p1.innerText);
    console.log("Inner text 2 : ", p2.innerText);


    let join = "/images/icon-" + obj.choice + ".svg";
    console.log(join + " " + obj.id);

    if (p1.innerText == obj.id) {
        play1.src = join;
    }
    else {
        play2.src = join;
    }



})