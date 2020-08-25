const express = require('express');
const app = express();
const fs = require('fs');

app.use('*', async (req,res,next) => {
    let f = await isFile(require('path').join(__dirname, 'build', req.originalUrl));
    console.log(require('path').join(__dirname, 'build', req.originalUrl));
    console.log(f);
    if(!f) return res.status(200).sendFile(require('path').join(__dirname, 'build', 'index.html'))
    else return res.status(200).sendFile(require('path').join(__dirname, 'build', req.originalUrl))
})

async function isFile(path){
    try{
        
        return fs.readFileSync(path); ;
    }catch(e){
        return false;
    }
}

app.listen(8080, () => {
    console.log('Started!')
})