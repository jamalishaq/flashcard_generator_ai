import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
        <header className="border-b border-gray-700 p-4">
          <h1>Flashcard Generator</h1>
        </header>
        <main className="flex-grow">
            <Outlet />
        </main>
        <footer className="border-t w-full flex justify-center border-gray-700 p-4">
          <p>Developed by Jamal Ishaq. Copyright, 2025</p>
        </footer>
    </div>
  )
}

export default MainLayout