import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Textbox from './textbox';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    college: '',
    year: 0,
    phone_no: '',
    whatsapp_no: '',
    postal_address: '',
    pin_code: 0,
    why_choose: '',
    were_you_ca: false,
    points: 0,
  });

  const [modalContent, setModalContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setModalContent('Passwords do not match!');
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch('api/register', {
        method: 'post',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setModalContent('Verification link has been sent by email!');
        setShowModal(true);
      } else {
        // Handle conflict error
        if (response.status === 409) {
          const errorData = await response.json();
          if (errorData.username && errorData.email) {
            setModalContent(
              'Both username and email already exist. Please login.'
            );
          } else if (errorData.username) {
            // Only username conflict
            setModalContent(errorData.username);
          } else if (errorData.email) {
            // Only email conflict
            setModalContent(errorData.email);
          }
        } else {
          setModalContent('An error occurred during registration!');
        }
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setModalContent('An error occurred!');
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalContent === 'Verification link has been sent by email!') {
      Router.push('https://ca-frontend-ebon.vercel.app/');
    }
  };

  return (
    <div className=''>
      <div className='relative bg-background pt-[100px]'>
        <div className='bottom-[10px] left-5 p-10 text-center text-5xl lg:text-7xl'>
          <span className='text-white select-none'>Register</span>
        </div>
      </div>
      <div className='px-[10px] pb-[100px] sm:px-[50px]'>
        <div className='z-0 w-auto rounded-[50px] bg-grey px-[30px] py-[30px] md:px-[10px]'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col items-center gap-y-5'
          >
            <div className='flex w-8/12 flex-col items-center gap-5 lg:flex-row'>
              <Textbox
                label='First Name*'
                placeholder='Enter Your First Name'
                required
                name='first_name'
                type='text'
                value={formData.first_name}
                onChange={handleChange}
              />
              <Textbox
                label='Last Name*'
                placeholder='Enter Your Last Name'
                required
                name='last_name'
                type='text'
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className='flex w-8/12 flex-col items-center gap-5 lg:flex-row'>
              <Textbox
                label='Email*'
                placeholder='Enter Your Email'
                required
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className='flex w-8/12 flex-col items-center gap-5 lg:flex-row'>
              <Textbox
                label='College*'
                placeholder='Enter Your College'
                required
                name='college'
                type='text'
                value={formData.college}
                onChange={handleChange}
              />
              <div className='flex flex-col items-center gap-5 self-stretch lg:items-start'>
                <span className='text-white w-max select-none align-middle text-xl font-medium'>
                  Year*:
                </span>
                <select
                  className='h-[50px] grow self-stretch  rounded-[10px] bg-background px-[10px] text-center text-black lg:text-left'
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      year: +e.target.value.charAt(0),
                    })
                  }
                >
                  <option value='1st Year'>1st Year</option>
                  <option value='2nd Year'>2nd Year</option>
                  <option value='3rd Year'>3rd Year</option>
                  <option value='4th Year'>4th Year</option>
                  <option value='5th Year'>5th Year</option>
                </select>
              </div>
            </div>
            <div className='flex w-8/12 flex-col items-center gap-5 lg:flex-row'>
              <Textbox
                label='Postal Address*'
                placeholder='Enter Your Postal Address'
                required
                name='postal_address'
                type='text'
                value={formData.postal_address}
                onChange={handleChange}
              />
              <Textbox
                label='Pin Code*'
                placeholder='Enter Your Pin Code'
                required
                name='pin_code'
                type='text'
                value={formData.pin_code}
                onChange={handleChange}
                pattern='[0-9]{6}'
              />
            </div>
            <div className='flex w-8/12 flex-col items-center gap-5 lg:flex-row'>
              <Textbox
                label='Why Choose Us?*'
                placeholder='Why do you want to be a Campus Ambassador?'
                required
                name='why_choose'
                type='text'
                value={formData.why_choose}
                onChange={handleChange}
              />
            </div>
            <div className='flex w-8/12 flex-col items-center gap-5 lg:flex-row'>
              <div className='flex flex-col items-center gap-5 self-stretch lg:items-start'>
                <span className='text-white select-none text-center align-middle text-xl font-medium lg:text-left'>
                  Previous CA Experience*:
                </span>
                <select
                  value={formData.were_you_ca ? 'Yes' : 'No'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      were_you_ca: e.target.value === 'Yes',
                    })
                  }
                  className='h-[50px] grow self-stretch  rounded-[10px] bg-background px-[10px] text-center text-black lg:text-left'
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              <Textbox
                label='Phone Number*'
                placeholder='What is your phone number?'
                required
                name='phone_no'
                type='tel'
                pattern='[0-9]{10}'
                value={formData.phone_no}
                onChange={handleChange}
              />
            </div>
            <div className='flex w-8/12 flex-col items-center gap-5 lg:flex-row'>
              <Textbox
                label='WhatsApp Number*'
                placeholder='What is your WhatsApp number?'
                required
                name='whatsapp_no'
                type='tel'
                pattern='[0-9]{10}'
                value={formData.whatsapp_no}
                onChange={handleChange}
              />
              <Textbox
                label='Username*'
                placeholder='Enter Your Username'
                required
                name='username'
                type='text'
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className='flex w-8/12 flex-col items-center gap-5 lg:flex-row'>
              <Textbox
                label='Password*'
                placeholder='Enter Your Password'
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
              />
              <Textbox
                label='Confirm Password*'
                placeholder='Confirm Your Password'
                name='confirmPassword'
                type='password'
                value={formData.confirmPassword}
                onChange={handleChange}
                pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
              />
            </div>
            <p className='select-none text-center text-xs font-thin'>
              Password Requirements: [A LowerCase Letter, An UpperCase Letter, A
              Number, Minimum 8 Characters]
            </p>
            <Link href={'/login'} className='text-center'>
              Already a Campus Ambassador?
            </Link>
            <button
              className='text-white mb-[10px] mt-[10px] h-[40px] w-[150px] select-none rounded-[50px] bg-red text-[20px] font-bold md:w-[200px]'
              type='submit'
            >
              Register
            </button>
          </form>

          {showModal && (
            <div className='fixed inset-0 flex items-center justify-center bg-grey bg-opacity-50'>
              <div className='rounded-lg bg-grey p-5 shadow-lg'>
                <p>{modalContent}</p>
                <button
                  onClick={() => setShowModal(false)}
                  className='text-white m-4 rounded-full bg-red px-4 py-2'
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

export default Register;
