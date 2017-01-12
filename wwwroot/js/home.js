// --- Viewmodels --
//Login
function LoginViewModel() {
    var self = this;

    self.email = ko.observable('');
    self.password = ko.observable('');

    // The current item will be passed as the first parameter, so we know which place to remove
    self.signInHandler = function() {
        $(".login-section").addClass("showLoginSection");
        $("body").css("overflow", "hidden");
    }

    self.closeLoginSection = function() {
        $(".login-section").removeClass("showLoginSection");
        $("body").css("overflow-y", "scroll");
    }

    self.loginUser = function(formElement) {

        $("#inputEmail").val("");
        $("#inputPassword").val("");

        $(".eventCreator").css("display", "block");

        /*

        self.user = {
            email: self.email(),
            password: Self.password()
        };

        $.ajax({
            url: "/Login/",
            type: 'post',
            data: user,
            contentType: 'application/json',
            success: function (result) {
                alert("User created successfully!");
            }
        });
        
        */

        $(".login-section").removeClass("showLoginSection");
        $("body").css("overflow-y", "scroll");
    }
}


//Outreach tabs
function TabViewModel() {
    var self = this;

    self.tabs = ko.observableArray([]);

    self.selectTab = function(data, event) {
        self.selectedTab(data);
        $('.item.active').removeClass("active");
        if (self.selectedTab().tabId == 1) {
            $("#slide1").addClass("active");
        } else if (self.selectedTab().tabId == 2) {
            $("#slide2").addClass("active");
        } else if (self.selectedTab().tabId == 3) {
            $("#slide3").addClass("active");
        } else if (self.selectedTab().tabId == 4) {
            $("#slide4").addClass("active");
        } else if (self.selectedTab().tabId == 5) {
            $("#slide5").addClass("active");
        }
    };

    $(window).on("scroll", function() {
        $('.item.active').removeClass("active");
        if (self.selectedTab().tabId == 1) {
            $("#slide1").addClass("active");
        } else if (self.selectedTab().tabId == 2) {
            $("#slide2").addClass("active");
        } else if (self.selectedTab().tabId == 3) {
            $("#slide3").addClass("active");
        } else if (self.selectedTab().tabId == 4) {
            $("#slide4").addClass("active");
        } else if (self.selectedTab().tabId == 5) {
            $("#slide5").addClass("active");
        }
    });

    // initialize the array of tabs
    self.tabs.push({
        tabId: 1,
        tabStyle: "riseLink ",
        tabTitle: "Project RISE - On Campus",
        tabCaption: "<img src='wwwroot/images/rise-logo-white.png' style='height: 20vh;; -webkit-filter: drop-shadow(4px 4px 2px #222); filter: drop-shadow(4px 4px 2px #222);'/> ",
        tabImg: "wwwroot/images/school4.jpg",
        pathToImage: "wwwroot/images/mockupSC.jpg",
        pathToPDF: "wwwroot/docs/school chaplains brochure.pdf",
        tabContentHeader: "R.I.S.E: Resilience in Student Education",
        tabContentBody: "Fresno Police chaplains teach resiliency skills in Fresno Unified Elementary Schools.",
        tabContentBodyExt: "<p> Resilience In Student Education (RISE) is a partnership between the Fresno Police Chaplaincy and Fresno Unified School District to address the interpersonal and intrapersonal development of students beginning in the first grade. Research has shown that students who possess interpersonal and intrapersonal skills (self-efficacy, emotional regulation, empathy, impulse control, causal analysis, and optimism) are much more resilient and better able to “bounce back” from life’s challenges and maltreatment. Statistically, children who grow up in single parent homes are twice as likely to be abused and or exploited. </p> <ul class='col6'> <li>36% of the children live in single-parent households – the majority of which are fatherless</li> <li>In fatherless homes, children are two to three times more likely to:    <ul> <li> use drugs </li> <li>have educational, emotional and behavioral problems</li> <li>be victims of child abuse</li> <li>become teen parents</li> <li>engage in criminal behavior</li> </ul> </li> </ul> <img class='col6' src='wwwroot/images/school1.jpg'></img> <p> Unfortunately, many of the challenges our children will face are unpreventable. While we may not be able to stop events that rob these kids of their hopes, we can teach them skillsets to overcome adversity and thrive.  <br/> One proactive solution, the School Resource Chaplaincy, was initiated in January of 2011 and is currently found in twenty Fresno Unified elementary schools.  The mission was to focus on protection and building character in younger students.  With time came the realization that acquiring positive character traits was rooted in the child’s sense of hopefulness for overcoming life’s challenges.  Research was reviewed which analyzed the causes and effects of overwhelming stresses on children raised in environments having great hardships and dysfunctional patterns.  Studies of successful and well-adjusted adults raised in such environments revealed they had maintained an ongoing sense of hopefulness by learning resilience or “bounce back” thinking skills from mentors.</p> <p> The School Resource Chaplains serve as mentors in promoting “bounce back” resiliency thinking patterns to 1st graders through the reading and discussion of children’s literature books.  Along with teaching resiliency skills, the SRCs provide an additional layer of abuse protection for students.  Finally, the SRCs offer care and comfort to students, staff, and/or parents when needs are discerned and assistance requested.  In summary, we minister hopefulness to the hopeless…<br/> Currently the SRC program is in need of individuals with a passion for youth and willingness to serve approximately five hours a week on campus.  Chaplain candidates do not have to be licensed, ordained or credentialed.  Training, materials and prayer are provided!  If interested in knowing more, contact John Edmondson at (559) 621-2120 or go to www.fpdchap.org. </p> ",
        hasVideo: true,
        video: "<video width=300 height=150 controls></video>",
        btnText: "Volunteer Now"
    });
    self.tabs.push({
        tabId: 2,
        tabStyle: "stealthLink ",
        tabTitle: "Project STEALTH - Mentorship",
        tabCaption: "",
        tabImg: "wwwroot/images/galsgroup.jpg",
        pathToImage: "wwwroot/images/galsgroup.jpg",
        pathToPDF: "wwwroot/docs/project stealth brochure.pdf",
        tabContentHeader: "S.T.E.A.L.T.H: <br/>Stop Teen Exploitation And Liberate Through Hope",
        tabContentBody: "1/3 of the 2.8 million U.S. kids who run away each year are recruited into pornography and prostitution within 48 hours. <br/>Join Project STEALTH to protect and mentor a runaway teen today.",
        tabContentBodyExt: "<p>Project STEALTH (Stop Teen Exploitation And Liberate Through Hope) brings hope into the lives of at-risk youth through education, intervention, and mentorship. Each year in the U.S., 2.8 million youth run away from home. One-third of the runaways are recruited into pornography and prostitution within 48 hours. On average, the Fresno Police Department receives 2,700 runaway calls per year. That means one-third of our runaways are targeted for exploitation within two days of running away.</p> <p>Keeping children home and safe from those in our society who prey on our most valuable resources is our goal. Through Project STEALTH, a police chaplain responds to handle reporting requirements, evaluate risk behaviors, and offer mentorship. Matthew 28:19 tells us to “go and make disciples…” 60% of our runaway youth want a mentor in their life, and just an hour or so a week can change the trajectory for these children - many of whom are growing up and simply being conditioned to exist. The idea of living and succeeding isn’t on their radar - but you can help. Consider joining our team of mentors to bring hope to these teens. Remember, our kids will be influenced one way or the other, through you or those who want to exploit them.</p> <p>Project STEALTH is currently working with 32 at-risk youth through our mentorship program. During this last year we have seen an incredible impact on the behavioral patterns, school attendance, and family dynamics. Sign up to volunteer as a mentor today and change a life.</p> ",
        hasVideo: true,
        video: "<video id='outreachVideo' width='300' height='150' controls></video>",
        btnText: "Volunteer Now"

    });

    self.tabs.push({
        tabId: 3,
        tabStyle: "deptLink ",
        tabTitle: "Patrol Chaplains",
        tabCaption: "",
        tabImg: "wwwroot/images/people2.jpg",
        pathToImage: "wwwroot/images/mockupPC.jpg",
        pathToPDF: "wwwroot/docs/patrol chaplains brochure.pdf",
        tabContentHeader: "Patrol Chaplains",
        tabContentBody: "Fresno Police chaplains are available 24 hours a day, 365 days a year, to respond to emergent and non-emergent needs of our community.",
        tabContentBodyExt: "",
        hasVideo: false,
        video: "",
        btnText: "Volunteer Now"
    });

    self.tabs.push({
        tabId: 4,
        tabStyle: "commLink ",
        tabTitle: "Zone Ministry",
        tabCaption: "",
        tabImg: "wwwroot/images/people2.jpg",
        pathToImage: "",
        tabContentHeader: "Zone Ministry",
        tabContentBody: "Want to impact your neighborhood? Zone ministry partners your church with the Fresno Police Department to respond to those in your immediate community who are in need of support.",
        tabContentBodyExt: "",
        hasVideo: false,
        video: "",
        btnText: "Become a Church Partner"
    });

    self.tabs.push({
        tabId: 5,
        tabStyle: "blueLink ",
        tabTitle: "Support Blue",
        tabCaption: "",
        tabImg: "wwwroot/images/supportblue.jpg",
        pathToImage: "wwwroot/images/supportblue.jpg",
        pathToPDF: "wwwroot/docs/school chaplains brochure.pdf",
        tabContentHeader: "Support Blue",
        tabContentBody: "Support Blue Fresno is a grassroots effort to broaden support for the men and women who protect our City, <br/> while preventing an anti-law enforcement narrative from gaining traction locally. ",
        tabContentBodyExt: "The Support Blue Fresno campaign aims to: <br/><ul> <li>Foster trust and confidence between our officers and the community they serve</li> <li>Provide opportunity for our community to visibly show their support for law enforcement</li> <li>Educate our youth to enhance relationships and understanding with officers</li></ul>You don’t have to risk your life day in and day out to keep our community safe. All you have to do is support those who do.",
        hasVideo: false,
        video: "",
        btnClass: "supportBlueBtn",
        btnText: "Learn More"
    });
    // the tab that you clicked
    self.selectedTab = ko.observable(self.tabs()[0]);

    //scroll left through brochures
    self.scrollBrochureL = function() {
        var i = 0;
        i = self.selectedTab().tabId;

        switch (i) {
            case 1:
                self.selectedTab(self.tabs()[3]);
                break;
            case 2:
                self.selectedTab(self.tabs()[0]);
                break;
            case 3:
                self.selectedTab(self.tabs()[1]);
                break;
            case 4:
                self.selectedTab(self.tabs()[2]);
                break;
            default:
                break;
        }
        $(".ministriesBrochureImg").attr("src", self.selectedTab().pathToImage);
        $(".ministriesBrochureLink").attr("href", self.selectedTab().pathToPDF);
        console.log(self.selectedTab().pathToImage);
        console.log(self.selectedTab().tabID);
    }

    //scroll right through brochures
    self.scrollBrochureR = function() {
        var i = 0;
        i = self.selectedTab().tabId;

        switch (i) {
            case 1:
                self.selectedTab(self.tabs()[1]);
                break;
            case 2:
                self.selectedTab(self.tabs()[2]);
                break;
            case 3:
                self.selectedTab(self.tabs()[3]);
                break;
            case 4:
                self.selectedTab(self.tabs()[0]);
                break;
            default:
                break;
        }
        $(".ministriesBrochureImg").attr("src", self.selectedTab().pathToImage);
        $(".ministriesBrochureLink").attr("href", self.selectedTab().pathToPDF);
        console.log(self.selectedTab().pathToImage);
        console.log(self.selectedTab().tabID);
    }


    //display brochure mockup based on which tab was selected
    self.showBrochure = function() {
        $(".ministriesBrochureImg").attr("src", self.selectedTab().pathToImage);
        $(".ministriesBrochureLink").attr("href", self.selectedTab().pathToPDF);
        $(".PopUpBkg").show();
        $(".ministriesBrochures").show();
    };

    self.closePopUp = function() {
        console.log("close");
        $(".PopUpBkg").hide();

    };

    self.tabClicked = function() {
        if ($(window).width() <= 768) {
            $("html,body").animate({
                scrollTop: $("#projectInfo").offset().top
            }, 800);

        }
    }
}


