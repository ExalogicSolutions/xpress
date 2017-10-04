function validate_department(){
  var c=0;
  if($("#industry_id :selected").val().length <= 0)
  {
    $("#industry_id").parent().next().text(I18n.t('js.name_error')).css("font-style", "italic");
    $("#industry_id").parent().effect("shake");
    c=c+1
  }
  else
  {
    $("#industry_id").parent().next().empty();
  }
    if($("#branch_id :selected").val().length <= 0)
  {
    $("#branch_id").parent().next().text(I18n.t('js.name_error')).css("font-style", "italic");
    $("#branch_id").parent().effect("shake");
    c=c+1
  }
  else
  {
    $("#branch_id").parent().next().empty();
  }
  if($("#name").val().length < 3)
  {
    $(".name-error").prev().children('input[type=text]').css({color: "red", background: "#ECEDEE"});
    $(".name-error").text(I18n.t('js.name_error')).css("font-style", "italic");
    $("#name_div").effect("shake");
    c=c+1
  }
  else
  {
    $(".name-error").prev().children('input[type=text]').css({color: "#468847", background: "#DFF0D8"});
    $(".name-error").empty();
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




function validate_department_head(){
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

function industryDropDown(ele){
  var industryValue = $('#industry_id').val()
  if($('#industry_id').val().length>0){
    dropdown_color(ele);
    $.ajax({
      async : true,
      type : 'GET',
      url : "/departments/filter_branch", 
      data: {'id': industryValue},   
      success : function(data) {
        $('#branch_drop_down').html(data);       
      },
      error : function(data) {
        alert("Error occured. Please try again!");
      }
    });
  }
  else
  {
       dropdown_color(ele);       
       $("#branch_id").get(0).selectedIndex = 0;
       $('#branch_id').attr("disabled","disabled");
       $("#industry_id").parent().effect("shake");
  }
  }

function edit_sub_dept_head(ele)
{
  var sub_departmentHeadId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/sub_departments/sub_department_head_edit_form",
    data: {"head_id": sub_departmentHeadId},
   
    success : function(data) {
      $('#modal-edit-show').html(data);
      $('#modal-edit-show').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function list_modal(ele){
   var id = $(ele).attr('id')

  $.ajax({
    async : true,
    type : 'GET',
    url : "/departments/view_details", 
    data: {'id': id},   
    success : function(data) {
      $('#modal-list').html(data);
      $('#modal-list').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function new_department_create(ele) {
  $.ajax({
    async : true,
    type : 'GET',
    url : "/departments/new",    
    success : function(data) {
      $('#modal-responsive').html(data);
      $('#modal-responsive').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

 function edit_department(ele) {
   var departmentId = $(ele).closest('td').attr("id");
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

function delete_department(ele) {
  var departmentId = $(ele).closest('td').attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/departments/get_department_delete",
    data: {"id": departmentId},
   
    success : function(data) {
      $('#modal-destroy').html(data);
      $('#modal-destroy').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function assign_head(ele) {
  var departmentId = $(ele).closest('td').attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/departments/assign_department_head",
    data: {"id": departmentId},
   
    success : function(data) {
      $('#modal-assign').html(data);
      $('#modal-assign').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}
function show_head(ele) {
  var departmentId = $(ele).closest('td').attr("id");
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
      $('#modal-edit_head').html(data);
      $('#modal-edit_head').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function new_sub_department_create(ele) {
  $.ajax({
    async : true,
    type : 'GET',
    url : "/sub_departments/new",    
    success : function(data) {
      $('#modal-responsive').html(data);
      $('#modal-responsive').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function edit_sub_department(ele) {
  var sub_departmentId = $(ele).closest('td').attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/sub_departments/"+sub_departmentId+"/edit",
   
    success : function(data) {
      $('#modal-responsive').html(data);
      $('#modal-responsive').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function delete_sub_department(ele) {
  var sub_departmentId = $(ele).closest('td').attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/sub_departments/get_sub_department",
    data: {"id": sub_departmentId},

    success : function(data) {
      $('#modal-delete').html(data);
      $('#modal-delete').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}



function create_sub_department_head(ele) {
  var sub_departmentId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/sub_departments/sub_department_head_form",
    data: {"id": sub_departmentId},
   
    success : function(data) {
      $('#modal-responsive').html(data);
      $('#modal-responsive').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function show_sub_department_head(ele) {
  var sub_departmentId = $(ele).closest('td').attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/sub_departments/show_sub_department_head",
    data: {"head_id": sub_departmentId},
   
    success : function(data) {
      $('#modal-edit-show1').html(data);
      $('#modal-edit-show1').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}
