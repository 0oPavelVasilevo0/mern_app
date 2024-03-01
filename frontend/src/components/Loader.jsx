import React from 'react'
import img from '../img/run.gif'

const Loader = () => {
  return (
    // <div className='loader'>
    //   <div className='spiner'>

    //   </div>
    //   </div>
      <div className='loader'>
        <img src={img} className='img' alt='' />


      </div>
  )
}

export default Loader