const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = 'API TOKEN COMES HERE';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

function randomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp+" dogo ");
});

// The GAME
let nombre = randomInt(0, 100);
bot.onText(/\d+/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  console.log(nombre);
  const chatId = msg.chat.id;
  const essai = match[0]; // the captured "whatever"

  if (essai == nombre){
    bot.sendMessage(chatId, '💰');
  }

  if (essai > nombre) {
    bot.sendMessage(chatId, essai+" trop grand essaies encore ")
  }

  if (essai < nombre) {
    bot.sendMessage(chatId, essai+" trop petit essaies encore ")
  }
  // send back the matched "whatever" to the chat
});

// Matches /photo
bot.onText(/\/photo/, function onPhotoText(msg) {
  // From file path
  const photo = `${__dirname}/../test/data/photo.gif`;
  bot.sendPhoto(msg.chat.id, photo, {
    caption: "I'm a bot!"
  });
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
