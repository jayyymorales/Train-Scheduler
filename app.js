var config = {
    apiKey: "AIzaSyC7RrxF_-iQvQIyxRZNgXptFYV6nuiJxKg",
    authDomain: "train-database-a0a88.firebaseapp.com",
    databaseURL: "https://train-database-a0a88.firebaseio.com",
    projectId: "train-database-a0a88",
    storageBucket: "train-database-a0a88.appspot.com",
    messagingSenderId: "355917461341"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#run-search").on("click", function() {
    event.preventDefault();
    trainName = $("#nameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrainTime = $("#firstInput").val().trim();
    frequencyTime = $("#frequencyInput").val().trim();

    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequencyTime: frequencyTime
    };

    database.ref().push(newTrain);

    $("#nameInput").val("");
    $("#destinationInput").val("");
    $("#firstInput").val("");
    $("#frequencyInput").val("");
});

database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequencyTime = childSnapshot.val().frequencyTime;
    var currentTime = moment();
    var nextTrain = "";
    var tRemainder = "";

    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");

    // Current Time
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequencyTime;

    // Minute Until Train
    var tMinutesTillTrain = frequencyTime - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var aTime = moment(nextTrain).format("hh:mm");

    $("#table-body").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequencyTime + "</td><td>" + aTime + "</td><td>" + tMinutesTillTrain + "</td><td>")
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});