//Gallery
var album = function(item) {
    var self = this;
    self.albumTitle = item.albumTitle || "";
    self.albumFolder = item.albumFolder || "";
    self.albumColor = item.albumColor || "";
    self.albumLength = item.albumLength || 0;
    self.albumImages = ko.observableArray([]);
    self.getImages = function(folder, len) {
        var tmpArray = [];
        for (var i = 1; i <= len + 1; i++) {
            tmpArray.push({ imgPath: ko.observable("wwwroot/images/" + folder + "/" + i + ".jpg"), id: i });
        }
        self.albumImages(tmpArray);
    }
}

function GalleryViewModel() {
    var self = this;
    self.albums = [];
    self.albums.push(new album({ albumTitle: "Support Blue Run 2016", albumFolder: "SBRun2016", albumLength: 23, albumColor: "#fff012" }));


    for (var i = 0; i < self.albums.length; i++) {
        self.albums[i].getImages(self.albums[i].albumFolder, self.albums[i].albumLength);
    }
    self.selectedAlbum = ko.observable(self.albums[0]);

    self.selectAlbum = function(data, event) {
        self.selectedAlbum(data);
    }
    self.mainImg = ko.observable("wwwroot/images/" + self.selectedAlbum().albumFolder + "/1.jpg");
    self.imgClicked = function(data, event) {
        var that = $(event.currentTarget);
        self.mainImg(data.imgPath());
        $(".imgActive").removeClass("imgActive");
        that.addClass("imgActive");
        if ($(window).width() < 768) {
            $("html,body").animate({
                scrollTop: $(".galleryImgMain").offset().top - 100
            }, 800);
        }
    }

    self.mainImgClicked = function(data, event) {
        if ($(window).width() < 768) {
            //var domain = "http://localhost:51581"; // TESTING ONLY
            //TODO: before publishing, uncomment this line:
            var domain = "http://supportbluefresno.com";
            var url = domain + self.mainImg();
            window.open(url, '_blank');
        }
    }

    $(".galleryNav > span").on("click", function() {
        var that = this;
        var url = self.mainImg();
        var urlStart = "wwwroot/images/" + self.selectedAlbum().albumFolder + "/";
        var urlEnd = url.substring(url.length - 6, url.length - 1);
        var index = -1;
        if (isNaN(parseInt(urlEnd.charAt(0)))) urlEnd = urlEnd.substring(1, urlEnd.length - 1); //check to see if we've accidentally included the slash
        if (isNaN(parseInt(urlEnd.charAt(1)))) { //check to see if the second character is the .
            index = parseInt(urlEnd.charAt(0));
        } else {
            index = parseInt(urlEnd.substring(0, 2));
        }
        if ($(this).is(".galleryLeft") && index > 1) index--;
        else if (index < self.selectedAlbum().albumLength + 1) index++;
        var newUrl = urlStart + index + ".jpg";
        self.mainImg(newUrl);
        $(".imgActive").removeClass("imgActive");
        var bkgAttr = "url(" + newUrl + ")";
        //todo: fix this line
        $(".galleryImg").each(function() {

            if ($(this).css('backgroundImage') === bkgAttr) { //stop loop
                this.addClass("imgActive");
            }

        });

    })
}

