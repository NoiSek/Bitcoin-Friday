$(document).ready(function() {
  function submitDeal(data) {
    $.post('submitdeal.php', data, function(response) {
      if(response['success'] == true) {
        $('#deal-submit').slideToggle(500, function(){
          $('#success-message').slideToggle(1000);
        });
      }
      else if(response['success'] == false) {
        $("#deal-submit").append('<div data-alert class="alert-box alert">' + response['error'] + '<a href="#" class="close">&times;</a></div>');
      }
    }, "json");
  }  

  $('#deal-submit').submit(function(e) {
    e.preventDefault();
    return false;
  })
  .on('invalid', function(e) {
  })
  .on('valid', function(e) {
    var data = $(this).serialize();
    var imageURL = $('#deal-image').attr('src');
    var fileType = fileName.split(".").pop();

    data += "&image_url=" + imageURL;
    data += "&filetype=" + fileType;
    
    submitDeal(data);

    e.preventDefault();
    return false;
  });

  $.fn.extend( {
    limiter: function(limit, elem) {
      $(this).on("keyup focus", function() {
        setCount(this, elem);
      });
      function setCount(src, elem) {
        var chars = src.value.length;
        if (chars > limit) {
          src.value = src.value.substr(0, limit);
          chars = limit;
        }
        elem.html( limit - chars );
      }
      setCount($(this)[0], elem);
    }
  });

  var elem = $("#char-limit");
  $("#deal-title").limiter(50, elem);

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#deal-image').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#deal-image-field").change(function(){
    filePath = this.value;
    fileName = filePath.split(/(\\|\/)/g).pop();
    readURL(this);
  });

  var fileName = "";
});