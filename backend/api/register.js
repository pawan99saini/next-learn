const db = require('./db');
const express = require('express');
const app = express()
const bcrypt = require("bcrypt");
const mysql = require("mysql")
app.use(express.json())

module.exports = app.post("/", async (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    db.getConnection( async (err, connection) => {
     if (err) throw (err)
     const sqlSearch = "SELECT * FROM users WHERE email = ?"
     const search_query = mysql.format(sqlSearch,[email])
     const sqlInsert = "INSERT INTO users (name,email,password) VALUES (?,?,?)"
     const insert_query = mysql.format(sqlInsert,[name,email,hashedPassword])
     // ? will be replaced by values
     // ?? will be replaced by string
     await connection.query (search_query, async (err, result) => {
      if (err) throw (err)
      console.log("------> Search Results")
      console.log(result.length)
      if (result.length != 0) {
       connection.release()
       console.log("------> User already exists")
       res.sendStatus(409) 
      } 
      else {
       await connection.query (insert_query, (err, result)=> {
       connection.release()
       if (err) throw (err)
       console.log ("--------> Created new User")
       console.log(result.insertId)
       res.sendStatus(201)
      })
     }
    }) //end of connection.query()
    }) //end of db.getConnection()
    }) //end of app.post()
    


