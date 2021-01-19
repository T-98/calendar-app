var tasks = {};

var createCalendar = function(taskText) {

    for (var i = 9; i < 18; ++i) {

        if (i > 12) var time = (i - 12) + "PM";
        else var time = i + "AM";

        var taskRow = $("<div>").addClass("row-container row align-items-start");

        var taskCol1 = $("<div>").addClass("hour col-1 d-flex").attr("style", "border-right: 2px solid black; justify-content: flex-end;");
        taskCol1.text(time);

        var taskCol2 = $("<div>").addClass("row col-9 d-flex").attr("style", "background-color: grey;");
        var taskP = $("<p>").addClass("m-0").text(taskText);
        taskCol2.append(taskP);

        var taskCol3 = $("<div>").addClass("row saveBtn col-1 d-flex btn btn-primary");
        var taskCol3Icon = $("<i>").addClass("fas fa-save");
        taskCol3.append(taskCol3Icon);

        taskRow.append(taskCol1);
        taskRow.append(taskCol2);
        taskRow.append(taskCol3);

        $(".container").append(taskRow);
    }
    /*
    var taskList = $("<li>").addClass("list-group-item");
    var taskP = $("<p>")
        .addClass("m-1")
        .text(taskText);

    $("list").append(taskList);
    $("list-group-item").append(taskP); */
}

var cleanCalendar = function() {
    $(".row-container").remove();
}

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks.length == 0) {
        tasks = [];
    }

    for (var i = 0; i < tasks.length; ++i) {
        cleanCalendar();
        createCalendar(tasks[i]);
    }

}

saveTasks();
loadTasks();
createCalendar();

//build the li in ht
//moment().hours()