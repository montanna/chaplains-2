
// basic view model placeholder.
productViewModel = function () {
    var self = this;
    self.products = ko.observableArray([]);

    self.products.push({ src: ko.observable("/Content/Application/images/wheel-carbon.png"), model: "MSuper" });
    self.products.push({ src: ko.observable("/Content/Application/images/wheel-black.png"), model: "M580" });
    self.products.push({ src: ko.observable("/Content/Application/images/wheel-white.png"), model: "M680" });
    self.products.push({ src: ko.observable("/Content/Application/images/wheel-red.png"), model: "M280" });
    self.products.push({ src: ko.observable("/Content/Application/images/wheel-carbon.png"), model: "MTiny" });

    self.myClickHandler = function (data, event) {
        $(event).parent().addClass("something");
        data.theString = "different"
    };

    self.loadStuff = function () {
        // $.ajax(//get or post)
    }

    self.post = function () {
        //$.ajax(post)
    }
};

// example: how to apply knockout bindings to a specific section
productVM = new productViewModel();
ko.applyBindings(productVM, $("#section2")[0]);

// example: you can bind a different view model to a different section.
photosVM = new photoViewModel();
ko.applyBindings(productVM, $("#section2")[0]);

// this should always be present near the bottom of our JS
$(document).ready(function () {
    /* activate scrollspy menu */
    $("body").scrollspy({
        target: "#navbar-collapsible",
        offset: 52
    });

    /* smooth scrolling sections */
    $("a[href*=#]:not([href=#])").click(function () {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html,body").animate({
                    scrollTop: target.offset().top - 50
                }, 800);

                if (this.hash == "#section1") {
                    $(".scroll-up").hide();
                } else {
                    $(".scroll-up").show();
                }

                // activate animations in this section
                target.find(".animate").delay(1200).addClass("animated");
                setTimeout(function () {
                    target.find(".animated").removeClass("animated");
                }, 2000);

                return false;
            }
        }
    });

    // animate the logo
    setTimeout(function () {
        $(".logoDiv").show();
        $(".logoDiv").addClass("animated fadeIn");
    }, 750);

    // animate the word innovation
    setTimeout(function () {
        $("#leadword1").show();
        $("#leadword1").addClass("animated fadeIn");
    }, 1750);

    // animate the word transportation
    setTimeout(function () {
        $("#leadword2").show();
        $("#leadword2").addClass("animated fadeIn");
    }, 1750 + 400);

    // animate the word inspiration
    setTimeout(function () {
        $("#leadword3").show();
        $("#leadword3").addClass("animated fadeIn");
    }, 1750 + 400 + 400);



    setTimeout(function () {
        $("#aboutGotway").show();
        $("#aboutGotway").addClass("animated fadeIn");
        setTimeout(function () {
            $("#introducing").show();
            $("#introducing").addClass("animated fadeIn");
            setTimeout(function () {
                $(".aboutGotway3").show();
                $(".aboutGotway3").addClass("animated fadeIn");
            }, 300); /* Gotway has the perfect.. */
            setTimeout(function () {
                $(".btnShop").show();
                $(".btnShop").addClass("animated slideInUp");
            }, 300); /* introducing the Electric ... */
        }, 300);
        $(".btnShop").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            setTimeout(function () {
                $("#downArrowButton").show();
                $("#downArrowButton").addClass("animated fadeIn");
            }, 300);
        });
    }, 3500); // when the center aboutGotway bar appears

    // TODO: montanna, describe this
    $(window).scroll(function () {

        if ($(window).scrollTop() > $("#section1").height()) {
            //console.log($(window).scrollTop());
            $("#wheelsTitle").show();
            $("#wheelsTitle").addClass("animated fadeIn");

            $("#wheelsTitle").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(".btnShop2").each(function (index) {
                    var self = this;
                    setTimeout(function () {
                        $(self).show();
                        $(self).addClass("animated fadeIn");
                    }, 150 * index);
                });
            });

            // this animates each image with a 100msec delay relative to the others
            $(".wheelImgDiv").each(function (index) {
                var self = this;
                setTimeout(function () {
                    $(self).show();
                    $(self).addClass("animated bounceInUp");
                }, 1450 + 75 * index);
            });

            $(".wheelImgDivLabel").each(function (index) {
                var self = this;
                setTimeout(function () {
                    $(self).show();
                    $(self).addClass("animated bounceInUp");
                }, 1450 + 75 * index);
            });
        }
    });

    $(".aboutGotway1").on("click", function () {
        $(this).toggleClass("col-sm-6 col-sm-offset-3");
        $(this).toggleClass("col-sm-12");
    });

    $(".leadIn").on("click", function () {
        $(this).css({ color: " #F4963C" });
    });

    $("#btnSpeed").on("mouseenter", function () {
        $(".aboutSpecs").html("Gotway's MSuper is one of the fastest in its class, reaching speeds of over 24 MPH.")
    });

    $("#btnDist").on("mouseenter", function () {
        $(".aboutSpecs").html("Gotway M680 can go as far as 22 miles on a charge with a typical weight rider.")
    });

    $("#btnStyle").on("mouseenter", function () {
        $(".aboutSpecs").html("With Gotway's wide range of styles and color options, you're guaranteed to find a wheel that suits you.");
    });

    $("#btnSize").on("mouseenter", function () {
        $(".aboutSpecs").html("Gotway MTiny's 8-inch diameter makes it one of the most compact wheels on the market.");
    });

    // applies to all four buttons
    $(".btnShop2").on("mouseleave", function () {
        $(".aboutSpecs").removeClass("aboutSpecsShow");
    });

    $(".btnShop2").on("mouseenter", function () {
        $(".aboutSpecs").addClass("aboutSpecsShow");
    });
});