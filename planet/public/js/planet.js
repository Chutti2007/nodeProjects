let allPlanetName = document.getElementsByClassName("p");
console.log(allPlanetName);


for (let name of allPlanetName) {
    name.addEventListener("click", (event) => {

        console.log(event);

        let pName = event.target.innerText;
        console.log(pName);

        getPlanetDetails(pName.toLowerCase());
    })
}


let overviewButtons = document.querySelectorAll("button");


let b1 = document.getElementById("firstPage");
let b2 = document.getElementById("secondPage");
let b3 = document.getElementById("thirdPage");


b1.addEventListener("click", () => {

    insideEventFindId(b1.id);

})

b2.addEventListener("click", () => {

    insideEventFindId(b2.id);

})

b3.addEventListener("click", () => {

    insideEventFindId(b3.id);


})


function insideEventFindId(pointer) {

    let pName = document.getElementById("pName").innerText;

    let countN = findButtonTouched(pointer);

    getPlanetDetails(pName.toLowerCase(), countN);
}


async function getPlanetDetails(name, num) {

    try {
        var response;

        response = await fetch(`http://localhost:3200/planet?name=` + name) //.then((res) => res.json());


        if (!response.ok) {
            throw new Error(`HTTP error : status ${response.status}`);
        }
        console.log(response);
        let data = await response.json();
        console.log(data);

        let planetN = document.getElementById("pName");
        let content = document.getElementById("content");
        let sourceWiki = document.getElementById("sourceNow");
        let image = document.getElementById("image");
        let rotateTime = document.getElementById("rotation");
        let revolution = document.getElementById("revolution");
        let radi = document.getElementById("radi");
        let temp = document.getElementById("temp");

        let imgChildCount = document.getElementById("planetImage");
        // console.log("Image div child's : ", imgChildCount);


        switch (num) {


            case 1:

                if (imgChildCount.childElementCount > 1) {
                    imgChildCount.lastChild.remove();
                }

                content.textContent = data.structure.content;
                sourceWiki.innerText = data.structure.source;
                image.src = data.images.internal;
                console.log("I came inside one");
                break;

            case 2:

                content.textContent = data.geology.content;
                sourceWiki.innerText = data.geology.source;

                image.src = data.images.planet;
                let img = document.createElement("img");
                img.id = "img";
                img.style.position = "absolute";
                img.style.bottom = "18%";
                img.style.width = "15%"
                img.src = data.images.geology;

                document.getElementById("planetImage").append(img);
                console.log("I came inside second");
                break;

            default:

                if (imgChildCount.childElementCount > 1) {
                    imgChildCount.lastChild.remove();
                }

                planetN.innerText = data.name;
                content.textContent = data.overview.content;
                sourceWiki.innerText = data.overview.source;
                image.src = data.images.planet;

                rotateTime.innerText = data.rotation;
                revolution.innerText = data.revolution;
                radi.innerText = data.radius;
                temp.innerText = data.temperature;
                console.log("I came inside default");

        }

        // let b1 = document.getElementById("firstPage");
        // let b2 = document.getElementById("secondPage");
        // let b3 = document.getElementById("thirdPage");

        // switch (planetN.textContent) {

        //     case "Mercury":
        //         b1.addEventListener("mouseenter", () => {
        //             b1.style.backgroundColor = "#313148";
        //         })
        //         b1.addEventListener("mouseleave", () => {
        //             b1.style.backgroundColor = "#070724";
        //         })
        //         b1.addEventListener("click", () => {
        //             b1.style.backgroundColor = "#419ebb";
        //         })

        //         console.log("I am in mercury");
        // }

    }
    catch (err) {
        console.log("Error occured\n" + err);
    }
}

let PName = "mercury";

async function firstLoadPage(name) {
    console.log("I made the first page request");
    await getPlanetDetails(name.toLowerCase());
    console.log("I am done");


}

firstLoadPage(PName);



function findButtonTouched(id) {

    for (let i = 0; i < overviewButtons.length; i++) {
        if (overviewButtons[i].id == id) {
            return i;
        }
    }
}

