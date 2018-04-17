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
  axios.get('https://pypi.org/pypi/falcon/json')
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
    falcon_cython: 'Falcon Cythonized (1.4.0)',
    falcon: 'Falcon (1.4.0)',
    falcon_ext: 'Falcon Extended (1.4.0)',
    bottle: 'Bottle (0.12.13)',
    werkzeug: 'Werkzeug (0.14.1)',
    flask: 'Flask (0.12.2)',
    django: 'Django (1.11.9)',
  }

  const data = [
    {
      id: 'benchmarksCPython27',
      results: [
        ['falcon_cython', 27, 102563, 9.75],
        ['falcon', 19, 70746, 14.14],
        ['bottle', 9, 34059, 29.36],
        ['werkzeug', 3, 9948, 100.52],
        ['flask', 1, 5489, 182.17],
        ['django', 1, 3712, 269.39],
      ]
    },
    {
      id: 'benchmarksCPython36',
      results: [
        ['falcon_cython', 22, 75507, 13.24],
        ['falcon', 17, 56525, 17.69],
        ['bottle', 9, 30126, 33.19],
        ['werkzeug', 3, 10989, 91.00],
        ['flask', 2, 5971, 167.48],
        ['django', 1, 3378, 296.06],
      ]
    },
    {
      id: 'benchmarksPyPy2',
      results: [
        ['falcon', 21, 541378, 1.85],
        ['bottle', 12, 306494, 3.26],
        ['werkzeug', 5, 119060, 8.40],
        ['django', 1, 28701, 34.84],
        ['flask', 1, 26289, 38.04],
      ]
    },
    {
      id: 'benchmarksPyPy3',
      results: [
        ['falcon', 9, 287819, 3.47],
        ['bottle', 6, 188328, 5.31],
        ['werkzeug', 2, 57033, 17.53],
        ['flask', 1, 44512, 22.47],
        ['django', 1, 30478, 32.81],
      ]
    },
    {
      id: 'benchmarksExtended',
      results: [
        ['falcon_ext', 10, 32420, 30.85],
        ['flask', 2, 5971, 167.48],
        ['django', 1, 3378, 296.06],
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
        '<tr style="font-family: monospace, monospace;">',
        '<td>', frameworkDisplay[resultRow[0]], '</td>',
        '<td>', resultRow[1], 'x</td>',
        '<td>', resultRow[2].toLocaleString(), '</td>',
        '<td>', resultRow[3].toFixed(2), '</td>',
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
