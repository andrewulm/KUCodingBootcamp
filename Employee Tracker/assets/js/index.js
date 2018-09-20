var config = {
    apiKey: "AIzaSyB3zSMmqHaVFtQaTj4hQkFTpwELNqNVILw",
    authDomain: "employee-salary-tracker.firebaseapp.com",
    databaseURL: "https://employee-salary-tracker.firebaseio.com",
    projectId: "employee-salary-tracker",
    storageBucket: "",
    messagingSenderId: "352769983715"
};

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

$(document).ready(function() {

    $("#add-employee-btn").on("click", function (event) {
        event.preventDefault();

        var empName = $("#name-input").val().trim();
        var empRole = $("#role-input").val().trim();
        var empStart = $("#start-input").val().trim();
        var empRate = $("#rate-input").val().trim();

        var newEmp = {
            name: empName,
            empRole: empRole,
            start: empStart,
            rate: empRate
        };

        console.log(newEmp);
        console.log("click");
        database.ref().push(newEmp);

        console.log(newEmp.name);
        console.log(newEmp.role);
        console.log(newEmp.start);
        console.log(newEmp.rate);

        alert("Employee successfully added");

        $("#name-input").val("");
        $("#role-input").val("");
        $("#start-input").val("");
        $("#rate-input").val("");
    });

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        var empName = childSnapshot.val().name;
        var empRole = childSnapshot.val().empRole;
        var empStart = childSnapshot.val().start;
        var empRate = childSnapshot.val().rate;

        console.log(empName);
        console.log(empRole);
        console.log(empStart);
        console.log(empRate);

        var empStartDate = moment.unix(empStart).format("MM/DD/YYYY");

        var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
        console.log(empMonths);

        var empBilled = empMonths * empRate;
        console.log(empBilled);

        $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
            empStartDate + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
    });

});