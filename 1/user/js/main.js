var prevBreakpoint = window.innerWidth >= 720 ? 'lg' : 'xs';

window.swipers = [];
window.swipersTwo = [];
window.swipersInst = [];

window.globalFrame = '';

$(window).resize(function () {
  var currentBreakpoint = window.innerWidth >= 720 ? 'lg' : 'xs';

  if (prevBreakpoint != currentBreakpoint) {
    prevBreakpoint = currentBreakpoint;
    dataArea(prevBreakpoint);
  }
});

$(document).ready(function () {
  setTimeout(function () {
    dataArea(prevBreakpoint);
  }, 250)
});

function dataArea(breakpoint) {
  $(".speech-wrap").each(function (el) {
    var _self = $(this);
    $.each($(this).data(), function (key, value) {
      var params = key.split('_');
      if (breakpoint == params[1]) {
        _self.css(params[0], value + 'px');
      }
    });
  });
}

$(document).ready(function () {
  setTimeout(function () {
    dataArea(prevBreakpoint);
  }, 0)
});

function gotoFrame(sFrameId, event) {
  $('.header-icon-sound').hide();

  $(".cl-object").each(function(){
    if($(this).css("display")=="block"){
      $('.header-icon-menu').removeClass('disabled');
      window.globalFrame =  $(this).attr('data-frame-id');
    }
  });
  $("#p_player").removeClass("outherHeight");
  $("#p_player").css("z-index", "100");
  if (sFrameId != "") {
    var jxFrame = CL.axSlides.find("frame[id='" + sFrameId + "']");
    var jxSlide = jxFrame.parents("slide:first");
    sSlideId = jxSlide.attr("id");
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    if (jxSlide.attr("id") != CLZ.sCurrentSlideId) {
      CL.Open.Slide({
        slideid: sSlideId,
      });
      if (!CLF[sFrameId].bIsFirst) {
        CLF[sFrameId].Start();
      }
    } else {
      CLF[sFrameId].Start();
    }
  }
}

function contents() {
  $('.lmm-menu__content .lmm-menu__nav-item.active').removeClass('active');
  current = $('#contents_old .slide-item.current').index();
  $('.lmm-menu__content .lmm-menu__nav-item').eq(current).addClass('active');

  $('#contents_old_default .unvisited').removeClass('allowed').addClass('forbidden').off();


  $('#contents_old .slide-item').filter(function () {
    if (($(this).hasClass('visited') || $(this).hasClass('current')) && !($(this).next().hasClass('forbidden')) && !($(this).hasClass('next_open')) && ($(this).index() != $('#contents_old .slide-item').length - 1)) {
      $(this).addClass('next_open');
    }
  })
}

function progressBar() {
  createRippleActive();
  var current_frame = $(".cl-scale.cl-scale-var").width();
  var total_frame = $(".cl-bar.cl-bar-var").width();
  $(".header__wrapper-progress").css({
    width: (total_frame / current_frame) * 100 + "%",
  });
}

var EventBus = new Vue();

var InitMenu = function () {
  new Vue({
    el: '#lmm-menu',
    data: {
      materials: [{
        name: "Производственная инструкция (часть 1)",
        format: "pdf,",
        size: "110 Кб",
        link: "",
        fileClass: "",
      }],
      menuItems: [{
        name: 'Раздел 1: О курсе',
        id: 'SLIDE_15',
        disabled: false,
        subtopic: false,
      }, {
        name: 'Островок спокойствия',
        id: 'SLIDE_10',
        disabled: false,
        subtopic: true,
      }, {
        name: 'Самодиагностика',
        id: 'SLIDE_11',
        disabled: false,
        subtopic: true,
      }, {
        name: 'Начало истории',
        id: 'SLIDE_12',
        disabled: false,
        subtopic: true,
      }, {
        name: 'Раздел 2: Что такое полезный отдых?',
        id: 'SLIDE_6',
        disabled: false,
        subtopic: false,
      }, {
        name: 'Что делать, если мозг кипит и нервы на пределе?',
        id: 'SLIDE_7',
        disabled: false,
        subtopic: true,
      }, {
        name: 'Когда и как устроить цифровой детокс?',
        id: 'SLIDE_8',
        disabled: false,
        subtopic: true,
      }, {
        name: 'Как выстроить режим дня?',
        id: 'SLIDE_13',
        disabled: false,
        subtopic: true,
      }, {
        name: 'Лучший отдых – это смена деятельности. Так ли это?',
        id: 'SLIDE_14',
        disabled: false,
        subtopic: true,
      }, {
        name: 'Раздел 3: Виды полезного отдыха',
        id: 'SLIDE_16',
        disabled: false,
        subtopic: false,
      }, {
        name: 'Время в интернете с пользой',
        id: 'SLIDE_18',
        disabled: false,
        subtopic: true,
      }, {
        name: 'Культурные мероприятия',
        id: 'SLIDE_19',
        disabled: false,
        subtopic: true,
      }, {
        name: 'Активный отдых',
        id: 'SLIDE_17',
        disabled: false,
        subtopic: true,
      }, {
        name: 'Туризм и путешествия',
        id: 'SLIDE_20',
        disabled: false,
        subtopic: true,
      }, {
        name: 'Раздел 4: Заключение',
        id: 'SLIDE_22',
        disabled: false,
        subtopic: false,
      }, {
        name: 'Самопроверка',
        id: 'SLIDE_21',
        disabled: false,
        subtopic: true,
      }, {
        name: 'Резюме',
        id: 'SLIDE_24',
        disabled: false,
        subtopic: true,
      }],
      glossary: []
    }
  })
}

