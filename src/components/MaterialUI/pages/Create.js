import CreateElement from './CreateElement'
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

function Create() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <CreateElement />
      </Layout>
    </ThemeProvider>
  )
}

export default Create
