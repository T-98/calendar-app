var tasks = [];

var date = moment().format('dddd, MMMM Do');
document.getElementById("currentDay").innerHTML = date;

var createCalendar = function(taskText) {

    for (var i = 9; i < 18; ++i) {

        if (i > 12) var time = (i - 12) + "PM";
        else var time = i + "AM";

        if (i === moment().hours()) var timeClass = "present";
        else if (i > moment().hours()) var timeClass = "future";
        else var timeClass = "past";

        var taskRow = $("<div>").addClass("row-container row align-items-start");

        var taskCol1 = $("<div>").addClass("hour col-1 d-flex").attr("style", "justify-content: flex-end;");
        taskCol1.text(time);

        var taskCol2 = $("<div>").addClass("taskbox row col-9 d-flex " + timeClass);
        var taskP = $("<p>").addClass("m-0").text(tasks[i - 9]);
        taskCol2.append(taskP);

        var taskCol3 = $("<div>").addClass("row saveBtn col-1 d-flex btn btn-primary");
        var taskCol3Icon = $("<i>").addClass("fas fa-save");
        taskCol3.append(taskCol3Icon);

        taskRow.append(taskCol1);
        taskRow.append(taskCol2);
        taskRow.append(taskCol3);

        $(".container").append(taskRow);
    }
}

var cleanCalendar = function() {
    $(".row-container").remove();
}

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));

}

cleanCalendar();
loadTasks();
createCalendar();

var currentSelection;

$(".taskbox").on("click", function() {
    var text = $(this).text().trim();

    var textInput = $("<textarea>")
        .addClass("textarea")
        .val(text);

    $(this).children("p").replaceWith(textInput);
    textInput.trigger("focus");
    currentSelection = this;
    console.log("click");


});

$(".taskbox").on("blur", "textarea", function() {
    var text = $(this).val().trim();

    var taskP = $("<p>")
        .addClass("m-0")
        .text(text);

    $(this).replaceWith(taskP);

    console.log("blur");
});

$(".saveBtn").on("click", function() {
    var text = $(this).closest(".row-container").children(".taskbox").children("p").text().trim();

    var index = $(this)
        .closest(".row-container")
        .index();

    tasks[index] = text;

    saveTasks();
});