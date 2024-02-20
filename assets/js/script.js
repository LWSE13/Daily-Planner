$(document).ready(function() {
  function timeUpdate () {
      var currentDate = dayjs().format("DD-MM-YYYY");
      var currentTime = dayjs().format("h:mm:ss A");
      var currentDay = dayjs().format("dddd");
      $("#current-date-time").text("Current date: " + currentDay +" " + currentDate + ", Current time: " + currentTime);
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

  $("body").append(saveConfirmationToast);
  $(".toast").toast("show");
  setTimeout(function() {
    $(".toast").fadeOut("slow", function() {
      $(this).remove();
    });
  }, 3000);
})


