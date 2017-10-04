// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//= require jquery-1.11.1.min
//= require jquery.turbolinks
//= require jquery_ujs
//= require jquery.videobackground
//= require turbolinks
//= require jquery-migrate-1.2.1.min
//= require main-gsap.min
//= require bootstrap.min
//= require bootstrap-switch
//= require jquery.dataTables.min
//= require lada.min
//= require login-v2
//= require jquery.magnific-popup.min
//= require slick.min
//= require jquery.bxslider
//= require scripts
//= require jquery.barrating.min
//= require bootstrap-toggle.min
//= require i18n
//= require i18n.js
//= require i18n/translations
//= require jquery.cycle.all.js
//= require custom

function add_fields(link, association, content) {  
	event.preventDefault();
    var new_id = new Date().getTime();  
    var regexp = new RegExp("new_" + association, "g");  
    $(link).parent().before(content.replace(regexp, new_id));  
}

function remove_fields(link) {
	event.preventDefault();
	$(link).prevAll("input[type=hidden]").first().val("1");
	$(link).closest(".fields").remove();
}

// -------------------------VALIDATIONS------------------------------------

function dropdown_color(ele)
{
	if($(ele).val().length > 0)
	{
		$(ele).parent().next().text("");
		$(ele).css({color: "#468847", background: "#DFF0D8"});
	}
	else
	{
		$(ele).parent().next().text(I18n.t("js.dropdown_error")).css("font-style", "italic");
		$(ele).css({color: "red", background: "#ECEDEE"});	
	}

}