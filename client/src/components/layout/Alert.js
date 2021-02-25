import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Alert = props =>
  props.alerts !== null &&
  props.alerts.length > 0 &&
  props.alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      <h1>{alert.msg}</h1>
    </div>
  ))
Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}
const mapStatetoProps = state => ({
  alerts: state.alert
})
export default connect(mapStatetoProps)(Alert)
