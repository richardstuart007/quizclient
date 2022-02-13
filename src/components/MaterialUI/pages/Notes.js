import NotesElement from './NotesElement'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'
import Layout from '../components/Layout'

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
})

function Notes() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <NotesElement />
      </Layout>
    </ThemeProvider>
  )
}

export default Notes
