import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
//
//  Components
//
import QuestionList from './components/QuestionList/QuestionList'
import Mtable from './components/Mtable/Mtable'
import TestRoute1 from './components/TestRoute1/TestRoute1'
import TestRoute2 from './components/TestRoute2/TestRoute2'
import Register from './components/Register/Register'
import DataEntry from './components/DataEntry/DataEntry'
import Quiz from './components/Quiz/Quiz'
import CreateElement from './components/MaterialUI/pages/CreateElement'
import NotesElement from './components/MaterialUI/pages/NotesElement'
//
//  Layout
//
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'
import Layout from './components/Layout/Layout'
//
//  Layout Theme
//
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
//
// new instance of client Query
//
const queryClient = new QueryClient()
//
//  Render the components
//
function App() {
  //
  //  return the rendered components
  //
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className='App'>
            <ThemeProvider theme={theme}>
              <Layout>
                <div className='content'>
                  <Routes>
                    <Route path='/Quiz' element={<Quiz />} />
                    <Route path='/TestRoute1' element={<TestRoute1 />} />
                    <Route path='/TestRoute2' element={<TestRoute2 />} />
                    <Route path='/QuestionList' element={<QuestionList />} />
                    <Route path='/Mtable' element={<Mtable />} />
                    <Route path='/Register' element={<Register />} />
                    <Route path='/DataEntry' element={<DataEntry />} />
                    <Route path='/Notes' element={<NotesElement />} />
                    <Route path='/Create' element={<CreateElement />} />
                    <Route path='/' element={<QuestionList />} />
                  </Routes>
                </div>
              </Layout>
            </ThemeProvider>
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </>
  )
}

export default App
