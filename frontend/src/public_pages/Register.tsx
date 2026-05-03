import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BUILT_IN_API_URLS, REGISTER_FIELDS } from "../constants";

export default function Register() {
    const [form, setForm] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (id: string, value: string) => {
      setForm((prev) => ({
        ...prev,
        [id]: value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      setLoading(true);
      setError("");
      setSuccess(false);

      try {
        await axios.post(BUILT_IN_API_URLS.register, form);

        setSuccess(true);
        setForm({}); // optional: clear form
      } catch (err: any) {
        setError(err?.response?.data?.message || "Registration failed");
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
          w-full max-w-2xl space-y-6
          bg-white/80 dark:bg-zinc-900/80
          backdrop-blur-xl
          border border-zinc-200/70 dark:border-zinc-800/60
          rounded-2xl p-8 shadow-xl
        ">

          {/* Back */}
          <Link
            to="/login"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
          >
            ← Back to Login
          </Link>

          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
              Create account
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Fill in your details
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {REGISTER_FIELDS.map((field) => (
                <div key={field.id} className="space-y-1">

                  <label className="text-sm text-zinc-600 dark:text-zinc-400">
                    {field.label}
                  </label>

                  <input
                    type={field.type}
                    value={form[field.id] || ""}
                    required={field.required}
                    minLength={field.minLength}
                    maxLength={field.maxLength}
                    pattern={field.pattern}
                    placeholder={field.placeholder}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="
                      w-full px-3 py-2 rounded-md
                      border border-zinc-300/70 dark:border-zinc-700/60
                      bg-white/70 dark:bg-zinc-800/50
                      text-zinc-900 dark:text-zinc-100
                      placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                      focus:outline-none
                      focus:ring-2 focus:ring-zinc-400/30 dark:focus:ring-zinc-600/40
                      transition
                    "
                  />

                </div>
              ))}

            </div>

            {/* Error */}
            {error && (
              <div className="
                text-center
                text-sm px-3 py-2 rounded-md
                bg-red-50 dark:bg-red-950/40
                text-red-600 dark:text-red-400
                border border-red-200/60 dark:border-red-900/40
              ">
                {error}
              </div>
            )}

            {success && (
              <div className="
                text-center px-4 py-3 rounded-md
                bg-emerald-50 dark:bg-emerald-950/40
                border border-emerald-200/60 dark:border-emerald-900/40
                text-emerald-700 dark:text-emerald-300
              ">
                Account created successfully 🎉
                <div className="mt-2">
                  <Link
                    to="/login"
                    className="text-sm underline hover:opacity-80"
                  >
                    Go to login
                  </Link>
                </div>
              </div>
            )}

            {/* Submit */}
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
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-zinc-500 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-zinc-800 dark:text-zinc-200 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
  );
}