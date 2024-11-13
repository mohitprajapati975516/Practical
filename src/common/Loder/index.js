import React from 'react'
import LoaderImg from '../../asserts/Images/loader.gif'

const Loader = () => {
  return (
    <>
      <div className="circle">
        <div className="for-position">
          <div className="loader-center">
            <img src={LoaderImg} alt="loader" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Loader
