(function() {

    "use strict";

    var parameters = ["pivotal-token", "pivotal-project-id"];
    var success = document.getElementById('success');

    document.getElementById("settings-form").addEventListener("submit", function(e) {
        e.preventDefault();

        for (var i = 0 ; i < parameters.length ; i++) {
            var parameterName = parameters[i];
            localStorage[parameterName] = document.getElementById(parameterName).value;
        }

        success.style.display = 'block';
    });

    document.addEventListener("DOMContentLoaded", function() {
        for (var parameter in localStorage) {
            document.getElementById(parameter).value = localStorage[parameter];
        }
    });

})();
