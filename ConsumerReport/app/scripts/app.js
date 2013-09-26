/*global define */
define(["jquery"], function ($) {

    // choise age range 
	$(".rangeAge li").click(function(event) {
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	});

	// choise age range 
	$(".rangeIncome li").click(function(event) {
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	});

	// choisen health insurance situation
	$(".situation").find("li").click(function(event) {
		$(this).addClass('checked');
		$(this).siblings().removeClass('checked');
	});

});