
$("#profile-page").live('pageshow', function() {
	if (student.id < 1) {
		history.back();
		return false;
	} else {
		init();
	}
});


function showProfile(){
	$('#loadingforprofile').css('display', 'none');
	$('#profilediv').css('visibility', 'visible');
}

	
	function init(){
		printUserInfo();
	}
	
	$.fn.serializeObject = function(){
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};
	
	  $('#profilesubmit').click(function() {
		  var restClient = new RestHandler(); //REST CLIENT
		  restClient.update('students', JSON.stringify($("#update-person-form").serializeObject()),  function(data, textStatus, jqXHR) {  
			  $.mobile.hidePageLoadingMsg();
				if(textStatus == "success"){
					alert('Oppdatering vellykket');	
				}else{
					alert("Oppdatering feilet");
				}
		  	  	//history.back();
			});
//		  var response;
//		  response = $.ajax({
//		      url: address + 'students',
//		      type: 'PUT',
//		      cache: false,
//		      contentType: 'application/json',
//		      beforeSend: function(xhr) {
//		        xhr.setRequestHeader("Application-key", applicationKey);
//		        xhr.setRequestHeader("Application-token", applicationToken);
//		        xhr.setRequestHeader("Developer-key", developerKey);
//		        xhr.setRequestHeader("Developer-token", developerToken);
//		        xhr.setRequestHeader("Session-token", sessionToken);
//		      },
//		      data:  JSON.stringify($("#update-person-form").serializeObject()),
//		      success : function(data){
//		    	  if(response.status == 200){
//		    		  refreshStudentValues();
//		    		  alert("Oppdatering vellykket");
//		    	  }else{
//		    		  alert("Beklager, oppdatering feilet. Pr�v igjen");
//		    	  } 
//		      },
//		      error: function(xhr) {
//		    	  if(response.status == 401){
//		    		  alert('Beklager, du har v�rt inaktiv for lenge, logg inn igjen');
//		    		  sessionToken = '';
//		    		  $.mobile.changePage('index.html');
//		    	  }else{
//		    		  alert("Beklager, en feil oppsto: " + response.getResponseHeader('error'));		    		  
//		    	  }
//		      }
//		    });

		    $('form').die('submit');
		    return false;
		  });
	  
	 function refreshStudentValues(){
		 student.firstName = $('#firstName').val();
		 student.lastName = $('#lastName').val();
		 student.telephoneNumber = $('#telephoneNumber').val();
		 student.description = $('#descriptionP').val();
		 if($("input[@name=gender]:checked").attr('id') == 'male'){
			 student.gender = 'M';
		 }else{
			 student.gender = 'F';
		 }
	 }

	function printUserInfo(){
		$('#idP').val(student.id);
		$('#firstName').val(student.firstName);
		$('#lastName').val(student.lastName);
		$('#telephoneNumber').val(student.telephoneNumber);
		$('#descriptionP').val(student.description);
		if(student.gender == 'M'){
			$("input[value=M]").attr('checked',true).checkboxradio('refresh');
		}else if (student.gender == 'F'){
			$("input[value=F]").attr('checked',true).checkboxradio('refresh');			
		}
		
		userEmail = hex_md5(student.email);
		
		$('#profileImg').attr("src", 'http://www.gravatar.com/avatar/' + userEmail + '?d=mm');
		
		if(student.fadderGroup != null){
			$('#faddergroup').html('<a class="blacklink" href="#single-fadder-group-page?group-id='+student.fadderGroup.id+'">' + student.fadderGroup.groupNumber + '</a>');
		}else{
			$('#faddergroup').html("Ingen");
		}
		
		showProfile();
	}
