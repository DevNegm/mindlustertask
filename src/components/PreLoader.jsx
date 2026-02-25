import { CircularProgress } from '@mui/material'
import React from 'react'

const PreLoader = () => {
  return (
    <main className='bg-white flex items-center justify-center h-screen'><CircularProgress disableShrink color="black" /></main>
  )
}

export default PreLoader