import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Textbox from '../components/textbox';
import Navbar from './navbar';

const Login = () => {
  const [modalContent, setModalContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('api/login', {
        method: 'post',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 400) {
        setModalContent(
          'Invalid Credentials, Contact Us if already registered'
        );
        setShowModal(true);
        return;
      }
      const Token = await response.json();
      const accessToken = Token.access;
      localStorage.setItem('accessToken', accessToken);
      router.push('/dashboardPage');
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className=''>
      <div className='absolute z-10 w-full pb-10 lg:pb-10 xl:pb-10'>
        <Navbar />
      </div>
      <div className='relative bg-background pt-[100px]'>
        <div className='bottom-[10px] left-5 p-10 text-center text-5xl lg:text-7xl'>
          <span className='text-white select-none'>Login</span>
        </div>
      </div>
      <div className='self-center px-[50px] pb-[100px] lg:px-[100px] xl:px-[400px]'>
        <div className='z-20 rounded-[50px] bg-grey px-[20px] py-[30px] sm:px-[30px] md:px-[50px]'>
          <form
            className='flex flex-col items-center gap-y-5'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col content-center gap-5 self-stretch lg:flex-row'>
              <Textbox
                label='Username&nbsp;/&nbsp;email:'
                placeholder='Enter Username or email'
                name='username'
                type='text'
                value={formData.username}
                onChange={handleChange}
              />
              <Textbox
                label='Password:'
                placeholder='Enter Your Password'
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Link href={'/register'} className='font-spline'>
              Haven't Registered Yet? Sign Up
            </Link>
            <Link href={'/forgotpassword'} className='font-spline'>
              Forgot password?
            </Link>
            <button
              className='text-white mb-[10px] mt-[10px] h-[40px] w-[150px] select-none rounded-[50px] bg-red font-spline text-[20px] font-bold md:w-[200px]'
              type='submit'
            >
              Login
            </button>
          </form>
          {showModal && (
            <div
              className='fixed inset-0 flex items-center justify-center bg-grey bg-opacity-50'
              onClick={() => setShowModal(false)}
            >
              <div className='h-50 flex w-[30%] flex-col rounded-lg bg-grey p-5 shadow-lg'>
                <p className='self-center'>{modalContent}</p>
                <button
                  onClick={handleModalClose}
                  className='text-white m-4 self-center rounded-full bg-red px-4 py-2 lg:w-[50%]'
                >
                  Okay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
