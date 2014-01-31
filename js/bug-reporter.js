var BugReporter = null;

(function() {

    "use strict";

    BugReporter = function(options) {

        this.title = options.title || null;
        this.description = options.description || null;

        this.sendReport = function() {
            console.log(this.title);
            console.log(this.description);
        }
    };

})();
