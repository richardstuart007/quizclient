//
//  Libraries
//
import React from 'react'
//
//  Sub Components
//
import NavbarLink from './NavbarLink'
//===================================================================================
//=  This Component
//===================================================================================
const Navbar = ({ form, setForm }) => {
  return (
    <nav className='navbar'>
      <div className='links'>
        <NavbarLink
          form={form}
          link_to='/Quiz'
          link_name='Quiz'
          link_form='Quiz'
          setForm={setForm}
        />
        <NavbarLink
          form={form}
          link_to='/DataEntry'
          link_name='DataEntry'
          link_form='DataEntry'
          setForm={setForm}
        />
        <NavbarLink
          form={form}
          link_to='/QuestionList'
          link_name='QuestionList'
          link_form='QuestionList'
          setForm={setForm}
        />
        <NavbarLink
          form={form}
          link_to='/TestRoute1'
          link_name='TestRoute1'
          link_form='TestRoute1'
          setForm={setForm}
        />
        <NavbarLink
          form={form}
          link_to='/TestRoute2'
          link_name='TestRoute2'
          link_form='TestRoute2'
          setForm={setForm}
        />
        <NavbarLink
          form={form}
          link_to='/Register'
          link_name='Register'
          link_form='Register'
          setForm={setForm}
        />
        <NavbarLink
          form={form}
          link_to='/Mtable'
          link_name='Mtable'
          link_form='Mtable'
          setForm={setForm}
        />
        <NavbarLink
          form={form}
          link_to='/Create'
          link_name='Create'
          link_form='Create'
          setForm={setForm}
        />
        <NavbarLink
          form={form}
          link_to='/Notes'
          link_name='Notes'
          link_form='Notes'
          setForm={setForm}
        />
      </div>
    </nav>
  )
}

export default Navbar
