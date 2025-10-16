import React from 'react'
import FacialExpressions from './components/FacialExpressions'
import MoodSongs from './components/MoodSongs'
import { useState } from 'react'

const App = () => {
   
   const [songs, setSongs] = useState([])

  return (
    <div>
      <FacialExpressions setSongs={setSongs}/>
      <MoodSongs songs={songs}/>
    </div>
  )
}

export default App
