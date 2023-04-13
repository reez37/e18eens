
$(function () {

    // MENU
    $('.navbar-collapse a').on('click', function () {
      $(".navbar-collapse").collapse('hide');
    });
  
    // AOS ANIMATION
    AOS.init({
      disable: 'mobile',
      duration: 800,
      anchorPlacement: 'center-bottom'
    });
  
  
    // btn-primary NAVBAR
    $(function () {
      $('.navbar a, .hero-text a').on('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });
  });
  
  
  
  
  function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
    return result.join('');
  }
  
  
  function canvas_abs() {
    var canvas = document.createElement("canvas");
    canvas.width = 520;
    canvas.height = 100;
    var ctx = canvas.getContext('2d');
    ctx.font = "100px Courier New";
    var text = makeid('7');
    ctx.fillText(text, 10, 80);
    var img = document.createElement("img");
    img.src = canvas.toDataURL();
    $("#captche_here").append(img);
    return text
  }
  var captche_value = canvas_abs();
  
  
  
  var referalCode = makeid('7');
  $("#ambassador_form").trigger("reset");
  $("#ambassador_form").submit(function (event) {
  
    event.preventDefault();
  
    var $form = $(this),
      url = $form.attr('action');
    if (captche_value == $('#ambassador_form #captcha').val()) {
      var posting = $.post(url, {
        name: $('#ambassador_form #name').val(),
        whatsapp: $('#ambassador_form #whatsapp').val(),
        college: $('#ambassador_form #college').val(),
        referal_Code: referalCode,
        date: null,
        options: "2",
      });
      posting.done(function (data) {
        if (data == "") {
          $('#beforeSubmission').css("display", "none");
          $('#failed_Submission').css("display", "block");
        }else if (data == "error") {
          $('#beforeSubmission').css("display", "none");
          $('#failed_Submission').css("display", "block");
        }
        else {
          $('#beforeSubmission').css("display", "none");
          $('#success_Submission').css("display", "block");
          $('#referal_here').empty().append(data);
          $('#referal_here_link').empty().append("https://teranis.in/?referalcode="+data);
        }
  
      });
      posting.fail(function () {
  
      });
    } else {
      $('#wrongCaptcha').empty().append("captcha doesnt match, try again...");
    }
  });
  var captche_value_find = canvas_find();
  
  function canvas_find() {
    var canvas = document.createElement("canvas");
    canvas.width = 520;
    canvas.height = 100;
    var ctx = canvas.getContext('2d');
    ctx.font = "100px Courier New";
    var text = makeid('7');
    ctx.fillText(text, 10, 80);
    var img = document.createElement("img");
    img.src = canvas.toDataURL();
    $("#captche_here_find").append(img);
    return text
  }
  $("#findReferal").trigger("reset");
  $("#findReferal").submit(function (event) {
  
    event.preventDefault();
  
    var $form = $(this),
      url = $form.attr('action');
    if (captche_value_find == $('#findReferal #captcha').val()) {
      var posting = $.post(url, {
        whatsapp: $('#findReferal #whatsapp').val(),
        options: "1",
      });
      posting.done(function (data) {
        $(".contact-form").trigger("reset");
        $("#findReferal").hide();
        if (data == "") {
          $("#warnorerror").show();
          $('#warnorerror').empty().append("There Is No Referal Code Attached To This Number, Contact Teranis Team For More Details!!!");
        
        }
        else {
          $("#referal_result_find").show();
          $('#referal_here_find').empty().append(data);
          $('#referal_here_find_link').empty().append("https://teranis.in/?referalcode="+data);
  
          var posting = $.post(url, {
            referalCode: data,
            options: "3",
          });
          posting.done(function (data) {
            if (data == "") {
              $("#emptyerror").show();
              $('#emptyerror').empty().append("<center style='color:red;'>No One Registered Using This Referal Code</center>");
            }
            else {
              $('#registered_details').empty().append(data);
            }
          });
          posting.fail(function () {
      
          });
  
  
  
        }
      });
      posting.fail(function () {
  
      });
    } else {
      $('#wrongCaptcha_find').empty().append("captcha doesnt match, try again...");
    }
  });
  
  var captche_value_event;
  function canvas_event() {
    var canvas = document.createElement("canvas");
    canvas.width = 520;
    canvas.height = 100;
    var ctx = canvas.getContext('2d');
    ctx.font = "100px Courier New";
    var text = makeid('7');
    ctx.fillStyle = 'white';
    ctx.fillText(text, 10, 80);
    var img = document.createElement("img");
    img.src = canvas.toDataURL();
    $(".captche_here_event").each(function (c) {   
      $(".captche_here_event", c).empty().append(img); 
    });
    captche_value_event = text;
  }
  
  
  
  $(".event_form_full").submit(function(e) {
    e.preventDefault();
    var det = this;
    var formData = new FormData(det);
    if (captche_value_event == $('#captcha', det).val()) {
      $("#form_area", det).hide();
      $("#loading_screen", det).show();
      $("#form_area", det).trigger("reset");
    $.ajax({
        url: 'events.php',
        type: 'POST',
        data: formData,
        success: function (data) {
          var output = data.toString();
          var errorCode = output.slice(0, 1);
          if (errorCode == "0") {
            $("#success_register", det).show();
            $("#loading_screen", det).hide();
  
          } else if (errorCode == "1") {
    
            $("#failed_register", det).show();
            $("#failed_register b", det).empty().append("Bill Screenshot Upload Failed, Refresh & Try Again...");
            $("#loading_screen", det).hide();
          }else if (errorCode == "2") {
    
            $("#failed_register", det).show();
            $("#failed_register b", det).empty().append("There was a unknown error, Contact teranis Team");
            $("#loading_screen", det).hide();
          }else if (errorCode == "3") {
    
            $("#failed_register", det).show();
            $("#failed_register b", det).empty().append("Only JPEG, JPG & PNG file formate are allowed, Refresh & Try Again...");
            $("#loading_screen", det).hide();
          }else if (errorCode == "4") {
    
            $("#failed_register", det).show();
            $("#failed_register b", det).empty().append("Image size should be below 1mb, Refresh & Try Again...");
            $("#loading_screen", det).hide();
          }else if (errorCode == "5") {
    
            $("#failed_register", det).show();
            $("#failed_register b", det).empty().append("Image Already Exist, Change name and reupload");
            $("#loading_screen", det).hide();
          }else if (errorCode == "6") {
    
            $("#failed_register", det).show();
            $("#failed_register b", det).empty().append("File is not an image");
            $("#loading_screen", det).hide();
          }else if (errorCode == "") {
    
            $("#failed_register", det).show();
            $("#failed_register b", det).empty().append("Unknown Error, Contact Teranis Team...");
            $("#loading_screen", det).hide();
          }else if (errorCode == "7") {
    
            $("#failed_register", det).show();
            $("#failed_register b", det).empty().append("Registration Closed");
            $("#loading_screen", det).hide();
          }
        },
        cache: false,
        contentType: false,
        processData: false
    });
  } else {
    $('#wrongCaptcha_event', det).empty().append("captcha doesnt match, try again...");
  }
  });
  
  var queryParams = new URLSearchParams(window.location.search);
  if(queryParams.has("event") != ""){
    var value = queryParams.get("event");
    modal(value);
    queryParams.delete("event");
    history.replaceState(null, null, "?"+queryParams.toString());
  }
  $
  if(screen.width <= "991"){
    var replaceElement = document.getElementsByClassName("left_side_event");
    for(var i=0; i<replaceElement.length; i++){
      var first = document.getElementsByClassName("left_side_event_first")[i];
      var second = document.getElementsByClassName("left_side_event_second")[i];
      var third = document.getElementsByClassName("left_side_event_first")[i];
      first.outerHTML = second.outerHTML;
      second.outerHTML = third.outerHTML;
    }
  }
  
  modal("registration");