var LMMComponentsInit = {
  InitMenu: InitMenu,
  Init: function () {
    this.InitMenu();
  },
};

var CourseStore = {
  getExerciseData: function (exercise_name) {
    var session_data = sessionStorage.getItem("course_store_data");

    if (session_data === null) {
      return;
    }

    try {
      return JSON.parse(session_data)[exercise_name];
    } catch (e) {
      return;
    }
  },
  setExerciseData: function (exercise_name, exercise_data) {
    var session_data = sessionStorage.getItem("course_store_data");

    if (session_data === null) {
      session_data = {};
    } else {
      try {
        session_data = JSON.parse(session_data);
      } catch (e) {
        return;
      }
    }

    session_data[exercise_name] = exercise_data;
    sessionStorage.setItem("course_store_data", JSON.stringify(session_data));
  },
};

//Анимация при скролле
function onScrollContent() {
  var contentHeight = $(".lmm-overflow-y-auto:visible")[0].clientHeight;

  $(".lmm-overflow-y-auto:visible").on("scroll", function () {
    $(".animated:visible").each(function () {
      var offset_top = $(this).offset().top;
      var animItem = $(this).hasClass("hidden");
      if (offset_top < contentHeight / 1.5 && animItem) {
        $(this).eq(0).removeClass("hidden");
      }
    });

    $(".animation").each(function () {
      var offset_top = $(this).offset().top;
      var show_attr = $(this).attr("show-attr") == "true";

      if (offset_top < contentHeight / 1 && show_attr) {
        slide_anim($(this).attr("id"));
        $(this).attr("show-attr", "false");
      }
    });
  });
}

function modulNames() {
  var current_frame = $("span.cl-slide-name").text();
  $(".subject").text(current_frame);
}

if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;

    padString = String(typeof padString !== 'undefined' ? padString : ' ');

    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;

      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }

      return padString.slice(0, targetLength) + String(this);
    }
  };
}

(function (ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;

  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
    if (!this) return null;
    if (this.matches(selector)) return this;

    if (!this.parentElement) {
      return null;
    } else return this.parentElement.closest(selector);
  };
})(Element.prototype);

(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }

      return null;
    };
  }
})();


// Buttton Ripple Effect
function createRippleActive() {
  function createRipple(event) {
    var button = event.currentTarget;
    var circle = document.createElement("span");
    var diameter = Math.max(button.clientWidth, button.clientHeight);
    var radius = diameter / 2;
    var buttonCoords = button.getBoundingClientRect();
    circle.style.width = circle.style.height = "".concat(diameter, "px");
    circle.style.left = "".concat(event.clientX - buttonCoords.left - radius, "px");
    circle.style.top = "".concat(event.clientY - buttonCoords.top - radius, "px");
    circle.classList.add("ripple");
    var ripple = button.getElementsByClassName("ripple")[0];
    var disabled = button.classList.contains('disabled');

    if (ripple) {
      button.removeChild(ripple);
    }

    if (disabled) {
      return;
    }

    button.appendChild(circle);
  }

  var $buttons = document.querySelectorAll("button:not(.btn__light)");
  var buttons = [];

  for (var i = 0; i < $buttons.length; i++) {
    buttons.push($buttons[i]);
  }

  buttons.forEach(function (elem) {
    elem.addEventListener("click", createRipple);
  });
}
// Open url and files

