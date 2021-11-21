const crypto = require('crypto');

function idToShortURL(n)
{
 
    // Map to store 62 possible characters
    let map = "abcdefghijklmnopqrstuvwxyzABCDEF"
    "GHIJKLMNOPQRSTUVWXYZ0123456789";
 
    let shorturl = [];
 
    // Convert given integer id to a base 62 number
    while (n)
    {
        // use above map to store actual character
        // in short url
        shorturl.push(map[n % 62]);
        n = Math.floor(n / 62);
    }
 
    // Reverse shortURL to complete base conversion
    shorturl.reverse();
 
    return shorturl.join("");
}

 function generateShortUrl(longUrl,start,end){
     console.log("LongUrl",longUrl)
    const hash = crypto.createHash("md5").update(longUrl).digest('hex')
    return hash.toString().slice(start,end)
}
module.exports = generateShortUrl