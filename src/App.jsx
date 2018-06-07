import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom'
import StdForm from './loginComponent/studentLog';
import Home from './loginComponent/Home'
import  AdminForm from './loginComponent/adminLog';
import  CompForm from './loginComponent/companyLog';
import  Navigator from './loginComponent/Navbar';
import Login from './login'
import CompanyLogin from './clogin'
import AdminLogin from './admLogin'
import Logout from './logout'


class App extends Component {
  
  render() {
    return (
     
    <Router>
      <div>
       
     

      <Route path='/' exact       component={Home}/>
      <Route path='/studentLog'   component={StdForm}/>
      <Route path='/adminLog'     component={AdminForm}/>
      <Route path='/companyLog'   component={CompForm}/>
      <Route path='/login'      component={Login}/>
      <Route path='/admLogin'      component={AdminLogin}/>
      <Route path='/clogin'      component={CompanyLogin}/>
      <Route path='/logout'      component={Logout}/>
   
      </div>
    </Router>
    
    ) 
  }
}

export default App;
