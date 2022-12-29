const historyWrapper = document.querySelector('#history-wrapper');
const ipButton = document.querySelector('#ip-btn');
const ipInput = document.querySelector('#ip-input');

let url;

const fetchTarget = (url, endpoint) => {
  fetch(`${url}${endpoint}`);
  // let data = await response.json();
  // return data;
}

window.SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');

recognition.addEventListener('result', (e) => {
  const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  p.innerText = text;
  historyWrapper.appendChild(p);

  if (e.results[0].isFinal && url) {
    if ((text.includes('light') || text.includes('LED')) && text.includes('on')) {
      fetchTarget(url, '/LEDOn');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Turning on the light...';
      historyWrapper.appendChild(p);
    }

    if ((text.includes('light') || text.includes('LED')) && text.includes('blink')) {
      fetchTarget(url, '/LEDBlink');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Blinking the light...';
      historyWrapper.appendChild(p);
    }

    if ((text.includes('light') || text.includes('LED')) && text.includes('off')) {
      fetchTarget(url, '/LEDOff');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Turning off the light...';
      historyWrapper.appendChild(p);
    }

    if ((text.includes('TV') || text.includes('television')) && text.includes('on')) {
      fetchTarget(url, '/TVOn');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Turning on the TV...';
      historyWrapper.appendChild(p);
    }

    if ((text.includes('TV') || text.includes('television')) && text.includes('off')) {
      fetchTarget(url, '/TVOff');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Turning off the TV...';
      historyWrapper.appendChild(p);
    }

    if ((text.includes('TV') || text.includes('television')) && text.includes('volume') && (text.includes('up') || text.includes('increase'))) {
      fetchTarget(url, '/volUP');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Increasing the TV volume...';
      historyWrapper.appendChild(p);
    }

    if ((text.includes('TV') || text.includes('television')) && text.includes('volume') && (text.includes('down') || text.includes('decrease'))) {
      fetchTarget(url, '/volDOWN');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Decreasing the TV volume...';
      historyWrapper.appendChild(p);
    }

    if ((text.includes('TV') || text.includes('television')) && text.includes('next')) {
      fetchTarget(url, '/chUP');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Going to the TV\'s next channel...';
      historyWrapper.appendChild(p);
    }

    if ((text.includes('TV') || text.includes('television')) && text.includes('prev')) {
      fetchTarget(url, '/chDOWN');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Going to the TV\'s previous channel...';
      historyWrapper.appendChild(p);
    }

    if ((text.includes('AC') || text.includes('air conditioner')) && text.includes('on')) {
      fetchTarget(url, '/ACOn');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Turning on the AC...';
      historyWrapper.appendChild(p);
    }

    if ((text.includes('AC') || text.includes('air conditioner')) && text.includes('off')) {
      fetchTarget(url, '/ACOff');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Turning off the AC...';
      historyWrapper.appendChild(p);
    }

    if ((text.includes('AC') || text.includes('air conditioner')) && (text.includes('down') || text.includes('decrease'))) {
      fetchTarget(url, '/ACDown');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Decreasing the AC\'s temperature...';
      historyWrapper.appendChild(p);
    }

    if ((text.includes('AC') || text.includes('air conditioner')) && (text.includes('up') || text.includes('increase'))) {
      fetchTarget(url, '/ACUp');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Increasing the AC\'s temperature...';
      historyWrapper.appendChild(p);
    }

    p = document.createElement('p');
  } else if (e.results[0].isFinal && !url) {
    alert('IP address is empty.');
  }
});

recognition.addEventListener('end', () => {
  recognition.start();
})

recognition.start();

ipButton.addEventListener('click', () => {
  if (!ipInput.value) {
    alert('IP address is empty.');
  } else {
    if(ipButton.innerHTML === 'Reset') {
      url = '';
      ipInput.classList.remove('ip-valid');
      ipInput.value = '';
      ipButton.innerHTML = 'Enter';
    } else {
      url = `http://${ipInput.value}`;
      ipInput.classList.add('ip-valid');
      ipButton.innerHTML = 'Reset';
    }
  }
});
