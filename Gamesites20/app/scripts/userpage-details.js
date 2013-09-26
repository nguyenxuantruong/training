jQuery(document).ready(function($) {

    // check login status
    if(localStorage.gsUsername === undefined) {

        // go to login
        $("body").html("<h4>You don't login. Please go to <a href='index.html'>Home Page</a>");
        $("body").css("background", "none");
        $("a").css("color", "blue");              
    }

    // go to gamepage
    else if(localStorage.gamePlayed === undefined) {
        $("body").html("<h4>You have not chosen game played yet. Please go to <a href='userpage.html'>User Page</a>");
        $("body").css("background", "none");
        $("a").css("color", "blue");
    }

    else {

        // avatar in header 
        $("#nav .navText .dropdown-toggle").html(localStorage.gsUsername + "<b class='caret'></b>");
        $("#nav .navText img").attr("src", localStorage.gsAvatar);

        // set character 
        $("#userInfor .character").attr("src", localStorage.gsCharacter);

        // set username
        $(".inforUser h2").text(localStorage.gsUsername);
        $(".inforUser h2").text(localStorage.gsUsername);
        if(localStorage.gsUsername.length > 15) {
            $(".inforUser h2").css("font-size", '25px');
        }
        if(localStorage.gsUsername.length > 17) {
            $(".inforUser h2").css("font-size", '22px');
        }
        if(localStorage.gsUsername.length === 20) {
            $(".inforUser h2").css("font-size", '20px');
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
    }

    // load game played
    $.ajax({
        url: "data/user-game.json",
        type: "get",
        dataType: "json",
        success: function(data) {

            // set game play for user
            $(".inforUser  p:nth-child(3) span:nth-child(2)").text(data.length);

            for(var i = 0; i < data.length; i++) {
                if(data[i].name === localStorage.gamePlayed) {

                    var levelGame = $("#game .levelGame");
                    
                    // set name
                    $("#game h1").text(localStorage.gamePlayed);

                    // set image
                    levelGame.find("img.logo").attr("src", data[i].logo);

                    // set progress
                    levelGame.find(".currentPoint").text(data[i].point);
                    levelGame.find(".pointAccomplish").text(data[i].pointAccomplish);
                    levelGame.find(".bar").css("width", Number(data[i].point) * 100 / Number(data[i].pointAccomplish) + "%");
                    levelGame.find(".level p span:nth-child(3)").text(data[i].level);

                    // dollar
                    levelGame.find(".buttonGame:first-child pre").text("$       " + data[i].dollar + "  ");

                    // level
                    levelGame.find(".buttonGame:nth-child(2) pre").text("   Level " + data[i].level + "      ");


                    // append cup 
                    for(var j = 0; j < data[i].badges.length; j++) {
                        levelGame.find(".cup").append("<li></li>");   
                    }

                    // inventory 
                    for(var j = 0; j < data[i].inventory.length; j++) {
                        $("#asnet-slider-ul-small").append("<li><a class='group4' title='Me and my grandfather on the Ohoopee.'><img></a><p></p></li>");
                    }

                    var j = 0;
                    $("#asnet-slider-ul-small li").each(function() {
                        $(this).find("img").attr("src", data[i].inventory[j].logo);
                        $(this).find("img").attr("alt", data[i].inventory[j].name);
                        $(this).find("p").text(data[i].inventory[j].name);
                        $(this).find("a").attr("href", data[i].inventory[j].logo);
                        $(this).find("a").attr("title", data[i].inventory[j].name);
                        j++;
                    });

                    // tabs content
                    // #home badges
                    for(var t = 0; t < data[i].achievement.length; t++) {
                        $("#home .badgest").append("<div>" +
                            "<img>" +
                            "<p></p>" +
                            "<div class='progress'>"+
                               " <div class='bar'><span style='margin-left:25px;'>10</span></div>"+
                            "</div>"+
                        "</div>");
                    }

                    var t = 0;
                    $("#home .badgest > div").each(function() {
                        $(this).find("img").attr("src", data[i].achievement[t].logo);
                        $(this).find("img").attr("alt", data[i].achievement[t].name);
                        $(this).find("p").text(data[i].achievement[t].name);
                        $(this).find(".bar").css("width", Number(data[i].achievement[t].progress) * 100 / 20 + "%");
                        $(this).find(".bar span").text(data[i].achievement[t].progress);
                        t++;
                    });

                    // description tab
                    $("#descTab img").attr("src", data[i].logo);
                    $("#descTab img").attr("alt", "description");
                    $("#descTab h3").text(data[i].ruleHeader);
                    $("#descTab .description span").text(data[i].desc);

                    // slide beauti short
                    $(".group4").colorbox({rel:'group4', slideshow:true});

                    // slider for free more games
                    $.asnetSliderBar('#asnet-slider-container', '#asnet-slider-ul', {
                        'autoSlide': 0,
                        'hoverPause': 0,
                        'usingKeySlide': 1,
                        'usingBorderColor':0,
                            'imageWidth': 580,
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
                            'imageWidth': 102,
                            'imageHeight': 120,
                        'imageCount': 5,
                        'autoSlideSeconds': 2000,
                        'borderVertical':5,
                        'borderHorizontal':0,
                        'borderColor':"red",
                        'fadeSpeed': 500        
                    });   
                }
            }
        },

        error: function() {
            alert("can't get data");
        }
    });  
});







        
    








    


