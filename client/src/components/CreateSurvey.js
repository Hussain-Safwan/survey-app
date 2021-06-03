import React, { useState } from 'react'
import '../assests/css/admin.css'
import axios from 'axios'

const CreateSurvey = () => {

  const [state, setState] = useState({
    title: '',
    questions: [{
      question: '',
      type: 'free',
      options: []
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

  const handleOptionChanges = (e, i, j) => {
    let temp = { ...state }
    temp.questions[i].options[j] = e.target.value
    setState(temp)
  }

  const addOption = (e, i) => {
    let temp = { ...state }
    temp.questions[i].options.push('')
    setState(temp)
  }

  const addQuestion = e => {
    let temp = { ...state }
    temp.questions.push({
      question: '',
      type: 'free',
      options: []
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
                            <input type='text' name='options'
                             value={state.questions[i].options[j]}
                              onChange={e => handleOptionChanges(e, i, j)}/>
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
              <div style={{ marginTop: '20px', color: 'lightseagreen', fontWeight: 800 }}>{ alert.msg }</div>
              )
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateSurvey