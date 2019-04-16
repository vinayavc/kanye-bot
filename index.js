const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token:'xoxb-612678062342-613070183830-ps0dAQazSBZ5pmWQcS9Afyvn',
    name: 'kanyebot'
});

//start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':alien:'
    };

    bot.postMessageToChannel('general', 
    'kanye bot chaloooo', 
    params);
});

bot.on('error',(err) => console.log(err));

bot.on('message', (data) => {
    if (data.type !== 'message') {
        return;
    }
    handleData(data.text);
});

//parse message from user
function handleData(txt) {
    if(txt.includes(' kanye')) {
        kanyeQuote();
    }
};

function kanyeQuote() {
    axios.get('https://api.kanye.rest')
        .then(res => {
            const quote = res.data.quote;

            const params = {
                icon_emoji: ':laughing:'
            };
        
            bot.postMessageToChannel('general', 
            `Kanye West: ${quote}`, 
            params);
        });
};