var PivotalTransporter;

(function() {

    "use strict";

    /**
     * @see https://www.pivotaltracker.com/help/api
     */
    PivotalTransporter = function(token, projectId) {

        this.url = "https://www.pivotaltracker.com/services/v5/projects/" + projectId;

        this.createBug = function(bug) {
            var me = this;
            return $.when(this._uploadScreenshot(bug.screenshot), this._createStory(bug)).then(function(screenshot, story) {
                return me._attachScreenshot(screenshot[0], story[0]);
            });
        };

        this._uploadScreenshot = function(screenshot) {
            var formData = new FormData();
            var pictureData = this._base64toBlob(screenshot.split(",")[1]);
            formData.append("file", new Blob([pictureData], { type: "image/jpeg" }), "screenshot.jpg");

            return $.ajax({
                url: this.url + "/uploads",
                type: "POST",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-TrackerToken', token);
                }
            });
        };

        this._createStory = function(bug) {
            return $.ajax({
                url: this.url + "/stories",
                type: "POST",
                data: {
                    name: bug.title,
                    description: this._prepareBugDescription(bug)
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-TrackerToken', token);
                }
            });
        };

        this._attachScreenshot = function(screenshot, story) {
            return $.ajax({
                url: this.url + "/stories/" + story.id + "/comments",
                type: "POST",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-TrackerToken', token);
                },
                processData: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    "file_attachments": [JSON.parse(screenshot)]
                })
            });
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
        };

        /**
         * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
         */
        this._base64toBlob = function(base64Data, contentType) {
            contentType = contentType || '';
            var sliceSize = 1024;
            var byteCharacters = atob(base64Data);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);

            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                var begin = sliceIndex * sliceSize;
                var end = Math.min(begin + sliceSize, bytesLength);

                var bytes = new Array(end - begin);
                for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }

            return new Blob(byteArrays, { type: contentType });
        }
    };

})();
