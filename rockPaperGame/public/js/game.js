const ioNow = io();

console.log(ioNow);

let joinRoomButton = document.getElementById("joinRoom");
let roomName;

// let send = document.getElementById("send");
let body = document.getElementById("wrapper");
let leaveButton;

joinRoomButton.addEventListener("click", () => {
    let room = document.getElementById("roomId");

    try {
        roomName = room.value;

        if (room.value != "" && roomName != "") {

            ioNow.emit("join", roomName, (acknowledge) => {
                console.log(acknowledge);

                let button = document.createElement("button");
                button.id = ("leave");
                button.textContent = "leave room";


                button.onclick = function () {
                    leaveButtonEvent();
                };
                // console.log(body);
                body.append(button);
                leaveButton = document.getElementById("leave");
            });


        }
        else {
            console.log("You have to room name");
        }
    }
    catch (err) {
        console.log("Err :\n" + err);
        // console.log("Give input please")
    }
})


// headChoose.addEventListener("click", () => {
//     // console.log("Head choosed");

//     let choice = "head";

//     if (roomName != "") {
//         ioNow.emit("choose", choice, (ack) => {
//             console.log(ack);
//         })
//     }
// })


ioNow.on("choiceN", (msg, callback) => {
    console.log(msg);
})


// tailChoose.addEventListener("click", () => {
//     // console.log("Tail choosed");

//     let choice = "tail";

//     if (roomName != "") {
//         ioNow.emit("choose", choice, (ack) => {
//             console.log(ack);
//         })
//     }
// })

// send.addEventListener("click", () => {
//     console.log("I am going to send a message");

//     let input = document.getElementById("chat").value;

//     ioNow.emit("inputMessage", ({ roomName, input }), (ack => {
//         console.log(ack);
//     }));

// })


let images = document.getElementsByTagName("img");
console.log(images);

for (let button of images) {

    button.addEventListener("click", (event) => {

        if (roomName != "") {
            let choose = event.target.id;
            // console.log(choose);

            ioNow.emit("choose", choose, (ack) => {
                console.log(ack);
            })
        }
    })
}




function leaveButtonEvent() {
    ioNow.emit("leave", roomName, (ack) => {
        console.log(ack);
        roomName = "";
        console.log(leaveButton);
        leaveButton.remove();
    })
}