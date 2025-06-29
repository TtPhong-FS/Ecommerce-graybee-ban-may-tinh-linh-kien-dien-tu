import { Outlet } from 'react-router-dom'

export const CollectionLayout = () => {
  return (
    <div>
      <main className="flex justify-center">
        <div className="w-full max-w-[74rem]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
