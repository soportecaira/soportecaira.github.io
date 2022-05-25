var userName;
var email;
var password;
var poolData;
var message;
var regexSpecialCharacters;
var userpwd;

async function mailValid() {
    const r = await getMailVerify().then(function(data){
        let emailData = data.data;
        console.log(emailData);
        //Validaciones correo
        if(emailData.score < 50 || emailData.gibberish || !emailData.regexp || emailData.result=="undeliverable"){
            return false;
        }
        return true;
    });
    return r;
}

async function getMailVerify() {
    try{
        const api = "https://api.hunter.io/v2/email-verifier?email=patrick@stripe.com&api_key=782a8a231dfdbbce032787682b8e6b5b6a8ef21c";
        const response = await fetch(api);
        return response.json();
    }
    catch{
        alert("Error de red");
    };
  }

function registerButton() {
    email = document.getElementById("useremail").value;
    userpwd = document.getElementById("userpwd");
    message = document.getElementById("errorMessage");
    regexSpecialCharacters = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&/,><\’:;|_~`])\S{8,99}$/;

    if(!document.getElementById("username").value || document.getElementById("username").length === 0 ){
        message.style.display="block";
        message.innerHTML="The name cannot be empty.";
        return false;
    } else if(!document.getElementById("usersurname").value || document.getElementById("usersurname").length === 0 ) {
        message.style.display="block";
        message.innerHTML="The surname cannot be empty.";
        return false;
    }
    else if(!mailValid()) {
            message.style.display="block";
            message.innerHTML="Email not valid.";
            return false;
    }else {
        userName = document.getElementById("username").value + ' ' + document.getElementById("usersurname").value;
    }

    if(userpwd.value != document.getElementById("userpwdconf").value){
        message.style.display="block";
        message.innerHTML="Passwords don't match.";
        return false;
    } else {
        password = userpwd.value;
    }
    
    if(userpwd.value.length < 8){
        message.style.display="block";
        message.innerHTML="The password must contain at least 8 characters.";
        return false;
    } else {
        password = userpwd.value;
    }

    if(userpwd.value.length > 15){
        message.style.display="block";
        message.innerHTML="The password must contain 15 characters maximum.";
        return false;
    } else {
        password = userpwd.value;
    }

    if(!/\d/.test(userpwd.value)){
        message.style.display="block";
        message.innerHTML="The password must contain 1 number minimum.";
        return false;
    } else {
        password = userpwd.value;
    }

    if(!regexSpecialCharacters.test(userpwd.value)){
        message.style.display="block";
        message.innerHTML="The password must contain at least one special character, one lower and one upper case .";
        return false;
    } else {
        password = userpwd.value;
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

    event.preventDefault();

    userPool.signUp(email, password, attributeList, null, function(err, result){
        if (err) {
            console.log(err.message || JSON.stringify(err));
            console.log(err.message);
            console.log(JSON.stringify(err));
            if(err.message =="User already exists" ||  JSON.stringify(err).includes("UsernameExistsException")){
                new Notify ({
                    title: 'Invalid registration',
                    text: 'The entered email already exists.',
                    status: 'error'
                });
            }
            return;
        }

        cognitoUser = result.user;

        new Notify ({
            title: 'Registration completed',
            text: 'We have sent you an email to verify your account.',
            status: 'success'
        })
    });

    message.style.display="none";

    return true;
}
