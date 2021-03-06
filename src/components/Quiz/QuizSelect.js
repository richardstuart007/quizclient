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
import { QuizSelectFields } from './QuizSelectFields'
import QuizSelectPanel from './QuizSelectPanel'
import QuizGetData from './QuizGetData'
import MakeQueryablePromise from '../MakeQueryablePromise'
import Controls from '../../components/controls/Controls'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const g_log1 = true
const g_log2 = false
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
  qowner: 'public',
  qgroup1: 'redoubles',
  qgroup2: ''
}
//
//  Saved Values on Submit
//
const savedValues = {
  qowner: '',
  qgroup1: '',
  qgroup2: ''
}
//.............................................................................
//.  Input field validation
//.............................................................................
const validationSchema = Yup.object({
  qowner: Yup.string().required('Required'),
  qgroup1: Yup.string().required('Required')
})
//===================================================================================
function QuizSelect() {
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
    //  Save data
    //
    savedValues.qowner = values.qowner
    savedValues.qgroup1 = values.qgroup1
    savedValues.qgroup2 = values.qgroup2
    //
    //  Process promise
    //
    var myPromise = MakeQueryablePromise(QuizGetData(savedValues))
    //
    //  Initial status
    //
    if (g_log1) console.log('Initial pending:', myPromise.isPending()) //true
    if (g_log1) console.log('Initial fulfilled:', myPromise.isFulfilled()) //false
    if (g_log1) console.log('Initial rejected:', myPromise.isRejected()) //false
    //
    //  Resolve Status
    //
    myPromise.then(function (data) {
      if (g_log1) console.log('data ', data)
      if (g_log1) console.log('myPromise ', myPromise)
      if (g_log1) console.log('Final fulfilled:', myPromise.isFulfilled()) //true
      if (g_log1) console.log('Final rejected:', myPromise.isRejected()) //false
      if (g_log1) console.log('Final pending:', myPromise.isPending()) //false
      //
      //  No data
      //
      if (!data) {
        setForm_message('No data found')
      }
      //
      //  Next Step
      //
      else {
        ValtioStore.v_Page = 'Quiz'
        return
      }
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
                    Question Selection
                  </Typography>
                </Grid>
                {/*.................................................................................................*/}

                <QuizSelectPanel EntryFields={QuizSelectFields} />
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
                    text='Start Quiz'
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

export default QuizSelect
