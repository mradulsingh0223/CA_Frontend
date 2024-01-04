import { useEffect, useState } from 'react';

const useFetchTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('api/getTasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const fetchedTasks = await response.json();
          setTasks(fetchedTasks);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Server error', error);
      }
    };

    fetchTasks();
  }, []);

  return tasks;
};

export default useFetchTasks;
