import soap from 'soap';
import { exec } from 'child_process'; // node v14 up
import { config, descritp } from './config.mjs';
const realURL = config.realURL,
    privateKey = config.privateKey,
    userid = config.userid,
    SMSheaderSMS = config.SMSheaderSMS,
    SMSsendKey = config.SMSsendKey;
const phone = "2057779422";
//console.log(privateKey, userid, SMSheaderSMS, SMSsendKey)
async function makeSoapRequest() {
    const newRegCode_exp = Math.floor(1000 + Math.random() * 9000),
        trans_id = "TEST" + newRegCode_exp;
    const data = userid + trans_id + phone;
    const key = await descritp(data, privateKey)
    const header = {
        msg: {
            'header': {
                'userid': userid,
                'key': key,
                'trans_id': trans_id,
                'verson': ""
            },
            'msisdn': phone
        }
    }
    const options = {};
    soap.createClient(realURL, {}, function (err, client) {
        client.checkBalance(header, function (err, result) {
            console.log(result);
        });
    });
}
makeSoapRequest();