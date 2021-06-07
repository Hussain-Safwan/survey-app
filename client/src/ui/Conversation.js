import React, { useState, useEffect } from 'react'

const Conversation = props => {

  const [editor, setEditor] = useState(false)
  const [message, setMessage] = useState('')

  const openEditor = e => {
    setEditor(!editor)
  }

  const [info, setInfo] = useState({
    name: '',
    image: '',
    hour: '',
    active: false
  })

  useEffect(() => {
    let temp = { ...info }
    temp.name = props.user.name
    temp.image = props.user.image
    temp.hour = props.user.hour
    temp.active = props.user.active
    setInfo(temp)
  }, [props])

  const handleChange = e => {
    let temp = { ...info }
    if (e.target.name == 'active') {
      temp.active = !temp.active
    } else {
      temp[e.target.name] = e.target.value
    }
    
    setInfo(temp)
  }

  const save = e => {
    const editUser = props.editUser
    editUser({
      index: props.index,
      info
    })
    setEditor(!editor)
  }

  const deleteUser = e => {
    const dlt = props.deleteUser
    dlt()
    setEditor(!editor)
  }

  const sendMe = e => {
    const send = props.send
    send({
      sender: 'me',
      msg: message
    })
    setMessage('')
  }

  const sendYou = () => {
    const send = props.send
    send({
      sender: 'you',
      msg: message
    })
    setMessage('')
  }

  return (
    <div className='Conversation'>
      <div className='header'>
        <div className='left'>
          <div className='image'>
            <img src={props.user.image} />
          </div>
          <div className='name'>
            { props.user.name }
          </div>
        </div>

        <div className='right'>
        <span class="material-icons" onClick={openEditor}>
          call
        </span>
        <span class="material-icons">
          videocam
        </span> 
        <span class="material-icons">
          info
        </span>
        </div>
      </div>

      { editor ? (
        <div className='editor'>
        <div className='item'>
          <div className='name-input'>
            <input type='text' name='name' onChange={handleChange} value={info.name}/>
          </div>
          <div className='hour-input'>
            <input type='number' name='hour' onChange={handleChange} value={info.hour}/>
          </div>
        </div>
        <div className='item'>
          <div className='name-input'>
              <input type='text' name='image' onChange={handleChange} value={info.image}/>
            </div>
            <div className='hour-input' style={{ display: 'flex'}}>
            <input type='checkbox' id='active' name='active' checked={info.active} onChange={handleChange}/>
            <label htmlFor='active' style={{color: '#fff'}}>Active</label>
          </div>
          </div>
        <div className='submit-btn' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={save}>Save</button>
          <button onClick={deleteUser}>Delete User</button>
        </div>
      </div>
      ) : null }

      <div className='messages'>
        {
          props.user.messages.map(message => message.sender == 'you' ? (
           <>
            <br />
            <div className='you'>
              {message.msg}
            </div>
            </>
          ) : (
            <>
            <br />
            <div className='me'>
              <p>{message.msg}</p>
            </div>
            </>
          )  
        )}        
      </div>

      <div className='footer'>
        <div className='buttons'>
        <span class="material-icons">
          add_circle
        </span>
        <span class="material-icons">
          collections
        </span>
        <span class="material-icons" onClick={sendYou}>
          gif_box
        </span>
        </div>
        <div className='msg-input'>
          <input type='text' placeholder='Aa' 
            value={message}
            onChange={e => {
              setMessage(e.target.value)
            }}
          />
        </div>
        <div className='send-btn'>
        <span class="material-icons" onClick={sendMe}>
          waving_hand
        </span>
        </div>
      </div>
    </div>
  )
}

export default Conversation
