const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken")
const client = require("../configs/db.js")
// const temporaryData = [
//     {
//         name: "Ketan Prakash", 
//         email: "ketanprakash@gmail.com",
//         password: "ketanp"
//     },
//     {
//         name: "Ketan Prakash", 
//         email: "ketanprakash1@gmail.com",
//         password: "ketanp"
//     },
//     {
//         name: "Ketan Prakash", 
//         email: "ketanprakash2@gmail.com",
//         password: "ketanp"
//     }
// ]

exports.signUp = (req, res) => {

    // {
    //     name: "Ketan", 
    //     email: "ketan@gmail.com", 
    //     password: ";alksdjfa;lskd",
    // }
    const {name, email, password} = req.body;
    console.log(name, email, password);
    //note: check if user already exists
    client.query(`SELECT * FROM users where email = '${email}'`).then((data) => {
        console.log(data.rows);
        let isValid = data.rows;
        console.log(data.rows);
        if (isValid.length != 0){
            res.status(400).json({ error : "Email already exists"});
        }
        else {
            //note: generate token
            
            //note: hash password
            bcrypt.hash(password, 10, (err, hash) => {
                // Store hash in your password DB.
                if(err){
                    res.status(400).json({
                        error: "internal server error"
                    });
                }
                else{
                    const user = {
                        name: name, 
                        email: email, 
                        password: hash
                    };
    
                    // temporaryData.push(user);
                    client.query(`INSERT INTO users(name, email, password) VALUES('${user.name}', '${user.email}', '${user.password}')`).then(() => {
                        const token = jwt.sign({email: email},process.env.SECRET_KEY);
                        console.log(token);
                        res.status(200).json({
                            message: "user added successfully to DB", 
                            token: token
                        });
                        client.query("SELECT * FROM users").then((d) => {
                            console.log(d.rows);
                        })
                    }).catch(() => {console.log("DB error occured")});
                }
                // console.log(temporaryData);
            })
        }
    }).catch(() => {console.log("DB error occured")});
    // temporaryData.forEach((element) => {
    //     if(element.email === email){
    //         isValid = 0;
    //     }
    // })    
        
};

exports.signIn = (req, res) => {
    //todo, complete signin
    //note: check email
    const {email, password} = req.body;
    console.log(email, password);
    client.query(`SELECT * FROM users where email = '${email}'`).then((data) => {
        console.log(data.rows);
        let isValid = data.rows;
        console.log(data.rows);
        if (isValid.length === 0){
            res.status(400).json({ error : "Email does not exist, please Sign Up"});
        }
        else {
            //note: match password
            const user = data.rows[0];
            bcrypt.compare(password, user.password, function(err, result) {
                if (result){
                    const token = jwt.sign({email: email},process.env.SECRET_KEY);
                    console.log(token);
                    res.status(200).json({
                        message: "login successful", 
                        token: token
                    });
                }
                else{
                    res.status(400).json({
                        error: "incorrect password"
                    })
                }
            });
        }
    })
}