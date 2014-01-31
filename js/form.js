(function() {

    "use strict";

    var failure = document.getElementById("bug-failure");
    var success = document.getElementById("bug-success");

    document.getElementById("bug-form").addEventListener("submit", function(e) {
        e.preventDefault();

        var form = this;
        var bugReporter = new BugReporter({
            title: document.getElementById("bug-title").value,
            description: document.getElementById("bug-description").value
        });

        bugReporter.sendReport().then(function() {
            failure.style.display = "none";
            success.style.display = "none";

            form.reset();

            success.innerHTML = "Your bug report has been added to Pivotal Tracker (in the icebox).";
            success.style.display = "block";
        }).done(function() {
            setTimeout(function() {
                window.close();
            }, 2000);
        });
    });

})();
