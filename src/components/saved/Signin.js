//
//  Libraries
//
import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Typography } from '@material-ui/core'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const { URL_SIGNIN } = require('../constants.js')
const sqlClient = 'Quiz/Signin'
const g_log1 = true
//.............................................................................
//.  Data Input Fields
//.............................................................................
//
//  Initial Values
//
const initialValues = {
  email: '',
  password: ''
}
//.............................................................................
//.  Input field validation
//.............................................................................
const validationSchema = Yup.object({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required')
})
//===================================================================================
function Signin() {
  //
  //  Define the State variables
  //
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const onSubmit = () => {
    fetch(URL_SIGNIN, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sqlClient: sqlClient,
        email: email,
        password: password
      })
    })
      .then(response => response.json())

      .then(user => {
        if (user.id) {
          setId(user.id)
          setForm_message(`Signin successful with ID(${user.id})`)
        } else {
          setForm_message('User not registered or password invalid')
        }
      })
      .catch(err => {
        setForm_message(err.message)
      })
  }
  //...................................................................................
  //.  Create the form
  //...................................................................................
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {formik => {
        if (g_log1) console.log('Formik props', formik)
        if (g_log1) console.log(`Formik is valid ${formik.isValid}`)
        return (
          <Form>
            <main className=''>
              {/*.................................................................................................*/}
              <legend className='py-2'>
                <h1 className='text-3xl '>Login</h1>
              </legend>

              {/*.................................................................................................*/}
              <div className='mt3'>
                <label className='' htmlFor='email-address'>
                  Email
                </label>

                <input
                  className='pa2 input-reset ba inputdata hover-bg-black hover-white w-100'
                  type='email'
                  name='email'
                  id='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              {/*.................................................................................................*/}
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>

                <input
                  className='pa2 input-reset ba inputdata hover-bg-black hover-white w-100'
                  type='password'
                  name='password'
                  id='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {/*.................................................................................................*/}
              <div className=''>
                <label className='message' htmlFor='text'>
                  {form_message}
                </label>
              </div>
            </main>
            {/*.................................................................................................*/}
            <button type='submit' value='Submit' disabled={!formik.isValid}>
              Login
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Signin
