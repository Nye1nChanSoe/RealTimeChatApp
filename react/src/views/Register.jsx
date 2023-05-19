import { useRef } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { HiOutlineKey } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

const Register = () => {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const { setUser, setToken } = useAuthContext();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const timeoutRef = useRef();

  const handleSubmit = async (e) => {1
    e.preventDefault();

    const payload = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    };

    try {
      setLoading(true);
      const res = await axiosClient.post('/register', payload);
      setUser(res.data.data.user);
      setToken(res.data.data.token);
    } catch(error) {
      setLoading(false);
      const {response} = error;
      if(response && response.status === 422) {
        clearTimeout(timeoutRef.current);
        setErrors(response.data.errors);
        timeoutRef.current = setTimeout(() => {
          setErrors({});
        }, 8000);
      }
    }
  };

  return (
    <>
      {
        Object.keys(errors).length > 0 &&
        <div className='absolute top-6 w-96 p-4 text-white bg-red-500 rounded'>
          { Object.keys(errors).map((key) => <p key={ key }>{ errors[key][0] }</p>) }
        </div>
      }
      <div className="w-96 p-4">
        <h2 className="text-center text-3xl text-gray-600">Talkiverse</h2>
        <form onSubmit={ handleSubmit }>
          <div className="relative my-5 px-2">
            <input ref={ firstnameRef } type="text" placeholder={errors.firstname ? errors.firstname[0] : 'First Name'} className={`border-b w-[60%] px-2 py-2 ${errors.firstname ? 'border-b-red-400 placeholder:text-red-300' : 'border-b-slate-300'} bg-[#f0f0f0] text-gray-600 focus:outline-none focus:border-b-blue-400`}  />
            <input ref={ lastnameRef } type="text" placeholder={errors.lastname ? errors.lastname[0] : 'Last Name'} className={`ml-4 border-b w-1/3 px-2 py-2 ${errors.lastname ? 'border-b-red-400 placeholder:text-red-300' : 'border-b-slate-300'} bg-[#f0f0f0] text-gray-600 focus:outline-none focus:border-b-blue-400`} />
          </div>
          <div className="relative my-5 px-2">
            <input ref={ emailRef } type="email" placeholder={errors.email ? errors.email[0] : 'Email'} className={`border-b w-full pl-10 pr-2 py-2 ${errors.email ? 'border-b-red-400 placeholder:text-red-300' : 'border-b-slate-300'} bg-[#f0f0f0] text-gray-600 focus:outline-none focus:border-b-blue-400`} />
            <HiOutlineMail className='text-slate-300 w-6 h-6 absolute top-2'/>
          </div>
          <div className="relative my-5 px-2">
            <input ref={ passwordRef } type="password" placeholder={errors.password ? errors.password[0] : 'Password'} className={`border-b w-full pl-10 pr-2 py-2 ${errors.password ? 'border-b-red-400 placeholder:text-red-300' : 'border-b-slate-300'} bg-[#f0f0f0] text-gray-600 focus:outline-none focus:border-b-blue-400`} />
            <HiOutlineKey className='text-slate-300 w-6 h-6 absolute top-2'/>
          </div>
          <div className="relative my-5 px-2">
            <input ref={ passwordConfirmationRef } type="password" placeholder={errors.password ? errors.password[0] : 'Password Confirmation'} className={`border-b w-full pl-10 pr-2 py-2 ${errors.password ? 'border-b-red-400 placeholder:text-red-300' : 'border-b-slate-300'} bg-[#f0f0f0] text-gray-600 focus:outline-none focus:border-b-blue-400`} />
            <HiOutlineKey className='text-slate-300 w-6 h-6 absolute top-2'/>
          </div>
          {
            loading 
            ? <button disabled className="w-full mt-2 text-center bg-blue-400 text-white shadow-lg px-4 py-1.5 rounded-full text-lg"><div className='flex justify-center py-px'><div className='animation-spin'></div></div></button>
            : <button type="submit" className="w-full mt-2 text-center bg-blue-400 text-white shadow-lg px-4 py-1.5 rounded-full text-lg hover:bg-blue-500">Register</button>
          }
          <div className='my-5 px-2'>
            <p className='text-center text-gray-500'>Already have an account? <Link to='/login' className='text-blue-500 hover:text-blue-600'>Sign in</Link></p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;