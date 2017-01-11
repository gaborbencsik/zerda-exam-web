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
  };

}) ();

const changeUi = (function() {
  const list = document.querySelector('ul');
  const section = document.querySelector('section');
  const span = document.querySelector('span');

  let renderResponse = function (projects) {
    showContent();
    projects.forEach(function(project){
      createListItem(project);
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

  let renderErrorMessage = function () {
    span.classList.remove('hide');
    span.innerHTML = 'Thank you!'
  };

  return {
    renderResponse: renderResponse,
    createListItem: createListItem,
    displayLoading: displayLoading,
    showContent: showContent,
    renderErrorMessage: renderErrorMessage
  };

}) ();

const ajax = (function () {

  let postMessage = function (text, number, email) {
    let data = [];
    changeUi.displayLoading();

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(JSON.parse(xhr.response));
        data = JSON.parse(xhr.response);
        if (data.status === "ok") {
          changeUi.renderResponse(data.projects);
        } else {
          changeUi.renderErrorMessage(data.message);
        };
      };
    };

    xhr.open('POST', 'http://localhost:3001/exam', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"feedback": text, "scale": number, "email": email}));
  }

  return {
    postMessage: postMessage,
  };

}) ();
console.log('script running');
