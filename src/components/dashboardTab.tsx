import React, { useState, useEffect } from 'react';
import { Box, Button, useMediaQuery } from '@chakra-ui/react';
import Cards from './dashboardCard';
import useFetchTasks from './useFetchTasks';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface Task {
  id: number;
  points: string;
  description: string;
  title: string;
  deadline: string;
  admin_comment: string;
  incentives: string;
}

interface User {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  college: string;
  year: number;
  phone_no: string;
  whatsapp_no: string;
  postal_address: string;
  pin_code: number;
  why_choose: string;
  where_you_ca: string;
  points: number;
  avatar_id: number;
  date_joined: string;
  user: number;
}
interface submittedTask {
  id: number;
  verified: boolean;
  timestamp: string;
  user: User;
  task: Task;
  link: string;
  admin_comment: string;
}

interface Props {
  setCompletedTasks: React.Dispatch<React.SetStateAction<number>>;
}

const DashboardTab: React.FC<Props> = ({ setCompletedTasks }) => {
  // State to hold the tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submittedTasks, setSubmittedTasks] = useState<submittedTask[]>([]);
  // We need to replace this with actual live, expired and completed tasks
  const [isLargerThan700] = useMediaQuery('(min-width: 700px)');
  const [activeTab, setActiveTab] = useState('live');
  // Fetch tasks from the API when the component mounts
  const fetchedTasks = useFetchTasks();
  useEffect(() => {
    setTasks(fetchedTasks);

    const fetchSubmittedTasks = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('api/getSubmittedTasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          const fetchedTasks = await response.json();
          setSubmittedTasks(fetchedTasks);
        } else {
          console.error('Failed to fetch submitted tasks');
        }
      } catch (error) {
        console.error('Server error', error);
      }
    };
    fetchSubmittedTasks();
  }, [fetchedTasks]);
  const fontSize = isLargerThan700 ? '20px' : '3.57vw';
  const width = isLargerThan700 ? '200px' : '28.5vw';

  const renderCards = (activeTab: string) => {
    const now = new Date();
    let filteredTasks = tasks;
    let verifiedTasks = submittedTasks
      .filter(({ verified }) => verified === true)
      .map((submittedTask) => {
        let task = submittedTask.task;
        task.admin_comment = submittedTask.admin_comment;
        return task;
      });
    setCompletedTasks(verifiedTasks.length);
    let pendingTasks = submittedTasks
      .filter(({ verified }) => verified === false)
      .map((submittedTask) => {
        let task = submittedTask.task;
        task.admin_comment = submittedTask.admin_comment;
        return task;
      });
    if (activeTab === 'live') {
      const submittedTaskIds = submittedTasks.map(({ task }) => task.id);
      filteredTasks = tasks.filter(({ deadline, id }) => {
        return new Date(deadline) > now && !submittedTaskIds.includes(id);
      });
    } else if (activeTab === 'expired') {
      filteredTasks = tasks.filter(({ deadline }) => new Date(deadline) <= now);
      if (filteredTasks.length === 0) {
        return (
          <h1 className='cs text-1xl flex h-[100%] w-[100%] items-center justify-center py-6 text-center sm:text-2xl md:text-3xl lg:text-4xl'>
            {' '}
            No expired tasks!
          </h1>
        );
      }
    } else if (activeTab === 'completed') {
      filteredTasks = verifiedTasks;
      if (filteredTasks.length === 0) {
        return (
          <h1 className='cs text-1xl flex h-[100%] w-[100%] items-center justify-center py-6 text-center sm:text-2xl md:text-3xl lg:text-4xl'>
            {' '}
            No Completed tasks!
          </h1>
        );
      }
    } else if (activeTab === 'submitted') {
      filteredTasks = pendingTasks;
      if (filteredTasks.length === 0) {
        return (
          <h1 className='cs text-1xl flex h-[100%] w-[100%] items-center justify-center py-6 text-center sm:text-2xl md:text-3xl lg:text-4xl'>
            {' '}
            No Submitted tasks!
          </h1>
        );
      }
    }
    return filteredTasks.map(
      (
        { id, deadline, points, title, description, admin_comment, incentives },
        index
      ) => {
        return (
          <Cards
            key={id}
            date={new Date(deadline).toLocaleDateString()}
            points={points}
            title={title}
            description={description}
            taskNumber={`${index + 1}`}
            taskID={id}
            month={`${monthNames[now.getMonth()]}`}
            activeTab={activeTab}
            comment={admin_comment}
            incentives={incentives}
          />
        );
      }
    );
  };

  return (
    <Box>
      <Box maxWidth='100%' display='flex' justifyContent='center' mb='2vw'>
        <Button
          style={
            activeTab === 'live'
              ? { borderBottom: '0.5vh solid #A81F25', fontSize, width }
              : { fontSize, width }
          }
          onClick={() => setActiveTab('live')}
        >
          Live Tasks
        </Button>
        <Button
          style={
            activeTab === 'submitted'
              ? { borderBottom: '0.5vh solid #A81F25', fontSize, width }
              : { fontSize, width }
          }
          onClick={() => setActiveTab('submitted')}
        >
          Submitted
        </Button>
        {/* The other buttons can remain for future functionality */}
        <Button
          style={
            activeTab === 'completed'
              ? { borderBottom: '0.5vh solid #A81F25', fontSize, width }
              : { fontSize, width }
          }
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </Button>
        <Button
          style={
            activeTab === 'expired'
              ? { borderBottom: '0.5vh solid #A81F25', fontSize, width }
              : { fontSize, width }
          }
          onClick={() => setActiveTab('expired')}
        >
          Expired
        </Button>
      </Box>
      <Box>{renderCards(activeTab)}</Box>
    </Box>
  );
};

export default DashboardTab;
