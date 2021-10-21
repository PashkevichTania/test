# test

import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'


function MyDropzone() {


  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const prev = document.getElementsByClassName('prev')[0]
        const binaryStr = reader.result
        let img = new Image()
        img.src = binaryStr;
        prev?.append(img)
      }
      reader.readAsDataURL(file)
    })

  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    multiple: false,
    onDrop
  })

  return (
      <div className="container">
        <div {...getRootProps({className: "dropzone"})}>
          <input {...getInputProps()} name={"dropzone"} />
          {isDragAccept && (<p>All files will be accepted</p>)}
          {isDragReject && (<p>Some files will be rejected</p>)}
          {!isDragActive && (<p>Drop some files here ...</p>)}
        </div>
      </div>
  )
}

export default MyDropzone;


import './App.css';
import MyDropzone from "./components/MyDropzone";


function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function App() {

  const submitHandler = (event) => {
    event.preventDefault()
    const formElem = document.getElementById('formElem')
    const formData = new FormData(formElem)
    console.log(formData)
    const file = formData.get('dropzone')
    console.log(file)

    setCookie(
        'user', formData.get('name') + ' ' + formData.get('surname'),
        {secure: true, 'max-age': 3600}
    );
    console.log(getCookie('user'))
  }


  return (
      <div className="App">
        <form id="formElem" onSubmit={submitHandler}>
          <input type="text" name="name" defaultValue="John"/>
          <input type="text" name="surname" defaultValue="Smith"/>
          {/*<input type="file" name="img" accept="image/*"/>*/}
          <MyDropzone />
          <button>submit</button>
        </form>
        <div className="prev">

        </div>
      </div>
  );
}

export default App;
