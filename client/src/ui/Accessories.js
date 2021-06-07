import React from 'react'

const Accessories = props => {
  return (
    <div className='Accessories'>
      <div className='top'>
        <div className='image'>
          <img src={props.user.image} />
        </div>
        <div className='name'>
          <p>
            { props.user.name }
          </p>
        </div>
      </div>

      <div className='actions'>
        <div className='each'>Customize Chat</div>
        <div className='each'>Chat Members  </div>
        <div className='each'>Privacy & Support</div>
        <div className='each'>Shared Files</div>
        <div className='each'>Shared Media</div>
      </div>
    </div>
  )
}

export default Accessories
