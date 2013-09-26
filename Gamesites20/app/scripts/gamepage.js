jQuery(document).ready(function($) {

    var nameGame = localStorage.nameGame;

    // check login status
    if(localStorage.gsUsername === undefined) {

        // hide infor user
        $("#contentRight").css("display", "none");

        // character default
        $(".container .avatarUser").attr("src", "images/gamepage-avatar-man.png");
        $("#nav .avatar img").attr("src", "images/avatar.png");

        // user name
        $("#nav .navText .dropdown-toggle").html("guest<b class='caret'></b>");
    }

    else {

        // display dropdown
        $("#menu1").css("display", "");

        // set character 
        $(".container .avatarUser").attr("src", localStorage.gsCharacter);
        $(".container .avatarUser").css({
            "height": "643",
            "left" : "600px",
            "margin-top": "0px"
        });

        // avatar in header 
        $("#nav .navText img").attr("src", localStorage.gsAvatar);

        // set username
        $("#contentRight h2").text(localStorage.gsUsername);
        if(localStorage.gsUsername.length > 15) {
            $("#contentRight h2").css("font-size", '26px');
        }
        if(localStorage.gsUsername.length > 17) {
            $("#contentRight h2").css("font-size", '23px');
        }
        if(localStorage.gsUsername.length === 20) {
            $("#contentRight h2").css("font-size", '21px');
        }

        // user name
        $("#nav .navText .dropdown-toggle").html(localStorage.gsUsername + "<b class='caret'></b>");

        // load ajax for user infor
        $.ajax( {
            url: "data/user.json",
            type: "get",
            dataType: "json",
            success : function(data) {

                // set data joined
                $(".inforUser  p:nth-child(2) span:nth-child(2)").text(data.dateJoin);

                // set austion item
                $(".inforUser  p:nth-child(4) span:nth-child(2)").text(data.austionItem);

                // set funsocket dollar
                $(".inforUser p:nth-child(5) span:nth-child(2)").text(data.dollar + "$");
            },
            error: function() {
                alert("can't get user information");
            }
        });
        $.ajax( {
            url: "data/user-game.json",
            type: "get",
            dataType: "json",
            success : function(data) {

                // set game played
                $(".inforUser  p:nth-child(3) span:nth-child(2)").text(data.length);
            },
            error: function() {
                alert("can't get user information");
            }
        });
    }

    // load ajax
    var freeMoreGame = "<li><a></a></li>";
    $.ajax({
        url: "data/game.json",
        type: "get",
        dataType: "json",
        success: function(data) {
            var listGame = data.length,
                arr = localStorage.arr.split(",");

             // load data of game that chosen
             for (var i = 0; i < listGame; i++) {
                  if(nameGame === data[arr[i]].name) {
                      $(".fCity h1").text(localStorage.nameGame);
                      $("#myCarousel .item:first-child").find("img").attr("src", data[arr[i]].screen0);
                      $("#myCarousel .item:nth-child(2)").find("img").attr("src", data[arr[i]].screen1);
                      $("#myCarousel .item:nth-child(3)").find("img").attr("src", data[arr[i]].screen2);
                      $("#fullDesc span").text(data[arr[i]].desc);
                  }
              }

            // load free more game
            for (var i = 0; i < listGame; i++) {
                    $('#asnet-slider-ul-small').append(freeMoreGame);
            }
            var i = 0;
            $('#asnet-slider-ul-small li').each(function() {
                $(this).find("a").html("<img src = '" + data[arr[i]].img + "'>");
                $(this).find('a').attr("name", data[arr[i]].name);
                i ++;
            });

            // set oder of game that chosen
            i = 0;
            $('#asnet-slider-ul-small li').each(function() {
                if($(this).find('a').attr('name') === localStorage.nameGame) {
                    var temp = $(this).html(), 
                          temp2 = $('#asnet-slider-ul-small li:nth-child(2)').html();

                    $(this).html(temp2);
                    $('#asnet-slider-ul-small li:nth-child(2)').html(temp);
                }
                i++;
            });

            $('#asnet-slider-ul-small li a').click(function() {
                for(var i = 0; i < listGame; i++) {
                    if($(this).attr("name") === data[arr[i]].name) {
                          $("#myCarousel .item:first-child").find("img").attr("src", data[arr[i]].screen0);
                          $("#myCarousel .item:nth-child(2)").find("img").attr("src", data[arr[i]].screen1);
                          $("#myCarousel .item:nth-child(3)").find("img").attr("src", data[arr[i]].screen2);
                          $("#fullDesc span").text(data[arr[i]].desc);
                          $(".fCity h1").text(data[arr[i]].name);
                    }
                }
            });
        },
        error: function() {
            alert("can't get data");
        }
    });

    // slider for free more games
    $.asnetSliderBar('#asnet-slider-container', '#asnet-slider-ul', {
          'autoSlide': 0,
          'hoverPause': 0,
          'usingKeySlide': 1,
          'usingBorderColor':0,
              'imageWidth': 680,
              'imageHeight': 511,
          'imageCount': 1,
          'autoSlideSeconds': 2000,
          'borderVertical':0,
          'borderHorizontal':0,
          'borderColor':"red",
          'fadeSpeed': 500
    });

    $.asnetSliderBar('#asnet-slider-container-small', '#asnet-slider-ul-small', {
          'autoSlide': 0,
          'hoverPause': 0,
          'usingKeySlide': 1,
          'usingBorderColor':0,
              'imageWidth': 160,
              'imageHeight': 98,
          'imageCount': 3,
          'autoSlideSeconds': 2000,
          'borderVertical':10,
          'borderHorizontal':10,
          'borderColor':"red",
          'fadeSpeed': 500        
    });

});