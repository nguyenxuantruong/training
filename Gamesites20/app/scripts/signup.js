jQuery(document).ready(function($) {

    var gsGender,
        gsAvatar,
        gsEmail,
        gsUsername,
        gsCharacter;

      // css drop menu birthday 
      $(".dropdown-menu").css({
          "max-height" :" 100px",
          "min-height" : "50px",
          "max-width" : "50px"
      })

    // validate email
    function validateEmail(email) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
    } 

    // validate username
    function validateUsername(username) {
        var re = /^[A-Za-z0-9-_ ]{6,20}$/;
        return re.test(username);
    }

    // validate password
    function validatePass(pass) {
        var re = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,80}$/;
        return re.test(pass);
    }

    // $(".signUpContainer .signUp .emailS1").focus();

    $(".signUpContainer .signUp .emailS1").keyup(function() {
        var email = $(this).val();
        $(".emailError").css({
              "margin-left" : "40px"
        });
        if(email === '') {
            $('.emailError').text("please input your email");
        }
        else if( !validateEmail(email)) {
              $(".emailError").text("The Email is invalid");
        }
        else {
              $(".emailError").text("");
        }
    });

    // error birthday 
    $(".birthdayError").css({
        "margin-right" : "10px",
        "margin-top" : "10px",
        "float" : "right"
    });

    // chosen day 
    $('select.first').change(function() {
        if($(this).val() === "Day") {              
            $(".birthdayError").text("please give us your birthday");
        }
        else {
            $(".birthdayError").text("");
        }

        if($(this).val() === "31") {
            $('select.last option').remove();
            $('select.last').append("<option>Month</option><option>Jan</option><option>Mar</option><option>May</option>"
              + "<option>Jul</option> <option>Aug</option><option>Oct</option><option>Dec</option>");
        }
    });

     // chosen month 
    $('select.last').change(function() {
        if($(this).val() === "Month") {              
            $(".birthdayError").text("please give us your birthday");
        }
        else {
            $(".birthdayError").text("");
        }
    });

    // validate email when sign up
    $(".signUpContainer .signUp .submit").click(function() {
         var email = $(".signUpContainer .signUp .emailS1").val();
          if(email === '') {
              $('.emailError').text("please input your email");
          }
          else if( !validateEmail(email)) {
              $(".emailError").text("The Email is invalid");
          }
          else if ($('select.first').val() === "Day" || $('select.last').val() === "Month") {
              $(".birthdayError").text("please give us your birthday");
          }

          else {
            
              // storage infor
              localStorage.gsEmail = $(".signUpContainer .signUp input[type='email']").val();
              localStorage.gsDay =  $('select.first').val();
              localStorage.gsMonth =  $('select.last').val();
              $(".screen2 .email").text("Email: " + localStorage.gsEmail);
              $(".screen1").css("display", "none");
              $(".screen2").css("display", "block");

              // set focus
              $(".usernameS2").focus();
          }
    }) ;

    // validate username when press keyboard
    $(".usernameS2").keyup(function() {
        var username = $(".usernameS2").val();
        if(username === '') {
            $(".usernameError").text("Please input username");
        }
        else if(!validateUsername(username)) {
            $(".usernameError").text("username is invalid");
        }
        else {
              $(".usernameError").text("");
        }
    });

    // validate password when press keyboard
    $(".passS2").keyup(function() {

        var username = $(".usernameS2").val(),
            pass = $(".passS2").val();

        if(pass === '') {
            $(".passError").text("Please input password");
        }
        else if(!validatePass(pass)) {
            $(".passError").text("Password is invalid");
        }
        else if(pass.indexOf(username) !== -1) {
            $(".passError").text("Password can't contain username");
        }
        else {
            $(".passError").text("");
        }
    });

    // validate confirm pass when press keyboard
    $(".confirmS2").keyup(function() {
        var pass = $(".passS2").val(),
            confirm = $(this).val();

        if(confirm === "") {
            $(".confirmError").text("Please confirm password");
            $(".confirmError").css("visibility", "visible");
        }
        else if(confirm !== pass) {
            $(".confirmError").css("visibility", "visible");
        }
        else {
            $(".confirmError").css("visibility","hidden");
        }
    });

    // validate username and password when click next
    $(".signUpContainer .submitS2").click(function() {
        var username = $(".signUpContainer .usernameS2").val();
        if(!validateUsername(username)) {
            $(".usernameError").text("username is invalid");
        }
        else if(!validatePass($(".passS2").val())) {
            $(".passError").text("Password is invalid");
        }
        else if($(".passS2").val().indexOf(username) !== -1) {
            $(".passError").text("Password can't contain username");
        }
        else if($(".passS2").val() !== $(".confirmS2").val()) {
            $(".confirmError").css("visibility", "visible");
        }
        else {
            $(".usernameError").text("");
            $(".passError").text("");
            $(".confirmError").css("visibility", "hidden");

            // storage infor
            gsUsername = $(".signUpContainer .usernameS2").val();
            localStorage.gsPass =  $(".passS2").val();
            $(".screen2").css("display", "none");
            $(".screen3").css("display", "block");

            // set focus
            $(".signUpContainer .girl").focus();

            // choisen gender default
            if(gsGender === undefined) {
                gsGender = "boy";
                $(".signUpContainer .boy").css("background", "url(../images/boy-bg-choisen.png)");
                $(".signUpContainer .girl").css("background", "url(../images/girl-bg.png)");
                gsAvatar = "images/boy-small.gif";
            }
            else {
                if(gsGender === "girl") {
                    $(".signUpContainer .girl").css("background", "url(../images/girl-bg-choisen.png)");
                    gsAvatar = "images/girl-small.gif";
                }
                else {
                    $(".signUpContainer .boy").css("background", "url(../images/boy-bg-choisen.png)");
                    gsAvatar = "images/boy-small.gif";
                }
            }
        }
    });

    // handle back event at screen 3
    $(".signUpContainer .backS3").click(function() {
        $(".screen3").css("display", "none");
        $(".screen2").css("display", "block");
        $(".signUpContainer .usernameS2").val(gsUsername);
        $(".passS2").val(localStorage.gsPass);
        $(".confirmS2").val(localStorage.gsPass);

        // set focus
        $(".usernameS2").focus();
    });

    // choisen gender
    $(".signUpContainer .boy").click(function() {
        $(this).css("background", "url(../images/boy-bg-choisen.png)");
        $(".signUpContainer .girl").css("background", "url(../images/girl-bg.png)");
        gsGender = "boy";
        gsAvatar = "images/boy-small.gif";
    });
    $(".signUpContainer .girl").click(function() {
        $(this).css("background", "url(../images/girl-bg-choisen.png)");
        $(".signUpContainer .boy").css("background", "url(../images/boy-bg.png)");
        gsGender = "girl";
        gsAvatar = "images/girl-small.png";
    });

    // click next after choisen gender
    $(".signUpContainer .nextS3").click(function() {
        if(gsGender === "boy") {
            $(".signUpContainer .genderS4").attr("src","images/boy.png" );
        }
        else {
            $(".signUpContainer .genderS4").attr("src","images/girl.png" );
        }
        $(".signUpContainer .usernameS4").text(gsUsername);
        $(".screen3").css("display", "none");
        $(".screen4").css("display", "block");

        // set focus
        $(".signUpContainer .nextS4").focus();
    });

    // handle back event at screen 4
    $(".signUpContainer .backS4").click(function() {
        if(gsGender === "girl") {
            $(".signUpContainer .girl").css("background", "url(../images/girl-bg-choisen.png)");
        }
        else {
            $(".signUpContainer .boy").css("background", "url(../images/boy-bg-choisen.png)");
        }
        $(".screen4").css("display", "none");
        $(".screen3").css("display", "block");

        // set focus
        $(".signUpContainer .girl").focus();
    });

    // finish at screen 4
    $(".signUpContainer .nextS4").click(function() {
        if(gsGender === "boy") {
            gsAvatar = "images/boy-small.gif";
            gsCharacter = "images/avatar2.png";
        }
        else {
            gsAvatar = "images/girl-small.png";
            gsCharacter = "images/avatar1.png";
        }

        // storage in local
        localStorage.gsCharacter = gsCharacter;
        localStorage.gsAvatar = gsAvatar;
        localStorage.gsGender = gsGender;
        localStorage.gsUsername = gsUsername;

        window.location ="index.html";
    });

    window.onload=function(){
        $('.selectpicker').selectpicker();
    };

    // login here
    $(".loginHere").click(function() {
        localStorage.gsAvatar = "images/boy-small.gif";
        localStorage.gsGender = "boy";
        localStorage.gsUsername = "Truong Nguyen";
        localStorage.gsCharacter = "images/avatar2.png";

        window.location = "index.html";
    });
});