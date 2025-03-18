let express = require("express");
let path = require("path");
let http = require("http");
let socketIo = require("socket.io");
let sql = require("mysql2");
// const cors = require("cors");

let app = express();
const server = http.createServer(app);
let io = socketIo(server);
app.use(express.json());

let pubDir = path.join(__dirname, "/public");

// app.use(cors());

let userConnect = sql.createConnection({
    host: "localhost",
    password: "Deepa30",
    database: "loginPage",
    user: "root",
})



app.set("view engine", "ejs");
app.use(express.static(pubDir));



userConnect.connect((err) => {
    if (err) {
        console.log("Connection failed", err);
    }
    else {
        console.log("Connection Successful");
    }
})



app.get("/", async (req, res) => {
    res.render("login");

})

app.get("/comment", (req, res) => {
    res.render("commentPage");
})

app.get("/register", (req, res) => {

    res.render("register");


})





app.post("/login", async (req, res) => {

    console.log("Received data:", req.body);

    let name = req.body.name;
    let password = req.body.password;

    let result = await searchUser(name, password);
    console.log("True Result: ", result);
    io.emit("result", result);


    console.log("Result : ", result)
    if (result) {
        res.redirect("/comment");
    }
    else {
        res.redirect("/register");
    }

})







app.post("/register", async (req, res) => {

    console.log("Received data:", req.body);

    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;

    let result = await registerTheUser(name, password, email);
    console.log("True register Result: ", result);

    
    if (result) {
        res.json({ success: true, redirectUrl: "/comment" });
    } else {
        res.json({ success: false, redirectUrl: "/register" });
    }

})






io.on("connection", (socket) => {

    console.log("New user connected : ", socket.id);


    socket.on("message", (msg, callback) => {
        console.log("Message received : ", msg);
        io.emit("message", msg);
        callback("Message received");

    })




    socket.on("count", (msg, callback) => {
        console.log(msg);
        console.log(msg.id + " " + msg.text);
        console.log(msg.text++);
        callback(msg.text++);
    })

    socket.on("countM", (msg, callback) => {

        console.log(msg.text--);
        callback(msg.text--);
    })


    socket.on("disconnect", () => {
        console.log("User disconnect", socket.id);
        console.log(socket.length);
        // console.log("length of comments : ", socket.length)
    })


    socket.on("post", (msgOfPost) => { // first one has divElement style class
        console.log(msgOfPost);
    })

    socket.on("reply", (msgOfPost) => {
        console.log(msgOfPost);
    })


    socket.on("saveCom", (obj) => {
        // console.log(obj);
        storeMessages(obj);

    })



    socket.on("restoreComments", (msg) => {
        getStoredMessages();
    })




    socket.on("replyChild", (id) => {
        console.log(id);
        socket.emit("replyMessSend", id);
    });


})












server.listen("3900", () => {
    console.log("Server is connected in 3900");
})








async function searchUser(name, password) {

    let sqlQuery = "select * from users where username=?";

    try {
        let details = await new Promise((resolve, reject) => {
            userConnect.query(sqlQuery, [name], (err, data) => {
                if (err) {
                    console.log("Err \n", err);
                    return reject(err);
                }
                return resolve(data)
            })
        })

        console.log("Result : ", details);
        // return details;

        if (details.length == 0) {
            return res.send(401).send("Invalid username or password");
        }
        else {
            let user = details[0];
            console.log(user);

            if (user.password == password) {
                io.emit("result", details);
                console.log("Login successful!");
                return true;
            }
            else {
                console.log("Incorrect password");
                return false;
            }
        }

    }
    catch (err) {
        console.log("Database error:", err);
        return false;
    }
}




async function registerTheUser(name, password, email) {

    let sqlQuery = "insert into users(username, password, email) values(?,?,?)";

    try {

        let connection = await new Promise((resolve, reject) => {
            userConnect.query(sqlQuery, [name, password, email], (err, data) => {
                if (err) {
                    console.log("Err \n", err);
                    reject(err);
                }
                console.log("Data : ", data);
                resolve(data)
            })

        })

        return true;


    }
    catch (err) {
        return false;
    }
}



function storeMessages(obj) {

    console.log(obj);

    console.log(obj.commentID.length);

    let query = "insert into saveComments(cId, contents, userId, isaReply, date, vote) values (?, ?, ? ,? ,?, ?)";

    let cid = obj.commentID;
    let innerText = obj.innerText;
    let isreply = obj.reply;
    let date = obj.date;
    let vote = obj.vote;
    let userId = obj.userId;

    console.log("Id: ", cid);
    console.log("Text : ", innerText);
    console.log("UserID : ", userId);
    console.log("Reply/No : ", isreply);
    console.log("Dayte : ", date);
    console.log("votes : ", vote);



    try {
        for (let i = 0; i < obj.commentID.length; i++) {
            let connect = userConnect.query(query, [cid[i], innerText[i], userId, isreply[i], date, vote[i]], (err, data) => {
                if (err) {
                    console.log("Err \n", err);
                }
                // console.log("Data : ", data);
                return data;
            })

        }
    }
    catch (err) {
        console.log("Error : \n" + err);
    }
}




async function getStoredMessages() {


    let query = "select * from saveComments";

    try {

        const [rows, fields] = await userConnect.promise().query(query);  // `rows` will contain the data
        console.log('Data received from Db:', rows);

        // io.emit("print", rows);

        for (let obj of rows) {

            io.emit("returnMessage", obj); loginPage

            await new Promise(resolve => setTimeout(resolve, 1000));

        }

    }
    catch (err) {
        console.log("Error : \n", err);
    }
}