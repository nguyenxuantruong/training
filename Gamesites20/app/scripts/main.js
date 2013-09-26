jQuery(document).ready(function($) {

    var gameData,
        listFG = "<div class='listFG'>" + 
                          "<img alt='forbiddencity'>" +
                          "<button class='play'><span>P</span>lay Now</button>" +
                          "<button class='learn'><span>L</span>earn More</button>" +
                      "</div>",

        listMoreGame = "<li><div class='logo'>" +
                              "<a href='gamepage.html'><img alt='train'></a>" +
                          "</div>" +
                          "<div class='descriptionMoreGame'>" +
                              "<p class='name'></p>" +
                              "<p class='desc'></p>" +
                          "</div>" +
                      "</li>";

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

    // check login status
    if(localStorage.gsUsername !== undefined) {

        // user name and avatar in header 
        $("#nav .navText .dropdown-toggle").html(localStorage.gsUsername + "<b class='caret'></b>");
        $("#signUp .avatarDefault").attr("src", localStorage.gsCharacter); 

        // hide sign up
        $("#signUp").html("<p class='bigText'></p><img class='avatarDefault' alt='avatar default'/>");
        $("#signUp .bigText").css("height", "94px");
        $("#signUp .avatarDefault").attr("src", localStorage.gsCharacter);   
        $(".avatarDefault").css({"top": "14px", "left": "52px"});

        $("#nav .navText img").attr("src", localStorage.gsAvatar);

        // display dropdown in header
        $("#menu1").css("display", "");    
    }

    else {

        // set focus 
        $("#signUp .email").focus();
      
        // character default
        $(".avatarDefault").attr("src", "images/gamepage-avatar-default.png");
        $("#nav .avatar img").attr("src", "images/avatar.png");

        // user name
        $("#nav .navText .dropdown-toggle").html("guest<b class='caret'></b>");
    }

    // load featured game and load more game
    $.ajax({
        url: "data/game.json",
        type: "get",
        dataType: "json",
        success: function(data) {
            gameData = data;

            var listGame = data.length,
                arr = [];

            // make random    
            if(listGame < 8) {
                do {
                    var number = Math.floor((Math.random()*listGame));
                    if(arr.indexOf(number) === -1)
                          arr.push(number);
                }
                while(arr.length < listGame);                    
            }
            else {
                do {
                    var number = Math.floor((Math.random()*8));
                    if(arr.indexOf(number) === -1)
                          arr.push(number);
                }
                while(arr.length < 8);

                for(var a = 0; a < listGame; a++) {
                    if(arr.indexOf(a) === -1) {
                        arr.push(a);
                    }
                }
            }
            localStorage.arr = arr;

            // load featured game
            if(listGame < 5) {
                for(var i = 0; i < listGame; i++) {
                    $("#listFG").append(listFG);                        
                }                
                var i = 0;
                $("#listFG .listFG img").each(function() {
                    $(this).attr("src", data[arr[i]].img);
                    $(this).attr("alt", data[arr[i]].name);
                    $("#listFG .learn").attr("name", data[arr[i]].name);
                    i++;
                });    
            }

            
            else {
                for(var i = 0; i < 4; i++) {
                    $("#listFG").append(listFG);

                }  

                // load featured game
                var i = 0;
                $("#listFG .listFG img").each(function() {
                    $(this).attr("src", data[arr[i]].img);
                    $(this).attr("alt", data[arr[i]].name);
                    $("#listFG .learn").attr("name", data[arr[i]].name);
                    i++;
                });
                
                for(var i = 4; i < listGame; i++) {
                    var ul = $("#listMoreGame .ulListGame");
                    ul.append(listMoreGame);                        
                }

                // load more game
                i = 4;
                ul.find('li').each(function () {
                    $(this).find("div.logo img").attr("src", data[arr[i]].img);
                    $(this).find("div.logo img").attr("alt", data[arr[i]].name);
                    $(this).find("div.descriptionMoreGame .name").html(data[arr[i]].name + "<img src='" + data[arr[i]].ratel + "'>");
                    $(this).find("div.logo a").attr("name", data[arr[i]].name);

                    // handle read more...
                    if(data[arr[i]].desc.length === 0) {
                        $(this).find("div.descriptionMoreGame .desc").html("");
                    }
                    else {
                        var desc = data[arr[i]].desc.split(" ");
                        if(desc.length > 20) {
                            var subDesc = " ";
                            for(var temp = 0; temp < 20 ; temp++) {
                                subDesc = subDesc + desc[temp] + " ";
                                
                            }
                            $(this).find("div.descriptionMoreGame .desc").html(subDesc + "<a href='gamepage.html' name= '" + data[arr[i]].name + "'> <span class='read'>Read more..</span>");
                        }
                        else
                            $(this).find("div.descriptionMoreGame .desc").html(data[arr[i]].desc + "<a href='gamepage.html' name= '" + data[arr[i]].name + "'>");
                    }
                    
                    i++;
                });                   
            }

            $('a[href$="gamepage.html"]').click(function() {
                localStorage.nameGame = $(this).attr("name");
            });

            $("button.learn").click(function() {
                localStorage.nameGame = $(this).attr('name');
                window.location.href = "gamepage.html";
            })
        },
        error: function() {
            alert("can't get data");
        }
    });

    $("#signUp .commit").click(function() {

        var gsEmail = $("#signUp .email").val();
        // get email value 
        $(".signUpContainer .signUp .emailS1").val(gsEmail);

        // validate email
        if(gsEmail === '') {
            $(".screen1 .emailError").text("please input your email");
        }
        else if( !validateEmail(gsEmail)) {
              $(".screen1 .emailError").text("The Email is invalid");
        }
        else {
              $(".screen1 .emailError").text("");
        }

        // set focus 
        setTimeout(function(){
            $(".signUpContainer .signUp .emailS1").focus();
        }, 1000);
    });

    // handle placeholder
    $('#signUp .email').keypress(function() {
        $('.placeholder').css("display", "none");
    });
    $('#signUp .email').focusout(function() {
        if($(this).val() === '')
            $('.placeholder').css("display", "block");
    });
    $('#signUp .email').keyup(function() {
        if($(this).val() === '')
            $('.placeholder').css("display", "block");
    });
    $('.placeholder').click(function() {
        $('#signUp .email').focus();
    });
});