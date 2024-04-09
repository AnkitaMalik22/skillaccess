import React,{useEffect} from 'react'
import { Route } from 'react-router-dom'
import RegisterStudent from './pages/student/auth/Register';
import LoginStudent from './pages/student/auth/Login';
import { getStudent } from './redux/student/auth/studentAuthSlice'
import { useDispatch } from 'react-redux';


function StudentRoute() {
const dispatch = useDispatch();


    useEffect(() => {
      dispatch(getStudent());
    }, [])


  return (
    <Route path="student">
        
          <Route path="" element={<RegisterStudent />} />
          <Route path="/login" element={<LoginStudent/>} />
    </Route>
  )
}

export default StudentRoute