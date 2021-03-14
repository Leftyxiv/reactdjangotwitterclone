import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';


const Tweet = (props) => {
  const { tweet } = props;
  const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
  return <div className={className}>
    <p>
      { tweet.content }
    </p>
  </div>
}
function App() {
  const [tweets, setTweets] = useState([]);
  
  const loadTweets = (callback) => {
    
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = 'http://localhost:8000/api/tweets/'
    const responseType = 'json'
    
    xhr.responseType = responseType;
    xhr.open(method, url)
    xhr.onload = function() {
      callback(xhr.response, xhr.status)
    }
    xhr.onerror = (e) => {
      callback({"message": "There was an error"}, 400)
    }
    xhr.send()
    
  }
  //loadTweets(document.getElementById('tweets'))
  
  useEffect(()=> {
    const myCallback = (res, status) => {
      if(status === 200){
        setTweets(res)
      } else {
        alert('ERROR WILL ROBINSON')
      }
    }
  loadTweets(myCallback)
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          {tweets.map((tweet, index) => {
            return <Tweet tweet={tweet} key={tweet.id}/>
          })}
      </header>
    </div>
  );
}

export default App;