//About
function AboutViewModel() {
    var self = this;

    self.goals = ko.observableArray([]);
    self.goals.push("Bullet points are an effective strategy for separating ideas");
    self.goals.push("We can use them on this page to show how the chaplaincy is helping our community");
    self.goals.push("Isnt this fun!?");
    self.goals.push("Bullet points!!");
}


//Get involved cards
function InvolvementViewModel() {
    var self = this;
    self.cards = ko.observableArray([]);
    self.cards.push({
        cardTitle: "Project STEALTH",
        cardTagline: "Become a mentor for at-risk teens.",
        cardDescription: "<li>Join a network of mentors supporting youth across the city</li> <li>Provide families with resources to help them make a fresh start</li> <li>Build relationships with teens and famililes and bring hope to the hopeless</li>",
        cardColor: "stealthLink stealthBtn"
    }, {
        cardTitle: "Patrol Chaplains",
        cardTagline: "Become a patrol chaplain to support law enforcement officers and our community.",
        cardDescription: " <li>Ride along with officers to non-violent scenes</li> <li>Provide counseling and support to officers, victims, and families</li> <li>Attend community events</li>",
        cardColor: "deptLink deptBtn"
    }, {
        cardTitle: "Project RISE",
        cardTagline: "Become a school chaplain and help children develop resiliency.",
        cardDescription: "<li>Volunteer at elementary schools for 2 hours each week</li> <li>Provide resources and support to children and families</li",
        cardColor: "riseLink riseBtn"
    }, {
        cardTitle: "Zone Ministries",
        cardTagline: "Become a church partner",
        cardDescription: "<li>Partner with the Fresno Police Chaplaincy to bring ministry to those who need it most</li>",
        cardColor: "commLink commBtn"

    });

    self.firstName = ko.observable("First name");
    self.lastName = ko.observable("Last name");
    self.email = ko.observable("Email");
    self.phone = ko.observable("Phone");
    self.address = ko.observable("Address");
    self.city = ko.observable("City");
    self.state = ko.observable("State");
    self.church = ko.observable("Church affiliation");

    self.onSubmit = function() {
        var name = self.firstName();
        alert(name);
    };


    self.closePopUp2 = function() {
        console.log("close");
        $(".PopUpBkg").hide();

    };
}

