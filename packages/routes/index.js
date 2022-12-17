const controllers = require('../controllers');
const express = require('express');
const app = express();
const client=require("../Client/index")
app.use('/app', controllers);
async function signInWithGoogle(res) {
    const { data, error } = await client().client.auth.signInWithOAuth({
      provider: 'google',
    })
    res.send(data)
  }
app.get('/login',(req,res)=>{
    signInWithGoogle(res)
})

module.exports = app;