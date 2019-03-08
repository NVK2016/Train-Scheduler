$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAcfDGkuiuuRPaAiQ_3Nf9weBUDu94id9c",
        authDomain: "train-schedules-e0160.firebaseapp.com",
        databaseURL: "https://train-schedules-e0160.firebaseio.com",
        projectId: "train-schedules-e0160",
        storageBucket: "train-schedules-e0160.appspot.com",
        messagingSenderId: "500974018540"
    };

    firebase.initializeApp(config);

    var database = firebase.database(); 

    //FUNCTION 
    //------------------------------------
    function displayTrainSchedule() {

    }

    //EVENT LISTINERS 
    //----------------------------

    $("#add-train-btn").on("click", function (event) {

        //Stops the page from reloading again 
        event.preventDefault();

        //Grabs value from the fields 
        var trainName = $("#train-name-input").val().trim();
        var trainDest = $("#destination-input").val().trim();
        var firstTrainTime = $("#first-train-input").val().trim();
        var trainFreq = $("#frequency-input").val().trim();

        // Code for the push data into the Firebase 
        database.ref().push({

            trainName: trainName,
            destination: trainDest,
            firstTrain: firstTrainTime,
            frequency: trainFreq,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });

    //
    //-----------------------------

    //Caliing DB when page loads 
    database.ref().on("child_added", function(childSnapshot){

        trainName = childSnapshot.val().trainName; 
        trainDest = childSnapshot.val().destination; 
        firstTrainTime = childSnapshot.val().firstTrain; 
        trainFreq = childSnapshot.val().frequency; 

        //Append data to rows 
        var newRow = $("<tr>");
        newRow.append("<td>" + trainName + "</td>");
        newRow.append("<td>" + trainDest + "</td>");
        newRow.append("<td>" + trainFreq + "</td>");
        newRow.append("<td>" +  + "</td>"); //blank data 
        newRow.append("<td>" + + "</td>"); //blank data 

        // Append row to table
        $("#train-schedule-body").append(newRow);
    });
}); 