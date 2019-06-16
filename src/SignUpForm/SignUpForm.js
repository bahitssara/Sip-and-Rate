import React from 'react';
import './SignUpForm.css';
import SipRateContext from '../SipRateContext'
import AuthApiService from '../services/auth-api-service'



class SignUpForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        }
    }
    static contextType = SipRateContext;
    
    handleCreateAccount = ev => {
        ev.preventDefault()
        const { first_name, last_name, email, password } = ev.target
        this.setState({ error: null })
            AuthApiService.postUser({
                first_name: first_name.value,
                last_name: first_name.value,
                email: email.value,
                password: password.value,
            })
            .then(user => {
                first_name.value = ''
                last_name.value = ''
                email.value = ''
                password.value = ''
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
            }

    render() {
        return(
            <section className='signup-page'>
                <div className='sign-up-description'>
                    <h3>Sign up to get started rating your favorite wine and beer!</h3>
                </div>
                <form className='sign-up-main' onSubmit={this.handleCreateAccount}>
                    <fieldset>
                        <legend>Sign Up</legend>
                            <label>First Name</label>
                            <input 
                                type='text'
                                name='first_name'
                                id='first-name-input'
                            />
                            <label>Last Name</label>
                            <input 
                                type='text'
                                name='last_name'
                                id='last-name-input'
                            />
                            <label>Email</label>
                            <input 
                                type='text' 
                                name='email' 
                                id='email-input' 
                                /*value='email'*/ />
                            <label>Password</label>
                            <input 
                                type='text' 
                                name='password' 
                                id='password-input' 
                                /*value='password'*/ />
                            <button className='sign-up-button'>Create Account</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}

export default SignUpForm;