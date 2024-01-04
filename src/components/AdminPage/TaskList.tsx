import React, { useState, useEffect, useReducer } from 'react';
import styles from './TaskList.module.css';
type Task = {
  id: number;
  title: string;
  description: string;
  incentives: string;
  points: number;
  deadline: string;
};
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
function TaskList({ token }: { token: string | null }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(BACKEND_URL + 'tasks/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!data || !data.sort) {
        //there has been an error as data is not an array
        setMessage(data.detail);
        setTasks([]);
      } else {
        // sort data by dataelement.id
        const dataWithDeadline = data.map((task: Task) => ({
          ...task,
          deadline: new Date(task.deadline).toISOString(),
        }));

        dataWithDeadline.sort((a: Task, b: Task) =>
          a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
        setTasks([...dataWithDeadline]);
        setMessage(data.length + ' tasks found.');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleRefresh = () => {
    fetchTasks();
  };

  return (
    <div className='h-[60%] overflow-x-hidden'>
      <h2>Click on update button after making changes to a task.</h2>
      <table>
        <thead>
          <tr>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>Title</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Incentives</th>
            <th className={styles.th}>Points</th>
            <th className={styles.th}>Deadline</th>
            <th className={styles.th}>Update</th>
            <th className={styles.th}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleRefresh={handleRefresh}
              token={token}
            ></TaskItem>
          ))}
          {tasks.length === 0 && !loading && (
            <tr>
              <td colSpan={5}>No tasks found</td>
            </tr>
          )}

          <label
            style={{
              color: 'red',
            }}
          >
            {message}
          </label>
        </tbody>
      </table>
      <button onClick={handleRefresh} className={styles.button}>
        {loading ? 'Loading...' : 'Refresh'}
      </button>
    </div>
  );
}

function taskUpdateReducer(state: Task, action: Partial<Task>): Task {
  return { ...state, ...action };
}

function TaskItem({
  task,
  handleRefresh,
  token,
}: {
  task: Task;
  handleRefresh: Function;
  token: string | null;
}) {
  const [displayedTask, dispatch] = useReducer<
    React.Reducer<Task, Partial<Task>>
  >(taskUpdateReducer, task);

  let edited = (Object.keys(task) as Array<keyof Task>).reduce((acc, key) => {
    if (key == 'deadline') return acc || task[key] != displayedTask[key];
    return acc || task[key] != displayedTask[key];
  }, false);

  async function handleDeleteTask() {
    try {
      const response = await fetch(BACKEND_URL + 'tasks/' + task.id + '/', {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'content-length': '0',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        handleRefresh();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateTask() {
    let fd = new FormData();
    for (let entry of Object.entries(displayedTask)) {
      if (entry[0] == 'image') continue; // TODO: handle image
      fd.append(entry[0], '' + entry[1]); // ""+entry[1] converts number|string to string
    }
    try {
      const response = await fetch(BACKEND_URL + 'tasks/' + task.id + '/', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      if (response.ok) handleRefresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <tr key={task.id}>
      <td className={styles.td}>{task.id}</td>
      <td className={styles.td}>
        <input
          className={styles.textarea}
          value={displayedTask.title}
          onChange={(e) => dispatch({ title: e.target.value })}
        ></input>
      </td>
      <td className={styles.td}>
        <textarea
          className={styles.textarea}
          value={displayedTask.description}
          onChange={(e) => dispatch({ description: e.target.value })}
        ></textarea>
      </td>
      <td className={styles.td}>
        <textarea
          className={styles.textarea}
          value={displayedTask.incentives}
          onChange={(e) => dispatch({ incentives: e.target.value })}
        ></textarea>
      </td>
      <td className={styles.td}>
        <input
          type='number'
          value={displayedTask.points}
          onChange={(e) => dispatch({ points: +e.target.value })}
        ></input>
      </td>
      <td className={styles.td}>
        <input
          type='date'
          value={new Date(displayedTask.deadline).toISOString().split('T')[0]}
          onChange={(e) =>
            dispatch({ deadline: new Date(e.target.value).toISOString() })
          }
        ></input>
      </td>
      <td className={styles.td}>
        <button
          className={styles.button}
          onClick={() => handleUpdateTask()}
          disabled={!edited}
        >
          update
        </button>
      </td>
      <td className={styles.td}>
        <button className={styles.button} onClick={() => handleDeleteTask()}>
          delete
        </button>
      </td>
    </tr>
  );
}

export default TaskList;
