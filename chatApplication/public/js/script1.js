// const { Socket } = require("socket.io");

let pToP = document.getElementById("onePerson");
let pToG = document.getElementById("groupChat");
let p1 = document.getElementsByClassName("first")[0];
let second = document.getElementsByClassName("second")[0];
let third = document.getElementsByClassName("third")[0];
let fourth = document.getElementsByClassName("fourth")[0];
let five = document.getElementsByClassName("five")[0];
let userName;

let input;
let sendButton;

let createRoomChoice;
let joinRoomChoice;

let createARoom;
let joinARoom;
let choiceForGoP;

let ioGet = io();
let idCount = 1;

pToP.addEventListener("click", async () => {
    console.log("person inside");
    console.log(pToP.innerText);
    // console.log(pToP.id);

    let choice = pToP.id;

    ioGet.emit("roomChose", choice);
})




pToG.addEventListener("click", async () => {
    console.log("person inside group");
    console.log(pToG.innerText);
    console.log(pToG.id);

    let choice = pToG.id;

    ioGet.emit("roomChose", choice);


})







ioGet.on("choseJOC", (msg) => {
    console.log(msg);

    if (msg == pToP.id) {
        console.log("Hello")
        choiceForGoP = "person";
    }
    else {
        console.log("Go to group chat");
        choiceForGoP = "group";
    }

    ioGet.emit("choiceP", choiceForGoP);

    console.log(p1);
    p1.style.display = "none";
    second.style.display = "flex";


    createRoomChoice = document.getElementById("createR");
    joinRoomChoice = document.getElementById("joinR");

    console.log(createRoomChoice);
    console.log(joinRoomChoice);

    addEvents();
})




ioGet.on("toCreate", (msg, callback) => {

    console.log("Id : ", msg);
    second.style.display = "none";

    console.log(third);

    if (msg == "createR") {
        third.style.display = "block";
        createARoom = document.getElementById("create");
        addEventsListeners1();

    }
    else {
        fourth.style.display = "block";
        joinARoom = document.getElementById("join");
        addEventsListeners2();

    }

    // addEventsListeners();

    console.log("I connected the create and join");

})



ioGet.on("messageSent", (msg)=>{

    console.log(msg);
    console.log("Message div started creating");

    let parent = document.getElementById("chatScreen");


    console.log(parent);

    let div = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 =document.createElement("div");


    console.log(div);
    console.log(div1);
    console.log(div2);

    div.id = "message"+idCount;

    div.style.width = "100%";
    div.style.height = "12%";
    div.style.marginBottom = "1%";


    div1.style.width = "100%";
    div1.style.height = "30%";
    div1.style.textAlign = "center";
    div1.style.display ="flex";
    div1.style.justifyContent ="left";
    div1.style.alignItems ="center";
    div1.style.paddingLeft ="2%";
    div1.style.paddingTop ="1%";
    div1.style.borderBottom ="2px solid white";




    div2.style.width = "100%";
    div2.style.height = "70%";
    div2.style.paddingLeft ="2%";
    div2.style.paddingTop ="2%";



    div1.textContent = userName; // 
    div2.textContent = msg;

    div.append(div1);
    div.append(div2);

    parent.append(div);

    idCount++;


})





function addEvents() {

    createRoomChoice.addEventListener("click", () => {

        ioGet.emit("createOrJoin", createRoomChoice.id);
        console.log("I want to create an room");
    })

    joinRoomChoice.addEventListener("click", () => {
        console.log("I have to join room");
        ioGet.emit("createOrJoin", joinRoomChoice.id);

    })

}


function addEventsListeners1() {

    createARoom.addEventListener("click", () => {
        let inputRoomName = document.getElementById("roomCreate").value;
        console.log(inputRoomName);

        console.log("I have created a room");

        ioGet.emit("createRoom", inputRoomName);
    })
}



function addEventsListeners2() {

    joinARoom.addEventListener("click", () => {
        let inputRoomName = document.getElementById("roomJoin").value;
        console.log(inputRoomName);

        console.log("I have joined a room");

        ioGet.emit("joinRoom", inputRoomName);
        // ioGet.emit("createOrJoin", joinRoomChoice.id);

    })
}


ioGet.on("print", (msg) => {
    console.log(msg);
})


ioGet.on("joinSuccess", (msg) => {
    console.log("Join Success", msg);

    if (msg.person == "create") {
        third.style.display = "none";
    }
    else {
        fourth.style.display = "none";
    }
    five.style.display = "flex";
   
    userName= prompt("Give your user name");

    sendButton = document.getElementById("send");
    console.log("Message : ",msg.obj);
    sendMessage();
    
})



function sendMessage(){

    sendButton.addEventListener("click", ()=>{

        let  input = document.getElementById("message");
        if(input.value !=""){
            console.log(input.value);
            ioGet.emit("sendMessage", (input.value), (ack)=>{
                console.log(ack);
                input.value = "";
            });
        }
       

    })
  
}