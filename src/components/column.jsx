import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Task from './Task'
import NewTask from './NewTask';

const Column = ({ column }) => {
    const [newTask, setNewTask] = useState(false)

    return (
        <div className='p-4 rounded-lg bg-[#eee] flex flex-col gap-4 min-h-[80vh] min-w-80 w-[calc(100%/4)]'>
            <div className='flex items-center gap-4'>
                <span className='w-4 h-4 rounded-full' style={{ backgroundColor: column?.status_color }} />
                <h3 className='uppercase font-bold'>{column?.title}</h3>
                <span className='w-4 h-4 rounded-full flex items-center justify-center bg-zinc-300 font-semibold text-xs'>{column?.tasks?.length}</span>
            </div>

            <div className='flex flex-col gap-4 h-full'>
                <Droppable droppableId={column.id.toString()}>
                    {(provided) => (
                        <div className='h-full' ref={provided.innerRef} {...provided.droppableProps}>
                            {(column?.tasks?.length === 0 && !newTask) && (
                                <div className='flex items-center justify-center h-full'>
                                    <p className='text-muted text-center'>No tasks available</p>
                                </div>
                            )}
                            {column?.tasks.map((task, index) => (
                                <Draggable
                                    key={task.id}
                                    draggableId={task.id.toString()}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div key={task?.id} ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps} className='mb-4'>
                                            <Task
                                                columnId={column.id} task={task}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {newTask && <NewTask columnId={column.id} setNewTask={setNewTask} />}
            </div>
            <button onClick={() => setNewTask(true)} className='mt-auto px-4 py-2 border border-dashed border-zinc-200 rounded-lg flex items-center justify-center gap-4 cursor-pointer hover:bg-white'>
                <FaPlus />
                Add Task
            </button>
        </div>
    )
}

export default Column