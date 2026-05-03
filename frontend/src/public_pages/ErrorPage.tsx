export default function ErrorPage() {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-200 px-6">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-200">
          Page not found
        </h2>

        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <a
            href="/"
            className="cursor-pointer px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white dark:text-white transition font-medium shadow-lg shadow-indigo-500/20"
          >
            Go Home
          </a>

          <button
            onClick={handleBack}
            className="cursor-pointer px-6 py-3 rounded-xl bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 transition font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}