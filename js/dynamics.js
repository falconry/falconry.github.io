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
    falcon_cython: 'Falcon Cythonized (2.0.0)',
    falcon: 'Falcon (2.0.0)',
    falcon_ext: 'Falcon Extended (2.0.0)',
    bottle: 'Bottle (0.12.16)',
    werkzeug: 'Werkzeug (0.15.4)',
    flask: 'Flask (1.0.2)',
    django: 'Django (1.11.20)',
    django2: 'Django (2.2.1)',
  }

  const data = [
    {
      id: 'benchmarksCPython2',
      results: [
        ['falcon_cython', 27, 78432, 12.75],
        ['falcon', 17, 48930, 20.44],
        ['bottle', 9, 25946, 38.54],
        ['werkzeug', 3, 7535, 132.72],
        ['flask', 1, 4382, 228.22],
        ['django', 1, 2945, 339.55],
      ]
    },
    {
      id: 'benchmarksCPython3',
      results: [
        ['falcon_cython', 41, 72679, 13.76],
        ['falcon', 28, 50030, 19.99],
        ['bottle', 15, 27281, 36.66],
        ['werkzeug', 5, 9698, 103.11],
        ['flask', 3, 5404, 185.06],
        ['django2', 1, 1790, 558.60],
      ]
    },
    {
      id: 'benchmarksPyPy2',
      results: [
        ['falcon', 20, 461399, 2.17],
        ['bottle', 12, 290709, 3.44],
        ['werkzeug', 4, 100040, 10.00],
        ['django', 1, 31213, 32.04],
        ['flask', 1, 23492, 42.57],
      ]
    },
    {
      id: 'benchmarksPyPy3',
      results: [
        ['falcon', 75, 330676, 3.02],
        ['bottle', 37, 162274, 6.16],
        ['werkzeug', 11, 47395, 21.10],
        ['flask', 8, 36746, 27.21],
        ['django2', 1, 4436, 225.41],
      ]
    },
    {
      id: 'benchmarksExtended',
      results: [
        ['falcon_ext', 10, 29086, 34.38],
        ['flask', 3, 5404, 185.06],
        ['django2', 1, 1790, 558.60],
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
