import { ReactElement, useState } from 'react';
import styles from '../styles/adminPage.module.css';
import TaskList from '@/components/AdminPage/TaskList';
import TaskForm from '@/components/AdminPage/TaskForm';
import UnverifiedUsers from '@/components/AdminPage/UnverifiedUsers';
import VerifyTasks from '@/components/AdminPage/VerifyTasks';
function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>('login');
  const options: { [k: string]: ReactElement<any, any> } = {
    login: <Login token={token} setToken={setToken}></Login>,
    'All Tasks': <TaskList token={token}></TaskList>,
    'Add Task': <TaskForm token={token}></TaskForm>,
    'verify CAs': <UnverifiedUsers token={token}></UnverifiedUsers>,
    'Verify Tasks': <VerifyTasks token={token} />,
  };

  return (
    <div className={styles.container}>
      <Tabs
        options={Object.keys(options)}
        selected={selected}
        setSelected={setSelected}
      ></Tabs>
      {options[selected]}
    </div>
  );
}
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
function Login({
  token,
  setToken,
}: {
  token: string | null;
  setToken: Function;
}) {
  const [username, setUsername] = useState<string>('ADMIN');
  const [password, setPassword] = useState<string>('strong__password_123');
  const [message, setMessage] = useState<string>('');

  function handleClick() {
    fetch(BACKEND_URL + 'auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': '0',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        if (res.status !== 200) throw new Error('Invalid credentials');
        return res.json();
      })
      .then((data) => {
        setToken(data.access);
        setMessage('');
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className={styles.loginContainer}>
      <div>
        <label htmlFor='username' className={styles.label}>
          Username
        </label>
        <input
          type='text'
          className={styles.input}
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password' className={styles.label}>
          Password
        </label>
        <input
          type='password'
          className={styles.input}
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        Status:
        {token === null ? 'Not logged in' : `Logged in`}
      </div>
      <p
        style={{
          color: 'red',
        }}
      >
        {message}
      </p>
      <button className={styles.button} onClick={handleClick}>
        Login
      </button>
    </div>
  );
}

function Tabs({
  options,
  selected,
  setSelected,
}: {
  options: string[];
  selected: string;
  setSelected: Function;
}) {
  return (
    <div className={styles.navbar}>
      <h1 className={styles.heading}>Admin Page</h1>
      {options.map((option, index) => {
        return (
          <button
            key={index}
            className={
              styles.button + ' ' + (selected === option ? styles.active : '')
            }
            onClick={() => setSelected(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default AdminPage;
