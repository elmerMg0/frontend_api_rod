import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser, resetUser, updateUser, UserKey } from '../redux/states/user';
import { createView } from '../redux/states/dashboard';
import { useNavigate } from 'react-router-dom';
import '../styles/administracion//Login.css';
import { APISERVICE, setToken } from '../services/api.services';
import { toast, Toaster} from 'react-hot-toast'
import { clearLocalStorage } from '../utilities/localStorage.utility';
import { BeatLoader } from 'react-spinners';
const initialState = {
    username: '',
    password: ''
}

function Login() {

  const [user, setUser] = useState( initialState )
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect( () => {
    clearLocalStorage(UserKey);
    dispatch( resetUser());
  }, [])
 
  const handleSUbmit = async () => {
  if(isValid()){

    let url = 'user/login/'
    setShowSpinner(true);
   /* Traer period si existe */
    const { success, id, role, message, accessToken, period } = await APISERVICE.post(user, url )
    if( success ){
      setToken(accessToken);
      dispatch(createView('pos'))
      let userLoged = {
        username: user.username,
        accessToken: accessToken,
        id,
        role
      }
      dispatch( createUser( userLoged ));
      let periodData = {};
      if(period !== null){
         periodData = {
          periodUser: {
            id: period,
            state: true
          }
        }
      }else{
        periodData = {
          periodUser: {
            id: period,
            state: false
          }
        }
      }
      dispatch( updateUser( periodData ));

      navigate('/dashboard')
      //  toast.success(response.message);
    }else{
      messageToastError(message);
    }
    setShowSpinner(false);
  }
  }

  const isValid = () => {
    if(user.username === ''){
      messageToastError('Username es requerido')
      return false;
    }
    if(user.password === ''){
      messageToastError('password es requerido')
      return false;
    }
    return true;
  }

  const messageToastError = (sms) => {
    toast.error(sms)
  }

  const handleOnChange = (e) => {
    setUser( {
      ...user, [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container-login">
      <div className='login'>
        <h2>Iniciar sesión</h2>
        <div className="input-field">
          <input onChange={handleOnChange}  value={user.username} name='username' type="text" id="username" required />
          <label htmlFor="username">Nombre de usuario</label>
        </div>
        <div className="input-field">
          <input onChange={handleOnChange} value={user.password} name='password' type="password" id="password" required />
          <label htmlFor="password">Contraseña</label>
        </div>
        {
          showSpinner ? 
        
          <BeatLoader color="#3C8DBB" />
          :
        <button onClick={handleSUbmit}>Iniciar sesión</button>
        }
        
     
      </div>
      <Toaster/>
    </div>
  );
}

export default Login;
