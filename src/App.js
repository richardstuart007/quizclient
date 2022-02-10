import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
//
//  Components

import Navbar from "./components/Navbar"
import QuestionList from "./components/QuestionList"
import Mtable from "./components/Mtable"
import TestRoute1 from "./components/TestRoute1"
import TestRoute2 from "./components/TestRoute2"
import Register from "./components/Register"
import DataEntry from "./components/DataEntry"
import Quiz from "./components/Quiz"
//
// new instance of client Query
//
const queryClient = new QueryClient()
//
//  Render the components
//
function App() {
  //
  //  Set the form name
  //
  const [form, setForm] = useState("")
  //
  //  return the rendered components
  //
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className='App'>
            <Navbar form={form} setForm={setForm} />
            <div className='content'>
              <Routes>
                <Route path='/Quiz' element={<Quiz />} />
                <Route path='/TestRoute1' element={<TestRoute1 />} />
                <Route path='/TestRoute2' element={<TestRoute2 />} />
                <Route path='/QuestionList' element={<QuestionList />} />
                <Route path='/Mtable' element={<Mtable />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/DataEntry' element={<DataEntry />} />
                <Route path='/' element={<QuestionList />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </>
  )
}

export default App
