const { VertexAiClient } = require('@google-cloud/vertex-ai');
const auth = require('google-auth-library');

// Initialize the Vertex AI client.
async function initVertexAiClient() {
  const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com', // Use the appropriate API endpoint
  };

  const authClient = new auth.GoogleAuth(clientOptions);
  const authClientInstance = await authClient.getClient();

  const vertexAiClient = new VertexAiClient({
    auth: authClientInstance,
  });

  return vertexAiClient;
}

// Make a prediction request to the Vertex AI model.
async function predict(projectId, location, endpointId, instance) {
  const vertexAiClient = await initVertexAiClient();

  const request = {
    endpoint: `projects/${projectId}/locations/${location}/endpoints/${endpointId}`,
    instances: [instance],
  };

  const [response] = await vertexAiClient.predict(request);
  return response;
}

// Example usage:
const projectId = 'it-services-group-svc-monitor';
const location = 'asia-south1'; // or your endpoint's location
const endpointId = 'your-endpoint-id';
const userInput = 'Hello, how are you?'; // Example user input

predict(projectId, location, endpointId, userInput)
  .then(response => {
    console.log('Prediction response:', response);
  })
  .catch(error => {
    console.error('Error during prediction:', error);
  });