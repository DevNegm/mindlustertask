import { useState } from 'react'
import { MdDeleteOutline, MdEdit } from 'react-icons/md'
import { getPriorityColors, modalStyles } from '../utils/helpers'
import { Box, Modal, Typography } from '@mui/material'
import { deleteTask, updateTask } from '../api/main'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import TaskBody from './TaskBody'
import TaskForm from './TaskForm'


const Task = ({ task, columnId }) => {
    const queryClient = useQueryClient();
    const [taskData, setTaskData] = useState(task)
    const [isEditing, setIsEditing] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const editMutation = useMutation({
        mutationFn: ({ columnId, taskData }) => updateTask(columnId, taskData),
        onSuccess: () => {
            queryClient.invalidateQueries(["columns"], { refetchType: 'background' })
            setIsEditing(false)
        },
    });
    const deleteMutation = useMutation({
        mutationFn: ({ columnId, taskId }) => deleteTask(columnId, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries(["columns"], { refetchType: 'background' })
            setShowModal(false)
        },
    });

    const handleEdit = () => {
        editMutation.mutate({ columnId, taskData });
    }
    const handleDelete = () => {
        deleteMutation.mutate({ columnId, taskId: task?.id });
    }
    const handleCancelEdit = () => {
        setIsEditing(false)
        setTaskData(task)
    }

    const PriorityColor = getPriorityColors(task?.priority).color
    const PriorityBgColor = getPriorityColors(task?.priority).bg


    return (
        <div className='group p-4 rounded-lg flex flex-col gap-4 bg-white border border-zinc-100 cursor-grab'>
            {isEditing ?
                (<TaskForm taskData={taskData} setTaskData={setTaskData} />) :
                (<TaskBody task={task} />)
            }
            {isEditing ?
                (<div className='flex gap-2 transition-all'>
                    <button onClick={handleEdit} className='bg-green-200 border border-green-300 text-green-800 hover:scale-95 transition-all px-4 py-2 flex-1 flex items-center justify-center rounded-lg cursor-pointer'>Save</button>
                    <button onClick={handleCancelEdit} className='bg-red-200 border border-red-300 text-red-800 hover:scale-95 transition-all px-4 py-2 flex-1 flex items-center justify-center rounded-lg cursor-pointer'>Cancel</button>
                </div>)
                :
                (<div className='flex items-center justify-between'>
                    <p className='px-2 py-1 font-semibold text-xs rounded-md uppercase' style={{ backgroundColor: PriorityBgColor, color: PriorityColor }}>{task?.priority}</p>

                    <div className='opacity-0 group-hover:opacity-100 flex gap-2 transition-all'>
                        <button onClick={() => setIsEditing(true)} className='bg-blue-200 border border-blue-300 text-blue-800 hover:scale-95 transition-all w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer'><MdEdit /></button>
                        <button onClick={() => setShowModal(true)} className='bg-red-200 border border-red-300 text-red-800 hover:scale-95 transition-all w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer'><MdDeleteOutline /></button>
                    </div>
                </div>
                )
            }
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyles}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure you want to delete this task?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ my: 2 }}>
                        This action cannot be undone!
                    </Typography>
                    <div className='flex gap-4'>
                        <button onClick={handleDelete} className='bg-red-200 border border-red-300 text-red-800 hover:scale-95 transition-all px-4 py-2 flex-1 flex items-center justify-center rounded-lg cursor-pointer'>Delete</button>
                        <button onClick={() => setShowModal(false)} className='bg-white border border-zinc-300 text-black hover:scale-95 transition-all px-4 py-2 flex-1 flex items-center justify-center rounded-lg cursor-pointer'>Cancel</button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Task