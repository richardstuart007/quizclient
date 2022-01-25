import React from "react"

const TestRoute2Item = ({ testRoute2Item }) => {
  return (
    <div className='card'>
      <h3>{testRoute2Item.name}</h3>
      <p>Gender - {testRoute2Item.gender}</p>
      <p>Hair Colour - {testRoute2Item.hair_color}</p>
      <p>Skin Colour - {testRoute2Item.skin_color}</p>
    </div>
  )
}

export default TestRoute2Item
