'use strict';

const exampleData = {
  "status": "ok",
  "projects": [
    "secret project 1",
    "secret project 2"
  ]
};


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
  };

}) ();

const changeUi = (function() {
  const list = document.querySelector('ul');
  const section = document.querySelector('section');
  const span = document.querySelector('span');

  let renderResponse = function (data) {
    data.projects.forEach(function(item){
      createListItem(item);
    })
  };

  let createListItem = function (text) {
    const listItem = document.createElement('li');
    list.appendChild(listItem);
    listItem.innerHTML = text;
  };

  let displayLoading = function () {
    section.classList.add('hide');
    span.classList.remove('hide');
  };

  let showContent = function () {
    section.classList.remove('hide');
    span.classList.add('hide');
  };

  return {
    renderResponse: renderResponse,
    displayLoading: displayLoading,
    showContent: showContent 
  };

}) ();


const ajax = (function () {

  let postMessage = function (text, number, email) {
    console.log(text + ' ' + number + ' ' + email);
    changeUi.displayLoading();

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        JSON.parse(xhr.response);
      };
    };

    xhr.open('POST', 'http://localhost:3001/exam', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"feedback": text, "scale": number, "email": email}));
    console.log({"feedback": text, "scale": number, "email": email});

    // changeUi.renderResponse(xhr.response.body);


  }

  return {
    postMessage: postMessage
  };

}) ();
