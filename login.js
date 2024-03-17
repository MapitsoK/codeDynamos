$(document).ready(function() {
    var erroEle = $('.error-message'),
      focusInput = $('.questions').find('.active');
  
    $('.navigation a').click(function() {
      nextMaster('navi');
  
      var thisInput = $('#' + $(this).attr('data-ref'));
      $('.active').removeClass('active');
      thisInput.focus().addClass('active');
      thisInput.closest('li').animate({
        marginTop: '0px',
        opacity: 1
      }, 200);
      thisInput.closest('li').prevAll('li').animate({
        marginTop: '-150px',
        opacity: 0
      }, 200);
  
      thisInput.closest('li').nextAll('li').animate({
        marginTop: '150px',
        opacity: 0
      }, 200);
      errorMessage(erroEle, '', 'hidden', 0);
    });
  
    $(document).keypress(function(event) {
      if (event.which == 13) {
        nextMaster('keypress');
        event.preventDefault();
      }
    });
  
    function nextMaster(type) {
      var focusInput = $('.questions').find('.active');
      if (focusInput.val() != '') {
        if (focusInput.attr('name') == 'email' && !validateEmail(focusInput.val())) {
          errorMessage(erroEle, "Invalid email format", 'visible', 1);
        } else if (focusInput.attr('name') == 'password' && focusInput.val().length < 8) {
          errorMessage(erroEle, "Password must be at least 8 characters long", 'visible', 1);
        } else {
          // Simulate login process
          if (type != 'navi') {
            // Redirect or show success message
            $('.container').fadeOut(400);
            $('#wf').animate({
              opacity: 1,
              marginTop: '1em'
            }, 500).css({
              'display': 'block'
            });
          }
          errorMessage(erroEle, '', 'hidden', 0);
        }
      } else if (type == 'keypress') {
        errorMessage(erroEle, 'Please enter your ' + focusInput.attr('name'), 'visible', 1);
      }
    }
  
    $('#login-form').submit(function(event) {
      event.preventDefault(); // Prevent form submission
      nextMaster('nextpage');
    });
  
    $("input[type='text'], input[type='password']").keyup(function(event) {
      var focusInput = $(this);
      if (focusInput.val().length > 0) {
        $('#next-page').css('opacity', 1);
      } else {
        $('#next-page').css('opacity', 0);
      }
    });
  
    $('#show-pwd').mousedown(function() {
      $(this).toggleClass('view').toggleClass('hide');
      $('#password').attr('type', 'text');
    }).mouseup(function() {
      $(this).toggleClass('view').toggleClass('hide');
      $('#password').attr('type', 'password');
    });
  });
  
  function errorMessage(textmeg, appendString, visib, opaci) {
    textmeg.css({
      visibility: visib,
      opacity: opaci
    }).html(appendString);
  }
  
  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  