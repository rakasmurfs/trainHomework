$(document).ready(function() {

    var firebaseConfig = {
        apiKey: "AIzaSyB6zXPj_QiFF5f7TJIh4uxRm17fj8uwzsc",
        authDomain: "my-first-firebase-app-dc778.firebaseapp.com",
        databaseURL: "https://my-first-firebase-app-dc778.firebaseio.com",
        projectId: "my-first-firebase-app-dc778",
        storageBucket: "my-first-firebase-app-dc778.appspot.com",
        messagingSenderId: "598291195739",
        appId: "1:598291195739:web:2266f0c1cc848d6b"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      var database = firebase.database();

    database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());
    var storedInfo = snapshot.val();
    var trainNames = storedInfo.trainName;
    var trainDestinations = storedInfo.trainDestination;
    var trainFrequency = storedInfo.trainFrequency;
    var trainTimes = storedInfo.trainTime;

    var startMoment = moment(trainTimes,"HH:mm");
    var currentMoment = moment();
    var differenceInMinutes = currentMoment.diff(startMoment,"minutes");
    var remainder = differenceInMinutes%trainFrequency;
    var minutesToCompleteFrequency = trainFrequency-remainder;
    var nextTrainTime = currentMoment.add(minutesToCompleteFrequency,"minutes").format("HH:mm");
    var minutesUntilArrival = trainFrequency - remainder;
    

    $("#trainInfo").append("<tr><td>" + trainNames + "</td><td>" + trainDestinations + "</td><td>" +trainFrequency + "</td><td>" + nextTrainTime + "</td><td>" + minutesUntilArrival + "</td></tr>");

    });





    $("#submitButton").click(function(event){
        event.preventDefault()
        //alert("you just clicked me!")

        var trainName = $("#trainNameInput").val().trim();
        //console.log(trainName)
        var trainDestination = $("#trainDestinationInput").val().trim();
        //console.log(trainDestination);
        var trainTime = $("#trainTimeInput").val().trim();
        //console.log(trainTime);
        var trainFrequency = $("#trainFrequencyInput").val().trim();
        //console.log(trainFrequency);

        database.ref().push({
            trainName: trainName,
            trainDestination: trainDestination,
            trainTime: trainTime,
            trainFrequency: trainFrequency
        });

        $("#trainNameInput").val("");
        $("#trainDestinationInput").val("")
        $("#trainTimeInput").val("")
        $("#trainFrequencyInput").val("")
    });




    
});