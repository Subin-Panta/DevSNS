import React, { Fragment, useEffect } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import { Route, Switch } from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
//Redux
import { Provider } from 'react-redux'
import store from './store'
import Alert from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Navbar />
      <Switch>
        <Fragment>
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </section>
        </Fragment>
      </Switch>
    </Provider>
  )
}

export default App
