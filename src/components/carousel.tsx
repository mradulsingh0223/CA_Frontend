import React, { useState, useRef, MutableRefObject } from 'react';
import Slider from 'react-slick';
import Head from 'next/head';
import IncentiveCard from './incentive_card';
import { v4 as uuidv4 } from 'uuid';
import 'src/styles/Incentive.module.css';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardPopup from './cardpopup';

const titletext = [
  'Paisa Hi ',
  <span key={uuidv4()} style={{ color: '#C70039' }}>
    Paisa
  </span>,
  ' Hoga',
];

const text1 =
  '⚪Lead CAs to get a rank based Social Media Marketing Internship Certificate from Technex IIT BHU';
const text2 =
  '⚪Exclusively Top Performers will have Letter of Recommendation signed by Chairman';
const text3 =
  '⚪Technex IIT BHU Goodies and Merchandise Discounts on Tickets and Accomodation for Top Performers';
const text4 =
  "⚪Linkedin Endorsement & Weekly Instagram Shoutout On Technex's Social Media Platforms";
const textt = text1 + '\n\n' + text2 + '\n\n' + text3 + '\n\n' + text4;

const text5 =
  '⚪Exclusive internship opportunities for top performing Campus Ambassadors.';
const text6 =
  '⚪Amazing opportunities to access exclusive career resources, product suite and exciting freebies.';
const txtl = text5 + '\n\n' + text6;

const text7 = '⚪Free courses to top performing Campus Ambassadors.';
const text8 =
  '⚪Course discounts hinge on the exemplary achievements of our Campus Ambassadors.';
const txtw = text7 + '\n\n' + text8;

const text9 =
  '⚪Exceptional campus ambassadors receive enticing travel vouchers valued at around Rs. 3,000 for flights, buses, and hotels !';
const txtease = text9;

const text10 =
  '⚪Free course of ‘Stock Market Made Easy’ for all registering Campus Ambassadors';
const text11 =
  "⚪All registering Campus Ambassadors will receive a complimentary one-month subscription to 'StockEdge Premium’.";
const text12 =
  "⚪Top-performing Campus Ambassadors receive an exclusive 'Stock Market All-in-One Course Combo.";
const txtse = text10 + '\n\n' + text11 + '\n\n' + text12;

const incentiveLogoPaths: [string, string][] = [
  ['/SE.svg', txtse],
  ['/EaseMyTripLogo.svg', txtease],
  ['/Languify.webp', txtl],
  ['/wayspire.webp', txtl],
  ['TechnexLogo.svg', textt],
];

