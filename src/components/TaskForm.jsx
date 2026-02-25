import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

const TaskForm = ({taskData,setTaskData,error}) => {
    return (
        <div className='flex flex-col gap-4'>
            <label htmlFor="title" className='flex flex-col gap-3 cursor-grab!'>
                <span>Task Title</span>
                <input required id='title' type="text" value={taskData?.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} className='p-2 border font-semibold border-zinc-300 bg-zinc-100 rounded-md' placeholder='Task Title' />
            </label>
            {error && <span className='text-xs text-red-400 -mt-2'>{error}</span>}
            <label htmlFor="description" className='flex flex-col gap-3 cursor-grab!'> 
                <span>Task Description</span>
                <textarea id='description' type="text" value={taskData?.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} className='p-2 border font-semibold border-zinc-300 bg-zinc-100 rounded-md' placeholder='Task Description' />
            </label>

            <FormControl>
                <FormLabel id="priority">Task Priority</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="priority"
                    name="priority"
                    defaultValue="LOW"
                    value={taskData?.priority}
                    onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                >
                    <FormControlLabel value="LOW" control={<Radio />} label="LOW" />
                    <FormControlLabel value="MID" control={<Radio />} label="MID" />
                    <FormControlLabel value="HIGH" control={<Radio />} label="HIGH" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default TaskForm