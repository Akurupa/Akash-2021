var subheaderMessages = ["Hopefully you knew that already", "I’m running for College Council President", "RHAkash", "Meme lord supreme"];
$(document).ready(function(){
    // SUBHEADER MESSAGES
    var randomNumber = Math.floor(Math.random() * subheaderMessages.length);
    $(".subheader-message").text(subheaderMessages[randomNumber]);
    
    // NAVBAR LOCKING
    var navbar = $(".navigation");
    var headerMarginBottom = $(".header").css("margin-bottom");
    
    var prevScroll = $(window).scrollTop();
    
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        var navbarTop = parseInt($(".header").css("--header-height"));
        var deltaScroll = scrollTop - prevScroll;
        
        if (deltaScroll < -5 && $(".mobile-navigation").css("display") != "none") {
            $(".open-menu-button").css("--bottom-margin", "150px");
        } else if (deltaScroll > 10) {
            $(".open-menu-button").css("--bottom-margin", "40px");
        }
        
        if (scrollTop >= navbarTop && navbar.css("display") != "none") {
            navbar.addClass("fixed-top");
            $(".header").css("margin-bottom", navbar.height() + parseFloat(headerMarginBottom));
        } else if (navbar.css("display") != "none") {
            navbar.removeClass("fixed-top");
            $(".header").css("margin-bottom", headerMarginBottom);
        }
        
        prevScroll = scrollTop;
    })
    
    // MOBILE MENU
    var mobileNavOpener = $(".open-menu-button");
    var mobileNavButton = mobileNavOpener.find("button");
    var currentMenuState = false;
    
    mobileNavButton.click(function(){
        if (!currentMenuState) {
            // open menu
            var scrollPos = $(window).scrollTop();
            $("body").css("overflow", "hidden");
            $("html, body").css("scrollTop", scrollPos);
            mobileNavOpener.addClass("mobile-menu-selected");
            $(".mobile-menu").addClass("menu-activated");
            setTimeout(function(){
                $(".mobile-menu > *").css("opacity", "1")
            }, 400);
        } else if (currentMenuState) {
            // close menu
            $("body").css("overflow", "auto");
            mobileNavOpener.removeClass("mobile-menu-selected");
            $(".mobile-menu").removeClass("menu-activated");
            $(".mobile-menu > *").css("opacity", "0");
        }
        currentMenuState = !currentMenuState;
    });
    
    // CATEGORY SELECTOR
    $(".best-for-category-selector button").each(function(){
        $(this).click(function(){
            if ($(this).hasClass("selected-category-button")) {
                $(this).removeClass("selected-category-button");
                $(".selected-category-content").removeClass("selected-category-content");
            } else if ($(this).hasClass("students-category")) {
                // clear old selection
                $(".selected-category-content").removeClass("selected-category-content");
                $(".selected-category-button").removeClass("selected-category-button");
                
                // make new selection
                $(".category-info-content.students-category").addClass("selected-category-content");
                $(this).addClass("selected-category-button");
            } else if ($(this).hasClass("clubs-category")) {
                // clear old selection
                $(".selected-category-content").removeClass("selected-category-content");
                $(".selected-category-button").removeClass("selected-category-button");
                
                // make new selection
                $(".category-info-content.clubs-category").addClass("selected-category-content");
                $(this).addClass("selected-category-button");
            } else if ($(this).hasClass("emory-category")) {
                // clear old selection
                $(".selected-category-content").removeClass("selected-category-content");
                $(".selected-category-button").removeClass("selected-category-button");
                
                // make new selection
                $(".category-info-content.emory-category").addClass("selected-category-content");
                $(this).addClass("selected-category-button");
            }
            
            var categoryContent = $(".selected-category-content");
            if (categoryContent[0] && $("html, body").scrollTop() < categoryContent.offset().top) {
                $("html, body").animate({
                    scrollTop: categoryContent.offset().top - navbar.height() - 200
                }, 700);
            } else if (!categoryContent[0]) {
                setTimeout(function(){
                    $("html, body").animate({
                        scrollTop: $("#best-for").offset().top - navbar.height()
                    }, 800);
                }, 10);
            }
        });
    });
    
    // ACCESSIBILITY FEATURES
    $(".accessibility-button .checkbox-container").mouseenter(function(){
        $(this).parent().addClass("hover-state");
    });
    
    $(".accessibility-button .checkbox-container").mouseleave(function(){
        $(this).parent().removeClass("hover-state");
    });
    
    $(".accessibility-button .checkbox-container input").click(function(){
        if ($(this).prop("checked") == true && $(this).parent().parent().attr("id") == "high-contrast") {
            // turn off readability mode
            $("body").removeClass("readable");
            $(".accessibility-button#readable .checkbox-container input").prop("checked", false);
            $(".accessibility-button#readable").removeClass("activated-state");
            
            // turn on high contrast mode
            $(this).parent().parent().addClass("activated-state");
            $("body").addClass("high-contrast");
            
        } else if ($(this).prop("checked") == true && $(this).parent().parent().attr("id") == "readable") {
            // turn off high contrast mode
            $("body").removeClass("high-contrast");
            $(".accessibility-button#high-contrast .checkbox-container input").prop("checked", false);
            $(".accessibility-button#high-contrast").removeClass("activated-state");
            
            // turn on readability mode
            $(this).parent().parent().addClass("activated-state");
            $("body").addClass("readable");
            
        } else if ($(this).prop("checked") == false && $(this).parent().parent().attr("id") == "high-contrast") {
            $("body").removeClass("high-contrast");
            $(this).parent().parent().removeClass("activated-state");
            
        } else if ($(this).prop("checked") == false && $(this).parent().parent().attr("id") == "readable") {
            $("body").removeClass("readable");
            $(this).parent().parent().removeClass("activated-state");
        }
    });
});