//Events
function EventsViewModel() {
    var self = this;

    self.events = ko.observableArray([]);

    self.events.push({
        eventId: 1,
        eventDate: "10.9.15",
        eventType: "Upcoming Event",
        eventDescription: "This is a blurb designed to catch the readers interest and make them want to read the news story it describes.",
        eventAction: "Read More | RSVP"
    });

    self.events.push({
        eventId: 2,
        eventDate: "10.10.15",
        eventType: "Something Happened",
        eventDescription: "This is a blurb designed to catch the readers interest and make them want to read the news story it describes.",
        eventAction: "Read More"
    });

    self.events.push({
        eventId: 3,
        eventDate: "10.11.15",
        eventType: "Something Happened",
        eventDescription: "This is a blurb designed to catch the readers interest and make them want to read the news story it describes.",
        eventAction: "Read More"
    });

    self.events.push({
        eventId: 4,
        eventDate: "10.12.15",
        eventType: "Something Happened",
        eventDescription: "This is a blurb designed to catch the readers interest and make them want to read the news story it describes.",
        eventAction: "Read More"
    });

    self.events.push({
        eventId: 5,
        eventDate: "10.13.15",
        eventType: "Upcoming Event",
        eventDescription: "This is a blurb designed to catch the readers interest and make them want to read the news story it describes.",
        eventAction: "Read More | RSVP"
    });
}


