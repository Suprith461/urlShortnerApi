const firebase = require("firebase")

async function getLongUrl(data){
    const shortenedCode = data.code
    const dataBasePath = firebase.firestore().collection('urls')
    console.log("shortened code",shortenedCode)
    try{
    dataBasePath.doc(shortenedCode).get().then((doc)=>{
        //console.log(doc.data())
        if(doc.data()){
            //console.log("doc data",doc.data())
            return doc.data().longUrl
        }
        
    })
        
        
        
    }catch(error){
        console.log(error)
        return null
    }
    
    
}

module.exports=getLongUrl