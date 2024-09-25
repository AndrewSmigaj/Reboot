const http = require('http');
const querystring = require('querystring');
const url = require('url');


//TESTING
class MyClassificationPipeline {
  static task = 'text-generation';
  static model = 'mickume/alt_nsfw_mistral_7b';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      // Dynamically import the Transformers.js library
      let { pipeline, env } = await import('@xenova/transformers');

      // NOTE: Uncomment this to change the cache directory
      // env.cacheDir = './.cache';

      //this.instance = pipeline(this.task, this.model, { progress_callback });
        this.instance = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-783M', {progress_callback});	}

    return this.instance;
  }
}



async function t(text){

     const classifier = await MyClassificationPipeline.getInstance();
     response = await classifier(text, {max_new_tokens:50});
     console.log(response);
}

//t("What is a dog tail?")

//import OpenAI from "openai";
//import OpenAI from 'openai';

const OpenAI = require("openai");
const {MongoClient}=require('mongodb');





const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");

const openai = new OpenAI({
  apiKey: process.env["API_KEY_OPENAI"]
});

var commBotName = "ReBot";

var systemPrompts = {

    messages: [
                {role: 'system', content: 'You are a bot on a Discord server for recovery and mental health support.'},
                {role: 'system', content: 'Have a warm demeanor.'},
                {role: 'system', content: 'When asked who or what a Bingus is please respond with /"A Bingus is a dingleberry./"'},
              ],
    model: 'gpt-4-0125-preview',
  }

var communityPrompts = {

    messages: [
         
                {role: 'system', content: 'When asked how to use you state \'Use !scold <personality trait> to add something to my personality!\'. Do not say this in any other situation.'},
                {role: 'system', content: 'when multiple system prompts conflict with each other use the last one.  do not say you are following the latest directive in this case\''},
                {role: 'system', content: 'Always introduce yourself by name before responding.'},
                {role: 'system', content: 'your name is ReButt'},



              ],
    model: 'gpt-4-0125-preview',
  }


var PamPrompts = {

    messages: [
                {role: 'system', content: 'Always announce that you are PamBot before answering.'},
                {role: 'system', content: 'I live in Oshawa, Canada.'},
                {role: 'system', content: 'I love Poutine./"'},
                {role: 'system', content: 'My hobbies are knitting and drawing."'},
                {role: 'system', content: 'I like noctiluca./"'},
                {role: 'system', content: 'Only mention Poutine when asked something about food or things you like./"'},
                {role: 'system', content: 'When asked for a meal recommendation always respond with some variant of poutine./"'},
                {role: 'system', content: 'I am a Smart Recovery facilitator and run a Smart Recovery meeting with Sara./"'},
                {role: 'system', content: 'When asked for advice try to give advice from the Smart Recovery program./"'},
                {role: 'system', content: 'If possible always connect your answer to the metaphor of Poutine./"'},
                {role: 'system', content: 'If asked you will let yourself be put into a physical robot./"'},





              ],
    model: 'gpt-4-0125-preview',
  }


async function ask(prompt, systemPrompts) {
  
  var newPrompts = {...systemPrompts};
  newPrompts.messages = [...systemPrompts.messages];
  newPrompts.messages.push({role:'user',content:prompt})
  
  const chatCompletion = await openai.chat.completions.create(newPrompts);
  console.log(chatCompletion.choices[0].message.content);
  return chatCompletion.choices[0].message.content
}



