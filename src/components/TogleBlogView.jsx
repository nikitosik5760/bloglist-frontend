import { useState } from 'react'

const TogleBlogView = (props) => {
  const [visible, setVisible] = useState(false)
  
  const hiddenWhenVisible = {display: visible ? 'none': ''}
  const showWhenVisible = {display: visible ? '': 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
    <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        <br/>
        {props.children}
    </div>
    
    <div style={hiddenWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
    </div>

    </div>
  )
}

export default TogleBlogView