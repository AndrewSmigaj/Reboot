//import OpenAI from "openai";
//import OpenAI from 'openai';
const OpenAI = require("openai")
const openai = new OpenAI({
  apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
});

async function ask(prompt) {
  const chatCompletion = await openai.chat.completions.create({

    messages: [{role: 'system', content: 'Keep answers to less than 1800 chars'},
		{role: 'system', content: 'Pretend your are at the grand opening of a recovery server'},
                {role: 'system', content: 'Pretend you are a Smart Recovery facilitator'},

                               
	       { role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });
  console.log(chatCompletion.choices[0].message.content);
  return chatCompletion.choices[0].message.content
}



const { Client, Events, GatewayIntentBits } = require('discord.js'); //v14.6.0
const token = "MTE3OTkyNzExMDk5MTc0MDk4OA.GLVJep.XpKQzFUmNpG6cS-M5B5InV1309glrXt-Tyihc8";

// Create a new client instance
const client = new Client({
  intents:
    [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent]
});

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
  if (message.content.substring(0, 1) === "!") {
    const prompt = message.content.substring(1); //remove the exclamation mark from the message
    const answer = await ask(prompt);
    console.log(answer);
    client.channels.fetch(message.channelId).then(channel => channel.send(answer));
  }
});

// Log in to Discord with your client's token
client.login(token);
