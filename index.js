const express=require('express');
require('dotenv').config()
const app=express();
app.set('port', process.env.PORT || 5000) 

const { Telegraf } = require('telegraf')
const token=process.env.TOKEN;
const bot = new Telegraf( token)
const User=require('./db');



var level=0;
 
bot.start((ctx) => {
    ctx.reply("What is your name?")
})
var x = 0;
var name;
var college;
var sideproject;
var language;
var frameworks;
var projects;
var confidence;
var git;
bot.on('message', (ctx) => {
    if (x == 0) {
        name = ctx.message.text
        ctx.reply("Which college are you from?")
        x++
    }
    else if (x == 1) {
        college = ctx.message.text
         
        ctx.telegram.sendMessage(ctx.chat.id, ' How did you get to know about SideProjects??',
        {
            reply_markup: {
              inline_keyboard: [
                    [{text: 'Linkdln', callback_data: 'li'},{text: 'Whatsapp Group', callback_data: 'wa'}],
                    [{text: 'Facebook', callback_data: 'fa'},{text: 'Friends', callback_data: 'fr'}],
                ]  
            } 
        })
       
        
    }
    
    else if (x == 2) {
        language = ctx.message.text
        
        
        ctx.reply("Do you know any frameworks? Enter them all by seperating them with comma(,).")
        x++
    }
    else if (x == 3) {
        frameworks = ctx.message.text
        ctx.reply("Have you previously done any projects? (Yes or No)")
        x++
    }
    else if (x == 4) {
        projects = ctx.message.text
        ctx.telegram.sendMessage(ctx.chat.id, 'How confident are you about your programming skills?',
        {
            reply_markup: {
              inline_keyboard: [
                    [{text: 'Confident', callback_data: 'con'},{text: 'Confident Enough', callback_data: 'cone'}],
                    [{text: 'Learner', callback_data: 'Le'}],
                ]  
            } 
        })
        x++
    }
    else if (x == 6) {
        git = ctx.message.text
        
        x = 0
        var lang=language.split(',')
        if(lang.length>3)
        {
           level++;
        }
        if(confidence==='Confident'||confidence==='Confident Enough'){
            level++;
        }
        if(projects=='Yes'&&lang.length>6){
            level++;
        }

        
        const user=new User({
             name,
 college,
 sideproject,
 lang,
 frameworks,
 projects,
 confidence,
 git,
 level

        })
        console.log(user)
        user.save()
        ctx.reply(`Pls further communicate with sideproject admin.Happy Coding we think you should join level ${level}` )
    }
})

bot.action('li',(ctx)=>{
   sideproject ="Linkldn"
   ctx.reply("Which programming languages do you know? Enter them all by seperating them with comma(,).")
   x++
     
})

bot.action('fa',(ctx)=>{
    sideproject ="FaceBook"
    ctx.reply("Which programming languages do you know? Enter them all by seperating them with comma(,).")
    
    x++
      
 })


 bot.action('wa',(ctx)=>{
    sideproject ="Whatsapp group"
    ctx.reply("Which programming languages do you know? Enter them all by seperating them with comma(,).")
    x++
      
 })

 bot.action('fr',(ctx)=>{
    sideproject ="Friend"
    ctx.reply("Which programming languages do you know? Enter them all by seperating them with comma(,).")
    x++
      
 })
bot.action('con', (ctx) => {
    confidence = "Confident"
    ctx.reply("Please share your github repository for us to keep a track of your work.")
    x++
})

bot.action('cone', (ctx) => {
    confidence = "Confident Enough"
    ctx.reply("Please share your github repository for us to keep a track of your work.")
    x++
})

bot.action('Le', (ctx) => {
    confidence = "Learner"
    ctx.reply("Please share your github repository for us to keep a track of your work.")
    x++
})

 

bot.launch()

app.listen(app.get('port'), server =>{
    console.info(`Server listen on port ${app.get('port')}`);
})