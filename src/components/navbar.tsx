import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import Hamburger from './hamburgermenu';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Button,
} from '@chakra-ui/react';

const Navbar: FC = () => {
  const [aboutColor, setAboutColor] = useState('red');
  const [incentivesColor, setIncentivesColor] = useState('white');
  const [contactusColor, setContactusColor] = useState('white');
  const [faqColor, setFaqColor] = useState('white');
  const [leaderboardColor, setLeaderBoardColor] = useState('white');
  const [dashboardPageColor, setDashboardPageColor] = useState('white');
  const [profileColor, setProfileColor] = useState('white');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const handleProfile = () => {
    router.push('/profile');
  };

  const handleDashboard = () => {
    router.push('/dashboardPage');
  };

  const handleLeaderboard = () => {
    router.push('/leaderboard');
  };

  useEffect(() => {
    // Check if access token exists in localStorage
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname === '/index') {
      setAboutColor('red');
      setIncentivesColor('white');
      setContactusColor('white');
      setFaqColor('white');
      setLeaderBoardColor('white');
      setDashboardPageColor('white');
      setProfileColor('white');
    } else if (window.location.pathname === '/incentivesPage') {
      setAboutColor('white');
      setIncentivesColor('red');
      setContactusColor('white');
      setFaqColor('white');
      setLeaderBoardColor('white');
      setDashboardPageColor('white');
      setProfileColor('white');
    } else if (window.location.pathname === '/contactUsPage') {
      setAboutColor('white');
      setIncentivesColor('white');
      setContactusColor('red');
      setFaqColor('white');
      setLeaderBoardColor('white');
      setDashboardPageColor('white');
      setProfileColor('white');
    } else if (window.location.pathname === '/faqPage') {
      setAboutColor('white');
      setIncentivesColor('white');
      setContactusColor('white');
      setFaqColor('red');
      setLeaderBoardColor('white');
      setDashboardPageColor('white');
      setProfileColor('white');
    } else if (window.location.pathname === '/leaderboard') {
      setAboutColor('white');
      setIncentivesColor('white');
      setContactusColor('white');
      setFaqColor('white');
      setLeaderBoardColor('red');
      setDashboardPageColor('white');
      setProfileColor('white');
    } else if (window.location.pathname === '/dashboardPage') {
      setAboutColor('white');
      setIncentivesColor('white');
      setContactusColor('white');
      setFaqColor('white');
      setLeaderBoardColor('white');
      setDashboardPageColor('red');
      setProfileColor('white');
    } else if (window.location.pathname === '/profile') {
      setAboutColor('white');
      setIncentivesColor('white');
      setContactusColor('white');
      setFaqColor('white');
      setLeaderBoardColor('white');
      setDashboardPageColor('white');
      setProfileColor('red');
    }
  }, []);

  return (
    <div className='z-100 flex items-center justify-between'>
      <Link href={'/'}>
        <div className='-space-y-3 sm:-space-y-6'>
          <Image
            className='w-56 pl-1 pt-2 sm:w-72 sm:p-3'
            src={'/Asset 1.svg'}
            alt='technex logo'
            width={330}
            height={75}
          />
        </div>
      </Link>

      <div className='hidden space-x-6 p-3 pr-5 text-center text-xl font-bold cd:block xl:space-x-10 '>
        <Link
          href='/'
          className={`relative text-${aboutColor} font-spline transition-all duration-500 before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-0 before:rounded-3xl before:bg-gradient-to-r before:from-[#A81F25] before:to-[#A81F25] before:opacity-0 before:transition-all before:duration-500 before:content-[''] hover:before:w-full hover:before:opacity-100`}
        >
          About
        </Link>
        <Link
          href='/incentivesPage'
          className={`relative text-${incentivesColor} font-spline transition-all duration-500 before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-0 before:rounded-full before:bg-gradient-to-r before:from-[#A81F25] before:to-[#A81F25] before:opacity-0 before:transition-all before:duration-500 before:content-[''] hover:before:w-full hover:before:opacity-100`}
        >
          Incentives
        </Link>
        <Link
          href={'/contactUsPage'}
          className={`relative text-${contactusColor} font-spline transition-all duration-500 before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-0 before:rounded-full before:bg-gradient-to-r before:from-[#A81F25] before:to-[#A81F25] before:opacity-0 before:transition-all before:duration-500 before:content-[''] hover:before:w-full hover:before:opacity-100`}
        >
          ContactUs
        </Link>
        <Link
          href={'/faqPage'}
          className={`relative text-${faqColor} font-spline transition-all duration-500 before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-0 before:rounded-full before:bg-gradient-to-r before:from-[#A81F25] before:to-[#A81F25] before:opacity-0 before:transition-all before:duration-500 before:content-[''] hover:before:w-full hover:before:opacity-100`}
        >
          FAQs
        </Link>
        {/* {isLoggedIn && (
          <Link
            href={'/leaderboard'}
            className={`relative text-${leaderboardColor} font-spline transition-all duration-500 before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-0 before:rounded-full before:bg-gradient-to-r before:from-[#A81F25] before:to-[#A81F25] before:opacity-0 before:transition-all before:duration-500 before:content-[''] hover:before:w-full hover:before:opacity-100`}
          >
            Leaderboard
          </Link>
        )}
        {isLoggedIn && (
          <Link
            href={'/dashboardPage'}
            className={`relative text-${dashboardPageColor} font-spline transition-all duration-500 before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-0 before:rounded-full before:bg-gradient-to-r before:from-[#A81F25] before:to-[#A81F25] before:opacity-0 before:transition-all before:duration-500 before:content-[''] hover:before:w-full hover:before:opacity-100`}
          >
            Dashboard
          </Link>
        )}
        {isLoggedIn && (
          <Link
            href={'/profile'}
            className={`relative text-${profileColor} font-spline transition-all duration-500 before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-0 before:rounded-full before:bg-gradient-to-r before:from-[#A81F25] before:to-[#A81F25] before:opacity-0 before:transition-all before:duration-500 before:content-[''] hover:before:w-full hover:before:opacity-100`}
          >
            Profile
          </Link>
        )} */}
        {isLoggedIn ? (
          // <Link
          //   href={'/'}
          //   onClick={() => {
          //     setIsLoggedIn(false);
          //     localStorage.removeItem('accessToken');
          //   }}
          //   className='rounded-e-full rounded-s-full border-2 px-5 font-spline hover:border-[#A81F25] hover:bg-[#191919] hover:text-[#A81F25] sm:px-7 sm:py-1'
          // >
          //   Logout
          // </Link>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton isActive={isOpen} as={Button}>
                  <Avatar
                    name='Dan Abrahmov'
                    src='https://play-lh.googleusercontent.com/Oriscl3_nvmDPncct6gStmNuQW_4tqHVozy1skG0vd8Jk22KYNMYYJfKq0vcyU-NKdw'
                    className='h-[50px] w-[50px] rounded-full'
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
                  <MenuItem onClick={handleLeaderboard}>Leaderboard</MenuItem>
                  <MenuItem
                    onClick={() => {
                      setIsLoggedIn(false);
                      localStorage.removeItem('accessToken');
                      router.push('/');
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        ) : (
          <Link
            href={'/login'}
            className='rounded-e-full rounded-s-full border-2 px-5 font-spline hover:border-[#A81F25] hover:bg-[#191919] hover:text-[#A81F25] sm:px-7 sm:py-1'
          >
            Login
          </Link>
        )}
      </div>
      <div className='flex p-1 sm:p-5 cd:hidden'>
        <Hamburger />
      </div>
    </div>
  );
};
export default Navbar;
