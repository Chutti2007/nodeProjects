// const { head } = require("postman-request");

let send = document.getElementById("send");
let message = document.getElementById("msg"); //input tag
let chatBox = document.getElementById("chatBox");
let room = "";


const ioNow = io();
// console.log(ioNow);

let count = 1;

let count1 = 1;
let leaveButton = document.getElementById("leave");


ioNow.emit("restoreComments", "now", (msg) => {
    console.log(msg);
});






const processedComments = new Set();


ioNow.on("message", (msg) => {

    // let createOneComment = true;

    let message2;
    let vote;
    // let replyIs;

    if (msg.contents != null) {
        // console.log("I came insode condition");
        message2 = msg.contents;
        vote = msg.vote;

    }


    // console.log("Message: ", msg);
    let div = document.createElement("div");//the one and only parent
    let div1 = document.createElement("div");
    let firstD = document.createElement("div");
    let secondD = document.createElement("div");
    let thirdDiv = document.createElement("div");

    div.id = "count" + count;
    div.style.width = "100%";
    div.style.height = "max-content";


    div1.classList.add("divElement");

    firstD.classList.add("div1");
    secondD.classList.add("div2");
    thirdDiv.classList.add("div3");


    let bu1 = document.createElement("button");
    let bu2 = document.createElement("button");
    let bu3 = document.createElement("button");

    bu1.id = "bu11" + count;
    bu2.id = "bu21" + count;
    bu3.id = "bu31" + count;


    bu1.textContent = "reply";
    bu2.textContent = "edit";
    bu3.textContent = "delete";

    let insideDiv1 = document.createElement("div");

    insideDiv1.style.width = "50%";
    insideDiv1.style.height = "80%";


    let b1 = document.createElement("button");
    let b2 = document.createElement("button");
    let middle = document.createElement("div");

    middle.classList.add("middleCount");

    middle.id = "c" + count;
    middle.textContent = ((msg.contents != null && msg.isaReply != 1) ? vote : 0);

    b1.classList.add("plusButton");
    b2.classList.add("minusButton");




    b1.id = "plusC" + count;
    b2.id = "minusC" + count;


    b1.innerText = "+";
    b2.innerText = "-";


    let isClicked = false;


    bu1.addEventListener("click", (event) => {

        // ioNow.emit("replyChild", event.target.id);


        let id = event.target.id;
        
        messageAsReply(id, null);
       

    })


    bu2.addEventListener("click", (event) => {


        let id = event.target.id;
        // console.log(id);

        let current = document.getElementById(id);
        // console.log(current);
        // console.log(current.textContent);

        let parent = current.parentElement.previousElementSibling.lastElementChild;

        if (current.textContent == "edit") {
            current.textContent = "save";

            parent.contentEditable = true;
            parent.focus();
            // console.log(parent);
        }
        else {
            current.textContent = "edit";
            parent.contentEditable = false;

        }
    })



    bu3.addEventListener("click", (event) => {
        let id = event.target.id;

        // console.log(id);

        let parent = document.getElementById(id).parentElement.parentElement.parentElement;
        // console.log(parent);

        parent.remove();
    })




    b1.addEventListener("click", (event) => {
        let id = event.target.id;

        let nextSib = document.getElementById(id).nextElementSibling;
        // console.log("My Sibling : ", nextSib);

        if (!isClicked) {
            ioNow.emit("count", { id: id, text: nextSib.innerText }, (ack) => {
                nextSib.innerText = ack;
            });
            isClicked = true;
        }
    })


    b2.addEventListener("click", (event) => {
        let id = event.target.id;

        let prevSib = document.getElementById(id).previousElementSibling;
        // console.log("My Sibling : ", prevSib);

        if (!isClicked && prevSib.textContent != 0) {

            ioNow.emit("countM", { id: id, text: prevSib.innerText }, (ack) => {
                prevSib.innerText = ack;
            });
        }
    })



    let inDiv1 = document.createElement("div");
    let inDiv2 = document.createElement("div");

    let image = document.createElement("img");
    let h3 = document.createElement("h3");

    inDiv1.classList.add("indiv1");
    inDiv2.classList.add("indiv2");


    inDiv1.style.paddingLeft = "2%"
    inDiv2.style.paddingLeft = "2%";

    inDiv2.style.color = "white";

    inDiv1.style.justifyContent = "left";
    inDiv1.style.alignItems = "center";


    inDiv1.style.paddingTop = "1%";
    inDiv2.style.paddingTop = "2%";

    inDiv1.style.display = "flex";
    inDiv1.style.gap = "2%";

    inDiv1.style.borderBottom = "2px solid"


    h3.innerText = "user2";
    h3.style.color = "#A970FF";


    image.style.width = "46px";
    image.style.height = "90%";
    image.style.borderRadius = "100%";
    image.src = "/images/avatars/p1.png";

    // console.log(message2);
    inDiv2.innerText = ((msg.contents != null && msg.isaReply != 1) ? message2 : msg);



    inDiv1.append(image);
    inDiv1.append(h3);

    insideDiv1.append(b1);
    insideDiv1.append(middle);
    insideDiv1.append(b2);

    firstD.append(insideDiv1);

    secondD.append(inDiv1);
    secondD.append(inDiv2);

    thirdDiv.append(bu1);
    thirdDiv.append(bu2);
    thirdDiv.append(bu3);

    div1.append(firstD);
    div1.append(secondD);
    div1.append(thirdDiv);


    div.append(div1);

    chatBox.append(div);

    message.value = "";

    count++;
    // console.log("Message 2 : ", message2);

})




















send.addEventListener("click", () => {
    // console.log(message.value);
    let msg = message.value;
    // let roomName = document.getElementById("roomName");


    if (msg != "") {

        ioNow.emit("message", msg, (serverMsg) => {
            console.log(serverMsg);
        });
    }

});



