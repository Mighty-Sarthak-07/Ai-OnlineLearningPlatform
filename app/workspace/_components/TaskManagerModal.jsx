'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Calendar, Clock, AlertCircle, CheckCircle2, Circle, MoreVertical, Trash2, Edit2, GripVertical, ListTodo } from 'lucide-react';
import { useTaskModal } from '@/context/TaskContext';

export default function TaskManagerModal() {
  const { 
    isTaskModalOpen, 
    closeTaskModal,
    tasks,
    setTasks,
    newTasksAdded,
    setNewTasksAdded
  } = useTaskModal();
  const constraintsRef = useRef(null);

  // States
  const [filter, setFilter] = useState('All'); // All, Pending, Completed
  const [sortBy, setSortBy] = useState('deadline'); // deadline, priority
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [priority, setPriority] = useState('Medium'); // Low, Medium, High

  // Persist functionality
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('skillworld_tasks');
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if (newTasksAdded) {
       // Refresh from localStorage to get the AI-added tasks
       const savedTasks = localStorage.getItem('skillworld_tasks');
       if (savedTasks) setTasks(JSON.parse(savedTasks));
       setNewTasksAdded(false);
    }
  }, [newTasksAdded]);

  if (!isTaskModalOpen) return null;

  // Handlers
  const openAddForm = () => {
    resetForm();
    setIsAdding(true);
  };

  const closeForm = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDeadlineDate('');
    setDeadlineTime('');
    setPriority('Medium');
  };

  const saveTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      setTasks(tasks.map(t => t.id === editingId ? {
        ...t, title, description, deadlineDate, deadlineTime, priority
      } : t));
    } else {
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        deadlineDate,
        deadlineTime,
        priority,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };
      setTasks([newTask, ...tasks]);
    }
    closeForm();
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map(t => t.id === id ? {
      ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed'
    } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description || '');
    setDeadlineDate(task.deadlineDate || '');
    setDeadlineTime(task.deadlineTime || '');
    setPriority(task.priority);
    setIsAdding(true);
  };

  // Utils & Calculations
  const getPriorityColor = (prio) => {
    if (prio === 'High') return 'text-red-600 bg-red-50 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20';
    if (prio === 'Medium') return 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
    return 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
  };

  const isOverdue = (task) => {
    if (task.status === 'Completed' || (!task.deadlineDate && !task.deadlineTime)) return false;
    const now = new Date();
    const taskDateObj = new Date(`${task.deadlineDate || now.toISOString().split('T')[0]}T${task.deadlineTime || '23:59'}`);
    return now > taskDateObj;
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Completed') return t.status === 'Completed';
    if (filter === 'Pending') return t.status === 'Pending';
    return true;
  }).sort((a, b) => {
    if (sortBy === 'deadline') {
      const dateA = new Date(`${a.deadlineDate || '9999-12-31'}T${a.deadlineTime || '23:59'}`);
      const dateB = new Date(`${b.deadlineDate || '9999-12-31'}T${b.deadlineTime || '23:59'}`);
      return dateA - dateB;
    } else {
      const pVal = { High: 3, Medium: 2, Low: 1 };
      return pVal[b.priority] - pVal[a.priority];
    }
  });

  const pendingCount = tasks.filter(t => t.status === 'Pending').length;
  const progress = tasks.length ? Math.round((tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100) : 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center p-4">
        {/* Invisible constraint area for dragging */}
        <div className="absolute inset-4 pointer-events-none" ref={constraintsRef} />

        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragMomentum={false}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="pointer-events-auto bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl w-full max-w-md h-[36rem] max-h-screen rounded-[24px] shadow-2xl flex flex-col border border-slate-200/60 dark:border-slate-800/60 overflow-hidden relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800 cursor-grab active:cursor-grabbing bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                <ListTodo className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h2 className="font-bold text-slate-800 dark:text-slate-100">Tasks</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {pendingCount} Pending
                  </span>
                  <div className="w-px h-3 bg-slate-300 dark:bg-slate-700" />
                  <span className="text-[11px] font-medium text-violet-600 dark:text-violet-400">
                    {progress}% Done
                  </span>
                </div>
              </div>
            </div>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={closeTaskModal}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Progress bar line */}
          <div className="w-full h-1 bg-slate-100 dark:bg-slate-800">
            <motion.div 
              className="h-full bg-violet-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 scrollbar-thin-light">
            <AnimatePresence mode="wait">
              {isAdding ? (
                // --- Form View ---
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                  onSubmit={saveTask}
                >
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-2">
                    {editingId ? 'Edit Task' : 'New Task'}
                  </h3>
                  
                  <div>
                    <input 
                      type="text" 
                      placeholder="Task Title *" 
                      required
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:text-slate-200 transition-all font-medium placeholder:font-normal"
                    />
                  </div>
                  
                  <div>
                    <textarea 
                      placeholder="Description (Optional)" 
                      rows={2}
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:text-slate-200 transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5"><Calendar className="w-3 h-3"/> Date</label>
                      <input 
                        type="date" 
                        value={deadlineDate}
                        onChange={e => setDeadlineDate(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none dark:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5"><Clock className="w-3 h-3"/> Time</label>
                      <input 
                        type="time" 
                        value={deadlineTime}
                        onChange={e => setDeadlineTime(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none dark:text-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 mb-2 block">Priority</label>
                    <div className="flex gap-2">
                      {['Low', 'Medium', 'High'].map(p => (
                        <button
                          type="button"
                          key={p}
                          onClick={() => setPriority(p)}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                            priority === p 
                              ? getPriorityColor(p) 
                              : 'border-slate-200 dark:border-slate-800 text-slate-500 bg-white dark:bg-slate-900'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-6">
                    <button type="button" onClick={closeForm} className="flex-1 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" className="flex-1 py-2 rounded-lg text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-colors shadow-md shadow-violet-200 dark:shadow-none">
                      Save
                    </button>
                  </div>
                </motion.form>
              ) : (
                // --- Task List View ---
                <motion.div 
                  key="list"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col h-full"
                >
                  {/* Filters / Utility bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                      {['All', 'Pending', 'Completed'].map(f => (
                        <button 
                          key={f}
                          onClick={() => setFilter(f)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${filter === f ? 'bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>

                    <select 
                      value={sortBy} 
                      onChange={e => setSortBy(e.target.value)}
                      className="bg-transparent text-xs font-medium text-slate-500 dark:text-slate-400 focus:outline-none cursor-pointer"
                    >
                      <option value="deadline">Sort by Deadline</option>
                      <option value="priority">Sort by Priority</option>
                    </select>
                  </div>

                  {/* Tasks Array */}
                  <div className="space-y-3 pb-20"> {/* pb-20 for absolute button space */}
                    {filteredTasks.length === 0 ? (
                      <div className="py-12 flex flex-col items-center justify-center opacity-60">
                        <ListTodo className="w-12 h-12 mb-3 text-slate-300 dark:text-slate-600" />
                        <p className="text-sm font-medium text-slate-500">No tasks found</p>
                      </div>
                    ) : (
                      filteredTasks.map(task => (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          key={task.id}
                          className={`group flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                            task.status === 'Completed' 
                              ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800/50 opacity-60' 
                              : isOverdue(task)
                                ? 'bg-red-50/30 dark:bg-red-900/10 border-red-200 dark:border-red-900/30 shadow-sm'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
                          }`}
                        >
                          <button onClick={() => toggleStatus(task.id)} className="mt-1 flex-shrink-0 transition-transform active:scale-90">
                            {task.status === 'Completed' ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-violet-500 transition-colors" />
                            )}
                          </button>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-semibold transition-all duration-300 ${
                              task.status === 'Completed' 
                                ? 'text-slate-500 line-through' 
                                : isOverdue(task)
                                  ? 'text-red-700 dark:text-red-400'
                                  : 'text-slate-800 dark:text-slate-200'
                            }`}>
                              {task.title}
                            </h4>
                            {task.description && (
                              <p className={`text-xs mt-1 line-clamp-2 ${task.status === 'Completed' ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                {task.description}
                              </p>
                            )}
                            
                            <div className="flex flex-wrap items-center gap-2 mt-2.5">
                              <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${getPriorityColor(task.priority)} ${task.status === 'Completed' && 'opacity-50 grayscale'}`}>
                                {task.priority}
                              </span>
                              
                              {(task.deadlineDate || task.deadlineTime) && (
                                <span className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md ${
                                  isOverdue(task) && task.status !== 'Completed'
                                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                }`}>
                                  <Clock className="w-3 h-3" />
                                  {task.deadlineDate 
                                    ? new Date(task.deadlineDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric'}) 
                                    : ''}
                                  {task.deadlineDate && task.deadlineTime ? ' at ' : ''}
                                  {task.deadlineTime || ''}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => startEdit(task)} className="p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-md transition-colors">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => deleteTask(task.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                  
                  {/* Floating Action Button */}
                  <div className="absolute bottom-5 left-0 right-0 flex justify-center pointer-events-none">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openAddForm}
                      className="pointer-events-auto flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 dark:bg-violet-600 text-white shadow-xl shadow-slate-900/20 dark:shadow-none hover:bg-slate-800 dark:hover:bg-violet-500 transition-all font-semibold text-sm"
                    >
                      <Plus className="w-4 h-4" /> Add Task
                    </motion.button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
