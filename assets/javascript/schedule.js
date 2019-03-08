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

    // GLOBAL VARIABLES 
    //---------------------------------------------------- 
    var database = firebase.database(); 
    
    // .format("hh:mm A") here hh- stands for 1-12 hr, mm for minutues , A for am/pm  [http://momentjs.com/docs/#/parsing/string-format/] 
    var currentTime = moment().format("hh:mm A"); //Military time format 
    $("#current-time").append(currentTime); 

    var trainName , trainDest ;
    var firstTrainTime = 00;
    var trainFrequency = 0;

    //EVENT LISTINERS 
    //----------------------------

    $("#add-train-btn").on("click", function (event) {

        //Stops the page from reloading again 
        event.preventDefault();

        //Grabs value from the fields 
        trainName = $("#train-name-input").val().trim();
        trainDest = $("#destination-input").val().trim();
        firstTrainTime = $("#first-train-input").val().trim();
        trainFrequency = $("#frequency-input").val().trim();

        // Code for the push data into the Firebase 
        database.ref().push({

            trainName: trainName,
            destination: trainDest,
            firstTrain: firstTrainTime,
            frequency: trainFrequency,
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
        trainFrequency = childSnapshot.val().frequency; 

        var nextArrival , minutesAway; 
        
        // First trains is 06:10 am , frequency is set every 20 min 
        //current time is 06:45 am , 
        //Difference between the first train time & current time 
        //Time difference = 06:45 am - 06:10 am 
        //time difference ? by frequency 
        // To calculate the next arrival time 
        
        
        //Append data to rows 
        var newRow = $("<tr>");
        newRow.append("<td>" + trainName + "</td>");
        newRow.append("<td>" + trainDest + "</td>");
        newRow.append("<td>" + trainFrequency + "</td>");
        newRow.append("<td>" + nextArrival  + "</td>"); //blank data 
        newRow.append("<td>" + minutesAway+ "</td>"); //blank data 

        // Append row to table
        $("#train-schedule-body").append(newRow);

        // Handles any database errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
}); 