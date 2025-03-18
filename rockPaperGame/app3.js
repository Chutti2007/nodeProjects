const http = require("http");
let express = require("express");
let path = require("path");
const socketIo = require("socket.io");
// const { Socket } = require("dgram");
let roomName;
let countOfSockets;
// let socket1;
// let oneId;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const pubDir = path.join(__dirname, "/public");
// let count = 0;
let id;
let firstPlayerId;

let choiceOfPlayers;


app.set("view engine", "ejs");
app.use(express.static(pubDir));


app.get("/", (req, res) => {
    res.render("roomCreatePage");
})



app.get("/game", (req, res) => {
    res.render("gamePage");
})

io.on("connection", (socket) => {
    choiceOfPlayers = [];
    socket1 = socket.id;

    console.log("New user connected", socket.id);

    socket.on("join", (roomN, callback) => {


        if (countOfSockets > 1 && roomN == roomName) {

            console.log("Max players reached");
            socket.emit("notJoin", "Max players reached");


        }
        else {


            roomName = roomN;
            socket.join(roomN);

            id = socket.id;


            io.to(roomName).emit("choiceN", "New user : " + socket.id);

            io.in(roomName).fetchSockets().then((socket) => {

                console.log("Room Person : ", socket.length);
                countOfSockets = socket.length;

                if (countOfSockets == 2) {
                    io.to(roomName).emit("one", firstPlayerId)
                }

                if (socket.length == 1) {
                    firstPlayerId = id;
                    io.to(roomName).emit("one", id);
                }
                else {
                    io.to(roomName).emit("id", { id, countOfSockets });
                }

                io.to(roomName).emit("socket", (socket.length));

            }).catch((err) => console.log("Error fetching sockets" + err));

            callback("Successfully joined room : " + roomName + " User : " + (socket.id));

        }

    })



    socket.on("choose", (choice, callback) => {

        let pId = socket.id;

        choiceOfPlayers.push({ [pId]: choice });
        console.log("choice : ", choiceOfPlayers);

        if (choiceOfPlayers.length == 2) {

            io.emit("choiceN", "Players choice : " + choiceOfPlayers);
            io.to(roomName).emit("choice", choiceOfPlayers);
            let winner = winnerCheck(choiceOfPlayers);
            console.log(winner);

            io.to(roomName).emit("winner", winner);

        }

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


    socket.on("createRoom", (roomN)=>{
        console.log(roomN);
        
    })

    socket.on("disconnect", (socket) => {

        io.in(roomName).fetchSockets().then((socket) => {

            console.log("Room Person : ", socket.length);
            countOfSockets = socket.length;

        });

        console.log(socket);
        io.to(roomName).emit("left", socket.id);
        io.emit("choiceN", "socket length : " + socket.length);
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

    let object = arrOFObj;
    console.log(object);
    let key1 = Object.keys(object[0])[0];
    let key2 = Object.keys(object[1])[0];

    let c1 = object[0][key1];
    let c2 = object[1][key2]

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

