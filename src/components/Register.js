import React, { useState } from "react"
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const { URL_REGISTER } = require("./constants.js")
//...................................................................................
//.  Main function
//...................................................................................
function Register() {
  //...................................................................................
  //.  Define the State variables
  //...................................................................................
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState("")
  //...................................................................................
  //.  Add to the database
  //...................................................................................
  const onSubmitRegister = () => {
    fetch(URL_REGISTER, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then(response => response.json())

      .then(user => {
        if (user.id) {
          setId(user.id)
          setForm_message(`Data updated in Database with ID(${user.id})`)
        } else {
          setForm_message("User not registered")
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
    <article className=''>
      <main className='pa4'>
        {/*..................................................................................................*/}
        <div className='measure'>
          <fieldset id='sign_up' className=''>
            {/*.................................................................................................*/}
            <legend className=''>
              Register
              {id > 0 ? ` (${id})` : null}
            </legend>
            {/*.................................................................................................*/}
            {/*  Name */}
            {/*.................................................................................................*/}
            <div className='mt3'>
              <label className='' htmlFor='Name'>
                Name
              </label>

              <input
                className='pa2 input-reset ba inputdata hover-bg-black hover-white w-100'
                type='name'
                name='name'
                id='name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            {/*.................................................................................................*/}
            {/*  Email */}
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
            {/*  Password */}
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
          </fieldset>
          {/*.................................................................................................*/}
          {/*  Register */}
          {/*.................................................................................................*/}
          <div className=''>
            <input
              onClick={onSubmitRegister}
              className='b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib hover-red'
              type='submit'
              value='Register'
            />
          </div>
          {/*.................................................................................................*/}
          {/*.................................................................................................*/}
          {/*  Message */}
          {/*.................................................................................................*/}
          <div className=''>
            <label className='message' htmlFor='text'>
              {form_message}
            </label>
          </div>
          {/*.................................................................................................*/}
        </div>
      </main>
    </article>
  )
}

export default Register
