import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
//
//  Components
//
import QuestionList from './components/QuestionList/QuestionList'
import Mtable from './components/Mtable/Mtable'
import TestRoute1 from './components/TestRoute1/TestRoute1'
import TestRoute2 from './components/TestRoute2/TestRoute2'
import TestRoute3 from './components/TestRoute3/TestRoute3'
import Register from './components/Register/Register'
import Signin from './components/Register/Signin'
import DataEntry from './components/DataEntry/DataEntry'
import QuizControl from './components/Quiz/QuizControl'
import CreateElement from './components/MaterialUI/pages/CreateElement'
import NotesElement from './components/MaterialUI/pages/NotesElement'
//
//  Layout
//
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Layout from './components/Layout/Layout'
//
//  Layout Theme
//
const theme = createTheme({})
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
                    <Route path='/Quiz' element={<QuizControl />} />
                    <Route path='/TestRoute1' element={<TestRoute1 />} />
                    <Route path='/TestRoute2' element={<TestRoute2 />} />
                    <Route path='/TestRoute3' element={<TestRoute3 />} />
                    <Route path='/QuestionList' element={<QuestionList />} />
                    <Route path='/Mtable' element={<Mtable />} />
                    <Route path='/Register' element={<Register />} />
                    <Route path='/Signin' element={<Signin />} />
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
      </QueryClientProvider>
    </>
  )
}

export default App
