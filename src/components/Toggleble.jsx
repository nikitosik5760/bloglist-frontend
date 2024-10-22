import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useState } from 'react'

const Toggleble = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hiddenWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button><br/>
      </div>
      <div style={hiddenWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
    </div>
  )
})
Toggleble.displayName = 'Toggleble'
Toggleble.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleble