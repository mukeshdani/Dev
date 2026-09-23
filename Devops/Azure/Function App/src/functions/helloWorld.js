const { app } = require('@azure/functions');

app.http('helloWorld', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous', // Isse aap direct URL se test kar payenge bina kisi key ke
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        // URL query parameter ya request body se 'name' read karega
        const name = request.query.get('name') || await request.text() || 'Friend';

        return { body: `Hello, ${name}! Your Azure Function node.js app is working fine.` };
    }
});
