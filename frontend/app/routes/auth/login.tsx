import LoginForm from "@features/auth/components/Loginform";

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center h-full border">
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}