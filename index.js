const historyWrapper = document.querySelector('#history-wrapper');
const ipButton = document.querySelector('#ip-btn');
const ipInput = document.querySelector('#ip-input');

let url;

const fetchTarget = async (url, endpoint) => {
  await fetch(`${url}${endpoint}`);
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
    if (text.includes('light') && text.includes('on')) {
      fetchTarget(url, '/LEDOn');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Turning on the light...';
      historyWrapper.appendChild(p);
    }

    if (text.includes('light') && text.includes('off')) {
      fetchTarget(url, '/LEDOff');

      p = document.createElement('p');
      p.classList.add('reply');
      p.innerText = 'Okay. Turning off the light...';
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
