
const moment = require('moment');
exports.run = (client, message, args) => {
  var clanTag = checkClan(message.group.id);
  if (!clanTag) return message.reply('No clan claimed in this group\nPlease claim a clan "claim #ClanTag"')
  var WarData = Storage.getItemSync(clanData[clanTag].warId)
  if (!WarData) return message.reply(`I don\'t appear to have any war data for ${clanTag}\nPlease public the WarLog or I might still be fetching the data.`)
 
  var warCalls = Storage.getItemSync(`${clanData[clanTag].warId}warCalls`);
    
    let number = args[0]
  
    let userArgs = args.map((arg, index) => {
      if (index != 0) return arg
    });
    
    let user = userArgs.join(" ");

  
    if (WarData.stats.state == "warEnded" || !WarData) return message.reply("There is no war to be calling oponents");
  
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
      if (call[0] == message.author.username)
      {
        message.reply(`${number} is already taken by you`)
      }
      if (call[0] != "empty" && call[0] !=" hide")
      {
        message.reply(`That bases is taken by ${call[0]}`)
      }
    if(call[0] === "empty") {
      if (!clanData[clanTag].userData) clanData[clanTag].userData = {};
      if (!clanData[clanTag].userData[message.author.id]) {
        clanData[clanTag].userData[message.author.id] = {calls:0}
      } else {
  
      }
      if (clanData[clanTag].userData[message.author.id].calls >=2) {
        message.reply("You have already called 2 spots cancel one before calling another");
      } else {
        if (user) {
          
          warCalls[number] = `${user}//${message.author.id}//${new Date().getTime()}`;
          Storage.setItemSync(`${clanData[clanTag].warId}warCalls`, warCalls);
          clanData[clanTag].userData[message.author.id].calls++
          
  
          list(clanTag, (list) => {
            message.reply(`${Head}\n\n${message.author.username} has called ${number} for${user}\n\n${list}\nUse list appropriately`);
          })
          
        } else {
          
          warCalls[number] = `${message.author.username}//${message.author.id}//${new Date().getTime()}`;
          Storage.setItemSync(`${clanData[clanTag].warId}warCalls`, warCalls);
          clanData[clanTag].userData[message.author.id].calls++
  
          list(clanTag, (list) => {
            message.reply(`${Head}\n\n${message.author.username} has called ${number}\n\n${list}\nUse list appropriately`);
          })
          
        }
      }
  
    } else if (call[0] === "hide") {
      message.reply("This spot has been 3 starred")
    } else if (call[1] !== message.author.id) {
      message.reply(`${number} is taken by ${call[0]}`);
    }
  }
  