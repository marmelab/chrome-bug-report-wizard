var BugReporter = null;

(function() {

    "use strict";

    BugReporter = function(options) {

        this.title = options.title || null;
        this.description = options.description || null;

        this.sendReport = function() {
            var me = this;
            var pivotalTracker = new PivotalTransporter(localStorage["pivotal-token"], localStorage["pivotal-project-id"]);

            return $.when(this._getActiveTabUrl(), this._getScreenshot()).then(function(url, screenshot) {
                return pivotalTracker.createBug({
                    title: me.title,
                    description: me.description,
                    url: url,
                    details: me._gatherBrowserDetails(),
                    screenshot: screenshot
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

        this._getActiveTabUrl = function() {
            var deffered = $.Deferred();
            chrome.tabs.query({'active': true}, function (tabs) {
                deffered.resolve(tabs[0].url);
            });

            return deffered.promise();
        },

        this._getScreenshot = function(callback) {
            var deffered = $.Deferred();
            chrome.tabs.captureVisibleTab(function(screenshot) {
                deffered.resolve(screenshot);
            });

            return deffered.promise();
        }
    };

})();
