"use client";

import React from "react";
import Image from "next/image";
import Avatar from "../assets/avatar/Profile Photo.png";
import BgSaldo from "../assets/images/Background Saldo.png";
import { useSelector, useDispatch } from "react-redux";
import { toggleBalance } from "../redux/uiSlice";

export default function UserHeader() {
  const dispatch = useDispatch();

  // Profile
  const profile = useSelector((state) => state.profile.data);
  const loadingProfile = useSelector((state) => state.profile.loading);

  // Balance
  const balance = useSelector((state) => state.balance.data);
  const loadingBalance = useSelector((state) => state.balance.loading);
  const showBalance = useSelector((state) => state.ui.showBalance);

  if (loadingProfile || !profile)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-wrap gap-6 mx-auto px-6 py-4">
      {/* Avatar */}
      <div className="flex flex-col items-start justify-center max-w-7xl mx-auto px-6 py-4">
        <div>
          <Image
            src={profile.profile_image || Avatar}
            alt="avatar"
            width={80}
            height={80}
            className="w-30 h-30 rounded-full object-cover border-4 border-white shadow-lg mb-2"
          />
        </div>
        <p className="text-base">Selamat Datang,</p>
        <h1 className="font-bold text-xl">
          {profile.first_name} {profile.last_name}
        </h1>
      </div>

      {/* Saldo */}
      <div className="relative flex flex-col items-start justify-center max-w-7xl mx-auto px-6 py-4">
        <div className="relative rounded-xl overflow-hidden">
          <Image
            src={BgSaldo}
            alt="bg-saldo"
            className="w-full h-45 object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col gap-5 justify-center p-6 text-white">
            <p>Saldo anda</p>
            <p className="text-3xl font-bold">
              {loadingBalance
                ? "Loading..."
                : showBalance
                ? `Rp ${balance?.toLocaleString("id-ID")}`
                : "Rp ......"}
            </p>

            <p
              className="cursor-pointer underline text-sm"
              onClick={() => dispatch(toggleBalance())}
            >
              {showBalance ? "Hide saldo" : "Lihat saldo"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
