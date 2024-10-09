import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Canva Clone</h1>
      <Link to="/editor">Go to Editor</Link>
    </div>
  )
}

export default Home