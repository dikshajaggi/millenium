import React from 'react'
import workInProgress from "../../assests/images/workInProgress.png"
import "../styles.scss"


const TnC = () => {
  return (
    <div className='footer-pages-wrapper'>
        <img className='work-in-progress' src={workInProgress} alt="work in progress"/>
        <h4 className='work-in-progress-H4'>WORK IN PROGRESS</h4>
    </div>
  )
}

export default TnC
