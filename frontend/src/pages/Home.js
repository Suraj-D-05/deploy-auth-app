import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import {ToastContainer} from 'react-toastify';


const Home = () => {

  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = ()=>{
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');    
    handleSuccess("Logout Successfully");
    
    setTimeout(() => {
      navigate('/login')
    }, 1000);
  }

  const fetchProducts = async () =>{
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers:{
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts([...result]);

    } catch (error) {
      handleError(error);
    }
  }

  useEffect(()=>{
    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Hello {loggedInUser}</h1>

      <div>
      {
        products.map((item,index)=>{
          return <ul key={index} >
            <span>{item.name} : {item.price}</span>
          </ul>
        })
      }
      </div>

      <button onClick={handleLogout} >LogOut</button>

      <ToastContainer/>
    </div>
  )
}

export default Home