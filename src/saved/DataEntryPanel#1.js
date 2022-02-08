import React from "react"
import DataEntryElement from "./DataEntryElement"

const DataEntryPanel = EntryFields => {
  //
  //  Return Field
  //
  function dataElement(EntryField) {
    const { entry_type, entry_name, entry_label } = EntryField
    <DataEntryElement
      entry_type={entry_type}
      entry_name={entry_name}
      entry_label={entry_label}
    />
  }

  return (<div className='MainPanel'>
  {EntryFields.forEach(dataElement)}
  </div>)
}

export default DataEntryPanel
