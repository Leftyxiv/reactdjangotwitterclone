import React, { useState, useEffect, createRef } from 'react';
import { v4 as uuid } from 'uuid';
import { loadTweets } from '../lookup'

export const TweetsComponent = (props) => {
  const [newTweets, setNewTweets] = useState([])

  const textAreaRef = createRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    const textValue = textAreaRef.current.value
    let tempNewTweet = [...newTweets]
    tempNewTweet.unshift({
      content: textValue,
      likes: 0,
      id: uuid()
    })
    setNewTweets(tempNewTweet)
    textAreaRef.current.value = ''
  }
  return (
  <div className={props.className}>
    <div className='col-12' style={{ width: '800px'}}>

    <form onSubmit={handleSubmit}>
      <textarea required={true} ref={textAreaRef} className='form-control' name='tweet'>

      </textarea>
      <button type='submit' className='btn btn-danger my-3'>Tweet</button>
    </form>
    <TweetList newTweets={newTweets} /> 
    </div>
  </div>
  )
}





export const Tweet = (props) => {

  const {tweet} = props;
  const className = props.className ? props.className : 'col-10 mx-auto col-md-6';
  return(
    <div className={ className }>
      <p>{ tweet.id }-{ tweet.content }</p>
      <div className='btn btn-group'>
    <ActionBtn tweet={ tweet } action={{type: 'like', display: 'Likes'}}/>
    <ActionBtn tweet={ tweet } className="btn btn-outline-primary btn-sm" action={{type: 'unlike', display: 'Unlike'}}/>
    <ActionBtn tweet={ tweet } className="btn btn-success btn-sm" action={{type: 'retweet', display: 'Retweet'}}/>

      </div>
    
    </div>

) 
}

export const ActionBtn = (props) => {
  const { tweet, action } = props;

  const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
  const [clicked, setClicked] = useState(false)

  const className = props.className ? props.className : 'btn btn-primary btn-sm';
  const display = action.type === 'like' ? `${likes} Likes!` : action.display

  const handleClick = (event) => {
  event.preventDefault()
  if (action.type === 'like'){
    if (clicked){
    setClicked(!clicked)
    setLikes(likes - 1)
  } else {
    setLikes(likes + 1)
    setClicked(true)
  }
}
}
  return <button onClick={ handleClick } className={ className }> { display } </button>
}



export const TweetList = (props) => {
  const [tweetsInit, setTweetsInit] = useState([])
  const [tweets, setTweets] = useState([])

  useEffect(()=> {
    let final = [...props.newTweets].concat(tweetsInit)
   if(final.length !== tweets.length){
    setTweets(final)
   }
  },[props.newTweets, tweetsInit, tweets])
  useEffect(()=> {
    const myCallback = (res, status) => {
      if(status === 200){
        setTweetsInit(res)
      } else {
        alert('ERROR WILL ROBINSON')
      }
    }
  loadTweets(myCallback)
  },[])
return  tweets.map((tweet, index) => {
  return <Tweet tweet={tweet} key={tweet.id} className='my-5 py-5 border bg-white text-dark'/>
})
}
