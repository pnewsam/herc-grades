$(document).on('turbolinks:load', function() {
  
  $(".navbar-burger").on("click", function() {
    toggleBurger(this);
  });

});

var toggleBurger = function(el) {

  var navbarBurger, dropDown;
  navbarBurger = $(el);
  navbarMenu = navbarBurger.closest(".navbar").find(".navbar-menu")
  isActive = navbarBurger.hasClass("is-active")

  var toggleClass = function() {
    if (isActive) {
      navbarBurger.removeClass("is-active")
      navbarMenu.removeClass("is-active")
    }
    else {
      navbarBurger.addClass("is-active")
      navbarMenu.addClass("is-active")
    }
  };

  toggleClass();
};
