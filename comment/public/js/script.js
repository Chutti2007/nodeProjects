let send = document.getElementById("send");
let message = document.getElementById("msg"); //input tag
let chatBox = document.getElementById("chatBox");
let room = "";


const ioNow = io();
console.log(ioNow);

let count = 1;

let count1 = 1;














ioNow.on("message", (msg) => {

    let createOneComment = true;


    console.log(msg);
    let div = document.createElement("div");//the one and only parent
    let div1 = document.createElement("div");
    let firstD = document.createElement("div");
    let secondD = document.createElement("div");
    let thirdDiv = document.createElement("div");

    div.id = "count" + count;
    div.style.width = "100%";
    div.style.height = "max-content";

    // div1.style.border = "2px solid black";


    div1.classList.add("divElement");

    firstD.classList.add("div1");
    secondD.classList.add("div2");
    thirdDiv.classList.add("div3");

    secondD.style.borderLeft = "2px solid black";
    secondD.style.borderRight = "2px solid black";
    // secondD.style.paddingLeft = "2%";



    let bu1 = document.createElement("button");
    let bu2 = document.createElement("button");
    let bu3 = document.createElement("button");

    bu1.id = "bu11" + count;
    bu2.id = "bu21" + count;
    bu3.id = "bu31" + count;

    // bu1.style.height = "33%";
    // bu2.style.height = "33%";
    // bu3.style.height = "33%";

    // bu1.style.backgroundColor = "#3CB371";
    // bu2.style.backgroundColor = "#4A90E2";
    // bu3.style.backgroundColor = "#D32F2F"; 

    // bu1.style.height = "33%";
    // bu2.style.width = "40%";
    // bu3.style.height = "33%";

    bu1.textContent = "reply";
    bu2.textContent = "edit";
    bu3.textContent = "delete";

    let insideDiv1 = document.createElement("div");

    insideDiv1.style.width = "50%";
    insideDiv1.style.height = "80%";


    let b1 = document.createElement("button");
    let b2 = document.createElement("button");
    let middle = document.createElement("div");

    middle.id = "c" + count;
    // count++;

    middle.textContent = 0;
    // middle.style.width = "85%";
    middle.style.height = "35%";
    middle.style.display = "flex";
    middle.style.justifyContent = "center";
    middle.style.alignItems = "center";
    middle.style.color = "#5357b6";
    middle.style.fontWeight = "bold";



    b1.id = "plusC" + count;
    b2.id = "minusC" + count;

    b1.style.width = "100%";
    b2.style.width = "100%";

    b1.style.backgroundColor = "transparent";
    b2.style.backgroundColor = "transparent";

    b1.style.border = "none";
    b2.style.border = "none";

    b1.style.fontSize = "1.5rem";
    b2.style.fontSize = "1.5rem";

    b1.style.height = "27%";
    b2.style.height = "28%";

    b1.style.color = "#c5c6ef";
    b2.style.color = "#c5c6ef";



    b1.innerText = "+";
    b2.innerText = "-";


    let isClicked = false;


    bu1.addEventListener("click", (event) => {


        if (createOneComment) {

            createOneComment = false;

            let id = event.target.id;
            console.log("Reply clicked");

            // ioNow.emit("replyMessage", id, (id1)=>{
            // ioNow.emit("replyMessage", id, (msg)=>{
            //     console.log(msg);
            // })

            // ioNow.on("replyReceived", (id, callback) => {

            //     console.log("I came inside the reply");

            //     console.log("Id : ",id);



            // let id = event.target.id;
            console.log(id);

            let replyDiv = document.createElement("div"); // the one parent
            let div = document.createElement("div"); // the inside parent
            let divWrap = document.createElement("div");
            let divButtons = document.createElement("div");
            let likeB = document.createElement("div");
            let contentDivParent = document.createElement("div");




            let parent = document.getElementById(id).parentElement.parentElement.parentElement;
            console.log(parent);


            likeB.style.width = "10%";
            likeB.style.height = "100%";
            likeB.style.borderLeft = "2px solid";
            likeB.style.borderRight = "2px solid";

            replyDiv.style.height = "max-content";
            replyDiv.style.width = "100%";

            div.style.height = "105px";
            div.style.display = "flex";
            div.style.justifyContent = "left";
            div.style.alignItems = "center";
            div.style.border = "2px solid black";
            div.style.borderTop = "0px solid";



            divWrap.style.width = "92%";
            divWrap.style.height = "100%";
            divWrap.style.display = "flex";
            divWrap.style.justifyContent = "space-between";
            divWrap.style.alignItems = "center";


            contentDivParent.style.width = "87%";
            contentDivParent.style.height = "100%";


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




            b1.id = "plus" + count1;
            b2.id = "minus" + count1;

            middle.id = "c" + count1;


            b1.style.width = "100%";
            b2.style.width = "100%";

            b1.style.backgroundColor = "transparent";
            b2.style.backgroundColor = "transparent";

            b1.style.border = "none";
            b2.style.border = "none";

            b1.style.fontSize = "1.5rem";
            b2.style.fontSize = "1.5rem";

            b1.style.height = "27%";
            b2.style.height = "28%";

            b1.style.color = "#c5c6ef";
            b2.style.color = "#c5c6ef";


            middle.style.height = "35%";
            middle.style.display = "flex";
            middle.style.justifyContent = "center";
            middle.style.alignItems = "center";
            middle.style.color = "#5357b6";
            middle.style.fontWeight = "bold";


            middle.textContent = "0";
            b1.innerText = "+";
            b2.innerText = "-";

            h3.innerText = "user3";


            let rendomNum = Math.ceil(Math.random() * 4);
            let isClickedNow = false;

            image.style.width = "46px";
            image.style.height = "90%";
            image.style.borderRadius = "100%";
            image.src = "/images/avatars/p" + rendomNum + ".png";


            header.style.width = "100%";
            header.style.height = "49%";
            header.style.display = "flex";
            header.style.justifyContent = "left";
            header.style.alignItems = "center";
            header.style.gap = "3%";
            header.style.paddingLeft = "2%";

            deleteB.style.width = "58%";
            deleteB.id = "del" + count1;

            replyB.textContent = "send";
            deleteB.textContent = "delete";
            div1.contentEditable = true;

            hr.style.width = "12%";
            hr.style.border = "2px solid black";
            hr.style.transform = "rotate(90deg)";

            replyB.style.width = "56%";
            replyB.style.height = "57%";


            div1.style.width = "92%";
            div1.style.height = "51%";
            div1.style.border = "2px solid black";

            div1.style.paddingLeft = "1%";
            div1.style.paddingTop = "1%";

            divButtons.style.width = "9%";
            divButtons.style.height = "100%";
            divButtons.style.display = "flex";
            divButtons.style.flexDirection = "column";
            divButtons.style.justifyContent = "left";
            divButtons.style.gap = "5%";








            replyB.addEventListener("click", () => {

                if (div1.textContent != "" && div1 && replyB.textContent == "send") {
                    replyB.textContent = "edit";
                    div1.contentEditable = false;
                    // replyB.remove();
                }
                else {
                    replyB.textContent = "send";
                    div1.contentEditable = true;
                }
                createOneComment = true;
            })


            b1.addEventListener("click", (event) => {
                let id = event.target.id;

                let nextSib = document.getElementById(id).nextElementSibling;
                console.log("My Sibling : ", nextSib);

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
                console.log("My Sibling : ", prevSib);

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

            parent.append(replyDiv);


            div1.focus();

            count1++;

            let parent1 = document.getElementById(id).parentElement.parentElement.parentElement;
            console.log("Parent selected 1: ", parent1);


            let parent2 = parent1.lastChild;
            console.log("Parent's parent selected : ", parent2);
            console.log("String Element : ", JSON.stringify(parent1));

            ioNow.emit("replyMesUpdate", JSON.stringify(parent1), (m) => {
                console.log(m);
            });

            // })

        }
        // ioNow.emit("replyMesUpdate", );
    })


    bu2.addEventListener("click", (event) => {


        let id = event.target.id;
        console.log(id);

        let current = document.getElementById(id);
        console.log(current);
        console.log(current.textContent);

        let parent = current.parentElement.previousElementSibling.lastElementChild;

        if (current.textContent == "edit") {
            current.textContent = "save";

            parent.contentEditable = true;
            parent.focus();
            console.log(parent);
        }
        else {
            current.textContent = "edit";
            parent.contentEditable = false;

        }
    })



    bu3.addEventListener("click", (event) => {
        let id = event.target.id;

        console.log(id);

        let parent = document.getElementById(id).parentElement.parentElement.parentElement;
        console.log(parent);

        parent.remove();
    })




    b1.addEventListener("click", (event) => {
        let id = event.target.id;

        let nextSib = document.getElementById(id).nextElementSibling;
        console.log("My Sibling : ", nextSib);

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
        console.log("My Sibling : ", prevSib);

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

    inDiv2.innerText = msg;



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
})




















send.addEventListener("click", () => {
    console.log(message.value);
    let msg = message.value;
    // let roomName = document.getElementById("roomName");


    if (msg != "") {

        ioNow.emit("message", msg, (serverMsg) => {
            console.log(serverMsg);
        });
    }

});



document.addEventListener("keydown", (event) => {
    console.log(event.key);

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



ioNow.on("receivedTheReply",)