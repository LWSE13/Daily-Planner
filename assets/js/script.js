$(document).ready(function() {
  function timeUpdate () {
      var currentDate = dayjs().format('YYYY-MM-DD');
      var currentTime = dayjs().format('h:mm:ss A');
      $('#current-date-time').text('Current date: ' + currentDate + ', Current time: ' + currentTime);
  }

  timeUpdate();
  setInterval(timeUpdate, 1000);
});
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});



//when document is ready run the following function
$(document).ready(function() {
  function updateClasses() {
    //creates a variable that uses dayjs to get the current hour
    var currentHour = dayjs().hour();
    //selects each time block class and runs the following function
    $('.time-block').each(function() {
      //creates a variable timeBlockHour that uses parse to convert the id from a string to an integer
      var timeBlockHour = parseInt($(this).attr('id'));
      //if timeBlockHour is less than the current hour
      if (timeBlockHour < currentHour) {
        //$ selects this (the current time block) and adds the past class and removes the other classes 
        $(this).addClass('past').removeClass('present future');
        //code repeated for equal using an else if statement 
      } else if (timeBlockHour === currentHour) {
        $(this).addClass('present').removeClass('past future');
      } else {
        $(this).addClass('future').removeClass('past present');
      }
    });
  }

  updateClasses();
  //updates every hour (1 second x 60 seconds x 60 minutes = 1 hour or 3600000 milliseconds)
  setInterval(updateClasses, 1000 * 60 * 60); 
});

