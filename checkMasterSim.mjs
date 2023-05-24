import soap from 'soap';
import { exec } from 'child_process'; // node v14 up
import { config, descritp } from './config.mjs';
const realURL = config.realURL,
    privateKey = config.privateKey,
    userid = config.userid,
    SMSheaderSMS = config.SMSheaderSMS,
    SMSsendKey = config.SMSsendKey;
//console.log(privateKey, userid, SMSheaderSMS, SMSsendKey)
async function makeSoapRequest() {
    const newRegCode_exp = Math.floor(1000 + Math.random() * 9000),
        trans_id = "TEST" + newRegCode_exp;
    const data = userid + trans_id + "2057964545";
    const key = await descritp(data, privateKey)
    const requestArgs = {
                'userid': userid,
                'key': key,
                'trans_id': trans_id,
                'verson': ""
    }
    console.log(requestArgs)
    const options = {};
    soap.createClient(realURL, {}, function (err, client) {
        client.checkBalanceSimMaster({msg:requestArgs}, function (err, result) {
            console.log(result);
        });
    });
}
makeSoapRequest();