//Contact footer
/*
function ContactViewModel() {
    var self = this;

    self.footer = ko.observableArray([]);

    // initialize the array
    self.footer.push({
        footerItemId: 1,
        footerTitle: "Information",
        footerListItems: [
            "Products", "Services", "Benefits"
        ]
    });

    self.footer.push({
        footerItemId: 2,
        footerTitle: "Follow Us",
        footerListItems: [
            "Twitter", "Facebook", "Google+"
        ]
    });

    self.footer.push({
        footerItemId: 3,
        footerTitle: "Contact Us",
        footerListItems: [
            "Email", "Headquarters", "Management"
        ]
    });

    self.footer.push({
        footerItemId: 4,
        footerTitle: "Customer Service",
        footerListItems: [
            "About Us", "Delivery Information", "Privacy Policy"
        ]
    });
}
*/


function initControls() {

    $("#homeBtn").on("click", function() {
        $("html,body").animate({
            scrollTop: $("#home").offset().top - 50
        }, 800);
        $(".active").removeClass("active");
        $("#homeBtn").addClass("active");
        if ($(window).width() <= 768) {
            $(".navbar-collapse").removeClass("in");
            $(".navbar-collapse").addClass("collapse");
        }
    });

    $("#ministriesBtn").on("click", function() {
        $("html,body").animate({
            scrollTop: $("#ministries").offset().top
        }, 800);
        $("a.active").removeClass("active");
        $("#ministriesBtn").addClass("active");
        if ($(window).width() <= 768) {
            $(".navbar-collapse").removeClass("in");
            $(".navbar-collapse").addClass("collapse");
        }
    });

    $("#scrollButton").on("click", function() {
        $("html,body").animate({
            scrollTop: $("#ministries").offset().top
        }, 800);
        $("a.active").removeClass("active");
        $("#ministriesBtn").addClass("active");
    });

    $("#aboutBtn").on("click", function() {
        $("html,body").animate({
            scrollTop: $("#about").offset().top - 50
        }, 800);
        $(".active").removeClass("active");
        $("#aboutBtn").addClass("active");
        if ($(window).width() <= 768) {
            $(".navbar-collapse").removeClass("in");
            $(".navbar-collapse").addClass("collapse");
        }
    });


    $("#galleryBtn").on("click", function() {
        $("html,body").animate({
            scrollTop: $("#gallery").offset().top - 50
        }, 800);
        $(".active").removeClass("active");
        $("#galleryBtn").addClass("active");
        if ($(window).width() <= 768) {
            $(".navbar-collapse").removeClass("in");
            $(".navbar-collapse").addClass("collapse");
        }
    });

    $("#involvementBtn").on("click", function() {
        $("html,body").animate({
            scrollTop: $("#involvement").offset().top - 48
        }, 800);
        $(".active").removeClass("active");
        $("#involvementBtn").addClass("active");
        if ($(window).width() <= 768) {
            $(".navbar-collapse").removeClass("in");
            $(".navbar-collapse").addClass("collapse");
        }
    });

    $("#newsBtn").on("click", function() {
        $("html,body").animate({
            scrollTop: $("#news").offset().top - 50
        }, 800);
        $(".active").removeClass("active");
        $("#newsBtn").addClass("active");
        if ($(window).width() <= 768) {
            $(".navbar-collapse").removeClass("in");
            $(".navbar-collapse").addClass("collapse");
        }
    });

    $("#contactBtn").on("click", function() {
        $("html,body").animate({
            scrollTop: $("#contact").offset().top - 48
        }, 800);
        $(".active").removeClass("active");
        $("#contactBtn").addClass("active");
        if ($(window).width() <= 768) {
            $(".navbar-collapse").removeClass("in");
            $(".navbar-collapse").addClass("collapse");
        }
    });

    $("#ministriesBrowseBtn").on("click", function() {
        $("html,body").animate({
            scrollTop: $("#involvement").offset().top - 50
        }, 800);
        $(".active").removeClass("active");
        $("#involvementBtn").addClass("active");
    });

    $(".learn-more-button").on("click", function() {
        $(".expand-about").css("display", "block");
        $("#about").css("height", "190vh");
        $("html,body").animate({
            scrollTop: $("#videoExpand").offset().top - 50
        }, 800);
    });

    $(".close-video-button").on("click", function() {
        $("html,body").animate({
            scrollTop: $("#about").offset().top - 50
        }, 800);
        $(".active").removeClass("active");
        $("#aboutBtn").addClass("active");
    });

    $(".involvementApplyBTN").on("click", function() {
        $(".involvementPopUp").show();
        $(".PopUpBkg").show();
    });

    $("#ministriesReadButton").on("click", function() {
        $("html,body").animate({
            scrollTop: $(".ministriesInfo").offset().top - 50
        }, 800);
    });

    $(".bottom-event-link").on("click", function() {
        alert("This is going to take you somewhere that will allow you to either read more or RSVP for an upcoming event. ")
    });

    $(".create-event-icon").on("click", function() {
        $("body").css("overflow", "hidden");
        $(".event-creator").css("display", "block");
    });

    $("#cancel-editor-button").on("click", function() {
        $("body").css("overflow-y", "scroll");
        $(".event-creator").css("display", "none");
    });

    //make sure the nav bar is only transparent on the home page
    function setNavTransparency() {
        var height = $(window).scrollTop();
        if (height > $("#ministries").offset().top - 150) {
            $(".down-button-row").show();
            $(".navbar-trans").addClass("navSolid");
            $(".navbar-trans").removeClass("transparent");
        }
    };
    setNavTransparency();

    /* smooth scrolling sections */
    $("a[href*=#]:not([href=#])").click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html,body").animate({
                    scrollTop: target.offset().top - 50
                }, 800);

                if (this.hash == "#home") {
                    $(".scroll-up").hide();
                } else {
                    $(".scroll-up").show();
                }

                // activate animations in this section
                target.find(".animate").delay(1200).addClass("animated");
                setTimeout(function() {
                    target.find(".animated").removeClass("animated");
                }, 2000);

                return false;
            }
        }
    });

    //make sure the right button is highlighted when scrolling
    $(window).scroll(function() {
        var height = $(window).scrollTop();

        if (height > $("#ministries").offset().top - 100) {
            $("down-button-row").show();
            $(".navbar-trans").addClass("navSolid");
            $(".navbar-trans").removeClass("transparent");
        }

        if (height < $("#ministries").offset().top - 100) {
            $("down-button-row").hide();
            $(".active").removeClass("active");
            $("#homeBtn").addClass("active");
            $(".navbar-trans").addClass("transparent");
        } else if (height < $("#about").offset().top - 100) {
            $(".active").removeClass("active");
            $("#ministriesBtn").addClass("active");

        } else if (height < $("#gallery").offset().top - 100) {
            $(".active").removeClass("active");
            $("#aboutBtn").addClass("active");
            $("#goalsContainer").addClass("animated slideInLeft");
            $("#goalsContainer").show();
            $(".mission-container").addClass("animated slideInRight");
            $(".mission-container").delay(300).show();

        } else if (height < $("#involvement").offset().top - 100) {
            $(".active").removeClass("active");
            $("#galleryBtn").addClass("active");

        } else if (height < $("#news").offset().top - 100) {
            $(".active").removeClass("active");
            $("#involvementBtn").addClass("active");
        } else if (height < $("#contact").offset().top - 100) {
            $(".active").removeClass("active");
            $("#newsBtn").addClass("active");
        }

        if (height > $("#contact").offset().top - 100) {
            $(".active").removeClass("active");
            $("#contactBtn").addClass("active");
        } else if (height < $("#ministries").offset().top - 100) {
            $("down-button-row").hide();

        }
        if ($("#homeBtn").hasClass("active")) {
            $("down-button-row").hide();
        }

    });

}


