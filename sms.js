const CryptoJS = require('crypto-js')
const request = require('request');

// exports.send_message = (phone) => {
//     var user_phone_number = phone;//수신 전화번호 기입
//     var resultCode = 404;
//     const date = Date.now().toString();
//     const uri = process.env.SERVICE_ID; //서비스 ID
//     const secretKey = process.env.NCP_SECRET_KEY;// Secret Key
//     const accessKey = process.env.NCP_ACCESS_KEY;//Access Key
//     const method = "POST";
//     const space = " ";
//     const newLine = "\n";
//     const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
//     const url2 = `/sms/v2/services/${uri}/messages`;
//     const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
//     hmac.update(method);
//     hmac.update(space);
//     hmac.update(url2);
//     hmac.update(newLine);
//     hmac.update(date);
//     hmac.update(newLine);
//     hmac.update(accessKey);
//     const hash = hmac.finalize();
//     const signature = hash.toString(CryptoJS.enc.Base64);
//     request({
//       method: method,
//       json: true,
//       uri: url,
//       headers: {
//         "Contenc-type": "application/json; charset=utf-8",
//         "x-ncp-iam-access-key": accessKey,
//         "x-ncp-apigw-timestamp": date,
//         "x-ncp-apigw-signature-v2": signature,
//       },
//       body: {
//         type: "SMS",
//         countryCode: "82",
//         from: "010-4138-2371",
//         content: "안녕",
//         messages: [
//           { to: `${user_phone_number}`, },],
//       },
//     },
//       function (err, res, html) {
//         if (err) console.log(err);
//         else { resultCode = 200; console.log(html); }
//       }
//     );
//     return resultCode;
//   }

exports.send_message = async (coin_name, nickname, phone) => {
    try {
	
    // 예약자 번호, 닉네임, 코인이름
    const user_phone_number = phone;
    const user_nickname = nickname;
    const user_coin_name = coin_name;
    
    // 모듈들을 불러오기. 오류 코드는 맨 마지막에 삽입 예정
    const finErrCode = 404;
    const axios = require('axios');
    const CryptoJS = require('crypto-js');
    const date = Date.now().toString();
    
    // 환경변수로 저장했던 중요한 정보들
    const serviceId = process.env.SERVICE_ID; 
    const secretKey = process.env.NCP_SECRET_KEY;
    const accessKey = process.env.NCP_ACCESS_KEY;
    const my_number = '01041382371';
    
    // 그 외 url 관련
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    const url2 = `/sms/v2/services/${serviceId}/messages`;
		
        
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

    await axios({
        method: method,
        // request는 uri였지만 axios는 url이다
        url: url,
        headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature,
        },
        // request는 body였지만 axios는 data다
        data: {
            type: "SMS",
            countryCode: "82",
            from: my_number,
            // 원하는 메세지 내용
            content: `${user_nickname}님 ${user_coin_name} 가격 예약을 신청해주셔서 감사합니다.`,
            messages: [
            // 신청자의 전화번호
                { to: `${user_phone_number}`, },],
        },
    }).then(res => {
        // console.log(res.data);
    })
        .catch(err => {
            console.log(err);
        })
    return finErrCode;
    } catch (err) {
        console.log(err)
    }

}