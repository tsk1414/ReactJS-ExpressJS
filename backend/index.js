//Back-End 
//Using expressJS to send mySQL queries and then send back the result to front-end

const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const mysqlConnection = require('./database');
const config = require('./auth.config')
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

//listening on port 8080
const port = process.env.PORT || 8080;
app.listen(port, () => 
    console.log(`Listening on port ${port}..`));

//verify token fx
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
};

//all routes

//get vaccine status of id number 
app.post('/status', async function(req,res) {
    var id = req.body.id;

    mysqlConnection.query ('SELECT * FROM patient_status WHERE id_status = ?', [id],
        async function( error, results, fields) {
            if (error) {
                res.send(error);
            }
            else {
                res.send(results);
            }
        });
});

//login
app.post('/login', async function(req,res) {
    var email = req.body.email;
    var password = req.body.password;

    mysqlConnection.query ('SELECT pw FROM users WHERE email = ?', [email],
        async function( error, results, fields) {
            if (error) {
                res.send(results);
            }
            else {
                if(results.length < 1){
                    res.status(404).send({
                        message: "Invalid Email Address",
                    });
                }
                else if (password!==results[0].pw) {
                    res.status(401).send({
                        message: "Wrong Password",
                        accessToken: null
                    });
                }
                else{
                    var token = jwt.sign({ id: email}, config.secret);
                    
                    res.status(200).send({
                        id: email,
                        accessToken: token
                        
                    });
                    
                }
                    
            }
        });
});

//patient create 
app.post('/create', async function(req,res) {
    //check for token 
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        }

      });
    
    var fname = req.body.fname;
    var lname = req.body.lname;
    var ssn = req.body.ssn;
    var dob = req.body.dob;
    var email = req.body.email;
    var phone = req.body.phone;
    var addr1 = req.body.addr1;
    var addr2 = req.body.addr2;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;

    var first_vac = req.body.first_vac;
    var sec_vac = req.body.sec_vac;

    //query to create patient record into both databases
    mysqlConnection.query (
        'INSERT INTO patient_info (first_name,last_name, ssn, dob, email, phone, address_line1, address_line2, city, state, zip) VALUES (?,?,?,?,?,?,?,?,?,?,?); INSERT INTO patient_status (first_vac, sec_vac, patient_id) VALUES (?,?, last_insert_id())', 
    [fname, lname, ssn, dob, email, phone, addr1, addr2, city, state, zip, first_vac, sec_vac],
        async function( error, results, fields) {
            if (error) {
                res.send(error);
            }
            else {
                res.send(results);
            }
        });
});

//get all patient records
app.post('/getall', async function(req,res) {
    //check for token 
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        }

      });
    

	//query to get all patient records
    mysqlConnection.query (
        'SELECT id_info,first_name, last_name, ssn, dob, email, phone, address_line1, address_line2, city, state, zip, first_vac, sec_vac FROM patient_info INNER JOIN patient_status ON patient_info.id_info=patient_status.patient_id', 
        async function( error, results, fields ) {
            if (error) {
                res.send(error);
            }
            else {
                res.send(results);
            }
        });
});

//get single patient record for editing
app.post('/get', async function(req,res) {
    //check for token 
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        }

      });
    //query to get single patient record for editing
    var patientid = req.body.id;
    mysqlConnection.query (
        'SELECT id_info,first_name, last_name, ssn, dob, email, phone, address_line1, address_line2, city, state, zip, first_vac, sec_vac FROM patient_info INNER JOIN patient_status ON patient_info.id_info=patient_status.patient_id WHERE patient_id = ?', 
        [patientid],
        async function( error, results, fields ) {
            if (error) {
                res.send(error);
            }
            else {
                res.send(results);
            }
        });
});

//edit patient record
app.post('/edit', async function(req,res) {
    //check for token 
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        }

      });


    //query to update patient record with new data
    var id = req.body.id;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var ssn = req.body.ssn;
    var dob = req.body.dob;
    var email = req.body.email;
    var phone = req.body.phone;
    var addr1 = req.body.addr1;
    var addr2 = req.body.addr2;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;

    var first_vac = req.body.first_vac;
    var sec_vac = req.body.sec_vac;

    
    mysqlConnection.query (
        'UPDATE patient_info SET first_name=?,last_name=?, ssn=?, dob=?, email=?, phone=?, address_line1=?, address_line2=?, city=?, state=?, zip=? WHERE id_info=?; UPDATE patient_status SET first_vac=?, sec_vac=? WHERE patient_id=?', 
    [fname, lname, ssn, dob, email, phone, addr1, addr2, city, state, zip, id, first_vac, sec_vac, id],
        async function( error, results, fields) {
            if (error) {
                res.send(error);
            }
            else {
                res.send(results);
            }
        });
});

//delete patient record
app.post('/delete', async function(req,res) {
  //check for token 
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }

    });


  //query to delete single patient record
  var id = req.body.id;
  
  mysqlConnection.query (
    'DELETE FROM patient_status WHERE patient_id=?;DELETE FROM patient_info WHERE id_info=?', 
    [id, id],
    async function( error, results, fields) {
      if (error) {
          res.send(error);
      }
      else {
          res.send(results);
      }
  });
});