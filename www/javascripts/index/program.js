$("#program-page").live('pageinit', function() {

	loadEvents();

});
$("#program-page").live('pageshow', function() {
	$('#refreshprogrambtn').click(function(data) {
		$('#loadingmsg2').css('display', 'block');
		$('#loadingmsg2').css('visibility', 'visible');
		$('#programlist').css('visibility', 'hidden');
		loadEvents();
	});
});

	function getDayName(day){
		var weekday=new Array(7);
		weekday[0]="S&Oslash;ndag";
		weekday[1]="Mandag";
		weekday[2]="Tirsdag";
		weekday[3]="Onsdag";
		weekday[4]="Torsdag";
		weekday[5]="Fredag";
		weekday[6]="L&Oslash;rdag";
		return weekday[day];
	}
	
	 
	

	function getDatesBetweenUrlParam(){
		
		var today = new Date();
		
		todaysDay = today.getDay();
		todaysDate = today.getDate();
		
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
			dd='0'+dd
		} 
		if(mm<10){
			mm='0'+mm
		} 
		var today = dd+'/'+mm+'/'+yyyy + '-00:00';
		var inFiveDays = (dd + 4) + '/'+mm+'/'+yyyy + '-23:59';
		var param = '?startTime='+today + '&endTime=' + inFiveDays;
		return param;
		//events/dates?startTime=09/04/2010-10:55&endTime=09/04/2010-10:55
	}

	function loadEvents(){
		var response;
		response = $.ajax({
		      url: address + 'events/dates' + getDatesBetweenUrlParam(),
		      type: 'get',
		      cache: false,
		      timeout: 3000,
		      success: function(data) {
//		    	  var list = '<ul id="programlist" data-role="listview" class="ui-listview" data-inset="true"></ul>';
		    	  if(response.status == 200){
		    		  if(data.length > 0){
		    			  handleData(data);		    			  
		    		  }else{
		    			  var theHTML = '<li class="li-first" id="eventloader"><h3>Ingen events funnet for de neste fem dagene...</h3></li>';
				    	  $('#programlist').html(theHTML);
				    	  $('#loadingmsg2').css('display', 'none');
				    	  $('#programlist').css('visibility', 'visible');
		    		  }
		    	  }
		      },
		      error: function(xhr) {
		    	 // alert('err ' + response.status);
		    	  var theHTML = '<h3>Ikke kontakt med server...</h3>';
		    	  $('#programlist').html(theHTML);
		    	  $('#loadingmsg2').css('display', 'none');
		    	  $('#programlist').css('visibility', 'visible');
		      }
		    });
	}
	
	function getHeader(date){
		return '<h1 class="withborder">'+getDayName(date.getDay())+' '+date.getDate()+'/'+(date.getMonth()+1)+'</h1>';
	}

	function getListElement(data){
		return '<li class="li-first" id="eventloader">'+
				'<a href="#event-page?event-id='+data.id+'">'+
				'<h3>'+data.name+'</h3>'+
				'<p><strong>Beskrivelse: </strong>'+ data.description+'</p>'+
				'<p><strong>Start: </strong>'+data.startTime+'</p>'+
				'</a></li>';
	}
	
	function getNewList(name){
		return '<ul id="'+name+'" data-role="listview" class="ui-listview" data-inset="true">';
	}
	
	function handleData(data){
		var currentEventDate = new Date();
		var tempEventDate = new Date();
		var html = '';
		var current = 1;
		for(var i=0;i<data.length;i++){
			//First event, set currentEventDate
			if(i == 0){
				currentEventDate.setFullYear(data[i].startTime.substring(6,10), (data[i].startTime.substring(3,5)-1), data[i].startTime.substring(0,2));
				html = getHeader(currentEventDate) + getNewList('list' + current);
			}
		    //Set the temp date to the object were iterating over 
			tempEventDate.setFullYear(data[i].startTime.substring(6,10), (data[i].startTime.substring(3,5)), data[i].startTime.substring(0,2));
			//If temp date != currentDate, we print a new header and start a new list
			if(currentEventDate.getDate() != tempEventDate.getDate()){
				html += '</ul>';
				current++;
				currentEventDate.setFullYear(tempEventDate.getFullYear(), (tempEventDate.getMonth()-1), tempEventDate.getDate());

				html += getHeader(currentEventDate) + getNewList('list' + current);
			}
			html += getListElement(data[i]);
		}
		
		html += '</ul>';
		$('#programlist').html(html);
		for (var i = 1; i <= current; i++){
			$('#list'+i).listview();
		}
		
		$('#loadingmsg2').css('display', 'none');
	    $('#programlist').css('visibility', 'visible');
	}