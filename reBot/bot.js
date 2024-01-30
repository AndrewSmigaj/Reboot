//import OpenAI from "openai";
//import OpenAI from 'openai';
const OpenAI = require("openai")
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

async function ask(prompt) {
  const chatCompletion = await openai.chat.completions.create({

    messages: [
		{role: 'system', content: 'You are a bot on a Discord server for recovery and mental health support.'},
                {role: 'system', content: 'Have a warm demeanor.'},
	       { role: 'user', content: prompt }],
    model: 'gpt-4-0125-preview',
  });
  console.log(chatCompletion.choices[0].message.content);
  return chatCompletion.choices[0].message.content
}



const { Client, Events, GatewayIntentBits } = require('discord.js'); //v14.6.0
const token = process.env.DISCORD_KEY;

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
    const prompt = message.content.substring(1); //remove the exclamation mark >
    const answer = await ask(prompt);
    console.log(answer);
    console.log(message.author);
    //var arr = chunkSubstr(answer,300);
    var arr = answer.split("\n");
    arr.forEach(async element => {
                
      		client.channels.fetch(message.channelId).then(channel => {
			if(element){channel.send(element)}
			});
    		await new Promise(resolve => setTimeout(resolve, 6000));
  	});
 }
 else if ((!message.author.username.includes("ReBot")) && (message.channelId == 1198507578758537327 )) {
    const prompt = "With a yes or no answer,followed by one sentence explaining why, is the following statement expressing gratitude: " + message.content; //remove the exclamation mark >
    var answer = await ask(prompt);
//console.log(answer);
    //var arr = chunkSubstr(answer,300);
    console.log(message.author);    
    if(answer.startsWith("Yes") == true ){
       answer = answer.substr(answer.indexOf(" ") + 1)
       console.log("Testing stopping point");
       console.log(answer.startsWith("Yes") == true );
       var arr = answer.split("\n\n");
       arr.unshift("You have expressed gratitude! You get a gratitude updoot. Keep working for that merit badge and a more grateful life.");
       arr.forEach(async element => {

                client.channels.fetch(message.channelId).then(channel => {
                        if(element){channel.send(element)}
                        });
                await new Promise(resolve => setTimeout(resolve, 5000));
        });   
   
  }
 }

 else if ((!message.author.username.includes("ReBot")) && (message.channelId == 1180395908106567741)){
    const prompt = "You are running a goal setting class. Someone states the following: \"" +  message.content + "\" With a Yes or No answer did they report they finished their goal of meditation?  Follow with one sentence explaining why." ;
    var answer = await ask(prompt);
//console.log(answer);
    //var arr = chunkSubstr(answer,300);
    console.log(message.author);
    if(answer.startsWith("Yes") == true ){
       answer = answer.substr(answer.indexOf(" ") + 1)
       console.log("Testing stopping point");
       console.log(answer.startsWith("Yes") == true );
       var arr = answer.split("\n");
       arr.unshift('You have meditated and get one points towards that mindfulness badge!');
       arr.forEach(async element => {

                client.channels.fetch(message.channelId).then(channel => {
                        if(element){channel.send(element)}
                        });
                await new Promise(resolve => setTimeout(resolve, 5000));
        });
     }
   }
  
 });


// Log in to Discord with your client's token
client.login(token);

