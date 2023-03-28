// const { urlencoded } = require('body-parser');
const express = require('express');
const { send_message } = require('./sms');
const axios = require('axios');

const app = express();

require("dotenv").config();

app.use(express.json())

app.post('/sms', async( req, res) => {
    try {
    console.log(req.body)
    const { phoneNumber } = req.body;

    const send = await send_message("ㅁㄴㅇㄴㅁㅇ", "하이", phoneNumber)

    return res.send(send)
    } catch (err) {
        console.log(err)
        return err;
    }
})

app.listen(3000, () => {
    console.log(`App Started 3000`)
})