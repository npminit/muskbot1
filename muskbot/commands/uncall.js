

const moment = require('moment');
exports.run = (client, message, args) => {
  let clanTag = checkClan(message.group.id);
  if (!clanTag) return message.reply('No clan claimed in this group\nPlease claim a clan "claim #ClanTag"')
  let WarData = Storage.getItemSync(clanData[clanTag].warId)
  if (!WarData) return message.reply(`I don\'t appear to have any war data for ${clanTag}\nPlease public the WarLog or I might still be fetching the data.`)

  var number = args[0];

  var user = args[1];


  
  var warCalls = Storage.getItemSync(`${clanData[clanTag].warId}warCalls`);

  if (WarData.stats.state == "warEnded" || !WarData) return message.reply("There is no war to be cancelling calls");

  if (number < 1 || number > WarData.stats.opponent.memberCount) {
    return message.reply(`Opponent bases are only between 1 and ${WarData.stats.opponent.memberCount}`);
  }
  var warT = '';
  if (WarData.stats.state === 'preparation') {
    warT = 'War starts ' + moment(WarData.stats.startTime).fromNow()
  } else if (WarData.stats.state === 'inWar') {
    warT = 'War ends ' + moment(WarData.stats.endTime).fromNow()
  } else if (WarData.stats.state === 'warEnded') {
  warT = 'War ended ' + moment(WarData.stats.endTime).fromNow()
  }
  var Head = `${WarData.stats.clan.name} vs ${WarData.stats.opponent.name}\n\n            Stars: ${WarData.stats.clan.stars} vs ${WarData.stats.opponent.stars}\n   Percentage: ${WarData.stats.clan.destructionPercentage.toFixed(2)}% vs ${WarData.stats.opponent.destructionPercentage.toFixed(2)}%\n  Timer: ${warT}\n            Attacks: ${WarData.stats.clan.attacks} vs ${WarData.stats.opponent.attacks}\n            3 Stars: ${WarData.stats.clan.threeStars} vs ${WarData.stats.opponent.threeStars}          \n            War Size: ${WarData.stats.clan.memberCount} vs ${WarData.stats.opponent.memberCount}`;

  var call = warCalls[number].split('//')

  if(call[0] === "empty" ){
    message.reply(`That spot isn\'t called yet`);
  } else if (call[0] === "hide") {
    message.reply("This spot has been 3 Starred")
  } else if (call[1] !== message.author.id) {
    message.reply("You can\'t cancel someone else\'s call wait till it expires or ask them to cancel");
  } else {
    warCalls[number] = "empty";
    clanData[clanTag].userData[message.author.id].calls -= 1;
    Storage.setItemSync(`${clanData[clanTag].warId}warCalls`, warCalls);

    list(message.group.id, (list) => {
      message.reply(`${Head}\n\n${number} has been canceled\n\n${list}\nUse list appropriately`);
    })
  }
}

