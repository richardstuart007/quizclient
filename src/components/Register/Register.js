//
//  Libraries
//
import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
//
//  Sub Components
//
import Controls from '../../components/controls/Controls'
import Textfield from '../controls/Textfield'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const { URL_REGISTER } = require('../constants.js')
const sqlClient = 'Quiz/Register'
//
// Debugging
//
const g_log1 = true
//
//  Styles
//
const useStyles = makeStyles(theme => ({
  formWrapper: {
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1)
  }
}))
//.............................................................................
//.  Data Input Fields
//.............................................................................
//
//  Initial Values
//
const initialValues = {
  name: '',
  email: '',
  password: ''
}
//.............................................................................
//.  Input field validation
//.............................................................................
const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required')
})
//===================================================================================
function Register() {
  //
  //  Style classes
  //
  const classes = useStyles()
  //
  //  Define the State variables
  //
  const [id, setId] = useState('')
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //...................................................................................
  //. Form Submit
  //...................................................................................
  const onSubmitForm = (values, submitProps) => {
    //
    //  Deconstruct values
    //
    const { name, email, password } = values
    //
    //  Post to server
    //
    fetch(URL_REGISTER, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sqlClient: sqlClient,
        email: email,
        password: password,
        name: name
      })
    })
      .then(response => response.json())

      .then(user => {
        if (user.id) {
          setId(user.id)
          setForm_message(`Data updated in Database with ID(${user.id})`)
        } else {
          setForm_message('User not registered')
        }
      })
      .catch(err => {
        setForm_message(err.message)
      })
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <Grid container>
      <Container>
        <div className={classes.formWrapper}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitForm}
            enableReinitialize
          >
            <Form>
              <Grid container spacing={2}>
                {/*.................................................................................................*/}
                {/*  Form Title */}
                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  <Typography variant='subtitle1' gutterBottom>
                    Register {id > 0 ? ` (${id})` : null}
                  </Typography>
                </Grid>
                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  <Textfield name='name' label='name' />
                </Grid>
                <Grid item xs={12}>
                  <Textfield name='email' label='email' />
                </Grid>
                <Grid item xs={12}>
                  <Textfield name='password' label='password' />
                </Grid>

                {/*.................................................................................................*/}
                {/*  Message */}
                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  <Typography style={{ color: 'red' }}>
                    {form_message}
                  </Typography>
                </Grid>

                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  <Controls.Qbutton
                    type='submit'
                    text='Register'
                    value='Submit'
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </div>
      </Container>
    </Grid>
  )
}

export default Register
