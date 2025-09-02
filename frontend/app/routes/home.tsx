import { Link } from "react-router";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <p>Welcome to AI Flashcard Generator.</p>
            <div className="flex gap-4">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}