$(document).ready(function() {

    initControls();

    //apply bindings
    ko.applyBindings(new LoginViewModel(), $("#sign-in-link")[0]);
    ko.applyBindings(new LoginViewModel(), $("#exit-login")[0]);
    ko.applyBindings(new LoginViewModel(), $("#login-form")[0]);
    var tabVM = new TabViewModel();
    ko.applyBindings(tabVM, $("#ministries")[0]);
    var galleryVM = new GalleryViewModel();
    ko.applyBindings(galleryVM, $("#gallery")[0]);
    var aboutVM = new AboutViewModel();
    ko.applyBindings(aboutVM, $("#goalsContainer")[0]);
    var involvementVM = new InvolvementViewModel();
    ko.applyBindings(involvementVM, $("#involvementContainer")[0]);
    var eventsVM = new EventsViewModel();
    ko.applyBindings(eventsVM, $("#events")[0]);

    //home page 'seatbelt' animation for the tagline
    setTimeout(function() {
        $(".home-title-container").addClass("fadeIn");
        $(".home-title-container").css("opacity", 1);
        $(".label1").css("display", "inline-block");
        $(".label2").css("display", "inline-block");
        $(".label1").addClass("slideInLeft");
        $(".label2").addClass("slideInRight");
        $("#scroll-button-row").addClass("fadeIn");
        $("#scroll-button-row").css("opacity", 1);

    }, 700);

});
