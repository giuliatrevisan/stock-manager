import { useState } from "react";
import { AuthBanner } from "./components/AuthBanner";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="h-screen flex">
      <AuthBanner />

      <div className="flex w-full md:w-1/2 items-center justify-center bg-white px-6">
        {mode === "login" ? (
          <LoginForm onSwitch={() => setMode("register")} />
        ) : (
          <RegisterForm onSwitch={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}