import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Error404  from '../pages/Error404'
const RoutesWithNotFount = ( {children} ) => {
  return (
    <Routes>
        {children}
        <Route path='*' element={<Error404/>}/>
    </Routes>
  )
}

export default RoutesWithNotFount