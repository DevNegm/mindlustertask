import { BiSearch } from 'react-icons/bi'
import { CiGrid41 } from 'react-icons/ci'

const Navbar = ({ total,search,setSearch }) => {
    return (
        <nav className='flex items-center justify-between gap-4 p-4 border-b border-b-zinc-300'>
            <div className='flex items-center gap-4'>
                <span className='w-10 h-10 flex items-center justify-center rounded-lg bg-blue-700 text-white'>
                    <CiGrid41 size={24} />
                </span>
                <div className='flex flex-col'>
                    <h3 className='font-bold'>Kanban Board</h3>
                    <p className='text-muted'>{total ?? 0} Tasks</p>
                </div>
            </div>
            <div className='relative'>
                <BiSearch size={18} className='absolute left-4 top-1/2 -translate-y-1/2' />
                <input type="text" placeholder='Search Tasks...' value={search} onChange={(e) => setSearch(e.target.value)} className='p-2 pl-10 border font-semibold border-zinc-300 bg-zinc-200 rounded-md' />
            </div>
        </nav>
    )
}

export default Navbar