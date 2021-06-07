import React, { useState, useEffect } from 'react'
import axios from 'axios'

import MessageList from '../ui/MessageList'
import Conversation from '../ui/Conversation'
import Accessories from '../ui/Accessories'
import '../assests/css/messenger.css'

const Messenger = () => {

  const [state, setState] = useState({
    users: [],
    open: 0,
    set: false
  })

  const fetchUser = () => {
    axios.get('/api/v1/user/conversation/new').then(res => {
      let temp = { ...state }
      const user = res.data.data
      temp.users.push({
        name: user.name,
        image: user.image,
        hour: user.hour,
        messages: user.messages
      })
      temp.set = true
      setState(temp)
    })
  }

  useEffect(() => {
    axios.get('/api/v1/user/conversations').then(res => {
      let temp = { ...state }
      const user = res.data.data
      console.log(user.length)
      temp.users = user
      temp.set = true
      setState(temp)
    })
  }, [])

  const open = (i) => {
    let temp = { ...state }
    temp.open = i
    temp.conversations = []

    setState(temp)
  }

  const editUser = data => {
    let { index, info } = data
    let temp = { ...state }
    temp.users[index].name= info.name
    temp.users[index].image= info.image
    temp.users[index].hour= info.hour
    temp.users[index].active= info.active

    const user_id = state.users[state.open]._id
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    info = {
      ...info,
      user_id
    }
    console.log('update')
    axios.post('/api/v1/user/conversations/update', info, config).then(res => {})

    setState(temp)
  }

  const addUser = user => {
    fetchUser()
  }

  const deleteUser = e => {
    const user_id = state.users[state.open]._id
    axios.get(`/api/v1/user/delete/${user_id}`).then(res => {
      let temp = { ...state }
      temp.users.splice(temp.open, 1)
      temp.open = 0
      setState(temp)
    })
  }

  const send = data => {
    let temp = { ...state }
    temp.users[temp.open].messages.push(data)
    setState(temp)

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const payload = {
      user_id: state.users[state.open]._id,
      ...data
    }
    axios.post('/api/v1/user/conversations/new-msg', payload, config).then(res => {
      console.log(res.data)
    })
  }

  return (
    <div className='page-wrapper'>
      <div className='nav'></div>
      {
        !state.set ? (
          <div style={{height: '100vh'}}>
          </div>
        ) : (
          <div className='content-wrapper'>
            <MessageList 
            users={state.users} 
            open={open} 
            openIndex={state.open}
            addUser={addUser}
            />
            <Conversation 
              user={state.users[state.open]} 
              users={state.users.length} 
              index={state.open}
              editUser={editUser}
              send={send}
              deleteUser={deleteUser}
              />
            <Accessories user={state.users[state.open]}/>
          </div>
        )
      }
    </div>
  )
}

export default Messenger
