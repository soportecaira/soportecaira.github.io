var hash = window.location.hash.substr(1);
console.log("Hash: " + hash);
var result = hash.split('&').reduce(function (res, item) {
    var parts = item.split('=');
    res[parts[0]] = parts[1];
    return res;
}, {});
console.log("Result: " + result);
var base64Url = result.id_token.split('.')[1];
var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));

var data = JSON.parse(jsonPayload);
console.log("Data: " + data);

let message = document.getElementById("messageRegistered");

result.username ? message.innerHTML= "Thank you for registering " + result.username : message.innerHTML= "Thank you for registering " + data.email;


