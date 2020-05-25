import React, { Fragment } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import { Route, Switch } from 'react-router-dom'
import Register from './components/auth/Register'
import { Login } from './components/auth/Login'
//Redux
import { Provider } from 'react-redux'
import store from './store'
import Alert from './components/layout/Alert'

const App = () => (
  <Provider store={store}>
    <Navbar />
    <section className='container'>
      <Alert />
      <Switch>
        <Fragment>
          <Route exact path='/' component={Landing} />

          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />   
        </Fragment>
      </Switch>
    </section>
  </Provider>
)

export default App
