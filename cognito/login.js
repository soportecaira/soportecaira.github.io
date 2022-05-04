var poolData;

function loginButton() {
    var authData = {
        Username : document.getElementById("loginEmail").value,
        Password : document.getElementById("loginPwd").value
    };

    var authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData);

    poolData = {
        UserPoolId : _config.cognito.userPoolId,
        ClientId : _config.cognito.clientId
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var userData = {
        Username : document.getElementById("loginEmail").value,
        Pool : userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();
            console.log(accessToken);
        },

        onFailure: function (err) {
            console.log(err.message || JSON.stringify(err));
        },
    });
}
