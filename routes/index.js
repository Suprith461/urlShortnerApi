const express= require("express")
const firebase = require("firebase")
const router = express.Router();
const { IPinfoWrapper } = require("node-ipinfo");

const ipinfo = new IPinfoWrapper("4dcb5fa3216e58");

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', async (req, res) => {
  try {
        const shortCode = req.params.code
        
        const host = req.get("host")
        const origin =req.get("origin")
        var userIP = req.socket.remoteAddress;

        
        console.log("Host",host,"Origin",origin,userIP)
        
        firebase.firestore().collection("urls").doc(shortCode).get()
        .then((doc)=>{
          const docData = doc.data()
          const longUrl = docData.longUrl

          if (longUrl) {
            ipinfo.lookupIp("1.22.0.0").then((response)=>{
              console.log("Ip response",response)
              if(response.country && docData.countries.hasOwnProperty(response.country)){
                var countries={...docData.countries}
                countries[response.country]=docData.countries[response.country]+1
                firebase.firestore().collection("urls").doc(shortCode).update({visit_counts:firebase.firestore.FieldValue.increment(1),countries:countries})
                console.log("Countries Alreay present",countries)
              }else if(response.country){
                var countries = {...docData.countries}
                countries[response.country]=1;
                firebase.firestore().collection("urls").doc(shortCode).update({visit_counts:firebase.firestore.FieldValue.increment(1),countries:countries})
                console.log("Countries not  present",countries)
              }
              
              
            })
           
            return res.redirect(longUrl);
          } else {
            return res.status(404).json('No url found');
          }
        })
    
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports = router;
