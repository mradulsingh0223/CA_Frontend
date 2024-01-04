import React from 'react';
import { Box } from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { HeadingTexts } from './ourReach';

//   import { extendTheme, ChakraProvider, CSSReset} from '@chakra-ui/react'
//   import { accordionTheme } from './accordiantheme'

//   export const theme = extendTheme({
//       components: { Accordion: accordionTheme },
//   })

const FAQ = () => {
  const AccordionData = [
    {
      question: 'Who can become a College Ambassador',
      answer: 'Any College Student with a valid College Student Identity Card.',
    },
    {
      question: 'How to become a College Ambassador',
      answer:
        'By Simply Registering on the College Ambassador Portal by clicking on the "Register" button at the opening page you initiate your Registration process.',
    },
    {
      question: 'How many CAs can be there from a college',
      answer:
        "Can appoint more than one College Ambassador in the same college if the student participation from their college is large.There will be a different Referral Code for every CA which the students can use while doing the registration in Technex'23. The students using a specific Referral code will be counted under that CA only.",
    },
    {
      question:
        'What are the conditions under which I will get a CA Certificate',
      answer:
        'In order to get a CA Certificate, College Ambassadors will have to earn more than the minimum Cut-off points which would be set by Technex, IIT (BHU) Varanasi. The Points allocation can be seen under the tab “Points Scheme.',
    },

    {
      question: 'How much do I have to work to Top the Leaderboard',
      answer:
        'Completion of every task on time would keep you on the list of contenders for the top positions to grab the incentives of free training and free courses.',
    },
  ];
  const pxToRem = (px: number) => `${px / 16}rem`;
  return (
    <div className='bg-background'>
      <div className='relative mb-[20px] flex flex-col bg-background pl-[10px] pt-[200px]'>
        <div className=' absolute bottom-3 flex flex-col -space-y-14 ef:-space-y-16 sm:text-left md:-space-y-32 '>
          <Box
            mt={pxToRem(16)}
            textAlign='left'
            width={['100%', '80%', '100%']}
            display='flex'
            flexDirection='column'
            alignItems={'flex-start'}
            className='-space-y-8 pb-10 ef:-space-y-20 sm:-space-y-32 lg:-space-y-36'
          >
            <HeadingTexts
              whiteText='Faqs'
              bgText='Faqs'
              redText=''
              align='left'
            />
          </Box>
        </div>
      </div>
      <div className='mb-[50px] flex flex-col md:flex-row md:justify-start md:gap-10 md:px-[120px] lg:flex-row lg:justify-start'>
        <div className='w-full md:w-1/2'>
          <Accordion allowMultiple={false} allowToggle className=''>
            {AccordionData.slice(0, 3).map((item, index) => (
              <AccordionItem
                key={index}
                className='m-2 rounded-[40px] bg-grey p-3 font-spline'
                borderColor='RGB(205, 92, 92)'
                borderWidth='1.2px'
              >
                <h2>
                  <AccordionButton>
                    <AccordionIcon />
                    <Box as='span' flex='1' textAlign='center'>
                      <span style={{ fontSize: '1.4rem', color: 'brown' }}>
                        {item.question.split(' ')[0].charAt(0)}
                      </span>
                      {item.question.slice(1)}{' '}
                      <span style={{ fontSize: '1.4rem', color: 'brown' }}>
                        ?
                      </span>
                    </Box>
                  </AccordionButton>
                </h2>

                <AccordionPanel pb={4} className='text-center'>
                  {item.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className='w-full md:w-1/2'>
          <Accordion allowMultiple={false} allowToggle className=''>
            {AccordionData.slice(3).map((item, index) => (
              <AccordionItem
                key={index}
                className='m-2 rounded-[40px] bg-grey p-3  font-spline'
                borderColor='RGB(205, 92, 92)'
                borderWidth='1.2px'
              >
                <h2>
                  <AccordionButton>
                    <AccordionIcon />
                    <Box as='span' flex='1' textAlign='center'>
                      <span style={{ fontSize: '1.4rem', color: 'brown' }}>
                        {item.question.split(' ')[0].charAt(0)}
                      </span>
                      {item.question.slice(1)}{' '}
                      <span style={{ fontSize: '1.4rem', color: 'brown' }}>
                        ?
                      </span>
                    </Box>
                  </AccordionButton>
                </h2>

                <AccordionPanel pb={4} className='text-center'>
                  {item.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
export default FAQ;
