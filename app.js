const express = require('express');

const app = express();

require("dotenv").config();

app.post('/sms', async( req, res) => {
    const { phoneNumber } = req.body;

    const date = Date.now().toString();
    const uri = process.env.SERVICE_ID; //서비스 ID
    const secretKey = process.env.NCP_SECRET_KEY;// Secret Key
    const accessKey = process.env.NCP_ACCESS_KEY;//Access Key
})

app.listen(3000, () => {
    console.log(`App Started 3000`)
})