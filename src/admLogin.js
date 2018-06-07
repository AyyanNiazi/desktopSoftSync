import React, { Component } from 'react'
import {Link,
       Route } from 'react-router-dom'
// import './access.css'       
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import firebase from 'firebase'
// import * as Firebase from 'firebase'
import Firebase, { auth, storage,   provider } from './config/Fire.js';
import './adminPortal.css'




export default class AdminLogin extends React.Component{
    constructor() {
        super();
        this.state = {
          currentItem: '',
          username: '',
          admins: []
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
        const adminsRef = firebase.database().ref('admins');
        const admin = {
          admin: this.state.currentItem,
          user: this.state.username
        }
        adminsRef.push(admin);
        this.setState({
          currentItem: '',
          username: ''
        });
      }
      componentDidMount() {
        const adminsRef = firebase.database().ref('admins');
    
        adminsRef.on('value', (snapshot) => {
          let admins = snapshot.val();
          let newState = [];
          for (let admin in admins) {
            newState.push({
              id: admin,
              title: admins[admin].title,
              user: admins[admin].user
            });
          }
          this.setState({
            admin: newState
          });
        });
      }
      removeItem(adminId) {
        const adminsRef = firebase.database().ref(`/admins/${adminId}`);
        adminsRef.remove();
      }
      render() {
        return (
          <div >
            <header>
                <div className="headDiv">
                  <h1>Admin </h1>
                  <i className=" " aria-hidden="true"></i>   
                  <Link to='/logout' className='link'> Log out </Link>     
                  <Link to='/clogin' className='linkC'> Company Portal </Link>              
                  <Link to='/login' className='linka'> Student Portal </Link>              
                </div>
            </header>
            
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
    
    