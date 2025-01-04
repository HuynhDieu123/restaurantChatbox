require('dotenv').config();
import request from "request"

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
        console.log("body: ", body);
        if (!err) {
            console.log(`Message sent! Status Code: ${res.statusCode}`);
            console.log("Response body:", body);
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

let getUserName = async (sender_psid) => {
    let username = '';

    // Send the HTTP request to the Messenger Platform
    await request({
        "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
    }, (err, res, body) => {
        if (!err) {
            response = JSON.parse(res);
            username = `${response.first_name} ${response.last_name}`;
        } else {
            console.error("Unable to send message:" + err);
        }
    });
    return username;
}

let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid);
            let response = { "text": `Xin chào mừng bạn ${username} đến với nhà hàng của Điều` }
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