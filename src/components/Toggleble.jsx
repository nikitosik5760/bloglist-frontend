import { useState } from 'react'

const Toggleble = (props) => {
  const [visilible, setVisible] = useState(false)
  const hiddenWhenVisible = {display: visilible ? 'none': ''}
  const showWhenVisible = {display: visilible ? '': 'none'}


  const changeVisibility = () => {
    setVisible(!visilible)
  }

  return (
    <div>

    <div style={showWhenVisible}>
        {props.children}
        <button onClick={changeVisibility}>cancel</button>
    </div>
    <div style={hiddenWhenVisible}>
        <button onClick={changeVisibility}>{props.buttonLabel}</button>
    </div>
    </div>
  )
}

export default Toggleble