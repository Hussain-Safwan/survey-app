import React, { useState, useEffect } from 'react'
import '../assests/css/surveyList.css'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const SurveyList = () => {
  const [state, setState] = useState({
    surveys: []
  })

  useEffect(() => {
    axios.get('/api/v1/user/surveys').then(res => {
      console.log(res.data)
      let temp = { ...state }
      temp.surveys = res.data
      setState(temp)
    })
  }, [])

  const history = useHistory()

  const openSurvey = (e, i) => {
    const id = state.surveys[i]._id
    history.push({
      pathname: '/survey',
      state: { id }
    }) 
  }

  return (
    <div className='survey-list-page-wrapper'> 
      <div className='content-wrapper'>
        <div className='content'>
          {
            state.surveys.map((survey, i) => (
              <div className='box' onClick={e => openSurvey(e, i)}>
                <div className='top'>
                </div>
                <div className='footer'>
                  <div className='title'>
                    <h3>{ survey.title }</h3>
                  </div>
                  <div className='subtitle'>
                    <h5>{ survey.questions.length } Queries</h5>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default  SurveyList