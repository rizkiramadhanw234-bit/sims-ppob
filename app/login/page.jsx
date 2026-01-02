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
            <div className="w-100">
              <form onSubmit={handleLogin}>
                {/* error */}
                {errMessage && (
                  <p className="text-red-600 font-semibold mb-3 text-base text-center">
                    {errMessage}
                  </p>
                )}
                <div className="mb-7">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Masukan Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Masukan Password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
