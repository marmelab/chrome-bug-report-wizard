var PivotalTransporter;

(function() {

    "use strict";

    /**
     * @see https://www.pivotaltracker.com/help/api
     */
    PivotalTransporter = function(token, projectId) {

        this.createBug = function(bug, callback) {
            this._sendRequest("POST", {
                name: bug.title,
                description: this._prepareBugDescription(bug),
            }, callback);
        };

        this._sendRequest = function(method, data, callback) {
            var xhr = new XMLHttpRequest();
            var url = "https://www.pivotaltracker.com/services/v5/projects/" + projectId + "/stories";
            xhr.open(method, url, true);

            xhr.setRequestHeader("X-TrackerToken", token);
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

        this._prepareBugDescription = function(bug) {
            var description = "*URL:* " + bug.url + "\n\n";

            if (bug.description) {
                description += bug.description + "\n\n";
            }

            description += "---\n*Details:*\n\n"
            for (var key in bug.details) {
                var detail = bug.details[key];

                if (!detail.value) {
                    continue;
                }

                description += "*" + detail.label + ":* " + detail.value + "\n";
            }

            return description;
        }
    };

})();
