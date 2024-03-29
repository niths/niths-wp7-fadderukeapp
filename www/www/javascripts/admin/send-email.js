$(document).ready(function() {

  $('#sendEmailForm').submit(function() {
    var vals = $(this).serialize();
    validateInput();

    return false;

    function validateInput() {
      var subject     = vals.match(/subject=[\w_-]+/g);
      var messageBody = vals.match(/message-body=[\w_-]+/g);

      if (subject != null) {
        subject = subject.toString().replace('subject=', '');

        if (messageBody != null) {
          messageBody = messageBody.toString().replace('message-body=', '');

          sendEmail();

          function sendEmail() {
            $.mobile.showPageLoadingMsg();

            var objs = JSON.parse(
                sessionStorage.getItem('fadder_children_objs'));
            var recipientAddresses = '';

            $.each(objs, function(i, fadderChild) {
              recipientAddresses += '"' + fadderChild.email + '",';
            });

            // The email which is to be sent to the server
            var jsonEmail =
              '{' + 
                '"senderName": "' +
                  student.firstName + ' ' +
                  student.lastName + '", ' +
                '"recipientAddresses": ' +
                  '[' + recipientAddresses.slice(0, -1) + '], ' +
                '"subject": "' + subject + '", ' + 
                '"body": "' + messageBody + '" ' +
              '}';

            var response;
            response = $.ajax({
              url:         address + 'broadcast',
              type:        'POST',
              cache:       false,
              beforeSend:  function(xhr) {
            	  xhr.setRequestHeader("Application-key", applicationKey);
        	      xhr.setRequestHeader("Application-token", applicationToken);
        	      xhr.setRequestHeader("Developer-key", developerKey);
        	      xhr.setRequestHeader("Developer-token", developerToken);
        	      xhr.setRequestHeader("Session-token", sessionToken);
              },
              contentType: 'application/json',
              data:        jsonEmail,
              success:     function(data) {
            	  alert("Email sendt");
                $.mobile.hidePageLoadingMsg();
                history.back();
              },
              error:       function(xhr) {
            	  if(response.status == 401){
		    		  alert('Beklager, du har v�rt inaktiv for lenge, logg inn igjen');
		    		  sessionToken = '';
		    		  $.mobile.changePage('#dashboard-page');
		    	  }else{
		    		  alert("Beklager, en feil oppsto: " + response.getResponseHeader('error'));		    		  
		    	  }
              }
            });

          }
        } else {
          alert("Skriv inn en gyldig beskjed");
        }

      } else {
        alert("Skriv inn en gyldig tittel");
      }
    }
  });
});