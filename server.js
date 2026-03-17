const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const file = "users.json";

// قراءة
function getUsers() {
    return JSON.parse(fs.readFileSync(file));
}

// حفظ
function saveUsers(users) {
    fs.writeFileSync(file, JSON.stringify(users, null, 2));
}

// Register
app.post('/register', (req, res) => {
    let users = getUsers();

    let exists = users.find(u => u.email === req.body.email);
    if (exists) return res.send("User already exists");

    users.push(req.body);
    saveUsers(users);

    res.send("Registered Successfully");
});

// Login
app.post('/login', (req, res) => {
    let users = getUsers();

    let user = users.find(u =>
        u.email === req.body.email &&
        u.password === req.body.password
    );

    if (user) {
        res.json({message:"Login Success", email:user.email});
    } else {
        res.send("Wrong Email or Password");
    }
});

app.listen(3000, () => console.log("Server running"));