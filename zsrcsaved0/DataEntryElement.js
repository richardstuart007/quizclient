import React from "react"

const DataEntryElement = ({ entry_label, entry_value, setEntry_value }) => {
  return (
    <div className='row'>
      <div className=' col-25 text-red-500 inputlabel' htmlFor='text'>
        {entry_label}
      </div>

      <div className='col-75'>
        <input
          type='text'
          name={entry_label}
          id={entry_label}
          value={entry_value}
          onChange={e => setEntry_value(e.target.value)}
        />
      </div>
    </div>
  )
}

export default DataEntryElement
