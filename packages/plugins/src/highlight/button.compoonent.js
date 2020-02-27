import React from 'react'

export default function Button ({ children, onClick }) {
  return <div
    className="p-2 m-1 text-white bg-gray-dark rounded flex justify-center items-center text-sm hover:bg-blue-active cursor-pointer transition-bg-color relative"
    onClick={onClick}>
    {children}
  </div>
}
