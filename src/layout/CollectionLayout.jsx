import React from 'react'
import { Outlet } from 'react-router-dom'

export const CollectionLayout = () => {
  return (
    <div>
      <main className="flex justify-center">
        <div className="w-full max-w-[76.25rem]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
