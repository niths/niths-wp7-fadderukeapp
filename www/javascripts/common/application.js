﻿student = {};

showErr = function(err, alertDismissed) {
  navigator.notification.alert(err, alertDismissed, 'Error', 'OK');
}

showMsg = function(msg, alertDismissed) {
  navigator.notification.alert(msg, alertDismissed, 'Info', 'OK');
}

checkValue = function(val) {
  return (val == null ? false : (val == '' ? false : (typeof (val) == 'undefined') ? false : true)); 
}