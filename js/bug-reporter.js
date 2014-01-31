var BugReporter = null;

(function() {

    "use strict";

    BugReporter = function(options) {

        this.title = options.title || null;
        this.description = options.description || null;

        this.sendReport = function(callback) {
            var me = this;
            var pivotalTracker = new PivotalTransporter(localStorage["pivotal-token"], localStorage["pivotal-project-id"]);
            this._getActiveTabUrl(function(url) {
                me._getScreenshot(function(screenshot) {
                    pivotalTracker.createBug({
                        title: me.title,
                        description: me.description,
                        url: url,
                        details: me._gatherBrowserDetails(),
                        screenshot: screenshot
                    }, callback);
                });
            });
        };

        this._gatherBrowserDetails = function() {
            var data = {
                browser: { label: "Browser", value: navigator.appVersion },
                language: { label: "Language", value: navigator.language },
                userAgent: { label: "User-agent", value: navigator.userAgent },
                cookieEnabled: { label: "Cookies enabled", value: navigator.cookieEnabled },
                doNotTrack: { label: "Do not track", value: navigator.doNotTrack }
            };

            var installedPlugins = [];
            for (var i = 0 ; i < navigator.plugins.length ; i++) {
                installedPlugins.push(navigator.plugins[i].name);
            }

            data["plugins"] = { label: "Plug-ins", value: "\n    - " + installedPlugins.join("\n    - ") };

            return data;
        };

        this._getActiveTabUrl = function(callback) {
            chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                callback(tabs[0].url);
            });
        },

        this._getScreenshot = function(callback) {
            chrome.tabs.captureVisibleTab(callback);
        }
    };

})();
