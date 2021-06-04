import React, { useState, useEffect } from 'react'
import '../assests/css/response.css'
import axios from 'axios'

const Response = props => {
  const [state, setState] = useState({
    setParam: false,
    survey: null,
    responses: [],
    openIndex: null
  })

  const openUser = (e, i) => {
    let temp = { ...state }
    temp.openIndex = temp.openIndex == null ? i : null
    setState(temp)
  }

useEffect(() => {
  const id = props.location.state.id
  console.log(id)
  axios.get(`/api/v1/admin/response/${id}`).then(res => {
    let temp = { ...state }
    temp.responses = res.data.response
    temp.survey = res.data.survey
    temp.setParam = true
    setState(temp)
  })
}, [])

  return (
    <div className='page-wrapper'>
      {
        state.setParam && (
          <div className='content-wrapper'>
                <div className='header'>
                  <div className='title'>
                      <h1>{state.survey.title}</h1>
                      <h5 style={{ color: '#666', marginTop: '-7.5px' }}> {state.survey.questions.length} Queries • {state.responses.length} Responses</h5>
                  </div>
                </div>
                <div className='contents'>
                  {
                    state.responses.map((response, i) => (
                      <div className='each' onClick={e => openUser(e, i)}>
                        <>
                        <div className='user-name'>
                          <h3>user_id: {response.user_id}</h3>
                        </div>
                        <div className='hidden' style={{ display: state.openIndex == i ? '' : 'none' }}>
                          {
                            response.answers.map((answer, i) => (
                              <>
                                <div className='question'>
                                  {i+1}. { answer ? answer.question : 'Not answered' }
                                </div>
                                {
                                  answer && <div className='answer'>
                                  <div className='badge'>
                                    {answer.type}
                                  </div>
                                  <div className='body'>
                                    {
                                      answer.value
                                    }
                                  </div>
                                </div>
                                }
                              </>
                            ))
                          }
                        </div>
                        </>
                      </div>
                    ))
                  }
                </div>
              </div>
        )
      }
    </div>
  )
}

export default Response