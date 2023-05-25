//==============global variables=================
var winW = $(window).outerWidth();
var winH = $(window).outerHeight();
var indexPage = $("#index_page").length;
var contactPage = $("#contact_page").length;

//console.log(`window width is ${winW}`);

//================ functions starts ====================

//transfer height of source element to destination element
function transferHeight(source, destination) {
  var sourceH = $(source).outerHeight();
  $(destination).outerHeight(sourceH);
}

//set equal height to set of target class
function equalHeight(target) {
  var setHeight = 0;
  $(target).each(function () {
    var getH = $(this).outerHeight();
    if (setHeight < getH) {
      setHeight = getH;
    }
  });
  $(target).outerHeight(setHeight);
}

//get current year
function getCurrentYear() {
  var date = new Date();
  var yearVal = date.getFullYear();
  $(".current_year").text(yearVal);
}

//================== functions ends ================

//################################### document ready function ###########################################

$(document).ready(function (evt) {
  //==============displaying current year==============
  getCurrentYear();

  //========toggle sidebar============
  $("#nav-icon3").click(function () {
    $(this).toggleClass("open");
    $(".sidebar_wrap").toggleClass("open");
  });

  // force click on nav-menu when any link is clicked
  $(".sidebar_wrap .links a").on("click", function () {
    $("#nav-icon3").trigger("click");
  });

  //=====================================index page script========================================
  if (indexPage == 1) {
  }
});

//################################### window load function ##############################################
$(window).on("load", function () {
  setTimeout(function () {
    $(".loader_overlay").fadeOut(300);
  }, 100);
});

//################################### window scroll function ###########################################
$(window).on("scroll", function (e) {
  var scrollTopPos = $(window).scrollTop();

  //lazy loading images
  //html syntax below
  //<img data-lazy-src="path/to/image" alt="" class="">

  $("img[data-lazy-src]").each(function () {
    if ($(this).attr("src") == undefined) {
      var getOffsetTop = $(this).offset().top;
      if (getOffsetTop < scrollTopPos + winH * 2) {
        $(this).attr("src", $(this).attr("data-lazy-src"));
      }
    }
  });
});

//################################### window resize function ###########################################
$(window).on("resize", function () {});

//################### window orientation change function ############################
window.addEventListener("orientationchange", function () {
  location.reload();
});
