var BugReporter = null;

(function() {

    "use strict";

    BugReporter = function(options) {

        this.title = options.title || null;
        this.description = options.description || null;

        this.sendReport = function(callback) {
            var pivotalTracker = new PivotalTransporter();
            pivotalTracker.createBug({
                title: this.title,
                description: this.description
            }, callback);
        }
    };

})();
