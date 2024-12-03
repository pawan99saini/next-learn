const db = require('./db');
const express = require('express');
const app = express()
const bcrypt = require("bcrypt");
const mysql = require("mysql")
const jwt = require("jsonwebtoken")
require("dotenv").config()

app.use(express.json())

//LOGIN (AUTHENTICATE USER)

module.exports = app.post("/", (req, res)=> {
  try {
  const user = req.body.email
  const password = req.body.password
  console.log(req.body)
  db.getConnection ( async (err, connection)=> {
   const sqlSearch = "Select * from users where email = ?"
   const search_query = mysql.format(sqlSearch,[user])
  connection.query (search_query, async (err, result) => {
  connection.release()
      if (result.length == 0) {
     res.status(401).json({error:"User does not exist"});        

    } 
    else {
     const hashedPassword = result[0].password
     //get the hashedPassword from result
  if (await bcrypt.compare(password, hashedPassword)) {
      let jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
      let data = {
          time: Date(),
          userId: result[0].id,
      }
      const token = jwt.sign(data, jwtSecretKey);
     res.json({accessToken: token})
     
     } else {
      res.status(401).json({error:"Password incorrect!"});        

     } //end of Password incorrect
  }//end of User exists
  
}) //end of connection.query()
  }) //end of db.connection()
  }
  catch (err)
  {
    res.status(500).json({error:err});        

  }
  }) //end of app.post()
  
    