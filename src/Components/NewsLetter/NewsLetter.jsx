import React, { useState } from 'react'
import './NewsLetter.css'
export const NewsLetter = () => {
    const [text, setText] = useState('');
    const handleOnChangeText = (event) => {
        setText(event.target.value)
    }
    const handleOnClick = (event) => {
        setText('')
        alert("Cam on ban")
        event.preventDefault()
    }
    return (
        <div className='newsletter'>
            <h1>Get exclusive offers on your email</h1>
            <p>Subscribe to our newletter and stay updated </p>
            <div>
                <input type="email" placeholder='enter your id email' value={text} onChange={(event) => { handleOnChangeText(event) }} />
                <button onClick={(event) => { handleOnClick(event) }}>Subscribe</button>
            </div>
        </div>
    )
}
export default NewsLetter
