// فلترة
function filterCourses() {
    let filter = document.getElementById("filter").value;
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        if (filter === "all" || card.classList.contains(filter)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Register
async function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });

    alert(await res.text());
}

// Login
async function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });

    let data = await res.json();

    if(data.message){
        localStorage.setItem("user", data.email);
        window.location.href = "dashboard.html";
    } else {
        alert("Login Failed");
    }
}

// Dashboard
function loadUser() {
    let user = localStorage.getItem("user");
    if(user){
        document.getElementById("welcome").innerText = "Welcome " + user;
    }
}