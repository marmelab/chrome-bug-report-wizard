(function() {

    "use strict";

    document.getElementById("bug-form").addEventListener("submit", function(e) {
        e.preventDefault();

        var form = this;
        var bugReporter = new BugReporter({
            title: document.getElementById("bug-title").value,
            description: document.getElementById("bug-description").value
        });

        var callback = function(error) {
            var failure = document.getElementById("bug-failure");
            var success = document.getElementById("bug-success");

            failure.style.display = "none";
            success.style.display = "none";

            if (error) {
                failure.innerHTML = "Bug report transmission failed: " + error + ".";
                failure.style.display = "block";

                return;
            }

            form.reset();

            success.innerHTML = "Your bug report has been added to Pivotal Tracker (in the icebox).";
            success.style.display = "block";
        };

        bugReporter.sendReport(callback);
    });

})();
