// import Leaderboard from '@/components/leaderboard';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/navbar';

export default function LeaderboardPage() {
  return (
    <>
      {/* <Leaderboard /> */}
      <Navbar />
      <div className='w-9/10  flex h-screen flex-col items-center justify-center'>
        <span className='text-white mb-4 text-center text-[35px] font-[900] tracking-[.75em] ef:text-[4rem] md:text-[6rem] lg:text-[4.5rem]'>
          COMING
        </span>
        <span className='text-[50px] font-bold tracking-[.25em] text-red opacity-50 ef:text-[5rem] md:text-[9rem] lg:text-[9rem]'>
          SOON
        </span>
        <span className='relative bottom-[72px] right-[10px] text-[50px] font-bold tracking-[.25em] text-red opacity-10 ef:bottom-[110px] ef:right-[15px] ef:text-[5rem] md:bottom-[200px] md:right-[15px] md:text-[9rem] lg:bottom-[205px] lg:right-[20px] lg:text-[9rem]'>
          SOON
        </span>
      </div>
    </>
  );
}
