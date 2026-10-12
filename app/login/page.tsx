"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, LockKeyhole, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      return setError("Email and password are required.");
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return setError("Enter a valid email address.");
    }

    // Password validation
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(password)
    ) {
      return setError(
        "Use uppercase, lowercase, a number, a special character and 6+ characters.",
      );
    }

    // Mock login
    sessionStorage.setItem("loggedIn", "true");
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <section className="flex min-h-[35vh] flex-col items-center justify-center bg-indigo-600 px-8 py-10 text-center text-white md:min-h-screen md:w-1/2">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Welcome to BankFlow
        </h1>
        <p className="max-w-md text-lg leading-8">
          A simple demo dashboard for managing fictional accounts and
          transactions.
        </p>
      </section>
      <section className="flex flex-1 items-center justify-center bg-gray-100 px-5 py-10">
        <form
          onSubmit={login}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
        >
          <h2 className="mb-2 text-center text-3xl font-bold">Login</h2>
          <p className="mb-7 text-center text-sm text-gray-500">
            Mock authentication for assignment use only.
          </p>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="mb-5 flex items-center gap-3 rounded-lg border p-3 focus-within:border-indigo-500">
            <Mail size={20} className="text-gray-500" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@example.com"
              className="w-full outline-none"
              autoComplete="off"
            />
          </div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>
          <div className="mb-5 flex items-center gap-3 rounded-lg border p-3 focus-within:border-indigo-500">
            <LockKeyhole size={20} className="text-gray-500" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter demo password"
              className="w-full min-w-0 outline-none"
              autoComplete="current-password"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="shrink-0 text-gray-500 hover:text-indigo-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error && (
            <p
              role="alert"
              className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 p-3 font-semibold text-white hover:bg-indigo-700">
            Login <ArrowRight size={18} />
          </button>
          <p className="mt-4 text-center text-xs text-gray-500">
            Any valid-format email and password meeting the rules will work. No
            real banking credentials are needed.
          </p>
        </form>
      </section>
    </main>
  );
}
