require('dotenv').config();
import { response } from "express";
import requests from "request"

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let callSendAPI = (response, sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log(`Message sent! Status Code: ${res.statusCode}`);
            console.log("Response body:", body);
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            response = { "text": "Xin chào mừng bạn đến với nhà hàng của Điều" }
            await callSendAPI(response, sender_psid);
            resolve('done');
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleGetStarted: handleGetStarted
}