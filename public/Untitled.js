$(document).ready(onReady);

function onReady(){
  getList();
  $('#register').on('click', addList);
  $('#outPutTable').on('click', '#complete', completeTask);
}

//ajax functions

function getList(){
  $.ajax({
      type: 'GET',
      url: '/list',
      success: function( response ){
        console.log(response);
        $('#outPutTable').empty();
        $('#outPutTable').append('<tr><th>Item Name</th><th>Description</th><th>completed Y/N</th><th>Remove</th></tr>');
        for (var i = 0; i < response.length; i++) {
          var taskName = response[i].task_name;
          var taskDetails = response[i].task_details;
          var completion = response[i].completed;
          var id = response[i].id;
          $('#outPutTable').append('<tr class="notComplete" id="tr' + id + '">' +
            '<td id="tdTaskName' + id + '"><input id="nameInput' + id + '" class="name" type="text" name="taskName" value="' + taskName + '" value disabled="disabled"></td>' +
            '<td id="tdTaskDetails' + id + '"><input id="detailsInput' + id + '" class="details" type="text" name="Task Description" value="' + taskDetails + '"></td>' +
            '<td id="tdCompleted' + id + '"><button id="complete" type="button" name="Completed">Completion</button></td>' +
            '<td id="tdDelete' + id + '"><button id="delete" type="button" name="Delete">Delete</button></td>');
          if (completion) {
            $('#tr' + id).attr('class', 'complete');
            $('#nameInput' + id).attr('class', 'completedName');
            $('#detailsInput' + id).attr('class', 'completedDetail');
          }
        }

      } //end success
  }); //end ajax
} //end getList

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
