"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import Avatar from "../../assets/avatar/Profile Photo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateProfileApi,
  updateImage,
} from "../../redux/profileSlice";
import { logout } from "../../redux/authSlice";
import { useRouter } from "next/navigation";

export default function Akun() {
  const dispatch = useDispatch();
  const router = useRouter();
  const profile = useSelector((state) => state.profile.data);
  const loading = useSelector((state) => state.profile.loading);
  const updating = useSelector((state) => state.profile.updating);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  useEffect(() => {
    if (profile) {
      setForm({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
      });

      // Set preview gambar profil
      const isValidProfileImage =
        profile.profile_image &&
        profile.profile_image.trim() !== "" &&
        !profile.profile_image.includes("/null");

      setPreview(isValidProfileImage ? profile.profile_image : null);
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await dispatch(updateProfileApi(form)).unwrap();
      setForm({
        first_name: res.first_name,
        last_name: res.last_name,
        email: res.email,
      });
      setIsEditing(false);
    } catch (err) {
      console.log("Gagal update profile", err);
    }
  };

  const handleSaveAvatar = async () => {
    if (!selectedFile) return;

    try {
      const res = await dispatch(updateImage(selectedFile)).unwrap();

      // Update preview
      setPreview(res.profile_image);
      setSelectedFile(null);

      alert("Foto profil berhasil diupdate!");

      // Refresh profile data
      dispatch(fetchProfile());
    } catch (err) {
      console.log("Gagal upload foto", err);
      alert(`Gagal upload foto: ${err}`);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Silakan pilih file gambar (JPEG, PNG, GIF, dll).");
      e.target.value = "";
      return;
    }

    // Validate file size (max 100kb)
    const maxSize = 100 * 1024;
    if (file.size > maxSize) {
      alert("Ukuran file terlalu besar. Maksimal 100KB.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleCancelAvatar = () => {
    setSelectedFile(null);

    const isValidProfileImage =
      profile.profile_image &&
      profile.profile_image.trim() !== "" &&
      !profile.profile_image.includes("/null");

    setPreview(isValidProfileImage ? profile.profile_image : null);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (loading || !profile)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col items-center gap-5">
          {/* Avatar */}
          <div className="relative">
            <Image
              src={preview || Avatar}
              alt="avatar"
              width={80}
              height={80}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              priority
            />
            {/* Overlay untuk edit */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded-full transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer">
              <label className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <h1 className="font-bold text-xl">
            {profile.first_name} {profile.last_name}
          </h1>

          {/* Label untuk upload */}
          <label className="cursor-pointer text-red-500 hover:text-red-700 font-medium">
            Ubah Foto
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>

          {/* Tombol untuk upload*/}
          {selectedFile && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSaveAvatar}
                disabled={updating}
                className="px-4 py-2 bg-red-700 text-white rounded font-bold hover:bg-red-800 disabled:opacity-50"
              >
                {updating ? "Menyimpan..." : "Simpan Foto"}
              </button>
              <button
                onClick={handleCancelAvatar}
                className="px-4 py-2 bg-gray-300 text-black rounded font-bold cursor-pointer hover:bg-gray-400"
              >
                Batal
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-6 mt-5 max-w-7xl mx-auto px-6 py-4">
          <form className="w-full max-w-md">
            {/* Email */}
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 bg-gray-100 cursor-not-allowed"
                type="email"
                value={form.email}
                disabled
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${
                  isEditing
                    ? "focus:ring-red-500 focus:border-transparent"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
                name="first_name"
                placeholder="Nama Depan"
                value={form.first_name}
                disabled={!isEditing}
                onChange={handleChange}
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${
                  isEditing
                    ? "focus:ring-red-500 focus:border-transparent"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
                name="last_name"
                placeholder="Nama Belakang"
                value={form.last_name}
                disabled={!isEditing}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-3">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full py-2 rounded border border-red-500 text-red-500 font-bold cursor-pointer hover:bg-red-50 transition"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleUpdateProfile}
                  className="w-full py-2 rounded bg-red-700 text-white font-bold cursor-pointer hover:bg-red-800 transition"
                >
                  Simpan
                </button>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2 rounded bg-red-500 text-white font-bold cursor-pointer hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
