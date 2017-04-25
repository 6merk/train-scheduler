
// Initialize Firebase
 var config = {
    apiKey: "AIzaSyDFPUyTdBtcKpjG4OhB4GicmhN0hJhwJeQ",
    authDomain: "train-times-cb0fa.firebaseapp.com",
    databaseURL: "https://train-times-cb0fa.firebaseio.com",
    storageBucket: "train-times-cb0fa.appspot.com",
    messagingSenderId: "848314084055"
  };
  firebase.initializeApp(config);
  



var indexInput = firebase.database();

// on click function to submit info from html
$("#trainbtn").on("click", function() {

  // grabs the user input
  var trainName = $("#nameinput").val().trim();
  var destination = $("#destinationinput").val().trim();
  var firstTrainUnix = moment($("#firstinput").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequencyinput").val().trim();

  // local storage
  var newTrain = {

    name: trainName,
    destination: destination,
    firstTrain: firstTrainUnix,
    frequency: frequency
  };

  // pushes data to firebase
  indexInput.ref().push(newTrain);

  
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(firstTrainUnix);
  console.log(newTrain.frequency);

  // Alert
  alert("A train has been added");

  // resets all text boxes
  $("#nameinput").val("");
  $("#destinationinput").val("");
  $("#firstinput").val("");
  $("#frequencyinput").val("");

  // Determine when the next train arrives.
  return false;
});

// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
indexInput.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstInput = childSnapshot.val().firstTrain;

  
  var differenceTimes = moment().diff(moment.unix(tFirstInput), "minutes");
  var tRemainder = moment().diff(moment.unix(tFirstInput), "minutes") % tFrequency;
  var tMinutes = tFrequency - tRemainder;

  
  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  console.log(tMinutes);
  console.log(tArrival);
  console.log(moment().format("hh:mm A"));
  console.log(tArrival);
  console.log(moment().format("X"));


  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>"
  + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});
