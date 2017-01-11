'use strict';

const sendFeedback = (function () {
  const button = document.querySelector('button');
  const textarea = document.querySelector('textarea');
  const number = document.querySelector('.number');
  const email = document.querySelector('.email');

  let send = function () {
    ajax.postMessage(textarea.value, number.value, email.value);
    // textarea.value = '';
  };
  button.addEventListener('click', send);

  return {
    send: send
  }

}) ();


const ajax = (function () {

  let postMessage = function (text, number, email) {
    console.log(text + ' ' + number + ' ' + email);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        JSON.parse(xhr.response);
      };
    };

    xhr.open('POST', 'http://localhost:3000/exam', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"feedback": text, "scale": number, "email": email}));
    console.log({"feedback": text, "scale": number, "email": email});

  }

  return {
    postMessage: postMessage
  }


}) ();
