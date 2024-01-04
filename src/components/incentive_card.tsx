import { ClassNames } from '@emotion/react';
import React, { FC } from 'react';
import { useState } from 'react';
import 'src/styles/Incentive.module.css';
import Image from 'next/image';
import CardPopup from './cardpopup';

interface CardProps {
  logo: string;
  text: string;
}

const IncentiveCard: FC<CardProps> = ({ logo, text }) => {
  const [showFullDescription, setFullDescription] = useState(false);

  const description = showFullDescription
    ? 'Card Description'
    : text.slice(0, 150);
  return (
    <main>
      <div
        style={{
          height: 'max(250px, 10vh)',
          display: 'flex',
          border: '3px solid black',
          borderColor: 'black',
          outline: 'solid 3px #A81F25',
          outlineOffset: '-.7vw',
          borderRadius: '30px',
          borderWidth: '3px',
          backgroundColor: '#272727',
          margin: '10px',

          boxShadow: '0px 0px 2px 2px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{ margin: '10px', padding: '20px' }}
          className='w-full space-y-3'
        >
          <div className='flex items-center justify-center p-1'>
            <Image alt='companylogo' src={logo} width={100} height={100} />
          </div>
          <p
            className='px-3 py-1 pb-2'
            style={{
              // marginLeft: '5px',
              fontSize: '15px',
              padding: '10px',
              color: 'white',
            }}
          >
            {showFullDescription ? `${description}` : `${description}...`}
          </p>
        </div>
      </div>
    </main>
  );
};
export default IncentiveCard;
