import { useEffect, useState } from "react";
import axios from "axios";
import { BUILT_IN_API_URLS, REGISTER_FIELDS } from "../constants";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  birth_date: string;
  email: string;
};

const formatDate = (date?: string) => {
  if (!date) return "";
  return date.split("T")[0];
};

const validatePassword = (password: string): string | null => {
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number";
  if (!/[^A-Za-z0-9]/.test(password)) return "Password must contain at least one special character";
  return null;
};

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.5-4.166M6.5 6.5A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.966 9.966 0 01-1.98 3.462M3 3l18 18" />
    </svg>
  );

// Wrapper for password inputs with eye toggle
const PasswordInput = ({
  placeholder,
  value,
  disabled,
  onChange,
  inputClass,
}: {
  placeholder: string;
  value: string;
  disabled: boolean;
  onChange: (v: string) => void;
  inputClass: (disabled: boolean) => string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass(disabled)} pr-10`}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        disabled={disabled}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer disabled:cursor-not-allowed transition"
        tabIndex={-1}
      >
        <EyeIcon open={show} />
      </button>
    </div>
  );
};

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  const [isSavingInfo, setIsSavingInfo] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const [infoMessage, setInfoMessage] = useState<{ type: "success" | "error" | null; text: string }>({
    type: null,
    text: "",
  });

  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error" | null; text: string }>({
    type: null,
    text: "",
  });

  const [deleteMessage, setDeleteMessage] = useState<{ type: "success" | "error" | null; text: string }>({
    type: null,
    text: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [deletePassword, setDeletePassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          BUILT_IN_API_URLS.getUserData,
          { withCredentials: true }
        );

        const userData = res.data.user;

        const normalized = {
          ...userData,
          birth_date: formatDate(userData.birth_date),
        };

        setUser(normalized);
        setForm(normalized);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <Loading />;

  if (!user) {
    navigate("/");
    return null;
  }

  const profileFields = REGISTER_FIELDS.filter(
    (f) => f.id !== "password" && f.id !== "confirm_password"
  );

  const showInfoMessage = (type: "success" | "error", text: string) => {
    setInfoMessage({ type, text });
    setTimeout(() => setInfoMessage({ type: null, text: "" }), 3000);
  };

  const showPasswordMessage = (type: "success" | "error", text: string) => {
    setPasswordMessage({ type, text });
    setTimeout(() => setPasswordMessage({ type: null, text: "" }), 3000);
  };

  const showDeleteMessage = (type: "success" | "error", text: string) => {
    setDeleteMessage({ type, text });
    setTimeout(() => setDeleteMessage({ type: null, text: "" }), 3000);
  };

  const handleUpdateInfo = async () => {
    setIsSavingInfo(true);

    try {
      await axios.patch(
        `${BUILT_IN_API_URLS.updateUserData}/${user.id}`,
        form,
        { withCredentials: true }
      );

      showInfoMessage("success", "Profile updated successfully");
    } catch (err: any) {
      const reason = err?.response?.data?.message || "Failed to update profile";
      showInfoMessage("error", reason);
    } finally {
      setIsSavingInfo(false);
    }
  };

  const handleUpdatePassword = async () => {
    const weakError = validatePassword(passwordForm.new_password);
    if (weakError) {
      showPasswordMessage("error", weakError);
      return;
    }

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      showPasswordMessage("error", "Passwords do not match");
      return;
    }

    setIsSavingPassword(true);

    try {
      await axios.patch(
        BUILT_IN_API_URLS.updatePassword,
        passwordForm,
        { withCredentials: true }
      );

      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

      showPasswordMessage("success", "Password updated successfully");
    } catch (err: any) {
      const reason = err?.response?.data?.message || "Failed to update password";
      showPasswordMessage("error", reason);
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      showDeleteMessage("error", "Please enter your password to confirm");
      return;
    }

    setIsDeletingAccount(true);

    try {
      await axios.delete(
        `${BUILT_IN_API_URLS.deleteUser}/${user.id}`,
        {
          data: { password: deletePassword },
          withCredentials: true,
        }
      );

      navigate("/");
    } catch (err: any) {
      const reason = err?.response?.data?.message || "Failed to delete account";
      showDeleteMessage("error", reason);
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const inputClass = (disabled: boolean) => `
    w-full px-3 py-2 rounded-lg border
    border-neutral-300 dark:border-neutral-600
    text-neutral-900 dark:text-neutral-100
    outline-none transition
    disabled:cursor-not-allowed
    ${
      disabled
        ? "bg-neutral-100 dark:bg-neutral-800 opacity-70"
        : "bg-white dark:bg-neutral-950 focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500 cursor-text"
    }
  `;

  const messageClass = (type: "success" | "error") =>
    `px-4 py-2 rounded-lg text-sm text-center border ${
      type === "success"
        ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
        : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700"
    }`;

  return (
    <div className="p-6 space-y-6 mx-auto">

      {/* ================= PROFILE CARD ================= */}
      <section className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">

        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Account Information</h2>
          <p className="italic text-sm text-neutral-500 dark:text-neutral-400">Email / Username cannot be changed upon account creation.</p>
        </div>

        <div className="p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileFields.map((field) => (
              <div key={field.id} className="flex flex-col gap-1">
                <label className="text-sm text-neutral-600 dark:text-neutral-300">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={form[field.id] || ""}
                  readOnly={field.id === "email"}
                  disabled={isSavingInfo}
                  onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                  className={inputClass(isSavingInfo)}
                />
              </div>
            ))}
          </div>

          {infoMessage.type && (
            <div className={`mt-5 ${messageClass(infoMessage.type)}`}>
              {infoMessage.text}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleUpdateInfo}
              disabled={isSavingInfo}
              className={`
                px-5 py-2 rounded-lg transition
                bg-neutral-900 text-white
                dark:bg-neutral-100 dark:text-neutral-900
                ${isSavingInfo ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 cursor-pointer"}
              `}
            >
              {isSavingInfo ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </section>

      {/* ================= PASSWORD CARD ================= */}
      <section className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">

        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Change Password</h2>
        </div>

        <div className="p-6 space-y-4">

          <PasswordInput
            placeholder="Current Password"
            value={passwordForm.current_password}
            disabled={isSavingPassword}
            onChange={(v) => setPasswordForm({ ...passwordForm, current_password: v })}
            inputClass={inputClass}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PasswordInput
              placeholder="New Password"
              value={passwordForm.new_password}
              disabled={isSavingPassword}
              onChange={(v) => setPasswordForm({ ...passwordForm, new_password: v })}
              inputClass={inputClass}
            />
            <PasswordInput
              placeholder="Confirm Password"
              value={passwordForm.confirm_password}
              disabled={isSavingPassword}
              onChange={(v) => setPasswordForm({ ...passwordForm, confirm_password: v })}
              inputClass={inputClass}
            />
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.
          </p>

          {passwordMessage.type && (
            <div className={messageClass(passwordMessage.type)}>
              {passwordMessage.text}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleUpdatePassword}
              disabled={isSavingPassword}
              className={`
                px-5 py-2 rounded-lg transition
                bg-neutral-900 text-white
                dark:bg-neutral-100 dark:text-neutral-900
                ${isSavingPassword ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 cursor-pointer"}
              `}
            >
              {isSavingPassword ? "Saving..." : "Update Password"}
            </button>
          </div>

        </div>
      </section>

      {/* ================= DELETE ACCOUNT CARD ================= */}
      <section className="rounded-2xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 shadow-sm">

        <div className="p-6 border-b border-neutral-300 dark:border-neutral-600">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">Delete Account</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            This action is permanent and cannot be undone. All your data will be erased.
          </p>
        </div>

        <div className="p-6 space-y-4">

          {!showDeleteConfirm ? (
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-5 py-2 rounded-lg transition cursor-pointer bg-red-600 hover:bg-red-700 text-white"
              >
                Delete My Account
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Enter your password to confirm account deletion:
              </p>

              <PasswordInput
                placeholder="Your password"
                value={deletePassword}
                disabled={isDeletingAccount}
                onChange={(v) => setDeletePassword(v)}
                inputClass={inputClass}
              />

              {deleteMessage.type && (
                <div className={messageClass(deleteMessage.type)}>
                  {deleteMessage.text}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeletePassword("");
                    setDeleteMessage({ type: null, text: "" });
                  }}
                  disabled={isDeletingAccount}
                  className={`
                    px-5 py-2 rounded-lg transition
                    border border-neutral-300 dark:border-neutral-600
                    text-neutral-700 dark:text-neutral-300
                    bg-white dark:bg-neutral-900
                    ${isDeletingAccount ? "opacity-50 cursor-not-allowed" : "hover:opacity-80 cursor-pointer"}
                  `}
                >
                  Cancel
                </button>

                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeletingAccount}
                  className={`
                    px-5 py-2 rounded-lg transition text-white bg-red-600
                    ${isDeletingAccount ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700 cursor-pointer"}
                  `}
                >
                  {isDeletingAccount ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </>
          )}

        </div>
      </section>

    </div>
  );
}