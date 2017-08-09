$(document).on('turbolinks:load', function() {

  $(".navbar-burger").on("click", function() {
    if ($(this).hasClass("is-active")) {
      $(this).removeClass("is-active")
      console.log($(this).closest(".navbar").find(".has-dropdown"))
      // $(this).closest(".navbar").find(".has-dropdown").removeClass("is-active")
      $(this).closest(".navbar").find(".navbar-menu").removeClass("is-active")
    }
    else {
      console.log($(this).closest(".navbar").find(".has-dropdown"))
      $(this).addClass("is-active")
      // $(this).closest(".navbar").find(".has-dropdown").addClass("is-active")
      $(this).closest(".navbar").find(".navbar-menu").addClass("is-active")
    }
  });

});

// var burgerMenu = function(el) {

//   this.$el = $(el);
//   this.$dropdown = getDropdown($el);
//   var isActive = false;

//   var 

//   var getDropdown = function(el) {
//     return el.closest(".nav").find(".has-dropdown");
//   };

//   var hideEl = function(el) {
//     el.removeClass("is-active");
//   }

//   var showEl = function(el) {
//     el.addClass("is-active");
//   }

// };