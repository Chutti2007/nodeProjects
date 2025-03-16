// console.log("Hello");
let express = require("express");
let socketio = require("socket.io");
let path = require("path");
let http = require("http");
// let sql = require("mysql2");

let app = express();
let server = http.createServer(app);
let io = socketio(server);

let pubDIr = path.join(__dirname, "/public");

let choiceGroupOrPerson = [];
let isitPerson = false;

app.set("view engine", "ejs");
app.use(express.static(pubDIr));


let roomObject = [];
let roomName;


app.get("/", (req, res) => {
    res.render("firstPage");
})

app.get("/oneChat", (req, res) => {
    console.log("I came to one");
    res.render("onePersonChat");
})


app.get("/groupChat", (req, res) => {

    console.log("I came to group");
    res.render("groupPersonChat");
})




io.on("connection", (socket) => {
    

    socket.on("roomChose", (choice, callback) => {
        console.log(choice);
        socket.emit("choseJOC", choice);
    })

    socket.on("createOrJoin", (msg) => {
        console.log("message : ", msg);
        socket.emit("toCreate", msg);
    })




    socket.on("createRoom", (roomN) => {
        console.log(socket.id);

        console.log("Name : ",roomN.name);

        roomName = roomN.roomName;

        console.log(roomName);

        let isNotAvailable = false;

        for (let rom of roomObject) {
            if (rom.room == roomName) {
                isNotAvailable = true;
            }
        }

        // choiceGroupOrPerson = 

        if (!isNotAvailable) {
            let roomObj = { room: roomName, id: [socket.id], name : [roomN.name]};
            socket.emit("print", roomObj);

            console.log(roomObj);
            roomObject.push(roomObj);

            console.log(roomObject);
            socket.emit("print", roomObject);

            socket.emit("joinSuccess", {obj : roomObject, person :"create"});

            socket.join(roomName);
        }
        else {
            console.log("Room already created");
        }

    })



    socket.on("joinRoom", (roomN) => {

        let isRoomCreated = false;
        let roomNow;


        roomName = roomN.roomName;
        console.log(roomName);

        for (let room of roomObject) {
            if (room.room == roomName) {
                roomNow = room;
                isRoomCreated = true;
                break;
            }
        }

        if (isRoomCreated) {
            console.log(socket.id);
            console.log(roomNow);
            console.log(roomNow.room);
            console.log(roomNow.id);

            
            let roomPersonPush = roomNow.id;

            if (isitPerson && !choiceGroupOrPerson.includes(roomName)) {
                choiceGroupOrPerson.push(roomName); // if the person is in one on one or group chat check
                socket.emit("print",choiceGroupOrPerson);
            }


            if (roomPersonPush.length > 1 && choiceGroupOrPerson.includes(roomName)) {
                socket.emit("print", "Max Limit reached");
            }
            else {
                roomPersonPush.push(socket.id);    //pushing roomName into selected room
                roomNow.name.push(roomN.name);
                socket.emit("print", roomObject);
                socket.join(roomName);

                socket.emit("joinSuccess", {obj : roomObject, person :"join"});
                console.log("I have joined a room");

            }


        }
    })


    socket.on("choiceP", (msg) => {
        console.log("Chat group or single : ", msg);
        socket.emit("print", "Chatting in : " + msg);

        if (msg == "person") {
            isitPerson = true;
        }
        else {
            isitPerson = false;
        }
    })


    socket.on("sendMessage", (msg, callback)=>{
        console.log(msg);
        console.log(roomName);

        console.log(roomObject[0].id);

        let room1;
        for(let room of roomObject){
            if(room.id.includes(socket.id)){
                room1 = room;
            }
        }

        console.log("Room : ",room1);

        let name;
        for(let i=0;i<room1.id.length; i++){
            if(socket.id == room1.id[i]){
                name=room1.name[i];
                break;
            }
        }

        io.to(roomName).emit("messageSent", {msg : msg, name : name }); //
        socket.emit("messageSent", {msg: msg, name : "you"});
        console.log("Sent message to room:", roomName, "Message:", msg);
        callback("I sent the message back");

    })




    socket.on("disconnect", ()=>{
        io.in(roomName).fetchSockets().then((socket) => {

            console.log("Room Person : ", socket.length);

            let room =[];
            for(let obj of roomObject){
                if(roomName == obj.room ){
                    if(obj.id[0] !== socket.id){
                        room.push(obj.id[0]);
                    }
                    else{
                        room.push(obj.id[1]);
                    }  
                }
            }

        });

        io.emit("print", roomObject);

    })

})


















server.listen("4300", () => {
    console.log("Server running in 4300");
})