import React, { useState, useEffect } from 'react'
import '../assests/css/index.css'
import axios from 'axios'
import crypto from 'crypto-random-string'

const Survey = props => {
  const [state, setState] = useState({
    id: '',
    title: '',
    data: [],
    index: 0,
    end: false,
    upto: null,
    answers: []
  })
  const [submitButton, setSubmitButton] = useState({
    disabled: false,
    display: true
  })
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    const id = props.location.state
    console.log(id)
    if (state.data.length == 0) {
      const data = axios.get('/api/v1/user/queries', config).then(res => {
        const data = res.data
        console.log(data)
        let temp = {...state}
        temp.id = data._id
        temp.title = data.title
        temp.data = data.questions
        temp.upto = data.length-1
        temp.answers = new Array(data.length).fill({
          index: null,
          type: null,
          value: ''
        })
        setState(temp)
      })
    }
  }, [])

  const next = () => {
    let temp = { ...state }
    console.log(temp.upto, temp.index)
    if (temp.index == temp.upto || state.index == state.data.length-1) {
      console.log('end reached')
      temp.end = true
      setState(temp)
      return
    }

    if (temp.data[temp.index].type == 'scq') {
      const jump = temp.data[temp.index].jumps.find(jump => jump.option == temp.answers[temp.index].value)
      if (jump.over == true) {
        temp.end = true
        setState(temp)
        return
      }
      temp.index = jump.start
      temp.upto = jump.end
      setState(temp)
      console.log('>>', temp.upto, temp.index)
      return
    } else {
      temp.index++
      setState(temp)
    }
    
  }

  const handleChanges = e => {
    let temp = { ...state }
    temp.answers[state.index] = {
      question: state.data[state.index].question,
      index: state.index,
      type: state.data[state.index].type,
      value: e.target.value
    }
    setState(temp)
  }

  const handleChecks = e => {
    let checked = []
    const checkBoxes = document.getElementsByTagName('input')
    for (let i=0; i<checkBoxes.length; i++) {
      if (checkBoxes[i].checked) {
        checked.push(checkBoxes[i].value)
      }
    }
    let temp = { ...state }
    temp.answers[state.index] = {
      question: state.data[state.index].question,
      index: state.index,
      type: state.data[state.index].type,
      value: checked
    }
    setState(temp)
  }

  const submit = () => {
    let temp = { ...submitButton }
    temp.disabled = true
    setSubmitButton(temp)

    const user_id = crypto({ length: 6 })
    const survey_id = state.id
    const data = {
      user_id,
      survey_id,
      answers: state.answers
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    axios.post('/api/v1/user/survey', data, config).then(res => {
      let temp = { ...submitButton }
      temp.display = false
      setSubmitButton(temp)
      setMsg(res.data.msg)
    })
  } 

  const RenderSwitch = () => {
    const type = state.data[state.index].type
    const data = state.data[state.index]
    let jsx = null
    switch (type) {
      case 'free' : 
       return (
        <div className="free">
          <input type="text" name={data.question} value={state.answers[state.index].value} onChange={handleChanges} />
        </div>
       )
      case 'scq' : 
        return (
          <div className="scq">
                            {
                              data.options.map((option, i) => (
                                <div className="option">
                                    <input 
                                    type="radio" 
                                    key={data.question} 
                                    name={data.question} 
                                    id={option} 
                                    value={option}
                                    onChange={handleChanges}
                                    />
                                    <label htmlFor={option}>{option}</label>
                                    <br /> <br />
                                </div> 
                              ))
                            }
                        </div>
        )
      case 'mcq' :
        return (
          <div className="mcq">
                            {
                              data.options.map((option, i) => (
                                <div className="option">
                                    <input type="checkbox" key={data.question} name={data.question} id={option} value={option} onChange={handleChecks}/>
                                    <label htmlFor={option}>{option}</label>
                                    <br /> <br />
                                </div> 
                              ))
                            }
                        </div>
        )
      default: 
        return <div></div>
    }
  }

  return (
    <div className="page-wrapper">
    <div className="content-wrapper">
  
        {
          state.data.length == 0 && !state.end ? <div></div> : (
            <>
            <h2 style={{ textAlign: 'center' }}>{ state.title }</h2>
            <div className="box">
              <div className="question-space">
                  <div className="question" id="question">
                      <p>{state.index+1}. {state.data[state.index].question}</p>
                  </div>
              </div>
              <div className="answer-space" id="answer-space">
                {RenderSwitch()}
              </div>
              <div className="footer">
                  <div className="buttons">
                      <div className="btn-right">
                        {/* <button onClick={previous} disabled={state.index == 0 ? true : false}>Previous</button> */}
                        </div>
                      <div className="btn-left"><button onClick={next} >Next</button></div>
                  </div>
              </div>
          </div>
          </>
          )
        }
        
        {
          state.end ? <div className='final'>
          <p>
            <div className='texts'>You've reached the end of the survey. Thanks for the patience!</div>
            <br/>
            <div>
              <button 
              onClick={submit} 
              disabled={submitButton.disabled} 
              style={{display: submitButton.display ? '' : 'none'}} 
              >
                Submit
              </button>
              </div>
            <br />
            { msg == null ? null : <div className='texts'>{msg}</div> }
          </p>
        </div> : null
        }
    </div>
</div>
  )
}

export default Survey
