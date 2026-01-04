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
      <div className="bg-white min-h-screen flex items-center justify-center px-4">
        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full gap-10 md:gap-20 py-10">
          {/* LEFT - Form */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            {/* logo */}
            <div className="mb-7 flex gap-4 items-center justify-center">
              <Image src={Logo} alt="logo" className="w-10" />
              <h1 className="font-bold text-2xl">SIMS PPOB</h1>
            </div>

            <div className="mb-10 text-center">
              <p className="text-xl md:text-2xl font-bold">
                Masuk atau buat akun untuk memulai
              </p>
            </div>

            {/* success */}
            {registerSuccess && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded w-full max-w-md text-center">
                Registrasi berhasil! Mengarahkan ke halaman login...
              </div>
            )}

            {/* form */}
            <div className="w-full max-w-md">
              <form onSubmit={handleRegister}>
                {error && (
                  <p className="text-red-600 font-semibold mb-3 text-center">
                    {error}
                  </p>
                )}

                {/* Email */}
                <div className="mb-7 relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg
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
                    id="email"
                    type="email"
                    placeholder="Masukan Email Anda"
                    className="shadow border rounded w-full py-2 px-3 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Nama Depan */}
                <div className="mb-6 relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg
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
                    id="first_name"
                    placeholder="Masukan Nama Depan"
                    className="shadow border rounded w-full py-2 px-3 pl-10 text-gray-700 focus:ring-2 focus:ring-red-500"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Nama Belakang */}
                <div className="mb-6 relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg
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
                    id="last_name"
                    placeholder="Masukan Nama Belakang"
                    className="shadow border rounded w-full py-2 px-3 pl-10 text-gray-700 focus:ring-2 focus:ring-red-500"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-6 relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg
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
                    id="password"
                    type="password"
                    placeholder="Buat password"
                    className="shadow border rounded w-full py-2 px-3 pl-10 text-gray-700 focus:ring-2 focus:ring-red-500"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Konfirmasi Password */}
                <div className="mb-6 relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg
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
                    id="confirmPassword"
                    type="password"
                    placeholder="Konfirmasi password"
                    className="shadow border rounded w-full py-2 px-3 pl-10 text-gray-700 focus:ring-2 focus:ring-red-500"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Button */}
                <button
                  disabled={loading}
                  className={`${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-700"
                  } text-white font-bold py-2 rounded w-full mt-5`}
                >
                  {loading ? "Loading..." : "Registrasi"}
                </button>
              </form>
            </div>

            {/* sudah punya akun */}
            <div className="mt-5 text-center">
              <p className="text-sm">
                Sudah punya akun? Login{" "}
                <Link
                  href="/login"
                  className="text-red-500 font-bold hover:underline"
                >
                  di sini
                </Link>
              </p>
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
    </>
  );
}
