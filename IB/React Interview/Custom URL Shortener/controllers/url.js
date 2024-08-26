const shortid = require('shortid');
const URL = require('../models/url')

async function handleGenerateNewShortURL(req , res){
    const body  = req.body;
    if(!body){
        return res.status(400).json({error: 'url is required'})
    }
   const ShortId = shortid();

   await URL.create({
    shortId: ShortId,
    redirectURL: body.url,
    visitHistory  : [],
   })

   return res.json({id: ShortId})
}

module.exports={
    handleGenerateNewShortURL
}