var windowObjectReference = null;

var openRequestedPopup = function openRequestedPopup(url, windowName) {
  windowObjectReference = window.open(url, windowName, "resizable,scrollbars,status");
};







$("body").on("click touch", ".header-icon-menu", function () {
  $("#p_player").addClass("outherHeight");
  $("#p_player").css("z-index", "100000");
  EventBus.$emit("open-menu");
  $('.lmm-menu__nav-item').each(function (key, index) {
    if (($('#contents_old .slide-item.current').index() + 1) >= key) {
      $(index).removeClass('disable');
    }
  });
});

$("body").on("click", ".blackout, .frame-text", function () {
  $(this).addClass('hide');
  $('.noti').find('.btn__primary').removeClass("disabled");
  $('.noti').find('.frame-text').addClass('hide');

  if ($('.noti').find('.blackout').hasClass('notification')) {
    $('.noti').find('.notice').removeClass('hide');
    $('.noti').find('.btn__primary').removeClass("disabled");
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#next img').click();
  }
});

$("body").on("click", ".blackout-comics, .frame-text", function () {
  $('.bg-fluid:visible').find('.overlay-comics').addClass('hide');
  $('.bg-fluid:visible').find('.speach-comics').removeClass('hide');
  $('.bg-fluid:visible').find('.btn__primary').removeClass("disabled");
  $('.bg-fluid:visible').find('.frame-text').addClass('hide');
});

$("body").on("click", ".control", function () {
  $(this).toggleClass('pause play');
});


$("body").on("click", ".js-next-inst", function () {
  if (swipers[0].isEnd == true) {
    $('.js-next-inst').removeClass('disabled');
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#next img').click();
  } else {
    $('.swiper-button-next.none').click();
  }
});

$("body").on("click", ".js-next-inst-two", function () {
  if (swipersTwo[0].isEnd == true) {
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#next img').click();
  } else {
    $('.swiper-button-next:visible').eq(0).click();
  }
});

$("body").on("click", ".js-prev-inst-two", function () {
  if (swipersTwo[0].activeIndex == 0) {
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#prev img').click();
  } else {
    $('.swiper-button-prev:visible').eq(0).click();
  }
});


$("body").on("click", ".js-next-inst-three", function () {
  if (swipersTwo[0].isEnd == true) {
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#next img').click();
  } else {
    $('.swiper-button-next:visible').eq(0).click();
  }
});

$("body").on("click", ".js-next-inst-four", function () {
  if (swipersTwo[0].isEnd == true) {
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#next img').click();
  } else {
    $('.swiper-button-next:visible').eq(0).click();
  }
});

$("body").on("click", ".js-prev-inst-four", function () {
  if (swipersTwo[0].activeIndex == 0) {
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#prev img').click();
  } else {
    $('.swiper-button-prev:visible').eq(0).click();
  }
});

// $("body").on("click", ".js-next-inst-five", function () {
//   if (swipersTwo[0].isEnd == true) {
//     $('#next img').click();
//   } else {
//     $('.swiper-button-next:visible').eq(0).click();
//   }
// });

$("body").on("click", ".features--item__inner", function () {
  $(this).toggleClass('flip');
  $('.speech-wrap.hint-tabs:visible').addClass('hide');
});


$("body").on("click", ".priority-icon", function () {
  $(this).toggleClass('selected');

  if ($(this).hasClass('selected')) {
    $('.js-next-inst-five').removeClass('disabled');
  } else {
    $('.js-next-inst-five').addClass('disabled');
  }
});


$("body").on("click", "#demoPlay", function () {
  var selected_element = "demoSound" + $('#notificationSounds').val();
  $('#' + selected_element).get(0).play();
});

$("body").on("click", ".header-icon-sound", function (e) {
  e.preventDefault();
  $(this).toggleClass('muted');

  var meydan = $("#beep")[0];

  if ($(this).hasClass('muted')) {

    meydan.volume = 0;
    meydan.pause();
  } else {
    meydan.volume = 1;
    meydan.play();
  }
});

function tabs() {
  let tabsCollection = $(".tabs");
  tabsCollection.each(function (index, el) {
    $(el)
      .find(".tab__item:not(:first-child)")
      .hide();
    $(el)
      .find(".tabs-tab__links:first-child")
      .addClass("active");
  });
  $(".tabs-tab__links").on("click", onTabClickHandler);

  function onTabClickHandler(event) {
    let target = $(event.currentTarget);
    let linksCollection = target.closest(".tabs").find(".tabs-tab__links");
    linksCollection.each(function () {
      $(this).removeClass("active");
      $($(this).attr("data-href")).hide();
    });

    target.addClass("active");
    target.addClass("visited");
    $(target.attr("data-href")).show();
    $('.speech-wrap.hint-tabs:visible').addClass('hide');

    if ($('.tabs-tab__links:visible.visited').length == $('.tabs-tab__links:visible').length) {
      $('.btn__primary.disabled:visible').removeClass('disabled');
      $('.download-hide:visible').removeClass('visibility-hidden');
    }
  }
}


function tabsImage() {
  let tabsCollection = $(".tabs.image");
  tabsCollection.each(function (index, el) {
    $(el).find(".tab__item").hide();
  });
  $(".tabs-tab__links").on("click", onTabClickHandler);

  function onTabClickHandler(event) {
    let target = $(event.target);
    let linksCollection = target.closest(".tabs").find(".tabs-tab__links");
    linksCollection.each(function () {
      $(this).removeClass("active");
      $($(this).attr("data-href")).hide();
    });

    if (window.screen.width >= 720) {
      var currentImg = target.data("img_lg");
    } else {
      var currentImg = target.data("img_xs");
    }

    if (!target.hasClass('visited')) {
      target.parent().css('background-image', "url(user/images/" + currentImg + ".png)");
      target.next().removeClass('visibility-hidden');
    }

    target.addClass("active");
    target.addClass("visited");
    target.find('.tabs-tab__links-sub').show();
    $(target.attr("data-href")).show();

    $('.speech-wrap.hint-tabs:visible').addClass('hide');

    if ($('.tabs-tab__links:visible.visited').length == $('.tabs-tab__links:visible').length) {
      $('.btn__primary.disabled:visible').removeClass('disabled');
    }
  }
}


function getPluralWord(score) {
  var plural_words = ["балл", "балла", "баллов"];

  if (score === 1) {
    return plural_words[0];
  } else if (score <= 4) {
    return plural_words[1];
  } else {
    return plural_words[2];
  }
}

function clickScale() {
  $('.scals').addClass('scaleTo');
  $('.notice').hide();
  setTimeout(function () {
    $('.scals').addClass('scaleDown');
    setTimeout(function () {
      $('#next img').click();
    }, 500)
  }, 1000)
}

$("body").on("click", ".js-phone-next", function (event) {

  $(this).removeClass('glowing');
  $('.speech-wrap:visible').addClass('hide');
  var block = $(event.target).parent().parent().parent().find('.msg.active');
  if (block.index() == 20) {
    if (prevBreakpoint == 'xs') {
      $('.phone-header').css('background-image', 'url(user/images/header-phone-offline_mobile.svg)');
    } else {
      $('.phone-header').css('background-image', 'url(user/images/header-phone-offline.svg)');
    }
  }
  if (block.index() == 21) {
    $('.btn.btn__back:visible').removeClass('disabled');
  }
  block.removeClass('active').hide();
  block.next().addClass('active show').show();
  if(CLV.oGlobal["chat_1"] >= 1){
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#next img').click();
  }

  if (!block.next().length) {
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#next img').click();
  }
});


$("body").on("click", ".js-phone-next-two", function (event) {

  $(this).removeClass('glowing');
  $('.speech-wrap:visible').addClass('hide');
  var block = $(event.target).parent().parent().parent().find('.msg.active');

  if (block.index() == 8) {
    $('.speech-wrap.hint-answer').removeClass('hint-answer');
    $(this).addClass('disabled');
    // block.removeClass('active').hide();
    block.next().addClass('active show').show();

    var _self = $(this)
    $(".msg-yes").click(function () {
      $('.speech-wrap.answer').addClass('hint-answer');
      _self.removeClass('disabled');
      $('.msg-no').hide();
      $(this).addClass('after-hide');
      $(this).addClass('get-yes');
      $('.msg-text').hide();
      block.next().next().addClass('active show').show();

    });

    $(".msg-no").click(function () {
      _self.removeClass('disabled');
      $('.speech-wrap.answer').addClass('hint-answer');
      $('.msg-yes').hide();
      $(this).addClass('after-hide');
      $(this).addClass('get-no');
      $('.msg-audio').hide();
      block.next().next().addClass('active show').show();
    });
  }
  if(CLV.oGlobal["chat_2"] >= 1){
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#next img').click();
  }
  if (block.index() == 12) {
    $('.btn.btn__back:visible').removeClass('disabled');
  }
  if (block.index() == 13) {
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#next img').eq(0).click();
  }
  

  block.removeClass('active').hide();
  block.next().addClass('active show').show();
  
});

$("body").on("click", ".js-phone-next-inst", function (event) {

  $(this).removeClass('glowing');
  $('.speech-wrap:visible').addClass('hide');
  var block = $(event.target).parent().parent().parent().find('.msg.active');
  block.removeClass('active').hide();
  block.next().addClass('active show').show();

  if (block.index() == 19) {
    $('.btn.btn__back:visible').removeClass('disabled');
  }

  if(CLV.oGlobal["chat_3"] >= 1){
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#next img').click();
  }

  if (!block.next().length) {
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#next img').click();
  }
});


$("body").on("click", ".js-phone-next-inst-two", function (event) {

  $(this).removeClass('glowing');
  $('.speech-wrap:visible').addClass('hide');
  var block = $(event.target).parent().parent().parent().find('.msg.active');
  block.removeClass('active').hide();
  block.next().addClass('active show').show();

  if (block.index() == 6) {
    $(this).addClass('disabled');
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    if(CLV.oGlobal["chat_4"] != 1){
      $("#typing").typed({
        strings: ["Я так рад, что ты мне ответила... Ты мне очень давно нравишься...", " Может как-нибдуь сходим поужинать?", " Давай как-нибудь встретимся...", "Спасибо, Даша!"],
        typeSpeed: 30,
        backDelay: 1500,
        startDelay: 500,
        loop: false,
        contentType: 'html',
        showCursor: false,
        callback: function () {
          $('.js-phone-next-inst-two').removeClass('disabled');
        },
      });
    }
  }
  if (block.index() == 7) {
    $('.btn.btn__back:visible').removeClass('disabled');
  }

  if(CLV.oGlobal["chat_4"] >= 1){
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#next img').click();
  }
  if (!block.next().length) {
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('#next img').click();
  }
});


function swiper() {
  let $swipers = document.querySelectorAll('.swiper-container');
  let swipers = [];

  for (var i = 0; i < $swipers.length; i++) swipers.push($swipers[i]);
  swipers.forEach(function (slider, index) {
    new Swiper(slider, {
      nextButton: slider.querySelector('.swiper-button-next'),
      prevButton: slider.querySelector('.swiper-button-prev'),
      pagination: slider.querySelector('.swiper-pagination'),
      slidesPerView: 3.50,
      centeredSlides: true,
      paginationClickable: true,
      mousewheelControl: false,
      mousewheelForceToAxis: false,
      initialSlide: 0,
      grabCursor: true,
      loop: true,
      breakpoints: {
        719: {
          slidesPerView: 1.45,
        }
      },
    });
  });
}

function swiperModal() {
  let $swipers = document.querySelectorAll('.swiper-container-modal');
  let swipers = [];

  for (var i = 0; i < $swipers.length; i++) swipers.push($swipers[i]);
  swipers.forEach(function (slider, index) {
    new Swiper(slider, {
      threshold: 0,
      spaceBetween: 69,
      observer: true,
      observeParents: true,
      nextButton: slider.querySelector('.swiper-button-next'),
      prevButton: slider.querySelector('.swiper-button-prev'),
      pagination: slider.querySelector('.swiper-pagination'),
      slidesPerView: 1,
      centeredSlides: true,
      paginationClickable: true,
      mousewheelControl: true,
      mousewheelForceToAxis: true,
      initialSlide: 0,
      grabCursor: false,
      // autoHeight: true,
      simulateTouch: false,
      onInit: function () {
        $('.swiper-button-next').addClass('first');
      },

      onSlideChangeStart: function () {
        $(".speech-wrap.hint-slide:visible").addClass('hide');
        $('.swiper-button-next:visible').removeClass('first');
        if (slider.swiper.isEnd) {
          $('.btn.btn__primary:visible').removeClass('disabled');
          $('.download-hide:visible').removeClass('visibility-hidden');
        }
      },
      breakpoints: {
        719: {
          spaceBetween: 54,
        }
      },
    });
  });
}

