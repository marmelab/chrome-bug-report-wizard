(function() {

    "use strict";

    document.getElementById("bug-form").addEventListener("submit", function(e) {
        e.preventDefault();

        var bugReporter = new BugReporter({
            title: document.getElementById("bug-title").value,
            description: document.getElementById("bug-description").value
        });

        bugReporter.sendReport();
    });

})();
