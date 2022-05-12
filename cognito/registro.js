var userName;
var email;
var password;
var poolData;
var message;
var regexSpecialCharacters;
var userpwd;

function registroBoton() {
    email = document.getElementById("useremail").value;
    userpwd = document.getElementById("userpwd");
    message = document.getElementById("errorMessage");
    regexSpecialCharacters = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&/,><\’:;|_~`])\S{8,99}$/;

    if(!document.getElementById("username").value || document.getElementById("username").length === 0 ){
        message.style.display="block";
        message.innerHTML="El nombre no puede estar vacío.";
        return false;
    } else if(!document.getElementById("usersurname").value || document.getElementById("usersurname").length === 0 ) {
        message.style.display="block";
        message.innerHTML="El apellido no puede estar vacío.";
        return false;
    }else {
        userName = document.getElementById("username").value + ' ' + document.getElementById("usersurname").value;
    }

    if(userpwd.value != document.getElementById("userpwdconf").value){
        message.style.display="block";
        message.innerHTML="Las contraseñas no coinciden.";
        return false;
    } else {
        password = userpwd.value;
    }
    
    if(userpwd.value.length < 8){
        message.style.display="block";
        message.innerHTML="La contraseña debe contener al menos 8 carácteres.";
        return false;
    } else {
        password = userpwd.value;
    }

    if(userpwd.value.length > 15){
        message.style.display="block";
        message.innerHTML="La contraseña debe contener un máximo de 15 carácteres.";
        return false;
    } else {
        password = userpwd.value;
    }

    if(!/\d/.test(userpwd.value)){
        message.style.display="block";
        message.innerHTML="La contraseña debe contener un número como mínimo.";
        return false;
    } else {
        password = userpwd.value;
    }

    if(!regexSpecialCharacters.test(userpwd.value)){
        message.style.display="block";
        message.innerHTML="The password must contain at least one special character, one lower and one upper case .";
        message.innerHTML="La contraseña debe contener al menos un carácter especial, una mínuscula y una mayúscula.";
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
                    title: 'Registro no efectuado',
                    text: 'El correo introducido ya existe.',
                    status: 'error'
                });
            }
            return;
        }

        cognitoUser = result.user;

        new Notify ({
            title: 'Registro efectuado',
            text: 'Te hemos enviado un correo para verificar tu cuenta.',
            status: 'success'
        })
    });

    message.style.display="none";

    return true;
}
