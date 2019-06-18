import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

class WelcomePage extends React.Component {
    render() {
        return(
            <div className='description'>
                    <h2 className='header-description'>Welcome to Sip and Rate!</h2>
                        <p>Ever had a wine that you LOVED but can't remember the name? Maybe you're at the store and see a wine that you can't remember if you've had or if you even liked it all! This is where that ends. <Link to='/searchpage'>Search</Link> a beverage and add your personal opinion and review to your profile. You can revisit whenenver you need, and always keep track of what you loved, and what wasn't your style!</p>
                        <h3>All you have to do is Sign In or <Link to='/signup'>Sign Up</Link> now to get started!</h3>
                </div>
        )
    }
}

export default WelcomePage;