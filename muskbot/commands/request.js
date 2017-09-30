
exports.run = (client, message, args) => {
  if (!args[0]) {
    return message.reply("you must specify troops to Request");
  } else {
    var troops = args.join(" ");
    var cT = checkClan(message.group.id);

    if (cT) {
      notify(`${message.author.username} has requested ${troops}`, cT);
    } else {
      return message.reply("There is no clan linked to group please use the claim command");
    }
  }
}

exports.description = "Request troops `Request Bowlers`";