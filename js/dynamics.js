function setLifetime() {
  const CREATION_DATE = 1357365600;

  const deltaSec = (Date.now() / 1000) - CREATION_DATE;
  const lifetime = (deltaSec / 60 / 60 / 24 / 365).toFixed(2);

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
  fetch('https://pypi.org/pypi/falcon/json')
    .then(response => response.json())
    .then(function (data) {
      const version = document.getElementById('falconVersion');
      version.innerHTML = data.info.version;
      version.className += ' ready';
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
    django: 'Django (2.2.1)',
  }

  const data = [
    {
      id: 'benchmarksCPython3',
      results: [
        ['falcon_cython', 41, 72679, 13.76],
        ['falcon', 28, 50030, 19.99],
        ['bottle', 15, 27281, 36.66],
        ['werkzeug', 5, 9698, 103.11],
        ['flask', 3, 5404, 185.06],
        ['django', 1, 1790, 558.60],
      ]
    },
    {
      id: 'benchmarksPyPy3',
      results: [
        ['falcon', 75, 330676, 3.02],
        ['bottle', 37, 162274, 6.16],
        ['werkzeug', 11, 47395, 21.10],
        ['flask', 8, 36746, 27.21],
        ['django', 1, 4436, 225.41],
      ]
    },
    {
      id: 'benchmarksExtended',
      results: [
        ['falcon_ext', 10, 29086, 34.38],
        ['flask', 3, 5404, 185.06],
        ['django', 1, 1790, 558.60],
      ]
    },
  ];

  data.forEach(function (item) {
    const results = item.results;

    let innerHTML = '<thead><tr><th></th><th>speedup</th><th>req/sec</th><th>μs/req</th></tr></thead>'
    innerHTML += '<tbody>'

    results.forEach(function (resultRow) {
      innerHTML += ([
        '<tr style="font-family: monospace, monospace;">',
        '<td>', frameworkDisplay[resultRow[0]], '</td>',
        '<td>', resultRow[1], 'x</td>',
        '<td>', resultRow[2].toLocaleString(), '</td>',
        '<td>', resultRow[3].toFixed(2), '</td>',
        '</tr>'
      ].join(''));
    });

    innerHTML += '</tbody>'

    const table = document.getElementById(item.id);
    table.className += ' table table-benchmarks table-striped table-responsive'
    table.innerHTML = innerHTML
  });
}

setVersion();
setLifetime();
insertBenchmarks();
