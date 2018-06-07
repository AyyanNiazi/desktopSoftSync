import React, { Component } from 'react'
import {Link,
       Route } from 'react-router-dom'
// import './access.css'       
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import firebase from 'firebase'
// import * as Firebase from 'firebase'
import Firebase, { auth, storage,   provider } from './config/Fire.js';
import './adminPortal.css'


import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import express from 'express'

// admin.initializeApp(functions.config().firebase);



const serviceAccount = require("./softsyncdev-1409c-firebase-adminsdk-zd32w-cc43c05703.json");



// // const server = new FirebaseServer(5001, 'localhost.url', MockDatabase); // eslint-disable-line no-unused-vars
//  const config = {
//   databaseURL: "https://softsyncdev-1409c.firebaseio.com",
    
//   credential: admin.credential.cert(serviceAccount),
    
//   };
// admin.initializeApp(config);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://softsyncdev-1409c.firebaseio.com"
});





export default class Login extends React.Component{
    constructor() {
        super();
        this.state = {
          currentItem: '',
          username: '',
          change: '',
          users: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
      }
      handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
      handleSubmit(e) {
        e.preventDefault();
        const usersRef = firebase.database().ref('users');
        const user = {
          title: this.state.currentItem,
          user: this.state.username
        }
        usersRef.push(user);
        this.setState({
          currentItem: '',
          username: ''
        });
      }
      componentDidMount() {
        const usersRef = firebase.database().ref('users');
    
        usersRef.on('value', (snapshot) => {
          let users = snapshot.val();
          let newState = [];
          for (let user in users) {
            newState.push({
              id: user,
              title: users[user].title,
              user: users[user].user
            });
          }
          this.setState({
            users: newState
          });
        });
      }

      removeItem(userId) {
       
        admin.auth().deleteUser(userId)
        .then(function() {
          console.log("Successfully deleted user");
        })
        .catch(function(error) {
          console.log("Error deleting user:", error);
        });
       
       
       
       
       
        // const usersRef = firebase.database().ref(`/users/${userId}`);
        // usersRef.remove();
      }

      
      
      
      render() {
        return (
          <div className='app'>
            <header>
                <div className="headDiv">
                  <h1>Student Portal </h1>
                  <i className="" aria-hidden="true"></i>          
                  <Link to='/logout' className='link'> Log out </Link>     
                  <Link to='/clogin' className='linkC'> Company Portal </Link>     
                </div>
            </header>
            <div >
              <section className='frm' >
                    <form onSubmit={this.handleSubmit}>
                      <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                      <input type="textarea" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                      <button className="btn btn-success">Add Content</button>
                    </form>
              </section>
              <section className='displayLi'>
                  <div className="wrapper">
                    <ul>
                      {this.state.users.map((user) => {
                        return (
                          <li key={user.id}>
                          <h3>{user.title}</h3>
                          <p>brought by: <strong>{user.user}</strong>
                            <button onClick={() => this.removeItem(user.id)}>Remove Item</button>
                          </p>
                        </li>
                        );
                      })};
                    </ul>
                  </div>
              </section>
            </div>
          </div>
    


            // <div>
            //       <Navbar default collapseOnSelect>
            //         <Navbar.Header>
            //         <Navbar.Brand>
            //             <Link to='/'> Indus University  </Link>
            //         </Navbar.Brand>
            //         <Navbar.Toggle/>
            //         </Navbar.Header>
            //         <Navbar.Collapse>
            //             <Nav pullRight>
            //               <NavItem eventKey={1} componentClass={Link} href="/" to="/">
            //                 Home
            //               </NavItem>
            //               <NavItem eventKey={2} componentClass={Link} href="/" to="/adminLog">
            //                 Admin Login
            //               </NavItem>
            //               <NavItem eventKey={3} componentClass={Link} href="/" to="/studentLog">
            //                 Student Login
            //               </NavItem>
            //               <NavItem eventKey={4} componentClass={Link} href="/" to="/companyLog">
            //                 Company Login
            //               </NavItem>
            //         </Nav>
            //         </Navbar.Collapse>
                    
            
            // </Navbar> 
            // </div>
        )
    }

}
    
    