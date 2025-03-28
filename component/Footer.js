import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className='bg-blackL h-32 p-4 flex flex-row justify-center items-center'>
        <ul className='flex flex-row text-white'>
            <li className='mr-4'>
                <Link href="/contact">
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