function swiperInstInterective() {
  $(".speech-wrap").removeClass('hide');
  $('.quiz').hide()
  $('.quiz').delay(1000).fadeIn(500);
  document.querySelectorAll('.interactive').forEach(function (slider, index) {
    let swiper = new Swiper(slider, {
      observer: true,
      observeParents: true,
      nextButton: slider.querySelector('.swiper-inst .swiper-button-next'),
      prevButton: slider.querySelector('.swiper-inst .swiper-button-prev'),
      pagination: slider.querySelector('.swiper-pagination'),
      slidesPerView: 1,
      centeredSlides: true,
      paginationClickable: false,
      mousewheelControl: true,
      mousewheelForceToAxis: true,
      initialSlide: 0,
      simulateTouch: true,
      grabCursor: false,
      noSwiping: true,
      onlyExternal: true,
      effect: 'cube',
      cubeEffect: {
        slideShadows: false,
        shadow: false,
      },
      onSlideChangeEnd: function (e) {
        if (swipers[0].isEnd) {
          $('.js-next-inst').removeClass('disabled');
        }
        if (e.slides[e.activeIndex].querySelector('.quiz')) {
          $('.js-next-inst').addClass('disabled');
          $('.swiper-inst .swiper-button-next').addClass('none');
          $('.swiper-inst .swiper-button-prev').addClass('none');
        }
        $(e.slides[e.activeIndex]).addClass('visited');
        window.currentSwiper = this;
      },
      onSlideChangeStart: function (e) {
        if (swipers[0].isEnd) {
          $('.js-next-inst').removeClass('disabled');
        }
        $(e.slides[e.activeIndex]).addClass('visited');
        $('.js-next-inst').addClass('disabled');
      }
    });
    $('.swiper-slide-inst').eq(0).addClass('visited');
    swipers.push(swiper);
  });
}

function swiperInst() {

  document.querySelectorAll('.preview').forEach(function (slider, index) {
    let swiperTwo = new Swiper(slider, {
      observer: true,
      observeParents: true,
      nextButton: slider.querySelector('.preview .swiper-button-next'),
      prevButton: slider.querySelector('.preview .swiper-button-prev'),
      pagination: slider.querySelector('.swiper-pagination'),
      slidesPerView: 1,
      centeredSlides: true,
      paginationClickable: true,
      mousewheelControl: true,
      mousewheelForceToAxis: true,
      initialSlide: 0,
      grabCursor: false,
      effect: 'cube',
      cubeEffect: {
        slideShadows: false,
        shadow: false,
      },
      onSlideChangeEnd: function (e) {
        $(e.slides[e.activeIndex]).addClass('visited');
      },
      onSlideChangeStart: function (e) {

        // if (swipersInst[0].activeIndex <= 3) {
        //   $('.js-next-inst-five').removeClass('disabled').attr('onClick', "swipersInst[0].slideTo(4);$('.js-next-inst-five').addClass('disabled');");
        // }


        if ($('.swiper-slide-inst:visible.visited').length == $('.swiper-slide-inst:visible').length) {
          $('.js-next-inst, .js-next-inst-two, .js-next-inst-three, .js-next-inst-four, .js-next-inst-five').removeClass('disabled');
        }
        $(e.slides[e.activeIndex]).addClass('visited');
      }
    });
    $('.swiper-slide-inst:visible').eq(0).addClass('visited');
    swipersTwo.push(swiperTwo);
  });
}


