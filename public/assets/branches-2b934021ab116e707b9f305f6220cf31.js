// ------------------------- VALIDATION------------------------------------

function validate_branch(){
  var c=0;
    $(".form_dropdown :selected").each(function(){
    if($(this).val().length == 0){
      $(this).css({color: "red", background: "#ECEDEE"});
      $(this).parent().parent().next().text(I18n.t("js.dropdown_error")).css("font-style", "italic");
      $(this).parent().parent().effect("shake");
      c=c+1;
    }
    else{
      $(this).css({color: "#468847", background: "#DFF0D8"});
      $(this).parent().parent().next(".dropdown-error").empty();
    }
  })
  if($("#name").val().length < 3)
  {
    $(".name-error").prev('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".name-error").text(I18n.t('js.name_error')).css("font-style", "italic");
    $("#name_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".name-error").prev('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".name-error").empty();
  }
  if($("#address_line1").val().length < 3)
  {
    $(".address_line1-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".address_line1-error").text(I18n.t('js.address_line1_error')).css("font-style", "italic");
    $("#address_line1_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".address_line1-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".address_line1-error").empty();
  }
  if($("#city").val().length < 3)
  {
    $(".city-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".city-error").text(I18n.t('js.city_error')).css("font-style", "italic");
    $("#city_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".city-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".city-error").empty();
  }
  if($("#pincode").val().length < 6)
  {
    $(".pincode-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".pincode-error").text(I18n.t('js.pincode_error')).css("font-style", "italic");
    $("#pincode_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".pincode-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".pincode-error").empty();
  }
  if($("#state").val().length < 3)
  {
    $(".state-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".state-error").text(I18n.t('js.state_error')).css("font-style", "italic");
    $("#state_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".state-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".state-error").empty();
  }
  if($("#country").val().length < 3)
  {
    $(".country-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".country-error").text(I18n.t('js.country_error')).css("font-style", "italic");
    $("#country_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".country-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".country-error").empty();
  }
  if($("#contact_number").val().length < 10)
  {
    $(".contact_number-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".contact_number-error").text(I18n.t('js.contact_number_error')).css("font-style", "italic");
    $("#contact_number_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".contact_number-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".contact_number-error").empty();
  }
  if(c > 0)
    return false;
  else
    return true;
}

function validate_branch_head(){
  alert()
  var c=0;
  if($("#first_name").val().length < 3)
  {
    $(".first_name-error").prev('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".first_name-error").text(I18n.t('js.first_name_error')).css("font-style", "italic");
    $("#first_name_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".first_name-error").prev('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".first_name-error").empty();
  }
  if($("#last_name").val().length < 3)
  {
    $(".last_name-error").prev('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".last_name-error").text(I18n.t('js.last_name_error')).css("font-style", "italic");
    $("#last_name_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".last_name-error").prev('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".last_name-error").empty();
  }
  if($("#user_name").val().length < 3)
  {
    $(".user_name-error").prev('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".user_name-error").text(I18n.t('js.user_name_error')).css("font-style", "italic");
    $("#user_name_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".user_name-error").prev('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".user_name-error").empty();
  }
  if(! isValidEmailAddress($("#email").val())){
    $(".email-error").prev().children('input[type=email]').css({color: "red", background: "#ECEDEE"});
    $(".email-error").text(I18n.t('js.name_error')).css("font-style", "italic");
    $("#email_div").effect("shake");
    c=c+1
  }
  else{
    $(".email-error").prev().children('input[type=email]').css({color: "#468847", background: "#DFF0D8"});
    $(".email-error").empty();
  }

  if($("#address_line1").val().length < 3)
  {
    $(".address_line1-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".address_line1-error").text(I18n.t('js.address_line1_error')).css("font-style", "italic");
    $("#address_line1_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".address_line1-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".address_line1-error").empty();
  }
  if($("#city").val().length < 3)
  {
    $(".city-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".city-error").text(I18n.t('js.city_error')).css("font-style", "italic");
    $("#city_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".city-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".city-error").empty();
  }
  if($("#pincode").val().length < 6)
  {
    $(".pincode-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".pincode-error").text(I18n.t('js.pincode_error')).css("font-style", "italic");
    $("#pincode_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".pincode-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".pincode-error").empty();
  }
  if($("#state").val().length < 3)
  {
    $(".state-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".state-error").text(I18n.t('js.state_error')).css("font-style", "italic");
    $("#state_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".state-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".state-error").empty();
  }
  if($("#country").val().length < 3)
  {
    $(".country-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".country-error").text(I18n.t('js.country_error')).css("font-style", "italic");
    $("#country_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".country-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".country-error").empty();
  }
  if($("#contact_number").val().length < 10)
  {
    $(".contact_number-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".contact_number-error").text(I18n.t('js.contact_number_error')).css("font-style", "italic");
    $("#contact_number_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".contact_number-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".contact_number-error").empty();
  }
  if(c > 0)
    return false;
  else
    return true;
}


function validate_first_name(ele){
  var box = $(ele).val();
  if(box.length < 3){
    $(".first_name-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".first_name-error").text(I18n.t('js.name_error')).css("font-style", "italic");
    $("#first_name_div").effect("shake");
    return false;
  }
  else{
    $(".first_name-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".first_name-error").empty();
    return true;
  }}

function validate_last_name(ele){
  var box = $(ele).val();
  if(box.length < 3){
    $(".last_name-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".last_name-error").text(I18n.t('js.name_error')).css("font-style", "italic");
    $("#last_name_div").effect("shake");
    return false;
  }
  else{
    $(".last_name-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".last_name-error").empty();
    return true;
  }
}

function validate_user_name(ele){
  var box = $(ele).val();
  if(box.length < 3){
    $(".user_name-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".user_name-error").text(I18n.t('js.name_error')).css("font-style", "italic");
    $("#user_name_div").effect("shake");
    return false;
  }
  else{
    $(".user_name-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".user_name-error").empty();
    return true;
  }
}

function validate_email(ele){
  var box = $(ele).val();
  if(! isValidEmailAddress($(ele).val())){
    $(".email-error").prev().children('input[type=email]').css({color: "red", background: "#ECEDEE"});
    $(".email-error").text(I18n.t('js.name_error')).css("font-style", "italic");
    $("#email_div").effect("shake");
    return false;
  }
  else{
    $(".email-error").prev().children('input[type=email]').css({color: "#468847", background: "#DFF0D8"});
    $(".email-error").empty();
    return true;
  }
}
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}


function validate_name(ele){
  var box = $(ele).val();
  if(box.length < 3){
    $(".name-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".name-error").text(I18n.t('js.name_error')).css("font-style", "italic");
    $("#name_div").effect("shake");
    return false;
  }
  else{
    $(".name-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".name-error").empty();
    return true;
  }
}

function validate_address_line1(ele){
  var box = $(ele).val();
  if(box.length < 3){
    $(".address_line1-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".address_line1-error").text(I18n.t('js.address_line1_error')).css("font-style", "italic");
    $("#address_line1_div").effect("shake");
    return false;
  }
  else{
    $(".address_line1-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".address_line1-error").empty();
    return true;
  }
}

function validate_city(ele){
  var box = $(ele).val();
  if(box.length < 3){
    $(".city-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".city-error").text(I18n.t('js.city_error')).css("font-style", "italic");
    $("#city_div").effect("shake");
    return false;
  }
  else{
    $(".city-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".city-error").empty();
    return true;
  }
}

function validate_pincode(ele){
  var box = $(ele).val();
  if(box.length < 6){
    $(".pincode-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".pincode-error").text(I18n.t('js.pincode_error')).css("font-style", "italic");
    $("#pincode_div").effect("shake");
    return false;
  }
  else{
    $(".pincode-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".pincode-error").empty();
    return true;
  }
}

function validate_state(ele){
  var box = $(ele).val();
  if(box.length < 3){
    $(".state-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".state-error").text(I18n.t('js.state_error')).css("font-style", "italic");
    $("#state_div").effect("shake");
    return false;
  }
  else{
    $(".state-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".state-error").empty();
    return true;
  }
}

function validate_country(ele){
  var box = $(ele).val();
  if(box.length < 3){
    $(".country-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".country-error").text(I18n.t('js.country_error')).css("font-style", "italic");
    $("#country_div").effect("shake");
    return false;
  }
  else{
    $(".country-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".country-error").empty();
    return true;
  }
}

function validate_contact_number(ele){
  var box = $(ele).val();
  if(box.length < 10){
    $(".contact_number-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".contact_number-error").text(I18n.t('js.contact_number_error')).css("font-style", "italic");
    $("#contact_number_div").effect("shake");
    return false;
  }
  else{
    $(".contact_number-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".contact_number-error").empty();
    return true;
  }
}

// -------------------------BRANCH------------------------------------

function create_branch()
{
	$.ajax({
		async : true,
		type : 'GET',
		url : "/branches/new",
		success : function(data) {
			$('#modal-new').html(data);
			$('#modal-new').modal('show');
		},
		error : function(data) {
			alert("Error occured. Please try again!");
		}
	});
}

function edit_branch(ele)
{
  var branchId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/branches/"+branchId+"/edit",
    success : function(data) {
      $('#modal-edit').html(data);
      $('#modal-edit').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function delete_branch(ele)
{
  var branchId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/branches/get_branch",
    data: {"id": branchId},

    success : function(data) {
      $('#modal-delete').html(data);
      $('#modal-delete').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function list_branches(ele)
{
	var industryId = $(ele).attr("id");
	$.ajax({
		async : true,
		type : 'GET',
		url : "/branches/list",
		data: {"id": industryId},
		success : function(data) {
			$('#modal-show').html(data);
			$('#modal-show').modal('show');
		},
		error : function(data) {
			alert("Error occured. Please try again!");
		}
	});
}

// -------------------------BRANCH HEAD------------------------------------
function create_branch_head(ele)
{
	var branchId = $(ele).attr("id");
	$.ajax({
		async : true,
		type : 'GET',
		url : "/branches/branch_head_form",
		data: {"id": branchId},   
		success : function(data) {
			$('#modal-new-head').html(data);
			$('#modal-new-head').modal('show');
		},
		error : function(data) {
			alert("Error occured. Please try again!");
		}
	});
}

function show_branch_head(ele)
{
	var branchHeadId = $(ele).attr("id");
	$.ajax({
		async : true,
		type : 'GET',
		url : "/branches/show_branch_head",
		data: {"head_id": branchHeadId},   
		success : function(data) {
			$('#modal-show-head').html(data);
			$('#modal-show-head').modal('show');
		},
		error : function(data) {
			alert("Error occured. Please try again!");
		}
	});
}

function edit_branch_head(ele)
{
	var branchHeadId = $(ele).attr("id");
	$.ajax({
		async : true,
		type : 'GET',
		url : "/branches/branch_head_edit_form",
		data: {"head_id": branchHeadId},
		success : function(data) {
			$('#modal-edit-head').html(data);
			$('#modal-edit-head').modal('show');
		},
		error : function(data) {
			alert("Error occured. Please try again!");
		}
	});
}

// -------------------------DEPARTMENT------------------------------------
function create_department(ele)
{
	var branchId = $(ele).attr("branch_id");
	$.ajax({
		async : true,
		type : 'GET',
		url : "/departments/new",
		data: {"branch_id" : branchId},
		success : function(data) {
			$('#modal-new').html(data);
			$('#modal-new').modal('show');
		},
		error : function(data) {
			alert("Error occured. Please try again!");
		}
	});
}

function edit_department(ele)
{
	var departmentId = $(ele).attr("id");
	$.ajax({
		async : true,
		type : 'GET',
		url : "/departments/"+departmentId+"/edit",
		success : function(data) {
			$('#modal-edit').html(data);
			$('#modal-edit').modal('show');
		},
		error : function(data) {
			alert("Error occured. Please try again!");
		}
	});
}

function delete_department(ele)
{
	var departmentId = $(ele).attr("id");
	$.ajax({
		async : true,
		type : 'GET',
		url : "/departments/get_department_delete",
		data: {"id": departmentId},
		success : function(data) {
			$('#modal-delete').html(data);
			$('#modal-delete').modal('show');
		},
		error : function(data) {
			alert("Error occured. Please try again!");
		}
	});
}

// -------------------------DEPARTMENT HEAD------------------------------------
function create_department_head(ele)
{
  var departmentId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/departments/assign_department_head",
    data: {"id": departmentId},   
    success : function(data) {
      $('#modal-new').html(data);
      $('#modal-new').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function show_department_head(ele)
{
  var departmentId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/departments/show_department_head",
    data: {"id": departmentId},   
    success : function(data) {
      $('#modal-show').html(data);
      $('#modal-show').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function edit_head(ele) {
  var departmentId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/departments/edit_department_head",
    data: {"id": departmentId},   
    success : function(data) {
      $('#modal-edit').html(data);
      $('#modal-edit').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}
;
