"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-950 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Garmin Tracker
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/how-to-use" className="hover:text-gray-400 transition">
              Cómo funciona
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-400 transition">
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
