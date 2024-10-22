import { useState } from 'react'

const TogleBlogView = (props) => {
  const [visible, setVisible] = useState(false)

  const hiddenWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div id={visible ? 'visible' : 'unvisible'} style={showWhenVisible}>
        <button id='hide-btn' onClick={toggleVisibility}>hide</button>
        <br/>
        {props.children}
      </div>

      <div id={visible ? 'unvisible' : 'visible'} style={hiddenWhenVisible}>
        <button id='view-btn' onClick={toggleVisibility}>view</button>
      </div>

    </div>
  )
}

export default TogleBlogView