// when the document is ready 
$(document).ready(function() {
  // defines the function timeUpdate
  function timeUpdate () {
    // sets the variable currentDate to the current date in the format of DD-MM-YYYY
      var currentDate = dayjs().format("DD-MM-YYYY");
      // sets the variable currentTime to the current time in the format of h:mm:ss A
      var currentTime = dayjs().format("h:mm:ss A");
      // sets the variable currentDay to the current day in the format of dddd. This shows the user the current day of the week
      var currentDay = dayjs().format("dddd");
      //sets the text of the variable with the ID "current-date-time" to the 3 variables above concatenated with strings for readability
      $("#current-date-time").text("Current date: " + currentDay +" " + currentDate + ", Current time: " + currentTime);
  }
//calls the timeUpdate function
  timeUpdate();
  //updates the timeUpdate function every 1000 milliseconds (1 second) to display the real time
  setInterval(timeUpdate, 1000);
});


//when the document is ready
$(document).ready(function() {
  //defines the function updateClasses
  function updateClasses() {
    // creates a variable called currentHour and sets it to the current hour using dayjs
    var currentHour = dayjs().hour();
    // selects all elements with the class of time-block and for each it runs the following function
    $(".time-block").each(function() {
      //creates a variable called timeBlockHour that takes the id of the current element (time-block) and converts it to an integer
      var timeBlockHour = parseInt($(this).attr("id"));
      //if timeBlockHour is less than currentHour
      if (timeBlockHour < currentHour) {
        //add the class of past and remove the classes of present and future
        $(this).addClass("past").removeClass("present future");
      //if timeBlockHour is equal to currentHour
      } else if (timeBlockHour === currentHour) {
        //add the class of present and remove the classes of past and future
        $(this).addClass("present").removeClass("past future");
        //else add the future class
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }
  //calls the updateClasses function and updates every hour 
  updateClasses();
  setInterval(updateClasses, 1000 * 60 * 60); 

  //code for the text area of the time blocks to be retrieved from local storage
  //creates a variable called timeBlockSaves that parses the timeBlockInput from local storage and changes it from a string to an object
  var timeBlockSaves = JSON.parse(localStorage.getItem("timeBlockInput"))
  //following loop iterates over the properties of timeBlockSaves
  //for the variable timeBlockID in timeBlockSaves
  for (var timeBlockID in timeBlockSaves) {
  // select an element with the ID (#) that matches timeBlockID and finds the textarea child within that id
  //it then sets the value of the textarea to the value of timeBlockID in the timeBlockSaves object
    $("#" + timeBlockID).find("textarea").val(timeBlockSaves[timeBlockID]);
  }
});

//when the element with the .saveBtn class is clicked
$(".saveBtn").click(function() {
  //creates a variable called timeBlockSaves that parses the timeBlockInput from local storage and changes it from a string to an object
  //if there is no timeBlockInput in local storage, it creates an object
  var timeBlockSaves = JSON.parse(localStorage.getItem("timeBlockInput")) || {};
  //creates a variable called timeBlockID that selects the parent of the button clicked and then uses .attr to select the id of that parent
  var timeBlockID = $(this).parent().attr("id");
  //creates a variable called timeBlockText that selects the sibling of the button clicked which would be the textarea and uses .val to select it's value
  var timeBlockText = $(this).siblings("textarea").val();
  // adds a proprty (timeBlockId) to timeBlockSaves and sets it's value to timeBlockText
  //basically stores the ID and it's corresponding text in the timeBlockSaves object
  timeBlockSaves[timeBlockID] = timeBlockText;
  localStorage.setItem("timeBlockInput", JSON.stringify(timeBlockSaves));
  

  //creates a toast notification that confirms the time block has been saved to local storage
var saveConfirmationToast = 
`
<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
  <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">Notification</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Time block saved to local storage!
    </div>
  </div>
</div>
  `;
//the following code shows the toast notification and then removes it after 3 seconds with a slow fadeout effect
  $("body").append(saveConfirmationToast);
  $(".toast").toast("show");
  setTimeout(function() {
    $(".toast").fadeOut("slow", function() {
      $(this).remove();
    });
  }, 3000);
})


