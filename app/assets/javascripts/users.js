// ---------------------------USER--------------------------------
function create_staff()
{
	$.ajax({
		async : true,
		type : 'GET',
		url : "/users/new",
		success : function(data) {
			$('#modal-new').html(data);
			$('#modal-new').modal('show');
		},
		error : function(data) {
			alert("Error occured. Please try again!");
		}
	});
}

function show_head_details(ele)
{
	var headId = $(ele).attr("id");
	$.ajax({
		async : true,
		type : 'GET',
		url : "/users/show_head_details",
		data: {"id": headId},   
		success : function(data) {
			$('#modal-show').html(data);
			$('#modal-show').modal('show');
		},
		error : function(data) {
			alert("Error occured. Please try again!");
		}
	});
}

function edit_head_details(ele)
{
	var headId = $(ele).attr("id");
	$.ajax({
		async : true,
		type : 'GET',
		url : "/users/"+headId+"/edit",
		data: {"id": headId},
		success : function(data) {
			$('#modal-edit').html(data);
			$('#modal-edit').modal('show');
		},
		error : function(data) {
			alert("Error occured. Please try again!");
		}
	});
}

// ---------------------------DROPDOWN--------------------------------
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
      url : "/users/filter_department", 
      data: {'id': branchValue},   
      success : function(data) {
        $('#department_drop_down').html(data);       
      },
      error : function(data) {
        alert("Error occured. Please try again!");
      }
 })
}
