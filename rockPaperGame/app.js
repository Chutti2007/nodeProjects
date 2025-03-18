const http = require("http");
let express = require("express");
let path = require("path");
const socketIo = require("socket.io");
// const { Socket } = require("dgram");
let roomName;
let roomObject = [];

// let choiceGroupOrPerson = [];
// let countOfSockets;
// let socket1;
// let oneId;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const pubDir = path.join(__dirname, "/public");
// let count = 0;
// let id;
// let firstPlayerId;

let choiceOfPlayers;


app.set("view engine", "ejs");
app.use(express.static(pubDir));


app.get("/", (req, res) => {
    res.render("gamePage");
})



app.get("/game", (req, res) => {
    res.render("gamePage");
})

io.on("connection", (socket) => {
    choiceOfPlayers = [];
    // socket1 = socket.id;

    console.log("New user connected", socket.id);







    socket.on("join", (roomN, callback) => {

        let isRoomCreated = false;
        let roomNow;

        roomName = roomN;

        console.log("Room object : ", roomObject);
        console.log("Room name : ", roomName);

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

            if (roomPersonPush.length > 1) {
                socket.emit("print", "Max Limit reached");
            }
            else {
                roomPersonPush.push(socket.id);
                socket.emit("print", roomObject);
                socket.join(roomName);


                io.to(roomName).emit("joinSuccess", roomObject);
                console.log("I have joined a room");
                callback("success");

            }

        }

    })




    // create only happes once, so no need to check for length 2

    socket.on("createRoom", (roomN, callback) => {

        roomObject = [];
        choiceGroupOrPerson = [];

        console.log(socket.id);

        roomName = roomN;

        // let roomsID;
        console.log(roomName);

        let isNotAvailable = false;

        for (let rom of roomObject) {
            if (rom.room == roomName) {
                isNotAvailable = true;
                // roomsID = rom.id;
            }
        }


        if (!isNotAvailable) {
            let roomObj = { room: roomName, id: [socket.id] };
            socket.emit("print", roomObj);

            roomObject.push(roomObj);

            console.log(roomObject);
            
            socket.join(roomName);

            socket.emit("joinSuccess1", roomObject);


            callback("success");
        }

        else {
            console.log("Room already created");
        }

    })





    socket.on("choose", (choice, callback) => {

        let pId = socket.id;

        let obj = {
            id: pId,
            "choice": choice
        }

        choiceOfPlayers.push(obj);

        console.log("choice : ", choiceOfPlayers);
        io.to(roomName).emit("cho", choiceOfPlayers); // print player choice



        if (choiceOfPlayers.length == 1) {
            socket.emit("choice1", choiceOfPlayers);
            // io.to(roomName).emit("choice1", choiceOfPlayers);
        }
        else {
            // console.log("The length is 2");
            io.to(roomName).emit("choice2", { "choice": choice, id: socket.id });
        }

        if (choiceOfPlayers.length == 2) {

            setTimeout((e) => {

                io.emit("choiceN", "Players choice : " + choiceOfPlayers);
                io.to(roomName).emit("choice", choiceOfPlayers);
                let winner = winnerCheck(choiceOfPlayers);
                console.log(winner);

                io.to(roomName).emit("winner", winner);

            }, 500);
        };


        io.to(roomName).emit("choiceN", "User " + (socket.id) + " chooce " + choice);

        callback("choice received");
    })


    socket.on("inputMessage", (msg, callback) => {
        console.log(msg);
        io.to(msg.roomName).emit("choiceN", msg.input);
        callback("Given the input back");
    })


    socket.on("leave", (msg, callback) => {
        console.log(msg);
        socket.leave(msg);
        callback("User : " + (socket.id) + " left the room : " + msg);
    })



    socket.on("disconnect", (socket) => {

        io.in(roomName).fetchSockets().then((socket) => {

            console.log("Room Person : ", socket.length);
            countOfSockets = socket.length;

        });

        console.log(socket);
        // io.to(roomName).emit("left", socket.id);
        // io.emit("choiceN", "socket length : " + socket.length);
        console.log("User disconnect", socket.id);
    })

})





server.listen("3500", (err) => {
    if (err) {
        console.log("Connection failed");
    }
    else {
        console.log("Successfully connected in 3500");
    }
})













function winnerCheck(arrOFObj) {

    let winnerCondition = [{ "rock": ["scissor", "lizard"] }, { "paper": ["rock", "spock"] }, { "scissor": ["paper", "lizard"] }, { "lizard": ["paper", "spock"] }, { "spock": ["scissor", "rock"] }];


    console.log("Winner  : ");

    let object = arrOFObj;
    // console.log(object);
    let key1 = object[0].id;
    let key2 = object[1].id;

    let c1 = object[0].choice;
    let c2 = object[1].choice;

    console.log(c1);
    console.log(c2);

    if (c1 == c2) {

        io.to(roomName).emit("winnerFind", "This is a draw");
        return "Draw";
    }

    else {
        for (let obj of winnerCondition) {

            let key = Object.keys(obj)[0];
            console.log(key);

            let arr = obj[key];

            if (key == c1 && arr.includes(c2)) {
                console.log("c1 win");
                io.to(roomName).emit("winnerFind", key1);

                return key1;
            }

        }

        console.log("c2 win");
        io.to(roomName).emit("winnerFind", key2);

        return key2;

    }

}

