import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../auth';

const Home = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if (!isLoggedIn()) {
      navigate('/login');
    }else{
      navigate("/dashboard")
    }
  },[navigate])
  return (
    <div>home</div>
  )
}

export default Home;