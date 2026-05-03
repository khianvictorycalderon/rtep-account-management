import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BUILT_IN_API_URLS } from "../constants";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(BUILT_IN_API_URLS.login, {
        email,
        password,
      });

      console.log("Login success:", response.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      min-h-screen w-full flex items-center justify-center px-6
      bg-linear-to-br
      from-zinc-200 via-zinc-100 to-white
      dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
    ">

      {/* Card */}
      <div className="
        w-full max-w-md space-y-6
        rounded-2xl p-8
        border
        border-zinc-200/70 dark:border-zinc-800/60
        bg-white/80 dark:bg-zinc-900/70
        backdrop-blur-xl
        shadow-lg shadow-zinc-200/40 dark:shadow-black/30
      ">

        {/* Back */}
        <Link
          to="/"
          className="
            text-sm inline-flex items-center gap-1
            text-zinc-500 dark:text-zinc-400
            hover:text-zinc-900 dark:hover:text-zinc-100
            transition
          "
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="
            text-3xl font-semibold
            text-zinc-900 dark:text-zinc-100
          ">
            Welcome back
          </h1>
          <p className="
            text-sm
            text-zinc-500 dark:text-zinc-400
          ">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div className="space-y-1">
            <label className="
              text-sm
              text-zinc-600 dark:text-zinc-400
            ">
              Email / Username
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full px-3 py-2 rounded-md
                border
                border-zinc-300/70 dark:border-zinc-700/60
                bg-white/70 dark:bg-zinc-800/50
                text-zinc-900 dark:text-zinc-100
                placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                focus:outline-none
                focus:ring-2 focus:ring-zinc-400/30 dark:focus:ring-zinc-600/40
                transition
              "
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="
              text-sm
              text-zinc-600 dark:text-zinc-400
            ">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full px-3 py-2 rounded-md
                border
                border-zinc-300/70 dark:border-zinc-700/60
                bg-white/70 dark:bg-zinc-800/50
                text-zinc-900 dark:text-zinc-100
                placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                focus:outline-none
                focus:ring-2 focus:ring-zinc-400/30 dark:focus:ring-zinc-600/40
                transition
              "
              placeholder="••••••••"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="
              text-sm px-3 py-2 rounded-md
              bg-red-50 dark:bg-red-950/40
              text-red-600 dark:text-red-400
              border border-red-200/60 dark:border-red-900/40
              text-center
            ">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              cursor-pointer
              w-full py-2 rounded-md
              bg-zinc-900 dark:bg-zinc-100
              text-white dark:text-zinc-900
              hover:bg-zinc-800 dark:hover:bg-zinc-200
              disabled:opacity-50 disabled:cursor-not-allowed
              transition
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="
          text-sm text-center
          text-zinc-500 dark:text-zinc-400
        ">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="
              text-zinc-800 dark:text-zinc-200
              hover:underline
              transition
            "
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}