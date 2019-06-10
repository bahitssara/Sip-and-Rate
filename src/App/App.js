import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from '../HomePage/HomePage'
import Header from '../Header/Header';
import SignUpForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LoginForm';
import SearchPage from '../SearchPage/SearchPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import AddReview from '../AddReviewPage/AddReview';
import EditReview from '../EditReview/EditReview';
import SipRateContext from '../SipRateContext'
import config from '../config'

class App extends React.Component {
  state = {
    users: [],
    beverages: [],
    reviews: []
  };

  componentDidMount() {
    Promise.all([
      fetch(config.API_ENDPOINT + '/beverages', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }),
      fetch(config.API_ENDPOINT + '/reviews', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
    ])
      .then(([bevRes, reviewRes]) => {
        if(!bevRes.ok)
          return bevRes.json().then(e => Promise.reject(e))
        if(!reviewRes.ok) 
          return reviewRes.json().then(e => Promise.reject(e))

        return Promise.all([
          bevRes.json(),
          reviewRes.json(),
        ])
      })
      .then(([beverages, reviews]) => {
        this.setState({
          beverages,
        })
        this.setState({
          reviews,
        })
        console.log(beverages, reviews)
      })
      
      .catch(error => {
        console.error({error})
      })
    }

  handleDeleteReview = reviewId => {
    this.setState({
      reviews: this.state.reviews.filter(review => review.id !== reviewId)
    })
  }

  handleEditReview = review => {
    this.setState({
      reviews:
      [...this.state.reviews, review]
    }) 
  }

  handleAddReview = review => {
    this.setState({
      reviews:
      [...this.state.reviews, review]
    })
  }


  render(){
    const contextValue = {
      users: this.state.users,
      beverages: this.state.beverages,
      reviews: this.state.reviews,
      deleteReview: this.handleDeleteReview,
      editreview: this.handleEditReview,
      addReview: this.handleAddReview
    }
    return (
      <SipRateContext.Provider value={contextValue}>
        <div className='App'>
          <main className='App'>
            <Route path='/' component={Header} />
            <Route path='/' exact component={HomePage} />
            <Route path='/signup' component={SignUpForm} />
            <Route path='/signin' exact component={LoginForm} />
            <Route path='/searchpage' exact component={SearchPage} />
            <Route path='/profilepage' component={ProfilePage} />
            <Route path='/addreview' component={AddReview} />
            <Route path='/editreview' component={EditReview} />
          </main>
        </div>
      </SipRateContext.Provider>
    );
  }
}

export default App;