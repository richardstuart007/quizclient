//
//  Sub Components
//
import DataEntryElement from './DataEntryElement'
//===================================================================================
const DataEntryPanel = ({ EntryFields }) => {
  return (
    <>
      {EntryFields.map(EntryField => {
        const { entry_type, entry_name, entry_label, entry_width } = EntryField
        return (
          <DataEntryElement
            key={entry_name}
            entry_type={entry_type}
            entry_name={entry_name}
            entry_label={entry_label}
            entry_width={entry_width}
          />
        )
      })}
    </>
  )
}

export default DataEntryPanel
