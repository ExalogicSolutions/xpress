// -------------------------DROPDOWN------------------------------------
function industry_change(ele)
{
  var industryValue = $(ele).val()
    $.ajax({
      async : true,
      type : 'GET',
      url : "/feedback_questions/filter_branch_by_industry", 
      data: {'id': industryValue},   
      success : function(data) {
        $('#add_feedback_question').attr('disabled',true)
        $('#sub_department_branch_drop_down').html(data);       
      },
      error : function(data) {
        alert("Error occured. Please try again!");
      }
    });
}

function department_change(ele)
{
  var departmentValue = $('#department_id').val()
    $.ajax({
      async : true,
      type : 'GET',
      url : "/feedback_questions/filter_sub_department", 
      data: {'id': departmentValue},   
      success : function(data) {
        $('#sub_department_sub_department_drop_down').html(data);       
      },
      error : function(data) {
        alert("Error occured. Please try again!");
      }
    });
}

// -------------------------BRANCH------------------------------------
function list_feedback_questions(ele)
{
  var branchId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/feedback_questions/list_branch_feedback_questions",
    data: {"id": branchId},
    success : function(data) {
      $('#modal-show').html(data);
      $('#modal-show').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function edit_branch_feedback_question(ele)
{
  var questionId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/feedback_questions/"+questionId+"/edit",   
    success : function(data) {
      $('#modal-edit').html(data);
      $('#modal-edit').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function delete_branch_feedback_question(ele)
{
  var questionId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/feedback_questions/get_feedback_question",
    data: {"id": questionId},

    success : function(data) {
      $('#modal-delete').html(data);
      $('#modal-delete').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

// -------------------------DEPARTMENT------------------------------------
function list_department_feedback_questions(ele)
{
  var branchId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/feedback_questions/list_department_feedback_questions",
    data: {"id": branchId},

    success : function(data) {
      $('#modal-show').html(data);
      $('#modal-show').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function edit_department_feedback_question(ele)
{
  var questionId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/feedback_questions/get_feedback_question",   
    data : {'edit_question' : questionId,
             'id' :  questionId
  },
    success : function(data) {
      $('#modal-edit').html(data);
      $('#modal-edit').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function delete_department_feedback_question(ele)
{
  var questionId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/feedback_questions/get_feedback_question",
    data: {"id": questionId},

    success : function(data) {
      $('#modal-delete').html(data);
      $('#modal-delete').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

// -------------------------SUB-DEPARTMENT------------------------------------
function list_sub_department_feedback_questions(ele)
{
  var sub_departmentId = $(ele).attr("id")
  $.ajax({
    async : true,
    type : 'GET',
    url : "/feedback_questions/list_sub_department_feedback_questions",
    data: {"id": sub_departmentId},
    success : function(data) {
      $('#modal-show').html(data);
      $('#modal-show').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function edit_sub_department_feedback_question(ele)
{
  var questionId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/feedback_questions/"+questionId+"/edit",   
    success : function(data) {
      $('#modal-edit').html(data);
      $('#modal-edit').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

function delete_sub_department_feedback_question(ele)
{
  var questionId = $(ele).attr("id");
  $.ajax({
    async : true,
    type : 'GET',
    url : "/feedback_questions/get_feedback_question",
    data: {"id": questionId},

    success : function(data) {
      $('#modal-delete').html(data);
      $('#modal-delete').modal('show');
    },
    error : function(data) {
      alert("Error occured. Please try again!");
    }
  });
}

;