document.addEventListener("keydown", (event) => {
    // console.log(event.key);

    if (event.key == "Enter") {
        event.preventDefault();
        let msg = message.value;

        if (msg != "") {

            ioNow.emit("message", msg, (serverMsg) => {
                console.log(serverMsg);
            });
        }
    }
})



// ioNow.on("receivedTheReply",)








let createECount = 0;



ioNow.on("print", (msg) => {
    console.log("Message : ", msg);
})




let restoreButton = document.getElementById("restore");


ioNow.on("returnMessage", (msg) => {
    getResultMessagees(msg);
})



let result;


function getResultMessagees(msg) {
    result = msg;
    // console.log("Result : ", result);

    if (result != null) {



        if (result.isaReply == 1) {
            let p = chatBox.lastElementChild.id;
            // console.log("P",p);

            messageAsReply( p,result);
        }
        else {
            // console.log("parent");
            // console.log(chatBox.lastElementChild);
            ioNow.emit("message", result, (x) => {
                console.log(x);
            });
        }


    }
}



ioNow.on("replyMessSend", (idN) => {


    messageAsReply(idN, null);

})




function messageAsReply(idN, obj) {

    let innerText = "";

    if (obj != null) {
        // console.log(obj);
        innerText = obj.contents;
        // console.log("Inner Text : ", innerText);
    }

    let isClicked = false;
    let parent;


    let id = idN;
    // console.log("Reply clicked");


    console.log(id);

    // console.log("Chosen Element : ", document.getElementById(id));

    let replyDiv = document.createElement("div"); // the one parent
    let div = document.createElement("div"); // the inside parent
    let divWrap = document.createElement("div");
    let divButtons = document.createElement("div");
    let likeB = document.createElement("div");
    let contentDivParent = document.createElement("div");




    let div1 = document.createElement("div");
    let hr = document.createElement("hr");
    let replyB = document.createElement("button");
    let deleteB = document.createElement("button");
    let header = document.createElement("div");

    let b1 = document.createElement("button");
    let b2 = document.createElement("button");
    let middle = document.createElement("div");


    let image = document.createElement("img");
    let h3 = document.createElement("h3");

    let isClickedNow = false;


    // let inside = false;

    if (obj != null) {
        parent = document.getElementById(id);
        // console.log("Parent : ", parent);
    }
    else {
        parent = document.getElementById(id).parentElement.parentElement.parentElement;
        // console.log("Parent : ", parent);

    }


    b1.classList.add("plusButton");
    b2.classList.add("minusButton");

    likeB.classList.add("bParent");

    middle.classList.add("middleCount");

    div.classList.add("secondParent");

    replyDiv.style.height = "max-content";
    replyDiv.style.width = "100%";

    divWrap.classList.add("wrapDiv");

    image.classList.add("uImage");

    header.classList.add("headOne");

    deleteB.classList.add("dButton");

    replyB.classList.add("rButton");

    divButtons.classList.add("buttonDivParent")

    contentDivParent.style.width = "79%";
    contentDivParent.style.height = "100%";




    b1.id = "plus" + count1;
    b2.id = "minus" + count1;

    middle.id = "c" + count1;




    middle.textContent = "0";
    b1.innerText = "+";
    b2.innerText = "-";

    h3.innerText = "user3";


    let rendomNum = Math.ceil(Math.random() * 4);



    image.src = "/images/avatars/p" + rendomNum + ".png";


    deleteB.id = "del" + count1;

    replyB.textContent = "send";
    deleteB.textContent = "delete";

    div1.classList.add("theMiddleComment")

    if (innerText != "") {
        div1.textContent = innerText;
    }
    else {
        div1.contentEditable = true;
    }




    replyB.addEventListener("click", () => {

        if (div1.textContent != "" && div1 && replyB.textContent == "send") {
            replyB.textContent = "edit";
            div1.contentEditable = false;
        }
        else {
            replyB.textContent = "send";
            div1.contentEditable = true;
        }
    })


    b1.addEventListener("click", (event) => {
        let id = event.target.id;

        let nextSib = document.getElementById(id).nextElementSibling;
        // console.log("My Sibling : ", nextSib);

        if (!isClicked) {
            ioNow.emit("count", { id: id, text: nextSib.innerText }, (ack) => {
                nextSib.innerText = ack;
            });
            isClickedNow = true;
        }
    })


    b2.addEventListener("click", (event) => {
        let id = event.target.id;

        let prevSib = document.getElementById(id).previousElementSibling;
        // console.log("My Sibling : ", prevSib);

        if (isClickedNow && prevSib.textContent != 0) {

            ioNow.emit("countM", { id: id, text: prevSib.innerText }, (ack) => {
                prevSib.innerText = ack;
            });
        }
    })


    deleteB.addEventListener("click", (event) => {
        let id = event.target.id;
        console.log(id);

        let parent = document.getElementById(id).parentElement.parentElement.parentElement.parentElement;
        console.log(parent);
        parent.remove();
    })



    divButtons.append(replyB);
    divButtons.append(deleteB);

    header.append(image);
    header.append(h3);


    contentDivParent.append(header);
    contentDivParent.append(div1);

    likeB.append(b1);
    likeB.append(middle);
    likeB.append(b2);


    divWrap.append(likeB);
    divWrap.append(contentDivParent);
    divWrap.append(divButtons);

    div.append(hr);
    div.append(divWrap);


    replyDiv.append(div);

    // console.log("Parent 1 : ",parent);

    // if (!inside) {
console.log("Parent : ", parent);
console.log("Child : ", replyDiv);

        parent.append(replyDiv);
    // }
    // inside = true;


    div1.focus();

    count1++;


}

