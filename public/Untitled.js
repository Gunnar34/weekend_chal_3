$(document).ready(onReady);

function onReady(){
  getList();
  $('#register').on('click', addList);
  $('#outPutTable').on('click', '#complete', completeTask);
  $('#outPutTable').on('click', '#delete', deleteTask);
  $('#outPutTable').on('click', '#update', updateTask);
}

//ajax functions

function getList(){
  $.ajax({
      type: 'GET',
      url: '/list',
      success: function( response ){
        console.log(response);
        $('#outPutTable').empty();
        $('#outPutTable').append('<tr><th>Item Name</th><th>Description</th><th>Complete</th><th>Remove</th><th>Update</th></tr>');
        for (var i = 0; i < response.length; i++) {
          var taskName = response[i].task_name;
          var taskDetails = response[i].task_details;
          var completion = response[i].completed;
          var id = response[i].id;
          if (!completion) {
            $('#outPutTable').append('<tr class="notComplete" id="tr' + id + '">' +
              '<td id="tdTaskName' + id + '"><input id="nameInput' + id + '" class="name" type="text" name="taskName" value="' + taskName + '" value disabled="disabled"></td>' +
              '<td id="tdTaskDetails' + id + '"><input id="detailsInput' + id + '" class="details" type="text" name="Task Description" value="' + taskDetails + '"></td>' +
              '<td id="tdCompleted' + id + '"><button class="not2' + id + '"id="complete" type="button" name="Completed">Complete</button></td>' +
              '<td id="tdDelete' + id + '"><button class="not' + id + '" id="delete" type="button" name="Delete">Delete</button></td>' +
              '<td id="tdUpdate' + id + '"><button class="not' + id + '" id="update" type="button" name="Update">Update</button></td>');
          }
        }
        for (var j = 0; j < response.length; j++) {
          var taskName1 = response[j].task_name;
          var taskDetails1 = response[j].task_details;
          var completion1 = response[j].completed;
          var id1 = response[j].id;
          if (completion1) {
            $('#outPutTable').append('<tr class="notComplete" id="tr' + id1 + '">' +
              '<td id="tdTaskName' + id1 + '"><input id="nameInput' + id1 + '" class="name" type="text" name="taskName" value="' + taskName1 + '" value disabled="disabled"></td>' +
              '<td id="tdTaskDetails' + id1 + '"><input id="detailsInput' + id1 + '" class="details" type="text" name="Task Description" value="' + taskDetails1 + '"></td>' +
              '<td id="tdCompleted' + id1 + '"><button class="not2' + id1 + '"id="complete" type="button" name="Completed">Complete</button></td>' +
              '<td id="tdDelete' + id1 + '"><button class="not' + id1 + '" id="delete" type="button" name="Delete">Delete</button></td>' +
              '<td id="tdUpdate' + id1 + '"><button class="not' + id1 + '" id="update" type="button" name="Update">Update</button></td>');

              $('#tr' + id1).attr('class', 'complete');
              $('#nameInput' + id1).attr('class', 'completedName');
              $('#detailsInput' + id1).attr('class', 'completedDetail');
              $('.not' + id1).attr('class', 'completeButton');
              $('#c' + id1).attr('ID', 'comp');
              $('.not2' + id1).attr('class', 'comp');
        }
      } //end success
  } //end ajax
  }); //end getList
}

function addList(){
  var taskName = $('#todoName').val();
  var taskDetails = $('#description').val();
  var listToSend = {
    name: taskName,
    details: taskDetails
  };
  $('#todoName').val('');
  $('#description').val('');
  $.ajax({
      type: 'POST',
      url: '/list',
      data: listToSend,
      success: function( response ){
        console.log(response);
        getList();
      } //end success
    }); //end Ajax
} //end addList

function completeTask(){
  var data = $(this).parent();
  console.log(data);
  var taskData = $(data[0]).siblings();
  console.log(taskData);
  var nameHTML = taskData[0].innerHTML;
  console.log(nameHTML);
  var htmlSplit = nameHTML.split('"');
  console.log(htmlSplit);
  var taskName = htmlSplit[9];
  var taskDetails = ((taskData[1].innerHTML).split('"'))[9];
  console.log(taskName, taskDetails);
  var taskToSend = {
    name: taskName,
    details: taskDetails
  };
  $.ajax({
      type: 'POST',
      url: '/listComp',
      data: taskToSend,
      success: function( response ){
        console.log(response);
        getList();
      } //end success
    }); //end Ajax
}


function deleteTask(){
  if (confirm('Are you sure you want to delete this task?')) {
      var data = $(this).parent();
      var taskData = $(data[0]).siblings();
      var taskName = ((taskData[0].innerHTML).split('"'))[9];
      var taskDetails = ((taskData[1].innerHTML).split('"'))[9];
      console.log(taskName, taskDetails);
      var taskToSend = {
        name: taskName,
        details: taskDetails
      };
      $.ajax({
          type: 'DELETE',
          url: '/list',
          data: taskToSend,
          success: function( response) {
            console.log(response);
            getList();
          }
        });
  }
  else {
    alert('Task not deleted');
  }
}

function updateTask(){
  var data = $(this).parent();
  var taskData = $(data[0]).siblings();
  var taskName = ((taskData[0].innerHTML).split('"'))[9];
  var $item = $(this).closest("tr").find(".details").val();
  if ($item == null) {
    var $item = $(this).closest("tr").find(".completedDetail").val();
  }
  console.log($item);
  console.log(taskName);
  var taskToSend = {
    name: taskName,
    details: $item
  };
  $.ajax({
      type: 'POST',
      url: '/listUpdate',
      data: taskToSend,
      success: function( response) {
        console.log(response);
        getList();
      }
    });
}

function appendTable(){

}
