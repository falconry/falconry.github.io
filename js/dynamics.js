function lifetime() {
    var FALCON_EPOCH = 1357365600;
    var SECONDS_PER_ORBITAL_ROTATION = 31558149.504000004;

    var delta_sec = (Date.now() / 1000) - FALCON_EPOCH;

    return (delta_sec / SECONDS_PER_ORBITAL_ROTATION).toFixed(2)
}

function setVersion() {
    $.ajax({
        
        url: "https://pypi.python.org/pypi/falcon/json"

    }).done(function(package) {

        $("#falcon-version").html(package.info.version);

    });    
}

$(document).ready(function() {

    setVersion();
    
    $("#lifetime").html(lifetime());

});

hljs.initHighlightingOnLoad();