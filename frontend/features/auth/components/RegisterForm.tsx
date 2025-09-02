import React, { useState } from 'react';
import { redirect } from "react-router";
import { AxiosError } from "axios";
import useAuth from '../hooks/useAuth';

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { registerUser } = useAuth()
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        redirect("/login");
        setMessage("Registration successful")
        try {
            await registerUser({ email, password });
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 500) {
                    setMessage(err.response?.statusText);
                } else if (err.response?.status === 400) {
                    console.log(err)
                    setMessage(err.response?.data?.detail || "Registration failed");
                } else {
                    setMessage("An unexpected error occurred");
                }
            } else {
                setMessage("An unexpected error occurred");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border border-gray-600 flex flex-col gap-4 p-4 mt-4">
            <div>
                <label htmlFor="email" className="block mb-2">Email:</label>
                <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-400 focus:outline-none px-2 py-1" />
            </div>

            <div>
                <label htmlFor="password" className="block mb-2">Password:</label>
                <input type="text" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-400 focus:outline-none px-2 py-1" />
            </div>

            {message && <p>{message}</p>}
            <button className="cursor-pointer">Submit</button>
        </form>
    )
}