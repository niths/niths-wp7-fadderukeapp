student = {};

htmlEncode = function(s) {
encodedHtml = escape(s);
encodedHtml = encodedHtml.replace(/%20/g," ");
encodedHtml = encodedHtml.replace(/\//g,"%2F");
encodedHtml = encodedHtml.replace(/\?/g,"%3F");
encodedHtml = encodedHtml.replace(/=/g,"%3D");
encodedHtml = encodedHtml.replace(/&/g,"%26");
encodedHtml = encodedHtml.replace(/@/g,"%40");
return encodedHtml;
}

showErr = function(err, alertDismissed) {
navigator.notification.alert(err, alertDismissed, 'Error', 'OK');
}

showMsg = function(msg, alertDismissed) {
navigator.notification.alert(msg, alertDismissed, 'Info', 'OK');
}