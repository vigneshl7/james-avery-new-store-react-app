import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <>
    <div className='homm'>Home</div>
    <Link to={"/engrave"} >engrave</Link>

    </>
  )
}

export default Home