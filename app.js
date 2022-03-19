require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


// mongoose.connect("mongodb://localhost:27017/apiDB");
mongoose.connect(process.env.CONNECT_URL);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const userSchema = {
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    phone: String
};

const User = mongoose.model("User", userSchema);


app.get("/", function(req, res){
    res.sendFile(__dirname + "/Index.html")
})


app.route("/users")
    .get(function (req, res) {

        User.find({}, function (err, foundUsers) {
            if (!err) {
                res.send(foundUsers);
            } else {
                res.send(err);
            }
        })
    })
    .post(function (req, res) {

        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            phone: req.body.phone
        });

        newUser.save(function (err) {
            if (!err) {
                res.send("Successfully added a new User USING POST.");
            } else {
                if (err.code === 11000) {
                    res.send("Username already exists. Please enter a different username.")
                } else {
                    res.send(err.message)
                }

            }
        });

    })
    .delete(function (req, res) {

        User.deleteMany({}, function (err, result) {
            if (!err) {
                res.send("All the User from Database deleted USING DELETE.");
            } else {
                res.send(err);
            }
        })
    });




app.route("/users/:userName")
    .get(function (req, res) {

        User.find({ username: req.params.userName }, function (err, foundUsers) {
            if (foundUsers.length !== 0) {
                res.send(foundUsers);
            } else if (foundUsers.length === 0) {
                res.send("No matching User found.");
            } else {
                res.send(err)
            }
        })
    })
    .patch(function (req, res) {
        User.updateOne(
            { username: req.params.userName },
            {
                password: req.body.password,
                name: req.body.name,
                phone: req.body.phone
            },
            function (err) {
                if (!err && (req.body.password || req.body.name || req.body.phone)) {
                    res.send("User updated successfully using PATCH \n (Note: 'usename' field can't be updated).")
                } else if (!err && req.body.username) {
                    res.send("You can't update usename field.")
                }
                else {
                    res.send(err);
                }
            })
    })
    .delete(function (req, res) {
        User.deleteOne({ username: req.params.userName }, function (err, result) {
            if (!err) {
                res.send("Selected User deleted.");
            } else {
                res.send(err);
            }
        })
    });

    

app.listen(process.env.PORT || 3000, function () {
    console.log("server started at port 3000");
});