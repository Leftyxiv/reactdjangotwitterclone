import React, { useState, useEffect } from 'react';
import { loadTweets } from '../lookup'

export const Tweet = (props) => {
  const {tweet} = props;
  const className = props.className ? props.className : 'col-10 mx-auto col-md-6';
  return(
    <div className={ className }>
      <p>{ tweet.id }-{ tweet.content }</p>
      <div className='btn btn-group'>
    <ActionBtn tweet={ tweet } action={{type: 'like'}}/>
    <ActionBtn tweet={ tweet } action={{type: 'unlike'}}/>
    <ActionBtn tweet={ tweet } action={{type: 'retweet'}}/>

      </div>
    
    </div>

) 
}
export const ActionBtn = (props) => {
const { tweet, action } = props;
const className = props.className ? props.className : 'btn btn-primary btn-sm';
return action.type === 'like' ? <button className={ className }> {tweet.likes} Likes!</button> : null
return action.type === 'unlike' ? <button className={ className }> {tweet.likes} Likes!</button> : null
return action.type === 'like' ? <button className={ className }> {tweet.likes} Likes!</button> : null
}


export const TweetList = (props) => {
  const [tweets, setTweets] = useState([])
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
return  tweets.map((tweet, index) => {
  return <Tweet tweet={tweet} key={tweet.id} className='my-5 py-5 border bg-white text-dark'/>
})
}
