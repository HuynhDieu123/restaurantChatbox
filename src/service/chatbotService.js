require('dotenv').config();
import request from "request"

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const IMAGE_GET_STARTED = 'http://bit.ly/dieu-bot1';
const IMAGE_MAIN_MENU_2 = 'http://bit.ly/dieu-bot-2';
const IMAGE_MAIN_MENU_3 = 'http://bit.ly/eric-bot-3';
const IMAGE_MAIN_MENU_4 = 'http://bit.ly/eric-bot-4';
const IMAGE_VIEW_APPETIZERS = 'http://bit.ly/eric-bot-5';
const IMAGE_VIEW_FISH = 'http://bit.ly/eric-bot-6';
const IMAGE_VIEW_MEAT = 'http://bit.ly/eric-bot-7';

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

let getUserName = (sender_psid) => {
    // Send the HTTP request to the Messenger Platform
    return new Promise((resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                body = JSON.parse(body);
                console.log(body);
                let username = `${body.last_name} ${body.first_name}`;
                resolve(username);
            } else {
                console.error("Unable to send message:" + err);
            }
        });

    })
}

let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid);
            let response1 = { "text": `Xin chào mừng bạn ${username} đến với nhà hàng của Điều` }
            let response2 = getStartedTemplate();

            //send text message
            await callSendAPI(response1, sender_psid);

            //send generic tamplate message
            await callSendAPI(response2, sender_psid)

            resolve('done');
        } catch (e) {
            reject(e)
        }
    })
}

let getStartedTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Nhà hàng Điều kính chào quý khách",
                    "subtitle": "Dưới đây là các lựa chọn của nhà hàng.",
                    "image_url": IMAGE_GET_STARTED,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "MENU CHÍNH",
                            "payload": "MAIN_MENU",
                        },
                        {
                            "type": "postback",
                            "title": "ĐẶT BÀN",
                            "payload": "RESERVE_TABLE",
                        },
                        {
                            "type": "postback",
                            "title": "HƯỚNG DẪN SỬ DỤNG BOT",
                            "payload": "GUIDE_TO_USE",
                        }
                    ],
                }]
            }
        }
    }
    return response;
}

let handleSendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getMainMenuTemplate();
            //send text message
            await callSendAPI(response1, sender_psid);

            resolve('done');
        } catch (e) {
            reject(e)
        }
    })

}

let getMainMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Menu của nhà hàng",
                        "subtitle": "Chúng tôi hân hạnh mang đến cho bạn thực đơn phong phú cho bữa trưa hoặc bữa tối",
                        "image_url": IMAGE_MAIN_MENU_2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BỮA TRƯA",
                                "payload": "LUNCH_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "BỮA TỐI",
                                "payload": "DINNER_MENU",
                            }
                        ],
                    },
                    {
                        "title": "Giờ mở cửa",
                        "subtitle": "T2-T6 10AM - 11PM | T7 5PM - 10PM | CN 5PM - 9PM",
                        "image_url": IMAGE_MAIN_MENU_3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "ĐẶT BÀN",
                                "payload": "RESERVE_TABLE",
                            }
                        ],
                    },
                    {
                        "title": "Không gian nhà hàng",
                        "subtitle": "Nhà hàng có sức chứa lên đến 300 khách hàng và phục vụ bữa tiệc lớn",
                        "image_url": IMAGE_MAIN_MENU_4,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CHI TIẾT",
                                "payload": "SHOW_ROOMS",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response;
}

let handleSendLunchMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getLunchMenuTemplate();
            //send text message
            await callSendAPI(response1, sender_psid);

            resolve('done');
        } catch (e) {
            reject(e)
        }
    })
}

let getLunchMenuTemplate = () => {

    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Món tráng miệng",
                        "subtitle": "Nhà hàng có nhiều món tráng miệng hấp dẫn",
                        "image_url": IMAGE_VIEW_APPETIZERS,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_APPETIZERS",
                            }
                        ],
                    },
                    {
                        "title": "Cá",
                        "subtitle": "Thủy sản và hải sản",
                        "image_url": IMAGE_VIEW_FISH,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_FISH",
                            }
                        ],
                    },
                    {
                        "title": "Thịt hun khói",
                        "subtitle": "Chất lượng hàng đầu",
                        "image_url": IMAGE_VIEW_MEAT,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_MEAT",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response;

}

let handleSendDinnerMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getDinnerMenuTemplate();
            //send text message
            await callSendAPI(response1, sender_psid);

            resolve('done');
        } catch (e) {
            reject(e)
        }
    })
}

let getDinnerMenuTemplate = () => {

    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Menu của nhà hàng",
                        "subtitle": "Chúng tôi hân hạnh mang đến cho bạn thực đơn phong phú cho bữa trưa hoặc bữa tối",
                        "image_url": IMAGE_MAIN_MENU_2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BỮA TRƯA",
                                "payload": "LUNCH_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "BỮA TỐI",
                                "payload": "DINNER_MENU",
                            }
                        ],
                    },
                    {
                        "title": "Giờ mở cửa",
                        "subtitle": "T2-T6 10AM - 11PM | T7 5PM - 10PM | CN 5PM - 9PM",
                        "image_url": IMAGE_MAIN_MENU_3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "ĐẶT BÀN",
                                "payload": "RESERVE_TABLE",
                            }
                        ],
                    },
                    {
                        "title": "Không gian nhà hàng",
                        "subtitle": "Nhà hàng có sức chứa lên đến 300 khách hàng và phục vụ bữa tiệc lớn",
                        "image_url": IMAGE_MAIN_MENU_4,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CHI TIẾT",
                                "payload": "SHOW_ROOMS",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response;

}

module.exports = {
    handleGetStarted: handleGetStarted,
    handleSendMainMenu: handleSendMainMenu,
    handleSendLunchMenu: handleSendLunchMenu,
    handleSendDinnerMenu: handleSendDinnerMenu
}