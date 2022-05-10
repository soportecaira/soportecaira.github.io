// var poolData;

// function loginButton() {
//     var authData = {
//         Username : document.getElementById("loginEmail").value,
//         Password : document.getElementById("loginPwd").value
//     };

//     var authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData);

//     poolData = {
//         UserPoolId : _config.cognito.userPoolId,
//         ClientId : _config.cognito.clientId
//     };

//     var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//     var userData = {
//         Username : document.getElementById("loginEmail").value,
//         Pool : userPool
//     };

//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//     cognitoUser.authenticateUser(authDetails, {
//         onSuccess: function (result) {
//             //var accessToken = result.getAccessToken().getJwtToken();
//             var currentUser = userPool.getCurrentUser();

//             currentUser.getSession(function (err, session) {
//                 console.log('Access token: ' + session.accessToken.jwtToken);
//                 console.log('Refresh token: ' + session.refreshToken.token);
//                 currentUser.getUserAttributes(function (err, result) {
//                     if (err) {
//                         alert(err.message || JSON.stringify(err));
//                         return;
//                     }
//                     for (i = 0; i < result.length; i++) {
//                         console.log('Atributo ' + result[i].getName() + ' con valor: ' + result[i].getValue());
//                     }
//                 });
//             });
//         },

//         onFailure: function (err) {
//             alert(err.message || JSON.stringify(err));
//         },
//     });
// }
