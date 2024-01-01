const express = require('express');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { Console } = require('console');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nexusdairy2023@gmail.com', // Replace with your email
        pass: 'ocgx vren stpx pzor', // Replace with your email password (use environment variables for security)
    },
});



const con = mysql.createConnection("mysql://root:Rahul.6165@localhost:3306/nexus_dairy");
con.connect(function (err) {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log("Connected to the database");
    }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.dirname(__dirname),'..', 'frontend', 'public', 'Eimages'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

module.exports = { con, upload };
