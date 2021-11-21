const firebase =require('firebase') 

async function postUrl(data){
    console.log("Post request",data)
    firebase.firestore().collection("urls").doc(data.urlCode).set(data).then(()=>{
        console.log("Successfully created url")
    })
}


module.exports = postUrl