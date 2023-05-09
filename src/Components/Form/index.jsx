import React from 'react';

import './Form.scss';
import { useState } from 'react';

function Form (props) {

  const [textInput, setTextInput] = useState();
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');

  let handleSubmit = e => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
      textArea: textInput,
    };
    props.handleApiCall(formData);
  }

  let handleMethodSelect = e =>{
    e.preventDefault();
    //console.log(e.target.value);
    setMethod(e.target.value);
  }

  let handleInputText = e => {
    e.preventDefault();
    setTextInput(e.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input name='url' type='text' onChange={(e)=> setUrl(e.target.value)} data-testid="url-input"/>
          <button type="submit">GO!</button>
        </label>
        <select onChange={handleMethodSelect}className="methods" data-testid="method-input">
          <option id="get">GET</option>
          <option id="post">POST</option>
          <option id="put">PUT</option>
          <option id="delete">DELETE</option>
        </select>
        {(method==='POST' || method==='PUT') &&
         <textarea name="userInput" id="userInput" cols="50" rows="10" onChange={handleInputText} data-testid="text-input"></textarea>}
      </form>
    </>
  );
}

export default Form;