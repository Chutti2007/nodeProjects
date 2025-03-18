let registerUser = document.getElementById("register");
let ioNow = io();

registerUser.addEventListener("click", () => {
    registerTheUser();
})



async function registerTheUser() {
    let name = document.getElementById("name");
    let password = document.getElementById("password");
    let email = document.getElementById("email");


    try {
        await fetch("http://localhost:3900/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name.value,
                password: password.value,
                email: email.value
            })
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = data.redirectUrl;  // ✅ Manual redirection
                } else {
                    alert("Registration failed. Try again.");
                    window.location.href = data.redirectUrl;
                }
            })
            .catch(error => console.error("Error:", error));

    }
    catch (err) {
        console.group("error happened\n" + err);
    }
}



ioNow.on("result", (msg, callback) => {
    console.log("results : ", msg);

    win
})