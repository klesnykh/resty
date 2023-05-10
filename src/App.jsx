import React from 'react';
import axios from 'superagent';

import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import { useState, useEffect } from 'react';

function App () {

  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});

  let callApi = (requestParams) => {
    setRequestParams(requestParams);
  }

  useEffect(() => {
    console.log('hitting useEffect for changed requestParams');
    console.log(requestParams);
    async function getData(){
      try {
        console.log(requestParams)
        let req = await fetch(requestParams.url);
        // let req = await axios[requestParams.method](requestParams.url);
        //console.log('after fetch');
        let jsonData = await req.json();
        //let jsonData = await req.body.json();
        console.log(req);
        let data = {
          count: jsonData.count,
          results: jsonData
        }
        setData(data);
      } catch (e) {
        console.log('ERROR FROM FETCH:', e);
      }
    }
      
    getData();
  }, [requestParams]);

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={data} />
      <Footer />
    </React.Fragment>
  );
}

export default App;