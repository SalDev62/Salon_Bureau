import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className='bg-rose h-32 p-4 flex flex-row justify-center items-center'>
        <ul className='flex flex-row text-white'>
            <li className='mr-4'>
                <Link className=" text-white px-6 py-3 
                  hover:text-rouge hover:scale-105 hover:shadow-2xl 
                  transition-all duration-300 ease-in-out cursor-pointer" href="/contact">
                    Contact
                </Link>
            </li>
            <li className='mr-4'>
                <Link href="/mention-legal">
                    Mentions légales
                </Link>
            </li>
            <li className=''>
                <Link href="/a-propos">
                    A propos
                </Link>
            </li>
        </ul>
    </div>
  )
}
