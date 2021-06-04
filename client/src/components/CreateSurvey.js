import React, { useState } from 'react'
import '../assests/css/admin.css'
import axios from 'axios'

const CreateSurvey = () => {

  const [state, setState] = useState({
    title: '',
    questions: [{
      question: '',
      type: 'free',
      options: [], 
      jumps: [{ }]
    }]
  })

  const [submitBtn, setSubmitBtn] = useState(false)

  const [alert, setAlert] = useState({
    status: null,
    msg: ''
  })

  const handleTitleChange = (e) => {
    let temp = { ...state }
    temp.title = e.target.value
    setState(temp)
  }

  const handleQuestionChanges = (e, i) => {
    let temp = { ...state }
    temp.questions[i].question = e.target.value
    setState(temp)
  }

  const handleTypeChanges = (e, i) => {
    let temp = { ...state }
    temp.questions[i].type = e.target.value
    setState(temp)
  }

  const handleMCQOptions = (e, i, j) => {
    let temp = { ...state }
    temp.questions[i].options[j] = e.target.value
    setState(temp)
  }

  const handleSCQOptions = (e, i, j) => {
    let temp = { ...state }
    let jump = temp.questions[i].jumps[j]
    console.log(parseInt(e.target.value), e.target.value)
    if (e.target.name == 'options-start') {
      jump.start = parseInt(e.target.value)
    } else if (e.target.name == 'options-end') {
      jump.end= parseInt(e.target.value)
    } else if (e.target.name == 'options-over') {
      jump.over = e.target.checked 
    } else {
      temp.questions[i].options[j] = e.target.value
      jump.option = e.target.value
    }
    setState(temp)
  }

  const addOption = (e, i) => {
    let temp = { ...state }
    temp.questions[i].options.push('')
    temp.questions[i].jumps.push({})
    setState(temp)
  }

  const addQuestion = e => {
    let temp = { ...state }
    temp.questions.push({
      question: '',
      type: 'free',
      options: [], 
      jumps: [{}]
    })
    setState(temp)
  }

  const deleteQuestion = (e, i) => {
    if (state.questions.length > 1) {
      let temp = { ...state }
      temp.questions.splice(i, 1)
      setState(temp)
    }
  }

  const deleteOption = (e, i, j) => {
    if (state.questions[i].options.length > 1) {
      let temp = { ...state }
      temp.questions[i].options.splice(j, 1)
      setState(temp)
    }
  }

  const submit = e => {
    console.log(state)
    setSubmitBtn(true)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    axios.post('/api/v1/admin/survey', {data: state}, config).then(res => {
      setSubmitBtn(false)
      setState({
        title: '',
        questions: [{
          question: '',
          type: 'free',
          options: []
        }]
      })
      setAlert({
        status: res.data.status,
        msg: res.data.msg
      })
    })
  }

  return (
    <div className='page-wrapper'>
      <div className='content-wrapper'>
        <div className='box'>
          <div className='title'>
            <input type='text' name='title' 
            onChange={(handleTitleChange)} 
            value={state.title}
            />
          </div>
          <div className='questions'>
            <div className='header'>
              <h3>Questions</h3>
            </div>

            {
              state.questions.map((question, i) => (
                <div className='each-question'>
                  <div className='question-body'>
                    <div className='counter'>{i+1}. </div>
                    <input type='text' name='question' 
                    onChange={e => handleQuestionChanges(e, i)}
                    value={state.questions[i].question}
                    />
                    <button className='btn delete' 
                    onClick={e => deleteQuestion(e, i)}
                    style={{ marginLeft: '10px' }}
                    >Delete</button>
                  </div>
                  <div className='answer-type'>
                    <select name='type' defaultValue='free' onChange={e => handleTypeChanges(e, i)}>
                      <option value="free">Free Input</option>
                      <option value="scq">Single Choice</option>
                      <option value="mcq">Multiple Choice</option>
                    </select>
                  </div>
                  
                {
                  state.questions[i].type == 'free' ? null : (
                    <>
                    <div className='options'>
                {
                    state.questions[i].options.map((option, j) => (
                        <div className='option'>
                            {
                              state.questions[i].type == 'mcq' ? (
                                <input type='text' name='options'
                                  value={state.questions[i].options[j]}
                                  onChange={e => handleMCQOptions(e, i, j)}/>
                              ) : (
                                <div>
                                  <input type='text' name='options'
                                  value={state.questions[i].options[j]}
                                  onChange={e => handleSCQOptions(e, i, j)}/>
                                  <br />
                                  <div className='lower-inputs'>
                                    <input type='number' name='options-start'
                                    value={state.questions[i].jumps[j].start}
                                    onChange={e => handleSCQOptions(e, i, j)}/>
                                    <input type='number' name='options-end'
                                    value={state.questions[i].jumps[j].end}
                                    onChange={e => handleSCQOptions(e, i, j)}/>
                                    <br />
                                    <div>
                                      <input type='checkbox' 
                                      name='options-over' id={ state.questions[i].options[j] }
                                      value={state.questions[i].jumps[j].over}
                                      onChange={e => handleSCQOptions(e, i, j)}
                                      />
                                      <label htmlFor={ state.questions[i].options[j] }>Over?</label>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                            <button className='btn delete' onClick={e => deleteOption(e, i, j)}>Delete</button>
                          </div>
                      ))
                    }
                  </div>

                  <div className='add-btn'>
                    <button className='btn add' style={{
                      marginLeft: '5%',
                      marginTop: '10px'
                    }}
                    onClick={e => addOption(e, i)}
                    >Add</button>
                  </div>
                  </>
               )
              }
                </div>
              ))
            }
          </div>

          <div className='add-btn'>
            <button className='btn add' onClick={addQuestion}>Add</button>
          </div>
        </div>
        <div className='submit-btn'>
          <p style={{textAlign: 'center'}} >
            <button className='btn submit' onClick={submit} disabled={submitBtn}>Submit</button>
            {
              alert.status == null ? null : (
              <div style={{ marginTop: '20px', fontWeight: 800 }}>{ alert.msg }</div>
              )
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateSurvey