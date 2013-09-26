jQuery(document).ready(function($) {

  var gameTemp = "<div class='row-fluid gameArea'>" +
                        "<div class='avatarGame span4'>" +
                            "<a href='gamepage.html' class='toGamepage'><img src='images/citadels.png'></a>" +
                            "<div class='progress'>" +
                                "<div class='bar' style='width: 35%;'></div>" +
                            "</div>" +
                            "<p><span class='currentPoint'>100</span> / <span class='pointAccomplish'>200</span> more for level <span></span></p>" +
                        "</div>" +
                        "<div class='achievements span6'>" +
                                "<h2> Citadels </h2>" +
                                "<div>" +
                                    "<button class='buttonGame' style='cursor:default;'><pre>$       1500  </pre></button>"+
                                    "<button class='buttonGame' style='cursor:default;'><pre></pre></button>"+
                                    "<ul class='cup'>"+
                                    "</ul>"+
                                "</div>"+
                                "<div class='badgest'>"+
                                                                     
                                "</div>"+
                                "<div style='clear: both;'></div>"+
                        "</div>"+
                        "<div class='span2 more'>"+
                            "<button class='viewAll'>View All</button>"+
                            "<a class='viewMore'></a>"+
                        "</div>"+
                    "</div>",

        badgesTemp = "<div class='subBadges'>"+
                    "<img src='images/userpage-badgest.png'>"+
                    "<p>The Beginner</p>"+
                    "<div class='progress'>"+
                        "<div class='bar' style='width: 35%;height:15px;margin-top:-2px;'><span style='margin-left:25px;'>10</span></div>"+
                    "</div>"+
                "</div>";


    // check login status
    if(localStorage.gsUsername === undefined) {
        // go to login
        $("body").html("<h4>You don't login. Please go to <a href='index.html'>Home Page</a>");
        $("body").css("background", "none");
        $("a").css("color", "blue");

        // character default
        $("#userInfor .character").attr("src", "images/userpage-character.png");
        $("#nav .avatar img").attr("src", "images/avatar.png");

        // user name
        $("#nav .navText .dropdown-toggle").html("guest<b class='caret'></b>");
    }

    else {
        // set character 
        $("#userInfor .character").attr("src", localStorage.gsCharacter);

        // avatar in header 
        $("#nav .navText .dropdown-toggle").html(localStorage.gsUsername + "<b class='caret'></b>");
        $("#nav .navText img").attr("src", localStorage.gsAvatar);

        // set username
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
  
    // load ajax game and archivementes
    $.ajax({
        url: "data/user-game.json",
        type: "get",
        dataType: "json",
        success: function(data) {

            localStorage.localListGame = data;

            var listGame = data.length;

            // set game play for user
            $("#userInfor .inforUser p:nth-child(3) span:nth-child(2)").text(listGame);

            // append list game
            for(var i = 0; i < listGame; i++) {
                $('#content .span7').append(gameTemp);

                // hide badges that > 5
                $(".badgest").each(function() {
                    var j = 0;
                    $(this).find(".subBadges").each(function() {
                        if(j > 4) {
                            $(this).css("display", 'none');
                        }
                        j++;
                    });
                });
            }

            // handle data
            var i = 0;
            $(".gameArea").each(function() {

                // add last play date
                $(this).find(".avatarGame").attr("date", data[i].lastPlayDate);

                // logo game
                $(this).find(".avatarGame img").attr('src', data[i].logo);
                $(this).find(".avatarGame p span:nth-child(3)").text(data[i].level);

                // 6 more
                if(Number(data[i].achievement.length) > 5) {
                    var number = Number(data[i].achievement.length) - 5;
                    $(this).find(".viewMore").text(number + " More..");
                }                

                // dollar
                $(this).find(".buttonGame:first-child pre").text("$       " + data[i].dollar + "  ");

                // level
                $(this).find(".buttonGame:nth-child(2) pre").text("   Level " + data[i].level + "      ");

                // curent point
                var point = Number(data[i].point),
                    pointAccomplish = Number(data[i].pointAccomplish);
                $(this).find(".currentPoint").text(point);
                $(this).find(".pointAccomplish").text(pointAccomplish);
                $(this).find(".avatarGame .bar").css("width", point * 100 / pointAccomplish + "%");

                // game name
                $(this).find("h2").text(data[i].name);

                // applend list badges
                var achievement = data[i].achievement.length;
                for(var j = 0; j < achievement; j++) {
                    $(this).find(".badgest").append(badgesTemp);   
                }

                // append cup 
                for(var j = 0; j < data[i].badges.length; j++) {
                    $(this).find(".cup").append("<li></li>");   
                }

                // hide badges that > 5
                $(".badgest").each(function() {
                    var j = 0;
                    $(this).find(".subBadges").each(function() {
                        if(j > 4) {
                            $(this).css("display", 'none');
                        }
                        j++;
                    });
                });

                // handle badges
                var j = 0;
                $(this).find(".badgest .subBadges").each(function() {

                    // name badges
                    $(this).find('p').text(data[i].achievement[j].name);
                    $(this).find(".bar span").text(data[i].achievement[j].progress);
                    $(this).find(".bar").css("width", data[i].achievement[j].progress * 100 / 20 + "%");
                    j++;
                });                    
                i++;
            });

            // sort list game follow recent
            var list = $(".gameArea");
            $('#gameAchie .recent').click(function() {
                for(var i = 0; i < list.length; i++) {
                    for(var j = i+1; j < list.length; j++){
                        if(Date.parse(list[i].getElementsByClassName("avatarGame")[0].getAttribute("date")) < Date.parse(list[j].getElementsByClassName("avatarGame")[0].getAttribute("date"))) {
                            var temp = list[i].innerHTML;
                            list[i].innerHTML = list[j].innerHTML;
                            list[j].innerHTML = temp;
                        }
                    }
                }
               
                // view more and view all
                viewMore();
                viewAll();

                // to game page
                gotoGamepage();


            });

             // sort list game follow abc
            var list = $(".gameArea");
            $('#gameAchie .abc').click(function() {
                for(var i = 0; i < list.length; i++) {
                    for(var j = i+1; j < list.length; j++){
                        if(list[i].getElementsByTagName("h2")[0].innerHTML > list[j].getElementsByTagName("h2")[0].innerHTML) {
                            var temp = list[i].innerHTML;
                            list[i].innerHTML = list[j].innerHTML;
                            list[j].innerHTML = temp;
                        }
                    }
                }
                
                // view more and view all
                viewMore();
                viewAll();

                // go to game page
                gotoGamepage();

            });

            // view more and view all
            viewMore();
            viewAll();

            // go to game page
            gotoGamepage();

            // handle view more
            function viewMore() {
                $(".viewMore").click(function(event) {
                    $(this).parent().parent().find(".subBadges").css('display','');
                    $(this).css("display", "none");
                });
            }

            // handle view all
            function viewAll() {
                $(".viewAll").click(function() {
                    localStorage.gamePlayed = $(this).parent().prev().find("h2").text();                
                    window.location = "userpage-details.html";
                });
            }

            // go to game page
            function gotoGamepage() {
                $(".avatarGame .toGamepage").click(function() {
                    localStorage.nameGame = $(this).parent().next().find("h2").text();  
                });
            }

        },
        error: function() {
            alert("can't get data");
        }
    });
});