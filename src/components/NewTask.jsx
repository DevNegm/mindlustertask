import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { createTask } from '../api/main';
import TaskForm from './TaskForm'

const NewTask = ({ columnId, setNewTask }) => {
    const [error, setError] = useState('');
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        priority: 'LOW',
        column: columnId
    })

    const createMutation = useMutation({
        mutationFn: ({ columnId, taskData }) => createTask(columnId, taskData),
        onSuccess: () => {
            handleCancel();
        },
    });

    const handleAddNewTask = () => {
        if (!taskData.title) return setError('Task Title is required');
        createMutation.mutate({ columnId, taskData });
    }

    const handleCancel = () => {
        setTaskData({
            title: '',
            description: '',
            priority: 'LOW',
            column: columnId
        });
        setNewTask(false)
    }

    useEffect(() => {
        if (taskData.title) return setError('');
    }, [taskData.title]);

    return (
        <div className='group p-4 rounded-lg flex flex-col gap-4 bg-white border border-zinc-100'>
            <TaskForm taskData={taskData} setTaskData={setTaskData} error={error} />
            <div className='flex gap-4'>
                <button disabled={error} onClick={handleAddNewTask} className='bg-green-200 border border-green-300 text-green-800 hover:scale-95 transition-all px-4 py-2 flex-1 flex items-center justify-center rounded-lg cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed'>Save</button>
                <button onClick={handleCancel} className='bg-red-200 border border-red-300 text-red-800 hover:scale-95 transition-all px-4 py-2 flex-1 flex items-center justify-center rounded-lg cursor-pointer'>Cancel</button>
            </div>
        </div>
    )
}

export default NewTask