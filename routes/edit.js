// import *as express from 'express'
const validUrl = require('valid-url')


const postUrl = require('./../models/postRequest') 
const firebase = require("firebase")
const express= require("express")
const router = express.Router();




// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/editurl', async (req, res) => {
  const { longUrl,uid,email,urlCode} = req.query;
  
  const baseUrl = "http://localhost:5000";

  

  

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
     
      //checking if a url already exists
      firebase.firestore().collection("urls").where("creator_id","==",uid).where("longUrl","==",longUrl).get()
      .then((snap)=>{
        if(snap.size==0){
          const shortUrl = baseUrl + '/' + urlCode;

          const data = {
            longUrl:longUrl,
            shortUrl:shortUrl,
            urlCode:urlCode,
            creation_date:new Date(),
            creator_email:email,
            creator_id:uid,
            expiry_date:"",
            visit_counts:0,
            countries:{
              "usa":0,"ind":0
            }
            
          };
  
          postUrl(data)
  
          
          res.json(data);
        }else{
          res.status(201)
        }
      })
      

    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;
