from django.contrib.auth import get_user_model
from django.test import TestCase

from rest_framework.test import APIClient

from .models import Tweet
User = get_user_model()
class TweetTestCase(TestCase):
  def setUp(self):
    self.user = User.objects.create_user(username='Python', password='pass1234')
    Tweet.objects.create(content='My first tweet', user=self.user)
    Tweet.objects.create(content='My second tweet', user=self.user)
    Tweet.objects.create(content='My third tweet', user=self.user)
    Tweet.objects.create(content='My fourth tweet', user=self.user)

  def test_tweet_created(self):
    tweet_obj = Tweet.objects.create(content='My tweet', user=self.user)
    self.assertEqual(tweet_obj.id, 5)
    self.assertEqual(tweet_obj.user, self.user)

  def get_client(self):
    client = APIClient()
    client.login(username=self.user.username, password='pass1234')
    return client

  def test_tweet_list(self):
    client = self.get_client()
    response = client.get('/api/tweets/')
    self.assertEqual(response.status_code, 200)
    self.assertEqual(len(response.json()), 4)
  
  def test_action_like(self):
    client = self.get_client()
    response = client.post('/api/tweets/action/', {'id': 1, 'action': 'like'})
    self.assertEqual(response.status_code, 200)
    like_count = response.json().get('likes')
    self.assertEqual(like_count, 1)


  def test_action_unlike(self):
    client = self.get_client()
    response = client.post('/api/tweets/action/', {'id': 2, 'action': 'like'})
    self.assertEqual(response.status_code, 200)
    response = client.post('/api/tweets/action/', {'id': 2, 'action': 'unlike'})
    self.assertEqual(response.status_code, 200)
    like_count = response.json().get('likes')
    self.assertEqual(like_count, 0)

  def test_action_retweet(self):
    client = self.get_client()
    response = client.post('/api/tweets/action/', {'id': 2, 'action': 'retweet'})
    self.assertEqual(response.status_code, 201)

