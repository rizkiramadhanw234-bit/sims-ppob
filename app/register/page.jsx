"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  clearError,
  clearRegisterSuccess,
} from "../../redux/authSlice";
import BannerLogin from "../../assets/images/Illustrasi Login.png";
import Logo from "../../assets/images/Logo.png";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { loading, error, registerSuccess, isLogin } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = React.useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearRegisterSuccess());
    };
  }, [dispatch]);

  useEffect(() => {
    if (registerSuccess) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [registerSuccess, router]);

  useEffect(() => {
    if (isLogin) {
      router.push("/dashboard");
    }
  }, [isLogin, router]);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Client side validation
    const validationErrors = [];

    if (formData.password !== formData.confirmPassword) {
      validationErrors.push("Password tidak sama");
    }

    if (formData.password.length < 8) {
      validationErrors.push("Password minimal 8 karakter");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      validationErrors.push("Format email tidak valid");
    }

    if (validationErrors.length > 0) {
      dispatch(clearError());

      alert(validationErrors[0]);
      return;
    }

    dispatch(registerUser(formData));
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

            {/* Show success message */}
            {registerSuccess && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded w-full text-center">
                Registrasi berhasil! Mengarahkan ke halaman login...
              </div>
            )}

            {/* form login */}
            <div className="w-100">
              <form onSubmit={handleRegister}>
                {/* Show error from Redux */}
                {error && (
                  <p className="text-red-600 font-semibold mb-3 text-base text-center">
                    {error}
                  </p>
                )}

                {/* Email */}
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
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Nama Depan*/}
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    id="first_name"
                    placeholder="Masukan Nama Depan"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Nama Belakang */}
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    id="last_name"
                    placeholder="Masukan Nama Belakang"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password*/}
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
                    placeholder="Buat password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Konfirmasi Password*/}
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    id="confirmPassword"
                    type="password"
                    placeholder="Konfirmasi password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* button login */}
                <button
                  disabled={loading}
                  className={`${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-700"
                  } text-white font-bold py-2 px-4 rounded mt-5 w-full transition-colors`}
                  type="submit"
                >
                  {loading ? "Loading..." : "Registrasi"}
                </button>
              </form>
            </div>

            {/* register */}
            <div className="mt-5">
              <p>
                Sudah Punya akun? login{" "}
                <span className="text-red-500 font-bold hover:underline cursor-pointer">
                  <Link href="/login">di sini</Link>
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
