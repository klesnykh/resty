import React from 'react';
import './App.scss';
import Header from './Components/Header';
import History from './Components/History'
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import { useEffect, useReducer } from 'react';

function App () {

  let initialState = {
    data: null,
    requestParams: null,
    history: []
  }

  const reducer = (state, action) => {
    console.log('REDUCER ACTION: ', state, action.payload);
    switch(action.type){
      case 'UPDATE_REQUEST_PARAMS':
        return {
          ...state,
          requestParams: action.payload,
        }  
      case 'UPDATE_DATA':
        return {
          ...state,
          data: action.payload
        }  
      case 'UPDATE_HISTORY':
        return {
          ...state,
          history: [...state.history, action.payload]
        }
      default:
        return state;  
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState); //this line actually sets STATE

//------------------------------------------------------------------------------------------------
  

  const setRequestParams = (requestParams) => {           // Here we are taking in {url: method: body:} and triggering
    dispatch(updateRequestParamsAction(requestParams))    // an update in state, which our useEffect is listening to
  }                                                       // and updates the data

  useEffect(() => {
    console.log('hitting useEffect for changed requestParams');
    console.log(state.requestParams);
    async function getData(){
      try {
        let req = await fetch(state.requestParams.url);
        let jsonData = await req.json();
        console.log(req);
        let data = {
          count: jsonData.count,
          results: jsonData
        }
        updateData(data);

      } catch (e) {
        console.log('ERROR FROM FETCH:', e);
      }
    }
    getData();
  }, [state.requestParams]);

  useEffect(() => {
    if(state.data){
      console.log(state.requestParams);
      let historyUpdate = {
        data: state.data,
        method: state.requestParams.method,
        url: state.requestParams.url,
        body: state.requestParams.body
      }
      dispatch({
        type: 'UPDATE_HISTORY',
        payload: historyUpdate
      })
    }
    // eslint-disable-next-line
  }, [state.data]);

  const updateRequestParamsAction = (requestParams) => {
    return {
      type: 'UPDATE_REQUEST_PARAMS',
      payload: requestParams
    }
  }

  const updateData = (data) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: data
    })
  }

  const handleHistoryClick = (oldHistory) => {
    /* 
      Objects in state.history look like this:
      {
        data:
        method:
        url:
        body:
      }
    */
   
    let historyObject = state.history.filter(history => history===oldHistory);
    //console.log(historyObject[0].data);
    let oldData = historyObject[0].data;
    console.log(oldData);
    updateData(oldData);
  }

  return (
    <React.Fragment>
      <Header />
      {state.requestParams &&
      <>
        <div>Request Method: {state.requestParams.method}</div>
        <div>URL: {state.requestParams.url}</div>
      </>
      }
      {state.history &&
        <History historyList={state.history} handleApiCall={setRequestParams} handleOldData={handleHistoryClick}/>
      }
      <Form handleApiCall={setRequestParams} />
      <Results data={state.data} />
      <Footer />
    </React.Fragment>
  );
}

export default App;