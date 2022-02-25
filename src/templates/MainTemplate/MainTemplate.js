import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Loading } from '../../components/Loading/Loading'
import { MyModal } from '../../components/Modal/BaseModal/MyModal'

export const MainTemplate = () => {
  return (
    <>
        <ToastContainer/>
        <MyModal />
        <Loading/>
    
        <Outlet/>
    </>
  )
}
