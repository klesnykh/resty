function History ({historyList, handleOldData}) {

  let handleOldDataClick = (historyObject) => {
    console.log(historyObject);
    handleOldData(historyObject);
  }

  return(
    //unordered list
    <>
    <h2>History</h2>
    <ul>
      {historyList.map(history => {
        return(
          <li 
            id='history-url' 
            onClick={() => handleOldDataClick(history)}
            >URL: {history.url} Method: {history.method}
          </li>)}
      )}
    </ul>
    </>
  )
}

export default History;