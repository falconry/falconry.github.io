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

        $("#falconVersion").html('<span class="fa fa-download"></span> ' + package.info.version);

    });    
}

function insertBenchmarks() {
    var framework_display = {
        falcon: "Falcon (1.2.0)",
        falcon_ext: "Falcon Extended (1.2.0)",
        bottle: "Bottle (0.12.13)",
        werkzeug: "Werkzeug (0.12.1)",
        flask: "Flask (0.12.2)",
        pecan: "Pecan (1.2.1)"
    }

    var data = [
        {
            id: "#benchmarksCPython27",
            results: [
                ["falcon", 10, 37277, 26.83],
                ["bottle", 5, 19633, 50.94],
                ["werkzeug", 2, 7088, 141.08],
                ["flask", 1, 3986, 250.86],
                ["pecan", 1, 3659, 273.33],
            ]
        },
        {
            id: "#benchmarksCPython36",
            results: [
                ["falcon", 28, 30479, 32.81],
                ["bottle", 15, 16366, 61.10],
                ["werkzeug", 7, 7575, 132.02],
                ["flask", 4, 4262, 234.64],
                ["pecan", 1, 1082, 924.48],
            ]
        },
        {
            id: "#benchmarksPyPy2",
            results: [
                ["falcon", 34, 345728, 2.89],
                ["bottle", 23, 234304, 4.27],
                ["werkzeug", 6, 65313, 15.31],
                ["flask", 1, 15088, 66.28],
                ["pecan", 1, 10227, 97.78],
            ]
        },
        {
            id: "#benchmarksPyPy3",
            results: [
                ["falcon", 126, 113666, 8.80],
                ["bottle", 97, 87197, 11.47],
                ["werkzeug", 17, 15095, 66.25],
                ["flask", 14, 12723, 78.60],
                ["pecan", 1, 901, 1109.67],
            ]
        },
        {
            id: "#benchmarksExtended",
            results: [
                ["falcon_ext", 6, 23500, 42.55],
                ["bottle", 5, 19633, 50.94],
                ["flask", 1, 3986, 250.86],
            ]
        },
    ];

    var i, tr, table, table_body, results, result_row;

    for (i = 0; i != data.length; ++i) {
        results = data[i].results;

        table = $(data[i].id)
        table.addClass("table table-benchmarks table-striped table-responsive");
        $(data[i].id).append("<thead><tr><th></th><th>speedup</th><th>req/sec</th><th>μs/req</th></tr></thead>");
        table_body = $(data[i].id).append("<tbody>");

        for (r = 0; r != results.length; ++r) {
            result_row = results[r];

            table_body.append([
                "<tr>",
                "<td>", framework_display[result_row[0]], "</td>",
                "<td>", result_row[1], "x</td>",
                "<td>", result_row[2].toLocaleString(), "</td>",
                "<td>", result_row[3], "</td>",
                "</tr>"
            ].join(''));

        }
    }
}

$(document).ready(function() {

    setVersion();

    $("#lifetime").html(lifetime());

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    insertBenchmarks();    

});
