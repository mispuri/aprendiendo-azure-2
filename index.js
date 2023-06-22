async function run() {
  const config = {
    auth: {
      clientId: 'd05c9eea-16df-49e1-a4f0-ba20a615e77b',
      authority:
        'https://login.microsoftonline.com/eb90a1c4-947e-462d-8072-4cd28077c2ef/',
      //the authority could be: https://login.microsoftonline.com/organizations/ in case of business account
      redirectUri: 'http://localhost:8080',
    },
  };

  const client = new msal.PublicClientApplication(config);

  const loginRequest = {
    scopes: ['user.read'],
  };
  let loginResponse = await client.loginPopup(loginRequest);
  console.log('Login Response', loginResponse);

  const tokenRequest = {
    scopes: ['user.read'],
    account: loginResponse.account,
  };

  let tokenResponse = await client.acquireTokenSilent(tokenRequest);
  console.log('Token Response', tokenResponse);

  let payload = fetch('https://graph.microsoft.com/v1.0/me', {
    headers: {
      authorization: `Bearer ${tokenResponse.accessToken}`,
    },
  });
  let json = (await payload).json();
  console.log('Graph Response', json);
}
