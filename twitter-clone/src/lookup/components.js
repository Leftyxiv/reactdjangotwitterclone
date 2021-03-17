const lookup = (method, endpoint, callback, data) => {
  let jsonData;
  if(data){
    jsonData = JSON.stringify(data)
  }
  const xhr = new XMLHttpRequest()
  const url = `http://localhost:8000/api${endpoint}`
  const responseType = 'json'
  
  xhr.responseType = responseType;
  xhr.open(method, url)
  xhr.onload = function() {
    callback(xhr.response, xhr.status)
  }
  xhr.onerror = (e) => {
    callback({"message": "There was an error"}, 400)
  }
  xhr.send(jsonData)
}

export const loadTweets = (callback) => {  
  lookup('GET', '/tweets/', callback)
}
