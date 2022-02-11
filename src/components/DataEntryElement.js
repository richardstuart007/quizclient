import React from "react"
import { Field, ErrorMessage } from "formik"
import TextError from "./Formik/TextError"

const DataEntryElement = ({ entry_type, entry_label, entry_name }) => {
  return (
    <div className='form-control row'>
      <label className='col-10 inputlabel' htmlFor={entry_name}>
        {entry_label}
      </label>

      <Field
        className='col-75'
        type={entry_type}
        id={entry_name}
        name={entry_name}
        component={entry_type}
        rows='2'
      />

      <ErrorMessage name={entry_name} component={TextError} />
    </div>
  )
}

export default DataEntryElement
