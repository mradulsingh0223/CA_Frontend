import React, { useState } from 'react';
import Dashboard from '@/components/dashboard';
import DashboardTab from '@/components/dashboardTab';
import Navbar from '../components/navbar';

export default function DashboardPage() {
  const [completedTasks, setCompletedTasks] = useState(0);
  return (
    <>
      <div className='z-10 pb-[110px] '>
        <Navbar />
      </div>
      <Dashboard completedTasks={completedTasks} />
      <DashboardTab setCompletedTasks={setCompletedTasks} />
    </>
  );
}
