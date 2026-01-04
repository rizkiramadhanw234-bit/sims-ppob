"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BannerLogin from "../../assets/images/Illustrasi Login.png";
import Logo from "../../assets/images/Logo.png";
import { authApi } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/authSlice";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMessage("");

    try {
      const response = await authApi.login({ email, password });
      const token = response.data.data.token;
      dispatch(setToken(token));

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      router.push("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login gagal";
      setErrMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full gap-10 md:gap-20 py-10">
        {/* LEFT - Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          {/* logo */}
          <div className="mb-6 flex gap-4 items-center">
            <Image src={Logo} alt="logo" className="w-10" />
            <h1 className="font-bold text-xl md:text-2xl">SIMS PPOB</h1>
          </div>

          <div className="mb-8 text-center">
            <p className="text-xl md:text-2xl font-bold">
              Masuk atau buat akun untuk memulai
            </p>
          </div>

          {/* form login */}
          <div className="w-full max-w-md">
            <form onSubmit={handleLogin}>
              {/* error */}
              {errMessage && (
                <p className="text-red-600 font-semibold mb-3 text-center">
                  {errMessage}
                </p>
              )}

              {/* Email */}
              <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  className="shadow border rounded w-full py-2 px-3 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  type="email"
                  placeholder="Masukan Email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  className="shadow border rounded w-full py-2 px-3 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  type="password"
                  placeholder="Masukan Password Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Button */}
              <button
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded w-full transition disabled:bg-red-300"
                type="submit"
              >
                {loading ? "loading..." : "Masuk"}
              </button>
            </form>

            {/* register */}
            <div className="mt-5 text-center">
              <p className="text-sm">
                Belum punya akun? Registrasi {""}
                <Link
                  href="/register"
                  className="text-red-500 font-bold hover:underline"
                >
                  di sini
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT - Banner */}
        <div className="hidden md:block w-1/2">
          <Image
            src={BannerLogin}
            alt="banner"
            className="w-full max-w-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
