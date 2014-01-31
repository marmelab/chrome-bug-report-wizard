var PivotalTransporter;

(function() {

    "use strict";

    /**
     * @see https://www.pivotaltracker.com/help/api
     */
    PivotalTransporter = function() {

        var TOKEN = "";
        var PROJECT_ID = 0;

        this.createBug = function(bug, callback) {
            this._sendRequest("POST", {
                name: bug.title,
                description: bug.description
            }, callback);
        };

        this._sendRequest = function(method, data, callback) {
            var xhr = new XMLHttpRequest();
            var url = "https://www.pivotaltracker.com/services/v5/projects/" + PROJECT_ID + "/stories";
            xhr.open(method, url, true);

            xhr.setRequestHeader("X-TrackerToken", TOKEN);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onerror = function(e) {
                // To prevent from CORS errors
                callback("unknown error, check the console log");
            };

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        callback();
                    } else {
                        callback(xhr.statusText);
                    }
                }
            };

            xhr.send(JSON.stringify(data));
        };
    };

})();
