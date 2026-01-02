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
    <>
      <div className="bg-white min-h-screen flex">
        <div className="flex flex-wrap gap-25 items-center justify-center max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col items-center justify-center">
            {/* logo */}
            <div className="mb-7 flex gap-4 items-center justify-center">
              <Image src={Logo} alt="logo" className="w-10" />
              <h1 className="font-bold text-2xl">SIMS PPOB</h1>
            </div>
            <div className="mb-10 w-100 text-center">
              <p className="text-2xl font-bold">
                Masuk atau buat akun untuk memulai
              </p>
            </div>
            {/* form login */}
            <div className="w-full">
              <form onSubmit={handleLogin}>
                {/* error */}
                {errMessage && (
                  <p className="text-red-600 font-semibold mb-3 text-base text-center">
                    {errMessage}
                  </p>
                )}
                {/* Email Input */}
                <div className="mb-7 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    id="email"
                    type="email"
                    placeholder="Masukan Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {/* Password Input */}
                <div className="mb-6 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    id="password"
                    type="password"
                    placeholder="Masukan Password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {/* button login */}
                <button
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-5 w-100 cursor-pointer"
                  type="submit"
                >
                  {loading ? "loading..." : "Masuk"}
                </button>
              </form>
            </div>

            {/* register */}
            <div className="mt-5">
              <p>
                Belum punya akun? registrasi{" "}
                <span className="text-red-500 font-bold hover:underline cursor-pointer">
                  <Link href="/register">di sini</Link>
                </span>
              </p>
            </div>
          </div>
          {/* image banner */}
          <div className="">
            <Image src={BannerLogin} alt="banner" className="w-120" />
          </div>
        </div>
      </div>
    </>
  );
}
