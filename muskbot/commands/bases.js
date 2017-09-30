
const moment = require('moment');
exports.run = (client, message, args) => {
  let clanTag = checkClan(message.group.id);
  if (!clanTag) return message.reply('No clan claimed in this group\nPlease claim a clan "claim #ClanTag"')
  let WarData = Storage.getItemSync(clanData[clanTag].warId)
  if (!WarData) return message.reply(`I don\'t appear to have any war data for ${clanTag}\nPlease public the WarLog or I might still be fetching the data.`)
 
  list(message.group.id, (list) => {
    
    
        
        var warT = '';
        if (WarData.stats.state === 'preparation') {
          warT = 'War starts ' + moment(WarData.stats.startTime).fromNow()
        } else if (WarData.stats.state === 'inWar') {
          warT = 'War ends ' + moment(WarData.stats.endTime).fromNow()
        } else if (WarData.stats.state === 'warEnded') {
        warT = 'War ended ' + moment(WarData.stats.endTime).fromNow()
        }
        var Head = `${WarData.stats.clan.name} vs ${WarData.stats.opponent.name}\n\n            Stars: ${WarData.stats.clan.stars} vs ${WarData.stats.opponent.stars}\n   Percentage: ${WarData.stats.clan.destructionPercentage.toFixed(2)}% vs ${WarData.stats.opponent.destructionPercentage.toFixed(2)}%\n  Timer: ${warT}\n            Attacks: ${WarData.stats.clan.attacks} vs ${WarData.stats.opponent.attacks}\n            3 Stars: ${WarData.stats.clan.threeStars} vs ${WarData.stats.opponent.threeStars}          \n            War Size: ${WarData.stats.clan.memberCount} vs ${WarData.stats.opponent.memberCount}`;
      
    message.reply(`${Head}\n\n${list}\nUse list appropriately`);
  })
  
}
