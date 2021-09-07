// Add script to head
function addScript(src) {
  var script = document.createElement('script');
  script.src = src;
  script.async = false; // чтобы гарантировать порядок
  document.head.appendChild(script);
}

function addStyle(href) {
  var style = document.createElement("link");
  style.href = href;
  style.type = "text/css";
  style.rel = "stylesheet";
  document.head.appendChild(style);
}

addScript('./user/js/libs/vue.js');
addScript('./user/js/libs/Sortable.js');
// addScript('./user/js/libs/vue.min.js');
addScript('./user/js/libs/jquery.min.js');
addScript('./user/js/libs/jquery-ui.min.js');
addScript('./user/js/libs/jquery-migrate.min.js');
addScript('./user/js/libs/jquery.ui.touch-punch.min.js');
addScript('./user/js/libs/jquery.mousewheel.min.js');
addScript('./user/js/libs/jquery.mobile-events.min.js');
addScript('./user/js/libs/baron.min.js');
addScript('./user/js/libs/swiper.min.js');
addScript('./user/js/main.js');
addScript('./user/js/thequietplace.js');
addScript('./user/js/libs/typed.min.js');
addStyle('./user/css/style.min.css');

// InitModule
function InitModule() {
  $(document).ready(function () {
    change_viewport();
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
  });

  $(window).resize(function () {
    change_viewport();
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
  });

  $("body").on("click touch", ".header-icon-menu", function () {
    $("#p_player").addClass("outherHeight");
    $("#p_player").css("z-index", "100000");
    EventBus.$emit("open-menu");
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250)
    setTimeout(function () {
      $('.lmm-menu__nav-item').each(function (key, index) {
        if (($('#contents_old .slide-item.current').index() + 1) == key) {
          $(index).addClass('disable');
        }
        if ($(this).hasClass('visited') || $(this).hasClass('active')) {
          $(index).removeClass('disable');
        }

      });
    }, 250)
  });
  $("body").on("click touch", ".lmm-menu__header-close", function () {
    $("#p_player").removeClass("outherHeight");
    $("#p_player").css("z-index", "100");
    EventBus.$emit("close-menu");
  });
  $("body").on("click mousedown touch", ".js-next", function () {
    dataArea(prevBreakpoint);
    $('#next img:eq(0)').click();
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    progressBar();
    modulNames();
  });
  $("body").on("click mousedown touch", ".js-prev", function () {
    $(document).trigger("stopTyping");
    dataArea(prevBreakpoint);
    $('#prev img:eq(0)').click();
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250)
    progressBar();
    modulNames();
  });

  $("body").on("click", ".next-thequietplace:visible", function () {
    setTimeout(function () {
      dataArea(prevBreakpoint);
    }, 250);
    $('.header-icon-sound').removeClass('hide muted');
    $('#next img').click();
  });

  $("body").on("click", ".block:visible", function () {
    $(this).addClass('visited');
  });
}

// ShutdownModule
function ShutdownModule() {}

function change_viewport() {
  if (window.screen.width >= 720) {
    $("meta[name = viewport]").attr("content", "width=1000, initial-scale=1, maximum-scale=1, user-scalable=1");
  } else if (window.screen.width <= 375) {
    $("meta[name = viewport]").attr("content", "width=375,initial-scale=1");
  } else {
    $("meta[name = viewport]").attr("content", "width=device-width, initial-scale=1");
  }
}


// Костыль для teachbase
if (window.addEventListener) {
  window.addEventListener("load", windowSize, false);
  window.addEventListener("resize", windowSize, false);
} else {
  window.attachEvent("onload", windowSize);
  window.attachEvent("onresize", windowSize);
}

function windowSize() {
  let w = window.innerWidth;
  let htmlWidth = window.parent.document.querySelector('iframe').contentWindow.document.querySelector("html");
  if (w < 719) {
    $(htmlWidth).css("width", "375px");
    $(htmlWidth).css("transform-origin", "left top");
    $(htmlWidth).css("transform", "scale(" + w / 375 + ")");
  } else if (w > 720) {
    $(htmlWidth).css("width", "1280px");
    $(htmlWidth).css("transform-origin", "left top");
    $(htmlWidth).css("transform", "scale(" + w / 1280 + ")");
  } else {
    $(htmlWidth).css("width", "");
    $(htmlWidth).css("transform", "");
  }
}
