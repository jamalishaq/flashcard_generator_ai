import RegisterForm from "@features/auth/components/RegisterForm";

export default function Register() {
    return (
        <div className="flex flex-col items-center justify-center h-full border">
            <h1>Register</h1>
            <RegisterForm />
        </div>
    )
}