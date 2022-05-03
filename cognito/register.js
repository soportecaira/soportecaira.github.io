var userName;
var email;
var password;
var poolData;

function registerButton() {
    userName = document.getElementById("username").value + ' ' + document.getElementById("usersurname").value;
    email = document.getElementById("useremail").value;

    if(document.getElementById("userpwd").value != document.getElementById("userpwdconf").value){
        console.log("Passwords don't match.");
        throw "Passwords don't match.";
    } else {
        password = document.getElementById("userpwd").value;
    }

    poolData = {
        UserPoolId : _config.cognito.userPoolId,
        ClientId : _config.cognito.clientId
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : email,
    };

    var dataPersonalName = {
        Name : 'name',
        Value : userName,
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributePersonalName = new AmazonCognitoIdentity.CognitoUserAttribute(dataPersonalName);

    attributeList.push(attributeEmail);
    attributeList.push(attributePersonalName);

    userPool.signUp(email, password, attributeList, null, function(err, result){
        if (err) {
            console.log(err.message || JSON.stringify(err));
            return;
        }

        cognitoUser = result.user;
        console.log('User: ' + cognitoUser.getUsername());
        alert('Check your email for a verification link');
    });
}
