$(document).ready(function () {

    // initialize firebase
    var config = {
        apiKey: "AIzaSyA3KAG5zdPDoMlO5nbSWsLCl-TL9RBA9ro",
        authDomain: "trainschedule-d2b45.firebaseapp.com",
        databaseURL: "https://trainschedule-d2b45.firebaseio.com",
        projectId: "trainschedule-d2b45",
        storageBucket: "trainschedule-d2b45.appspot.com",
        messagingSenderId: "944778512242"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // grab user input to fill the table field.

    $("#submit-btn").on("click", function (event) {
        event.preventDefault();


        var trainName = $("#train-name").val().trim();
        var trainDestination = $("#train-destination").val().trim();
        var trainTime = $("#train-time").val().trim();
        var trainFrequency = $("#train-frequency").val().trim();

        // var to hold train data 

        var trainData = {
            name: trainName,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency
        };

        // push data to firebase

        database.ref().push(trainData);

        // clear text boxes 

        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-time").val("");
        $("#train-frequency").val("");

    });

    // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().time;
        var trainFrequency = childSnapshot.val().frequency;

        // Employee Info
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(trainFrequency);

        // ----------------------------- moment things
        var currentTime = moment();

           var FirstTimeConverted = moment(trainTime, "HH:mm");
        console.log('first time converted!!',FirstTimeConverted);

        console.log('current time rn moment()', currentTime.format('HH:mm'));

           var diffTime = moment().diff(FirstTimeConverted,"minutes");
           console.log('difference of time from to when train first starts',diffTime);

           var reminated = diffTime % parseInt(trainFrequency);

           console.log('this is our remianted!!!', reminated );

           var minTillAnswer =  Math.abs(reminated - parseInt(trainFrequency));

           console.log('How many min left' + minTillAnswer);

        // ------------------------------------moment ends here


        // Create the new row
        var tr = $("<tr></tr>");
        var tdName = $("<td></td>").text(trainName);
        var tdDestination = $("<td>" + trainDestination + "</td>");
        var tdTime = $("<td>" + moment().add(minTillAnswer, "minutes").format('HH:mm') + "</td>");
        var tdFrequency = $("<td>" + trainFrequency + "</td>");
        var minAway =$("<td>" + minTillAnswer + "</td>");
        tr.append(tdName);
        tr.append(tdDestination);
        tr.append(tdFrequency);
        tr.append(tdTime);
        tr.append(minAway);
        

        // Append the new row to the table
        $("tbody").append(tr);

    });
   

});
