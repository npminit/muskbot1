const moment = require('moment');
exports.run = (client, group) => {
  var JoinMessage = `A Clan War helper for Line\n(Been announcing Clash of Clans war events since ${moment("2017-08-25T23:13:33-05:00").format("MMM Do YYYY")})\nAdd me as your friend and type 'help'\nThanks for choosing me.`

  group.sendMessage(JoinMessage);
}