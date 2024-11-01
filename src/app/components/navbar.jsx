'use client'
import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function Navbar({session}) {
  return (
    <nav className="bg-[#333] text-white p-5">
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <Link href="/">NEXTAUTH</Link>
                </div>
                <ul className="flex">
                    {!session ? (
                        <li className="mx-3"><Link href="/login">Sign In</Link></li>
                    ) : (
                        <li className="mx-3 hover:underline"><a onClick={() => signOut()} className="bg-red-500 text-white border p-2 rounded-md">Logout</a></li>
                    )}
                </ul>
            </div>
        </div>
    </nav>
  )
}
