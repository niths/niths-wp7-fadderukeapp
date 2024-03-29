var unableToClose = false;

$('.ps-toolbar-close').live('click', function() {
  unableToClose = true;
});

$('.fb-image').live('click', function() {
  unableToClose = false;
});

isUnableToClose = function() {
  return unableToClose;
}

$('#Gallery1').live('pageshow', function() {
  //getLatestImages();
  refresh();

  function showImgs(){
    $('#galleryloader').css('display', 'none');
    $('#gallerycontent').css('visibility', 'visible');
  }

  $('#refreshGalleryBtn').click(function() {
    refresh();
  });

  function refresh() {
    $('#galleryloader').css('display', 'block');
    $('#gallerycontent').css('visibility', 'hidden');

    getLatestImages();
  }

  /**
   * Selects an album from facebook
   * Replace the id with the album id you want to display
   * the lastest 25. 
   * 
   * Open browser, go to facebook, select album, copy paste id from url
   */
  function getLatestImages() { 
    $.get(
        'http://ec2-46-137-46-84.eu-west-1.compute.amazonaws.com:8080/niths/sociallinks?socialCommunity=facebook&category=fadderuka',
        function(socialLinks) {
          $.ajax({
            url:      socialLinks[0].address,
            dataType: 'json',
            type:     'GET',
            timeout:  5000,
            success:  function(album) {
              handleImgsData(album.data);
            },
            error:    function() {
              showErr('Ikke kontakt med facebook', null);
            }
          });
        }
    );

    /*
    $.ajax({
      url:      'https://graph.facebook.com/10150304760787369/photos',
      dataType: 'json',
      type:     'GET',
      timeout:  5000,
      success:  function(album){
        handleImgsData(album.data);
      },
      error:    function(){
        showErr('Ikke kontakt med facebook', null);
      }
    });
    */
  }

  /**
   * Selects two images, one low res thumb, on normal
   * from facebook json response
   */
  function handleImgsData(images) {
    $('#lastPics').empty();
    var html = '';
    for (var i = 0; i < images.length; i++) {
      var imgT = images[i].images[6]['source'];
      var imgN = images[i].images[4]['source'];
      $('#lastPics').append(
          '<li><a class="fb-image" href="' + imgN + '" rel="external">' +
          '<img src="'+imgT+'" alt="NITHs" /></a></li>');
    }
    if(Code.PhotoSwipe.getInstance('Gallery1') == null){
      $("ul.gallery a").photoSwipe(null,  'Gallery1');      
    }

    showImgs();
  }
});