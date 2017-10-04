function onReady(f) {
  if (document.readyState === 'complete' || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    f();
  }
  else {
    document.addEventListener('DOMContentLoaded', f);
  }
}

function setLifetime() {
  const FALCON_EPOCH = 1357365600;
  const SECONDS_PER_ORBITAL_ROTATION = 31558149.504000004;

  const deltaSec = (Date.now() / 1000) - FALCON_EPOCH;

  const lifetime = (deltaSec / SECONDS_PER_ORBITAL_ROTATION).toFixed(2);

  const lifetimeElement = document.getElementById('lifetime');

  let lifetimeTick = 0;
  let lifetimeDelay = 5;

  function updateLifetime() {
    lifetimeTick += lifetime / 50;

    if (lifetimeTick < lifetime) {
      lifetimeElement.innerHTML = String(lifetimeTick.toFixed(2));

      if ((lifetimeTick / lifetime) > 0.8) {
        lifetimeDelay *= 1.1;
      }

      setTimeout(updateLifetime, lifetimeDelay);
    }
    else {
      lifetimeElement.innerHTML = lifetime;
    }
  }

  updateLifetime();
}

function setVersion() {
  axios.get('https://pypi.python.org/pypi/falcon/json')
    .then(function(response) {

      onReady( function () {
        var version = document.getElementById('falconVersion');
        version.innerHTML = response.data.info.version;
        version.className += ' ready';
      });

    });
}

function insertBenchmarks() {
  const frameworkDisplay = {
    falcon: 'Falcon (1.2.0)',
    falcon_ext: 'Falcon Extended (1.2.0)',
    bottle: 'Bottle (0.12.13)',
    werkzeug: 'Werkzeug (0.12.1)',
    flask: 'Flask (0.12.2)',
    pecan: 'Pecan (1.2.1)'
  }

  const data = [
    {
      id: 'benchmarksCPython27',
      results: [
        ['falcon', 10, 37277, 26.83],
        ['bottle', 5, 19633, 50.94],
        ['werkzeug', 2, 7088, 141.08],
        ['flask', 1, 3986, 250.86],
        ['pecan', 1, 3659, 273.33],
      ]
    },
    {
      id: 'benchmarksCPython36',
      results: [
        ['falcon', 28, 30479, 32.81],
        ['bottle', 15, 16366, 61.10],
        ['werkzeug', 7, 7575, 132.02],
        ['flask', 4, 4262, 234.64],
        ['pecan', 1, 1082, 924.48],
      ]
    },
    {
      id: 'benchmarksPyPy2',
      results: [
        ['falcon', 34, 345728, 2.89],
        ['bottle', 23, 234304, 4.27],
        ['werkzeug', 6, 65313, 15.31],
        ['flask', 1, 15088, 66.28],
        ['pecan', 1, 10227, 97.78],
      ]
    },
    {
      id: 'benchmarksPyPy3',
      results: [
        ['falcon', 126, 113666, 8.80],
        ['bottle', 97, 87197, 11.47],
        ['werkzeug', 17, 15095, 66.25],
        ['flask', 14, 12723, 78.60],
        ['pecan', 1, 901, 1109.67],
      ]
    },
    {
      id: 'benchmarksExtended',
      results: [
        ['falcon_ext', 6, 23500, 42.55],
        ['bottle', 5, 19633, 50.94],
        ['flask', 1, 3986, 250.86],
      ]
    },
  ];

  for (let i = 0; i != data.length; ++i) {
    const results = data[i].results;

    let innerHTML = '<thead><tr><th></th><th>speedup</th><th>req/sec</th><th>μs/req</th></tr></thead>'

    innerHTML += '<tbody>'
    for (let r = 0; r != results.length; ++r) {
      const resultRow = results[r];

      innerHTML += ([
        '<tr>',
        '<td>', frameworkDisplay[resultRow[0]], '</td>',
        '<td>', resultRow[1], 'x</td>',
        '<td>', resultRow[2].toLocaleString(), '</td>',
        '<td>', resultRow[3], '</td>',
        '</tr>'
      ].join(''));

    }
    innerHTML += '</tbody>'

    const table = document.getElementById(data[i].id);
    table.className += ' table table-benchmarks table-striped table-responsive'
    table.innerHTML = innerHTML
  }
}

// Kick this off first because PyPI is slow
setVersion();

onReady( function(event) {

  setLifetime();

  // $('pre code').each(function(i, block) {
  //     hljs.highlightBlock(block);
  // });

  insertBenchmarks();

});
