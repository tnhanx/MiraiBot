module.exports.config = {
	name: "leaveNoti",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "",
	description: "Thông báo bot hoặc người rời khỏi nhóm có random gif/ảnh/video",
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};
function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
	const path = join(__dirname, "cache", "leaveGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "leaveGif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}

module.exports.run = async function({ api, event, Users, Threads }) {
   var fullYear = global.client.getTime("fullYear");
  	var getHours = await global.client.getTime("hours");
			var session = `${getHours < 3 ? "đ𝐞̂𝐦 𝐤𝐡𝐮𝐲𝐚" : getHours < 8 ? "𝐛𝐮𝐨̂̉𝐢 𝐬𝐚́𝐧𝐠 𝐬𝐨̛́𝐦" : getHours < 12 ? "𝐛𝐮𝐨̂̉𝐢 𝐭𝐫𝐮̛𝐚" : getHours < 17 ? "𝐛𝐮𝐨̂̉𝐢 𝐜𝐡𝐢𝐞̂̀𝐮" : getHours < 23 ? "𝐛𝐮𝐨̂̉𝐢 𝐭𝐨̂́𝐢" : "đ𝐞̂𝐦 𝐤𝐡𝐮𝐲𝐚"}`
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
	const { join } =  global.nodemodule["path"];
	const { threadID } = event;
  const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY HH:mm:ss");
    var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
     if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
  if (thu == 'Monday') thu = 'Thứ 2'
  if (thu == 'Tuesday') thu = 'Thứ 3'
  if (thu == 'Wednesday') thu = 'Thứ 4'
  if (thu == "Thursday") thu = 'Thứ 5'
  if (thu == 'Friday') thu = 'Thứ 6'
  if (thu == 'Saturday') thu = 'Thứ 7'
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
  const uid = (event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "𝘁𝘂̛̣ 𝘁𝗮𝘆 𝗮̂́𝗻 𝗻𝘂́𝘁 𝗼𝘂𝘁 𝗸𝗵𝗼̉𝗶 𝗻𝗵𝗼́𝗺": "𝘃𝗶̀ 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝘂̛𝗼̛𝗻𝗴 𝘁𝗮́𝗰 𝗻𝗲̂𝗻 𝗯𝗶̣ {author} đ𝗮́ 𝗸𝗵𝗼̉𝗶 𝗻𝗵𝗼́𝗺";
	const path = join(__dirname, "cache", "leaveGif");
	const gifPath = join(path, `leave.mp4`);
	var msg, formPush

	if (existsSync(path)) mkdirSync(path, { recursive: true });

	(typeof data.customLeave == "undefined") ? msg = "[🔰] === 『 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 』 === [🔰]\n━━━━━━━━━━━━━━━━━━\n➝ {author} đã xóa {name} khỏi nhóm.\n➝ 𝗜𝗗 𝗨𝘀𝗲𝗿: {uid}\n➝ 𝗩𝗮̀𝗼 𝗹𝘂́𝗰:  {gio}" : msg = data.customLeave;
   var nameAuthor = await Users.getNameUser(event.author)
	msg = msg.replace(/\{name}/g, name) .replace(/\{type}/g, type).replace(/\{buoi}/g, session).replace(/\{thu}/g, thu).replace(/\{gio}/g, gio).replace(/\{author}/g, nameAuthor).replace(/\{uidAuthor}/g, event.author).replace(/\{uid}/g, uid);

	const randomPath = readdirSync(join(__dirname, "cache", "leaveGif"));

	if (existsSync(gifPath)) formPush = { body: msg, attachment: createReadStream(gifPath) }
	else if (randomPath.lenth != 0) {
		const pathRandom = join(__dirname, "cache", "leaveGif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
		formPush = { body: msg, attachment: createReadStream(pathRandom) }
	}
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
     }
