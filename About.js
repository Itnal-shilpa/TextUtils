import React, { useState } from 'react'

export default function About() {
  const [myStyle, setMyStyle] = useState({
    backgroundColor: 'white',
    color: 'black'
  })
  const [btnText, setBtnText] = useState('Enable Dark mode')

  const togglestyle = () => {
    if (myStyle.color === 'black') {
      setMyStyle({
        backgroundColor: 'black',
        color: 'white'
      })
      setBtnText('Enable Light mode')
    } else {
      setMyStyle({
        backgroundColor: 'white',
        color: 'black'
      })
      setBtnText('Enable Dark mode')
    }
  }

  return (
    <>
      <div className="container1 my-3" style={myStyle}>
        <h1>About Us</h1>
        <p>
          This is a simple text utility app that allows users to manipulate and
          analyze text. It provides features such as converting text to uppercase,
          lowercase, capitalizing the first letter, and clearing the text.
          Additionally, it provides a summary of the text, including word count,
          character count, estimated reading time, and unique word count.
        </p>
      </div>
      <div className="container my-3">
        <button onClick={togglestyle} type="button" className="btn btn-primary">
          {btnText}
        </button>
        
      </div>
    </>
  )
}
