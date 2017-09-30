var config = require('../config')
var funcs = require('../util/functions.js');

exports.run = (client, message, args) => {
  let clanTag = checkClan(message.group.id);

  if (clanTag) {
    if (clanData[clanTag].updateInterval !== "accessDenied") {
      message.reply("Data flow is fine no need to refresh");
    } else {
      message.reply("Force Requesting Data now!");

      clanData[clanTag].updateInterval = setInterval(function() {
        funcs.getCurrentWar(clanTag)
      }, 1000 * config.updateInterval);
      
      funcs.getCurrentWar(clanTag);
    }
  } else {
    message.reply("Theres no clan linked to this group");
  }
}

