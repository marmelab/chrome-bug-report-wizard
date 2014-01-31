(function() {

    "use strict";

    document.getElementById("bug-form").addEventListener("submit", function(e) {
        e.preventDefault();

        var title = document.getElementById("bug-title").value;
        var description = document.getElementById("bug-description").value;

        console.log(title);
        console.log(description);
    });

})();