function swiperInstTwo() {

  document.querySelectorAll('.preview').forEach(function (slider, index) {
    let swipersInstTwo = new Swiper(slider, {
      observer: true,
      observeParents: true,
      nextButton: slider.querySelector('.preview .swiper-button-next'),
      prevButton: slider.querySelector('.preview .swiper-button-prev'),
      pagination: slider.querySelector('.swiper-pagination'),
      slidesPerView: 1,
      centeredSlides: true,
      paginationClickable: false,
      mousewheelControl: true,
      mousewheelForceToAxis: true,
      initialSlide: 0,
      simulateTouch: true,
      grabCursor: false,
      noSwiping: true,
      onlyExternal: true,
      effect: 'cube',
      cubeEffect: {
        slideShadows: false,
        shadow: false,
      },
      onSlideChangeEnd: function (e) {
        $(e.slides[e.activeIndex]).addClass('visited');
      },
      onSlideChangeStart: function (e) {
        if (swipersInst[0].activeIndex <= 3) {
          $('.js-next-inst-five').removeClass('disabled').attr('onClick', "swipersInst[0].slideTo(4);$('.js-next-inst-five').addClass('disabled');");
        }

        if (swipersInst[0].activeIndex == 4) {
          $('.js-next-inst-five').attr('onClick', "swipersInst[0].slideTo(5);");
        }

        if (swipersInst[0].activeIndex == 5) {
          if($('.priority-icon-1').hasClass('selected')) {
            $('.item-priority-1').removeClass('hide');
          } 
          if($('.priority-icon-2').hasClass('selected')) {
            $('.item-priority-2').removeClass('hide');
          } 
          if($('.priority-icon-3').hasClass('selected')) {
            $('.item-priority-3').removeClass('hide');
          } 
          if($('.priority-icon-4').hasClass('selected')) {
            $('.item-priority-4').removeClass('hide');
          } 
          if($('.priority-icon-5').hasClass('selected')) {
            $('.item-priority-5').removeClass('hide');
          } 
          if($('.priority-icon-6').hasClass('selected')) {
            $('.item-priority-6').removeClass('hide');
          }

          $('.js-next-inst-five').attr('onClick', "swipersInst[0].slideTo(6);");
        }

        if (swipersInst[0].activeIndex == 6) {
          $('.js-next-inst-five').attr('onClick', "swipersInst[0].slideTo(7);");
        }

        if (swipersInst[0].activeIndex == 7) {
          $('.js-next-inst-five').attr('onClick', "swipersInst[0].slideTo(8);$('.js-next-inst-five').addClass('disabled')");
        }

        if (swipersInst[0].activeIndex >= 8) {
          $('.js-next-inst-five').removeClass('disabled');
          $('.js-next-inst-five').attr('onClick', "$('#next img').click();");
        }

        if ($('.swiper-slide-inst:visible.visited').length == $('.swiper-slide-inst:visible').length) {
          $('.js-next-inst, .js-next-inst-two, .js-next-inst-three, .js-next-inst-four, .js-next-inst-five').removeClass('disabled');
        }
        // $('.swiper-slide-inst:visible').eq(0).addClass('visited');
        $(e.slides[e.activeIndex]).addClass('visited');
        // $('.swiper-pagination-bullet').addClass('visited');
      }
    });
    $('.preview .swiper-button-next:visible').addClass('none');
    $('.swiper-slide-inst:visible').eq(0).addClass('visited');
    swipersInst.push(swipersInstTwo);
  });
}

function quiz() {
  document.querySelectorAll(".quiz").forEach(el => el.addEventListener("click", poll));
  setTimeout(function () {
    dataArea(prevBreakpoint);
  }, 0);
  function poll(e) {
    const parent = e.target.closest(".quiz");
    const clicked = e.target.closest(".quiz-option");

    if (clicked.classList.contains("disabled")) {
      return;
    }

    const buttons = {
      "left": parent.querySelector("[data-btn=left]"),
      "right": parent.querySelector("[data-btn=right]")
    };
    buttons[clicked.dataset.btn].classList.add("selected");
    buttons.left.classList.add("disabled");
    buttons.right.classList.add("disabled");

    buttons.left.children[1].innerText = buttons.left.dataset.percent + " %";
    buttons.right.children[1].innerText = buttons.right.dataset.percent + " %";
    const percent = buttons.right.dataset.percent > 50 ? +buttons.right.dataset.percent + 100 : buttons.right.dataset.percent;
    buttons.right.style.flex = '1 1 ' + percent + '%'; // window.currentSwiper.allowSwipeToNext = true;
    // window.currentSwiper.allowSwipeToPrev = true;

    $('.js-next-inst').removeClass('disabled');
    $('.hint-opros').addClass('hide');
    // $('.swiper-inst .swiper-button-next').removeClass('none'); // $('.swiper-inst .swiper-button-prev').removeClass('none');

    if(buttons[clicked.dataset.btn].classList.contains('right-to')){
      $('.js-next-inst').attr('onClick', "swipers[0].slideTo(2);");
    } else if (buttons[clicked.dataset.btn].classList.contains('left-to')){
      $('.js-next-inst').attr('onClick', "swipers[0].slideTo(3);");
    }

    if(swipers[0].activeIndex == 4 || swipers[0].activeIndex == 3) {
      $('.js-next-inst').removeAttr('onClick');
    }
  }
}

