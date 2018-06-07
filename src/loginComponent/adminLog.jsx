import React from 'react'
import './login.css'
import {
  Link,
Redirect} from 'react-router-dom'
import { EventEmitter } from 'events';
import {
  Toaster, Intent
} from '@blueprintjs/core'

import  Firebase  from './../config/Fire.js'
import firebase, { auth,app,   provider } from './../config/Fire.js';
import  Navigator from './Navbar';


var uid= 'some-uid'

export default class AdminForm extends React.Component{

    constructor(props){
        super(props)
       
        this.authformEmailPassword= this.authformEmailPassword.bind(this);
        this.authWithGoogle= this.authWithGoogle.bind(this);
        this.state = {
            redirect : false  
        }
       }

       authWithGoogle() {
        app.auth().signInWithPopup(provider) 
        .then((result, error) => {
                if (error) {
                  this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Facebook" })
                } else {
                  this.setState({ redirect: true })
                }
              })
          }

    authformEmailPassword(event){
      event.preventDefault()
      const password = this.passwordInput.value
      const email = this.emailInput.value

      app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if(providers.length === 0){
          return app.auth().createUserWithEmailAndPassword(email, password)
        } 
        else if (providers.indexOf("password") === -1){
            this.adminForm.reset()
            this.toaster.show({intent: Intent.WARNING, message: "You Can Login With Gmail Account."})
        }
        else{
                  
              
              return  app.auth().createCustomToken(uid)
              .then(function(customToken) {
                // Send token back to client
              })
              .catch(function(error) {
                console.log("Error creating custom token:", error);
              });
              // app.auth().signInWithEmailAndPassword(email, password)
        }
      }).then((user) => {
        if (user && user.email) {
          this.adminForm.reset()
          this.setState({redirect: true})
        }
      }).catch((error) => {
        this.toaster.show({intent: Intent.DANGER, message: error.message})
      })
    }
      
    render(){
      if(this.state.redirect === true){
        return <Redirect to='/admlogin' />
      }
        return(

            <div>
              <Navigator />
            <div className="body" >
            <div className="main-div">
            <h3> Admin Login </h3>
            <Toaster ref={(element) => { this.toaster = element }} />
            <form onSubmit={(event) => {this.authformEmailPassword(event)}}
       ref={(form) => {this.adminForm = form}} >
            <label>
              Email:
               <input
                 name="email" type="email"
                  ref={(input) => {this.emailInput = input}}
                  placeholder="Put Your Email"
                />
               </label>
                <br/>
               <label>
                password:
                <input 
                name='password'
                type="password" 
                ref={(password) => {this.passwordInput = password}}
                placeholder="Put Your Password" />
               </label>
               {/* <input type="submit"  className="btn btn-primary">Login</input> */}
               
               <br/>
               <input type="submit"  style={{marginLeft: '25px'}} value="Log In"className="btn btn-success"></input>
              <button type="submit" onClick={() => { this.authWithGoogle() }} style={{marginLeft: '25px'}} className="btn btn-success">Sign in with Gmail</button>
             
               </form>
            </div>
            </div>
            </div>
            
        )
    }
}