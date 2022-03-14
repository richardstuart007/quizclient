//
//  Libraries
//
import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ValtioStore } from './ValtioStore'
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
const { URL_SIGNIN } = require('../constants.js')
const sqlClient = 'Quiz/Signin'
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
  email: '',
  password: ''
}
//.............................................................................
//.  Input field validation
//.............................................................................
const validationSchema = Yup.object({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required')
})
//===================================================================================
function QuizSignin() {
  //
  //  Style classes
  //
  const classes = useStyles()
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const onSubmitForm = (values, submitProps) => {
    //
    //  Deconstruct values
    //
    const { email, password } = values
    //
    //  Post to server
    //
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
          setForm_message(`Signin successful with ID(${user.id})`)
          ValtioStore.v_Page = 'QuizSelect'
          ValtioStore.v_Email = email
          ValtioStore.v_Name = user.name
        } else {
          setForm_message('User not registered or password invalid')
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
                    Sign In
                  </Typography>
                </Grid>
                {/*.................................................................................................*/}
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
                    text='SignIn'
                    value='Submit'
                  />
                  <Controls.Qbutton
                    text='Register'
                    onClick={() => {
                      ValtioStore.v_Page = 'QuizRegister'
                    }}
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

export default QuizSignin
