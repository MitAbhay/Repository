import { HomeIcon,SearchIcon,LibraryIcon } from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'
function Sidebar() {
    const {data : session , status} = useSession();
    console.log(session);
    return (
        <div className=" text-gray-500 p-5 border-r border-gray-500 text-sm">
            <div className="space-y-4">
            <button onClick={()=>signOut()} className="flex space-x-2 items-center hover:text-white">              
                <p>Logout</p>
            </button>
            <button className="flex space-x-2 items-center">
                <HomeIcon className="h-5 w-5" />
                <p>Home</p>
            </button>
            <button className="flex space-x-2 items-center">
                <SearchIcon className="h-5 w-5" />
                <p>Search</p>
            </button>
            <button className="flex space-x-2 items-center">
                <LibraryIcon className="h-5 w-5" />
                <p>Library</p>
            </button>
            <hr />
            <button className="flex space-x-2 items-center">
                <HomeIcon className="h-5 w-5" />
                <p>Home</p>
            </button>
            <button className="flex space-x-2 items-center">
                <SearchIcon className="h-5 w-5" />
                <p>Search</p>
            </button>
            <button className="flex space-x-2 items-center">
                <LibraryIcon className="h-5 w-5" />
            <p>Library</p>
            </button>
            </div>
        </div>
    )
}

export default Sidebar