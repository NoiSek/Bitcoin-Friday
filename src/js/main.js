$(document).ready(function() {
  function submitEmail(data, form) {
    $.getJSON('subscribe.php', data, function(response){
      form.animate({
        opacity: 1
      }, 500, 'ease-out');
      if(response['status'] == "error") {
        form.append('<div data-alert class="alert-box alert">' + response['error'] + '<a href="#" class="close">&times;</a></div>');
      }
      else {
        form.append('<div data-alert class="alert-box success">Great, thanks for signing up! We\'ll keep you posted.<a href="#" class="close">&times;</a></div>');
      }
    });
  }

  $("form").submit(function(e) {
    e.preventDefault();
  });

  $('#user-signup').on('invalid', function() {
  })
  .on('valid', function() {
    
    $(this).animate({
      opacity: 0.60
    }, 200, 'ease-out');

    data = $(this).serialize();
    submitEmail(data, $(this));
  });

  $('#merchant-signup').on('invalid', function(e) {
  })
  .on('valid', function() {

    $(this).animate({
      opacity: 0.60
    }, 200, 'ease-out');

    data = $(this).serialize();
    submitEmail(data, $(this));
  });
});