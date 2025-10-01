// Copy this file to environment.ts and environment.prod.ts and update with your AWS credentials

export const environment = {
  production: false, // Set to true for production
  apiUrl: 'https://your-api-gateway-url.execute-api.your-region.amazonaws.com/dev',
  cognito: {
    userPoolId: 'your-region_YourPoolId',
    userPoolWebClientId: 'your-client-id-here',
    region: 'your-region', // e.g., 'us-east-1', 'sa-east-1'
    domain: 'your-cognito-domain.auth.your-region.amazoncognito.com',
    clientId: 'your-client-id-here'
  }
};
