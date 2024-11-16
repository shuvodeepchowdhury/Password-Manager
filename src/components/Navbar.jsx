import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

        {/* Navbar Logo Design */}
        <div className="logo font-bold text-xl">
            <span className='text-purple-400 text-2xl'>&lt;</span> pass<span className='text-purple-400 text-2xl'>D</span>code <span className='text-purple-400 text-2xl'>&gt;</span>
        </div>

        {/* Navbar List Items */}
        <ul>
        <li className='flex gap-4'>
            <a className='hover:text-purple-400' href="#">Home</a>
            <a className='hover:text-purple-400' href="#">About</a>
            <a className='hover:text-purple-400' href="#">Contact</a>
        </li>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar
