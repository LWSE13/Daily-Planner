$(document).ready(function() {
  function timeUpdate () {
      var currentDate = dayjs().format("YYYY-MM-DD");
      var currentTime = dayjs().format("h:mm:ss A");
      $("#current-date-time").text("Current date: " + currentDate + ", Current time: " + currentTime);
  }

  timeUpdate();
  setInterval(timeUpdate, 1000);
});



$(document).ready(function() {
  function updateClasses() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function() {
      var timeBlockHour = parseInt($(this).attr("id"));
      if (timeBlockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (timeBlockHour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }
  updateClasses();
  setInterval(updateClasses, 1000 * 60 * 60); 

  var timeBlockSaves = JSON.parse(localStorage.getItem("timeBlockInput"))
  for (var timeBlockID in timeBlockSaves) {
  
    $("#" + timeBlockID).find("textarea").val(timeBlockSaves[timeBlockID]);
  }
});


$(".saveBtn").click(function() {
  var timeBlockSaves = JSON.parse(localStorage.getItem("timeBlockInput")) || {};
  var timeBlockID = $(this).parent().attr("id");
  var timeBlockText = $(this).siblings("textarea").val();
  timeBlockSaves[timeBlockID] = timeBlockText;
  localStorage.setItem("timeBlockInput", JSON.stringify(timeBlockSaves));
  
})


