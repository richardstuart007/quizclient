import React from "react"
import { Field, ErrorMessage } from "formik"
import TextError from "./TextError"

const QuizElement = ({ entry_type, entry_label, entry_name }) => {
  return (
    <div className='form-control row'>
      <label className='col-10 inputlabel' htmlFor={entry_name}>
        {entry_label}
      </label>

      <Field
        className='col-50'
        type={entry_type}
        id={entry_name}
        name={entry_name}
      />

      <ErrorMessage name={entry_name} component={TextError} />
    </div>
  )
}

export default QuizElement
