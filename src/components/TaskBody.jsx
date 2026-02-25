import React from 'react'

const TaskBody = ({ task }) => {
    return (
        <div className='flex flex-col gap-4'>
            <h3 className='font-semibold'>{task?.title}</h3>
            <p className='font-semibold text-muted'>{task?.description}</p>
        </div>
    )
}

export default TaskBody