(function() {

    "use strict";

    var failure = $("#bug-failure");
    var success = $("#bug-success");

    $("#bug-form").on("submit", function(e) {
        e.preventDefault();

        var form = this;
        $("body").addClass("loading");

        var bugReporter = new BugReporter({
            title: $("#bug-title").val(),
            description: $("#bug-description").val()
        });

        bugReporter.sendReport().then(function() {
            $("body").removeClass("loading");

            $(failure).hide();
            $(success).hide();

            form.reset();

            $(success).text("Your bug report has been added to Pivotal Tracker (in the icebox).").show();
        }).done(function() {
            setTimeout(function() {
                window.close();
            }, 2000);
        });
    });

})();