function typing_text(id, speed) {
  $('.btn__primary:visible').addClass('disabled');
  $('.btn__back:visible').addClass('disabled');
  var i = 0;
  var txt = $("#" + id).html();
  $("#" + id).html("");
  if (!speed) {
    speed = 150;
  } /* The speed/duration of the effect in milliseconds */
  var typeTimer = setTimeout(typeWriter, speed);

  function typeWriter() {
    if (i < txt.length + 1) {
      if (txt.charAt(i) === '<') i = txt.indexOf('>', i);
      document.getElementById(id).innerHTML = txt.substr(0, i);
      i++;
      setTimeout(typeWriter, speed);
      if (i == txt.length) {
        $('.btn__primary.disabled:visible').removeClass('disabled');
        $('.btn__back.disabled:visible').removeClass('disabled');
      }
    }
  }
}

// Modals
$("body").on("click", ".modal-open", function () {
  $(".overlay[data-target='" + $(this).attr("data-target") + "']").addClass("show");
});

$("body").on("click", ".wrapper--close", function (e) {
  $('.overlay').removeClass('show');
});



$('#my_timer').html('60:00:00');

function startTimer() {
  var my_timer = document.getElementById("my_timer");
  var time = my_timer.innerHTML;
  var arr = time.split(":");
  var h = arr[0];
  var m = arr[1];
  var s = arr[2];

  if (s == 0) {
    if (m == 0) {
      if (h == 0) {
        $('#next_fr td').eq(0).click();
        /*window.location.reload();*/

        return;
      }

      h--;
      m = 60;
      if (h < 10) h = "0" + h;
    }

    m--;
    if (m < 10) m = "0" + m;
    s = 59;
  } else s--;

  if (s < 10) s = "0" + s;
  document.getElementById("my_timer").innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTimer, 1);
}

function downloadApp() {
  function updateTimer(el, status) {
    var smallPie = $(el).find('.pie.lt50');
    var largePie = $(el).find('.pie.fill');
    var ring = $(el).find('.ring');

    if (status < 180) {
      smallPie.css('-webkit-transform', 'rotate(' + status + 'deg)');
    } else if (status == 360) {
      $(el).addClass('done');
      return;
    } else {
      smallPie.addClass('gt50');
      largePie.css('-webkit-transform', 'rotate(' + status + 'deg)');
    }

    ++status;
    setTimeout(function () {
      updateTimer(el, status);
    }, 1);
  }

  var loaders = $('.loader');
  loaders.each(function (idx, ldr) {
    setTimeout(function () {
      updateTimer(ldr, 0);
    }, Math.floor(1000 * Math.random()));
  });
}

function getPluralWordTest(score) {
	var plural_words = ["вопрос", "вопроса", "вопросов"];
	if (score === 1) {
		return plural_words[0]
	} else if (score <= 4) {
		return plural_words[1];
	} else {
		return plural_words[2]
	}
};


function setCommit(){
  var max = parseInt(CLJ['test_q'].nRawScore);
  var test_score = CLV.oGlobal["test_score"];
  CLJ['total'].nRawScore = Math.round(max * 100 / 10);

  if (test_score > max) {
      max = test_score;
      CLJ['test_q'].nRawScore = Math.round(max);
      CLJ['total'].nRawScore = Math.round(max * 100 / 10);
  }
}

function SetFeedback() {
  var test_score = CLV.oGlobal["test_score"];
  $('.test_score').html(Number(test_score));
  $('.declOfNum').html(getPluralWordTest(Number(test_score)));
  $('.header-icon-menu').removeClass('disabled');

  CLJ['test_cont'].nRawScore = parseInt(CLJ['test_cont'].nRawScore) + 1;
  var try_count = parseInt(CLJ['test_cont'].nRawScore);

  if (test_score < 8 && try_count >= 3) {
    $(".incorrect").hide();
    $(".correct").hide();
    $(".incorrectTry").show();
  } else if (test_score >= 8) {
    $(".incorrectTry").hide();
    $(".incorrect").hide();
    $(".correct").show();
  } else {
    $(".incorrectTry").hide();
    $(".correct").hide();
    $(".incorrect").show();
  }
}


function closeModule() {
  if (window.parent.document.querySelector('.dotted-link')) {
    window.parent.document.querySelector('.dotted-link').click();
  } else {
    window.close();
  }
}