let checkLogin = document.getElementById("check");
let ioNow = io();

checkLogin.addEventListener("click", () => {
    // alert("hi")
    // let name = document.getElementById("name");
    // let password = document.getElementById("password");
    // console.log(name);
    // console.log(password);

    // try{
    //     var response = fetch("http://localhost:3900/?name="+name.value+"&password="+password.value);
    //     console.log(response);

    //     // if (!response.ok) {
    //     //     throw new Error(`HTTP error : status ${response.status}`);
    //     // }

    //     console.log(response);
    //     let data = response.json();
    //     console.log(data);
    // }
    // catch(err){
    //     console.group("error happened\n"+err);
    // }

    checkTheLogin();
})


async function checkTheLogin() {
    let name = document.getElementById("name");
    let password = document.getElementById("password");

    // console.log(name);
    // console.log(password);

    try {
        let response = await fetch("http://localhost:3900/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name.value,
                password: password.value,
            })
        })

        console.log("Response : ", response);






        // let res1= await response.json().then((res)=> res);

        // console.log("Res : ",res1);


        // if(res1 != null){
        //     ioNow.emit("commentC", res1);
        // }
        // else{
        //     ioNow.emit("registerC", res1);

        // }

        // console.log("I have finshed the call");

        // .then((response) => response.text())
        // .then((data) => console.log(data))
        // .catch((error) => console.error("Error:", error))

        // console.log(response);

        // if (!response.ok) {
        //     throw new Error(`HTTP error : status ${response.status}`);
        // }

        // console.log(response);
        // let data = await response.json();
        // console.log(data);
    }
    catch (err) {
        console.group("error happened\n" + err);
    }
}



ioNow.on("result", (msg, callback) => {
    if (msg != true) {
        window.location.href = '/register';
    }
    else {
        window.location.href = '/comment';
    }
    console.log("results : ", msg);
})









// app.get("/", async (req, res) => {

//     res.render("login");
// })

// app.get("/comment", (req, res) => {

//     io.on("commentC", (msg)=>{
//         res.redirect("/comment")
//     })

//     res.render("commentPage");
// })

// app.get("/register", (req, res) => {

//     io.on("registerC", (msg)=>{
//         res.redirect("/register")
//     })

//     res.render("register");


// })