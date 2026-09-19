const restify = require('restify');
const { CloudAdapter, ConfigurationBotFrameworkAuthentication } = require('botbuilder');
require('dotenv').config();

// Create HTTP server
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.listen(process.env.port || process.env.PORT || 3978, function () {
    printServerInfo();
});

function printServerInfo() {
    console.log(`\n${ server.name } listening to ${ server.url }`);
    console.log(`\nGet Bot Framework Emulator: https://aka.ms/bot-framework-emulator`);
}

// FIX: Use ConfigurationBotFrameworkAuthentication for CloudAdapter
const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(process.env);
const adapter = new CloudAdapter(botFrameworkAuthentication);

// Catch-all for errors
const onTurnErrorHandler = async (context, error) => {
    console.error(`\n [onTurnError] unhandled error: ${ error }`);
    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );
    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

adapter.onTurnError = onTurnErrorHandler;

// Listen for incoming requests to /api/messages
server.post('/api/messages', async (req, res) => {
    await adapter.process(req, res, async (context) => {
        // Logic: Jo user likhega, bot wahi wapas bhejega (Echo)
        if (context.activity.type === 'message') {
            const text = context.activity.text;
            await context.sendActivity(`Aapne kaha: ${ text }`);
        }
    });
});