const IncentivesCarousel = () => {
  const [showFull, setShowFull] = useState(false);
  const [fullLogoText, setFullLogoText] = useState<[string, string] | null>(
    null
  );
  const showFullHandler = (content: [string, string] | null) => {
    setShowFull(!showFull);
    setFullLogoText(content);
  };
  const sliderRef1 = useRef<any>();
  const sliderRef2 = useRef<any>();

  const next1 = () => {
    sliderRef1.current?.slickNext();
  };
  const previous1 = () => {
    sliderRef1.current?.slickPrev();
  };
  const next2 = () => {
    sliderRef2.current?.slickNext();
  };
  const previous2 = () => {
    sliderRef2.current?.slickPrev();
  };

  const ArrowLeft1 = () => (
    <ArrowLeftIcon
      onClick={previous1}
      // style={{ position: 'absolute', left: '-20px', top: '50%', zIndex: 3 }}
      className={'arrow prev'}
    ></ArrowLeftIcon>
  );
  const ArrowRight1 = () => (
    <ArrowRightIcon
      onClick={next1}
      // style={{ position: 'absolute', right: '-20px', top: '50%' }}
      className={'arrow next'}
    ></ArrowRightIcon>
  );
  const ArrowLeft2 = () => (
    <ArrowLeftIcon
      onClick={previous2}
      // style={{ position: 'absolute', left: '-20px', top: '50%', zIndex: 3 }}
      className={'arrow prev'}
    ></ArrowLeftIcon>
  );

  const ArrowRight2 = () => (
    <ArrowRightIcon
      onClick={next2}
      // style={{ position: 'absolute', right: '-20px', top: '50%' }}
      className={'arrow next'}
    ></ArrowRightIcon>
  );

  const settings1 = {
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 624,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
        },
      },
      {
        breakpoint: 325,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
        },
      },
      {
        breakpoint: 100,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          mobileFirst: true,
          adaptiveHeight: true,

          autoplaySpeed: 5000,
        },
      },
    ],
  };

  const settings2 = {
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4500,
    speed: 500,
    slidesToShow: 3.75,
    slidesToScroll: 1,
    rtl: true,

    responsive: [
      {
        breakpoint: 624,
        settings: {
          slidesToShow: 1.75,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          rtl: true,
        },
      },
      {
        breakpoint: 325,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          rtl: true,
        },
      },
      {
        breakpoint: 100,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          mobileFirst: true,
          rtl: true,
          adaptiveHeight: true,

          autoplaySpeed: 5000,
        },
      },
    ],
  };

  return (
    <div className=''>
      {showFull && (
        <div className='blur-sm'>
          <div
            style={{
              justifyContent: 'center',
              margin: '20px',
            }}
          >
            <Head>
              <link
                rel='stylesheet'
                type='text/css'
                charSet='UTF-8'
                href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
              />
              <link
                rel='stylesheet'
                type='text/css'
                href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
              />
            </Head>
          </div>
          <div style={{ justifyContent: 'center', margin: '20px' }}>
            <Head>
              <link
                rel='stylesheet'
                type='text/css'
                charSet='UTF-8'
                href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
              />
              <link
                rel='stylesheet'
                type='text/css'
                href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
              />
            </Head>
          </div>
        </div>
      )}
      {
        <div className='blur-none'>
          <div
            style={{
              justifyContent: 'center',
              margin: '20px',
            }}
          >
            <Head>
              <link
                rel='stylesheet'
                type='text/css'
                charSet='UTF-8'
                href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
              />
              <link
                rel='stylesheet'
                type='text/css'
                href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
              />
            </Head>

            <Slider
              {...settings1}
              ref={sliderRef1}
              prevArrow={<ArrowLeft1 />}
              nextArrow={<ArrowRight1 />}
            >
              {incentiveLogoPaths.map((logo_text, index) => {
                return (
                  <div key={index}>
                    <IncentiveCard logo={logo_text[0]} text={logo_text[1]} />

                    <button
                      className=' font-semibold text-red'
                      onClick={() => showFullHandler(logo_text)}
                    >
                      {'Show More'}
                    </button>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div style={{ justifyContent: 'center', margin: '20px' }}>
            <Head>
              <link
                rel='stylesheet'
                type='text/css'
                charSet='UTF-8'
                href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
              />
              <link
                rel='stylesheet'
                type='text/css'
                href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
              />
            </Head>
            <Slider
              {...settings2}
              ref={sliderRef2}
              rtl={true}
              prevArrow={<ArrowLeft2 />}
              nextArrow={<ArrowRight2 />}
            >
              {incentiveLogoPaths.map((logo_text, index) => {
                return (
                  <div key={index}>
                    <IncentiveCard logo={logo_text[0]} text={logo_text[1]} />

                    <button
                      className=' font-semibold text-red'
                      onClick={() => showFullHandler(logo_text)}
                    >
                      {'Show More'}
                    </button>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      }
      <p className='fixed left-0 top-1/4 z-30 flex items-center justify-center md:left-1/4 lg:left-[28%]'>
        <CardPopup
          logo={(fullLogoText && fullLogoText[0]) || '/logoipsum-284.svg'}
          text={(fullLogoText && fullLogoText[1]) || 'BUG!!!'}
          trigger={showFull}
        >
          <button
            className='relative px-3 py-1 pb-2 font-semibold text-red'
            onClick={() => showFullHandler(null)}
          >
            Show {showFull ? 'Less' : 'More'}
          </button>
        </CardPopup>
      </p>
    </div>
  );
};

export default IncentivesCarousel;
