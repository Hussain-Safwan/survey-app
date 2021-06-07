import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MessageList = props => {

  const [state, setState] = useState({
    users: [],
  })

  useEffect(() => {
    let temp = { ...state }
    temp.users = props.users
    console.log(props.users)
    setState(temp)
  }, [])

  const openConvo = (e, i) => {
    const open = props.open
    open(i)
  }

  const addUser = () => {
    const addUser = props.addUser
    addUser({
      name: 'John Doe',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8cyUrYvHcRDy0ogeHCORJ4TnGpXq1PYpwQ&usqp=CAU',
      hour: '1'
    })
  }

  return (
    <div className='MessageList'>
      <div className='header'>
        <div className='left'>
          Chats
        </div>
        <div className='right'>
        <span class="material-icons">
          more_horiz
        </span>
        <span class="material-icons" onClick={addUser}>
          video_call
        </span>
        <span class="material-icons">
          create
        </span>
        </div>
      </div>

      <div className='search-box'>
        <input type='text' placeholder='Search Messenger' />
      </div>

      <div className='list'>
        {
          state.users.map((user, i) => (
            <div className='each'
            style={{ backgroundColor: props.openIndex == i && '#4b4e50'  }}
            onClick={e => openConvo(e, i)}>
              <div className='image'>
                <img src={ user.image } />
              </div>
              <div className='text'>
                <div className='name'>
                  { user.name }
                </div>
                <div className='message'>
                  {user.messages.length ? user.messages[user.messages.length-1].msg + ' • ' + user.hour + 'h' : ''} 
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MessageList