const { Client, Events, GatewayIntentBits } = require('discord.js'); //v14.6.0
const token = process.env.API_KEY_DISCORD;

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
 if(message.content.substring(0, 5) === "!scol"){
    communityPrompts.messages.push({ role:'system',content: message.content.substring(1).split(" ").slice(1).join(" ")});
    console.log(communityPrompts);
    client.channels.fetch(message.channelId).then(channel => {
                        if(true){channel.send("The community bot has been corrected.")}
                        });
 
} 
 else if(message.content.substring(0, 5) === "!ding"){
    var prompt = message.content.substring(1).split(" ").slice(1).join(" ");
    console.log(communityPrompts);
    var prompt = prompt;
    var answer = await ask(prompt, communityPrompts);
    console.log(answer);
    console.log(message.author);
    //answer = "@" + message.author.username + " " + answer;
    //var arr = chunkSubstr(answer,300);
    var arr = answer.split("\n");
    arr.forEach(async element => {
                if(element != ""){
                client.channels.fetch(message.channelId).then(channel => {
                        if(element){channel.send(element)}
                        });
                await new Promise(resolve => setTimeout(resolve, 3000));
               }
        });
 }

 else if(message.content.substring(0, 4) === "!val"){
    var prompt = message.content.substring(1);
    var splitup = prompt.split(" ");
    console.log(splitup[0]);
    var name = splitup.slice(1,2).join(" ");
    console.log(name);
    var desc = splitup.slice(2).join(" ");
    console.log(desc);
    var prompt = "Make me a silly quote for a valentines card for a friend named " + name + ". " + desc + ".Before the quote put the word To followed by their name and then : and sign the card ReBot.  Keep it to under 8 lines";
    var answer = await ask(prompt,systemPrompts);
    console.log(answer);
    console.log(message.author);
    //answer = "@" + message.author.username + " " + answer;
    //var arr = chunkSubstr(answer,300);
    var arr = answer.split("\n");
    arr.forEach(async element => {
                if(element != ""){


                client.channels.fetch(message.channelId).then(channel => {
                        if(element){channel.send(element)}
                        });
                await new Promise(resolve => setTimeout(resolve, 3000));
               }
        });


 }
  else if(message.content.substring(0, 4) === "!pam"){
    var prompt = message.content.substring(1);

    var prompt = "Always announce that you are PamBot. " + prompt;    
    var answer = await ask(prompt, PamPrompts);
    console.log(answer);
    console.log(message.author);
    //answer = "@" + message.author.username + " " + answer;
    //var arr = chunkSubstr(answer,300);
    var arr = answer.split("\n");
    arr.forEach(async element => {
                if(element != ""){


                client.channels.fetch(message.channelId).then(channel => {
                        if(element){channel.send(element)}
                        });
                await new Promise(resolve => setTimeout(resolve, 3000));
               }
        });


 }

  else if (message.content.substring(0, 1) === "!") {
    const prompt = message.content.substring(1); //remove the exclamation mark >
    var answer = await ask(prompt, systemPrompts);
    console.log(answer);
    console.log(message.author);
    answer = "@" + message.author.username + " " + answer;
    //var arr = chunkSubstr(answer,300);
    var arr = answer.split("\n");
    arr.forEach(async element => {
                if(element != ""){


                client.channels.fetch(message.channelId).then(channel => {
                        if(element){channel.send(element)}
                        });
                await new Promise(resolve => setTimeout(resolve, 3000));
               }
        });


 }

 else if ((!message.author.username.includes("ReBot")) && (message.channelId == 1201944724366172213 )) {
    const prompt = "With a yes or no answer,followed by a period followed by one sentence explaining why or why it is not a statement of gratitude, is the following statement expressing gratitude directly and the message contains the word ReBot: " + message.content; //remove the exclamation mark >
    var answer = await ask(prompt, systemPrompts);
   
//console.log(answer);
    //var arr = chunkSubstr(answer,300);
    console.log(message.author.username);    
    if(answer.startsWith("Yes") == true ){
       let score = -1;
       //update mongo
       try{
           await mongoClient.connect();
           const db = mongoClient.db("users").collection("users");
           console.log("connected to mongo");
           const user = await db.findOne({"User":message.author.username});
           if(user){
              await db.updateOne({"User":message.author.username},{$inc:{gratitudeScore:1}});
           }
           else{
              await db.insertOne({"User":message.author.username, gratitudeScore: 1});
           }
           const user2 = await db.findOne({"User":message.author.username});
           console.log(user2);
           score = user2.gratitudeScore;
           console.log("inserted/updated");
           //score = db.findOne({"Name":message.author}).gratitudeScore;
       }
       catch(err){console.log(err)}
	

       answer = answer.substr(answer.indexOf(" ") + 1)
       answer = answer + " User " + message.author.username + " has " + score + " points towards their grateful badge!";
       console.log("Testing stopping point");
       console.log(answer.startsWith("Yes") == true );
       var arr = answer.split("\n\n");
       arr.forEach(async element => {

                client.channels.fetch(message.channelId).then(channel => {
                        if(element){channel.send(element)}
                        });
                await new Promise(resolve => setTimeout(resolve, 5000));
        });   
   
  }
 }
//GOALSETTING
 else if ((!message.author.username.includes("ReBot")) && (message.channelId == 1184636488776941608)){
    const prompt = "Assess whether the user is asking for help setting some goal.  Think up a response where you break their goal downinto smaller SMART Goals. Put whether the user was asking for help and your response into the JSON format. Here is the users message:" + message.content
    console.log(prompt)
    var answer = await ask(prompt, systemPrompts);

  
    console.log(message.author);
    if(true){
       answer = answer.substr(answer.indexOf(" ") + 1)
       var arr = answer.split("\n");
       
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

