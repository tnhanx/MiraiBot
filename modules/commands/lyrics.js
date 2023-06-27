 module.exports.config = {
    name: "lyrics",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "làm gì có cre",
    description: "tải lời bài hát",
    commandCategory: "tiện ích",
    usages: "[text]",
    cooldowns: 0,
    dependencies: {
        "axios":"",
        "fs-extra":""
    }
 };
module.exports.run = async function({ api, event, args, Currencies, utils }) {
const axios = global.nodemodule['axios'];  
const fs = global.nodemodule["fs-extra"];
if (!args.join("") != " " ){ return api.sendMessage("Bạn phải nhập tên bài hát!!", event.threadID, event.messageID);}
var text = args[0];
    //const res = await axios.get(`https://nguyenmanh.name.vn/api/lyrics?query=${text}&apikey=pNKvedtJ`);
//var a = res.data.result;

  const res = await axios.get(`https://ScrAPI.tuanvudev2.repl.co/lyrics?ten=${text}`);
var a = res.data.lyricsFinder;
return api.sendMessage(`${a}`,event.threadID, event.messageID); 
}