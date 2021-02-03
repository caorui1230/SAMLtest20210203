"use strict";

const port = process.env.PORT || 3001;
const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const passportinit = require("./passportinit");
const cors = require("cors");
const bodyParser = require("body-parser");
const decoder = require("saml-encoder-decoder-js");
const parseString = require("xml2js").parseString;
const stripPrefix = require("xml2js").processors.stripPrefix;

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
passport.serializeUser(function(user, done){
  done(null, user);
});
passport.deserializeUser(function(user, done){
  done(nuell, user);
});

app.get(
  "/auth/samltest/callback/",
  passport.authenticate("Keycloak", { failureRedirect: '/' }),
  function(req, res) {
    console.log(req);
    console.log(res);
    res.redirect("/");
  }
);

app.get(
    "/auth/samltest/",
    passportinit.passportKeycloak
);

app.get("/auth/passportsaml",
  passportinit.passportSaml);

app.post("/auth/passportsaml/callback",
  passportinit.passportSaml,
  (req, res) => {
    const xmlResponse = req.body.SAMLResponse;
    decoder.decodeSamlPost(xmlResponse, (err, xmlResponse) => {
      if(err) {
        throw new Error(err);
      } else {
        parseString(xmlResponse, {tagNameProcessers: [stripPrefix]}, (err, result) =>{
          if (err) {
            throw err;
          } else {
            //todo get user data from xmlresponse
            console.log(result);
          }
        })
      }
    })
   console.log(res);
    res.redirect("/successed");
  }
);

app.get("/successed", (req, res) =>{
  res.send("successed");
});

app.get("/failure", (req, res) => {
  res.send("failed")
})

app.get("/", (req, res) => {
  res.send("Hello")
});

app.listen(port, () => {
  console.log(`Server running at http://localhost)}`);
});
