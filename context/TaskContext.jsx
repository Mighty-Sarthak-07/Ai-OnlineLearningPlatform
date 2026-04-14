'use client'

import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTasksAdded, setNewTasksAdded] = useState(false);

  const toggleTaskModal = () => setIsTaskModalOpen(prev => !prev);
  const openTaskModal = () => setIsTaskModalOpen(true);
  const closeTaskModal = () => setIsTaskModalOpen(false);

  return (
    <TaskContext.Provider value={{ 
      isTaskModalOpen, 
      toggleTaskModal, 
      openTaskModal, 
      closeTaskModal,
      tasks,
      setTasks,
      newTasksAdded,
      setNewTasksAdded
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskModal() {
  return useContext(TaskContext);
}
