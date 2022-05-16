const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const access_token = urlParams.get('access_token')

console.log(access_token);