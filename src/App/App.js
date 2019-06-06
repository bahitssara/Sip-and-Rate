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
import dummyStore from '../dummydata';

class App extends React.Component {
  state = {
    users: [],
    beverages: [],
    reviews: []
  };

  componentDidMount() {
    this.setState(dummyStore);
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
