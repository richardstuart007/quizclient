//
//  Sub Components
//
import QuizSelectElement from './QuizSelectElement'
//===================================================================================
const QuizSelectPanel = ({ EntryFields }) => {
  return (
    <div className='MainPanel'>
      {EntryFields.map(EntryField => {
        const { entry_type, entry_name, entry_label } = EntryField
        return (
          <QuizSelectElement
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

export default QuizSelectPanel
