//
//  Sub Components
//
import DataEntryElement from './DataEntryElement'
//===================================================================================
//=  This Component
//===================================================================================
const DataEntryPanel = ({ EntryFields }) => {
  return (
    <div className='MainPanel'>
      {EntryFields.map(EntryField => {
        const { entry_type, entry_name, entry_label } = EntryField
        return (
          <DataEntryElement
            key={entry_name}
            entry_type={entry_type}
            entry_name={entry_name}
            entry_label={entry_label}
          />
        )
      })}
    </div>
  )
}

export default DataEntryPanel
