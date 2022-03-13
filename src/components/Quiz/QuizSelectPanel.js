//
//  Sub Components
//
import QuizSelectElement from './QuizSelectElement'
//===================================================================================
const QuizSelectPanel = ({ EntryFields }) => {
  return (
    <>
      {EntryFields.map(EntryField => {
        const { entry_type, entry_name, entry_label, entry_width } = EntryField
        return (
          <QuizSelectElement
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

export default QuizSelectPanel
