module.exports = {
    name: "removemoney",
    aliases: ["rm"],
    category: "economy",
    exp: 5,
    react: "✅",
    description: "Removes money from mentioned user's wallet",
    usage: "[mention] [amount]",
    async execute(client, arg, M) {
      const mentionedUser = M.mentions[0];
      const amountToRemove = parseInt(arg[1]);
  
      if (!mentionedUser || !amountToRemove || isNaN(amountToRemove) || amountToRemove <= 0) {
        return M.reply("Invalid usage. Please use the command like this:\n\n`!removemoney [mention] [amount]`");
      }
  
      const currentBalance = await client.cradit.get(`${mentionedUser}.wallet`) || 0;
  
      if (currentBalance < amountToRemove) {
        return M.reply(`${(await client.contact.getContact(mentionedUser, client)).username}'s wallet balance is insufficient.`);
      }
  
      const newBalance = currentBalance - amountToRemove;
  
      await client.cradit.set(`${mentionedUser}.wallet`, newBalance);
  
      M.reply(`${(await client.contact.getContact(mentionedUser, client)).username}'s wallet has been updated. New balance: ${newBalance}`);
    }
  };
  
