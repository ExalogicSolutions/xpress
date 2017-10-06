function industry_change(ele)
{
  $("#branch_id").get(0).selectedIndex = 0;
  $("#department_id").get(0).selectedIndex = 0;
  var industryValue = $(ele).val()
    $.ajax({
      async : true,
      type : 'GET',
      url : "/menus/filter_branch_by_industry", 
      data: {'id': industryValue},   
      success : function(data) {
        $('#branch_drop_down').html(data);  
        if(industryValue == ""){
          $("#branch_id").attr('disabled',true) 
        }     
      },
      error : function(data) {
        alert("Error occured. Please try again!");
      }
    });
}
function branch_change(ele)
{
    $("#department_id").get(0).selectedIndex = 0;
  
  var branchValue = $(ele).val()
    $.ajax({
      async : true,
      type : 'GET',
      url : "/menus/filter_department", 
      data: {'id': branchValue},   
      success : function(data) {
        $('#department_drop_down').html(data);       
        if(branchValue == ""){
          $("#department_id").attr('disabled',true) 
        }
      },
      error : function(data) {
        alert("Error occured. Please try again!");
      }
    });
 
}
function delete_menu(ele)
{
  var menuId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/menus/get_menu",
    data: {"id": menuId},

    success : function(data) {
      $('#modal-delete').html(data);
      $('#modal-delete').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function get_menu(ele)
{
  var menuId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/menus/show_menu",
    data: {"id": menuId},

    success : function(data) {
      $('#modal-show').html(data);
      $('#modal-show').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}
;
