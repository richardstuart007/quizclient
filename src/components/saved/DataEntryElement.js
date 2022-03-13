//
//  Sub Components
//
import { Field, ErrorMessage } from 'formik'
import TextError from '../Formik/TextError'
//===================================================================================
const DataEntryElement = ({ entry_type, entry_label, entry_name }) => {
  return (
    <div className='form-control row'>
      <Field
        className='col-75'
        type={entry_type}
        id={entry_name}
        name={entry_name}
        component={entry_type}
        placeholder={entry_label}
        rows='2'
      />

      <ErrorMessage name={entry_name} component={TextError} />
    </div>
  )
}

export default DataEntryElement
