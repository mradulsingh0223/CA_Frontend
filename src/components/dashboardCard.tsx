/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Input,
} from '@chakra-ui/react';
import Image from 'next/image';

interface Props {
  date: string;
  points: string;
  description: string;
  title: string;
  taskNumber: string;
  taskID: number;
  month: string;
  activeTab: string;
  comment: string;
  incentives: string;
}

const Cards: React.FC<Props> = ({
  date,
  points,
  description,
  title,
  taskNumber,
  taskID,
  month,
  activeTab,
  comment,
  incentives,
}) => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [buttonText, setButtonText] = useState('Upload');
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [dropdown, setDropdown] = useState(false);
  const [gdriveLink, setGdriveLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://ca-backend-qknd.onrender.com/tasks/submit/${taskID}/`,
        {
          method: 'post',
          body: JSON.stringify({ link: gdriveLink }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      if (response.status === 201) {
        setModalContent('Task Submitted Successfully');
        setShowModal(true);
        setIsUploaded(true);
        setButtonText('Uploaded');
        setDropdown(false);
      } else if (response.status === 400) {
        setModalContent('Invalid Link or Task Already Submitted');
        setShowModal(true);
        setDropdown(false);
      } else if (response.status === 401) {
        setModalContent('Unauthorized');
        setShowModal(true);
        setDropdown(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = () => {
    setDropdown(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGdriveLink(e.target.value);
  };

  return (
    <div className='relative mb-5 flex items-center justify-center'>
      <div className='from-gray-400 to-gray-200 relative mb-8 w-full content-center rounded-xl bg-grey bg-gradient-to-b p-6  md:w-1/2 lg:w-1/3'>
        <div className='flex h-full items-center'>
          <div className='h-1/3 w-1/3 rounded-xl bg-black'>
            {activeTab === 'live' && (
              <Image
                src='/tasks/2155223-removebg-preview.png'
                alt='Live Task'
                width={120}
                height={120}
              />
            )}
            {activeTab === 'submitted' && (
              <Image
                src='/tasks/3255337-removebg-preview.png'
                alt='Submitted Task'
                width={120}
                height={120}
              />
            )}
            {activeTab === 'completed' && (
              <Image
                src='/tasks/5995357-removebg-preview.png'
                alt='Completed Task'
                width={120}
                height={120}
              />
            )}
            {activeTab === 'expired' && (
              <Image
                src='/tasks/8356278-removebg-preview.png'
                alt='Expired Task'
                width={120}
                height={120}
              />
            )}
          </div>
          <div className='w-2/3'>
            <p className='text-left font-bold md:text-xl lg:text-2xl'>
              {title}
            </p>
            <p className='text-left text-xs md:text-sm'>{description}</p>
            <div className='flex justify-between'>
              <p className='text-left text-xs md:text-sm'>
                Expires on: {DDMMYYYY(date)}
              </p>
              <p className='text-left text-xs md:text-sm'>Points: {points}</p>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <a
                  href='https://www.instagram.com/technexiitbhu/'
                  target='_blank'
                >
                  <img src='/insta.webp' alt='insta' className='mr-1 h-5 w-5' />
                </a>
                <a
                  href='https://www.facebook.com/technexiitbhu/'
                  target='_blank'
                >
                  <img
                    src='/facebook.webp'
                    alt='facebook'
                    className='mr-1 h-5 w-5'
                  />
                </a>
                <a
                  href='https://www.linkedin.com/company/technex-iit-bhu-varanasi/mycompany/'
                  target='_blank'
                >
                  <img
                    src='/linkedin.webp'
                    alt='linkedIn'
                    className='mr-1 h-5 w-5'
                  />
                </a>
                <a
                  href='https://twitter.com/technexiitbhu?lang=en'
                  target='_blank'
                >
                  <img src='/X.webp' alt='twitter' className='mr-1 h-5 w-5' />
                </a>
              </div>
              <div>
                {activeTab === 'live' && (
                  <button
                    onClick={handleUpload}
                    className={`text-white h-6 w-20 rounded-full bg-red ${
                      isUploaded ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {buttonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {dropdown && (
          <form className='flex flex-col items-center py-5'>
            <Input
              placeholder='Your Google Drive Link Here'
              className='h-10 w-full rounded-[50px] bg-[#191919] px-5'
              value={gdriveLink}
              onChange={handleChange}
            />
            <Button
              className='mt-2 h-10 w-[30%] rounded-[50px] bg-[#A81F25]'
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        )}
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            className='absolute bottom-0 left-0'
          >
            {' '}
            {activeTab === 'live' || activeTab === 'completed'
              ? 'Incentives'
              : 'Comments'}{' '}
          </MenuButton>
          <MenuList className='z-10'>
            <MenuItem
              minH='48px'
              maxW='350px'
              className='menuItem flex-shrink-1 flex bg-[#A81F25] p-[10px] md:w-1/2 lg:w-1/3'
            >
              {activeTab === 'live' || activeTab === 'completed'
                ? incentives
                  ? incentives
                  : 'No Incentives'
                : comment
                  ? comment
                  : 'No Comments'}
            </MenuItem>
          </MenuList>
        </Menu>
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
  );
};

function DDMMYYYY(date: string) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export default Cards;
