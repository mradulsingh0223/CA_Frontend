import React from 'react';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import Image from 'next/image';

type CardPopupProps = {
  logo: string;
  text: string;
  trigger: boolean;
  children?: JSX.Element;
};
const CardPopup = (props: CardPopupProps) => {
  return props.trigger ? (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0)',
        }}
      ></div>

      <div className='card z-20 m-1 flex h-auto w-auto flex-col items-center justify-center rounded-3xl border-2 border-red bg-[#272727] md:h-[250px] md:w-[500px] xl:w-[700px]'>
        <Card className='p-2' height={300}>
          <CardHeader className='flex items-center justify-center p-2 pb-3'>
            <Image
              alt='companylogo'
              src={props.logo}
              width={100}
              height={100}
            />
          </CardHeader>
          <CardBody className='text pb-2 text-sm'>
            {props.text.split('\n\r').map((line, index) => {
              return <p key={index}>{line}</p>;
            })}
          </CardBody>
        </Card>
        {props.children}
      </div>
    </>
  ) : (
    ''
  );
};

export default CardPopup;
