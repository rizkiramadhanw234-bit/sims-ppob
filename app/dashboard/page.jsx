"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import UserHeader from "../../components/userHeader";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchProfile } from "../../redux/profileSlice";
import { fetchBalance } from "../../redux/balanceSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../../redux/servicesSlice";
import { fetchBanner } from "../../redux/bannerSlice";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile.data);
  const loadingProfile = useSelector((state) => state.profile.loading);

  const services = useSelector((state) => state.services.data);
  const loadingServices = useSelector((state) => state.services.loading);

  const banner = useSelector((state) => state.banner.data);
  const loadingBanner = useSelector((state) => state.banner.loading);

  // redirect
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  // redux fetch
  React.useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
    dispatch(fetchServices());
    dispatch(fetchBanner());
  }, [dispatch]);

  if (loadingProfile || !profile)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-white min-h-screen mb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4">
        <UserHeader />

        {/* SERVICES */}
        <div className="mt-6 w-full">
          {loadingServices ? (
            <p className="text-center">Loading services...</p>
          ) : (
            <div
              className="
              grid 
              grid-cols-3 
              sm:grid-cols-4 
              md:grid-cols-6 
              gap-6 
              justify-center items-center
            "
            >
              {services.map((item, index) => (
                <Link
                  key={index}
                  href={`/pembayaran?code=${item.service_code}`}
                  className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition"
                >
                  <Image
                    src={item.service_icon}
                    alt={item.service_name}
                    width={50}
                    height={50}
                  />
                  <p className="text-black text-sm text-center">
                    {item.service_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Rp {item.service_tariff}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* PROMO */}
        <div className="mt-10">
          <h1 className="text-base font-semibold">Temukan Promo Menarik</h1>

          {/* Banner */}
          <div className="flex gap-6 mt-5 overflow-x-auto pb-4 no-scrollbar">
            {loadingBanner ? (
              <p>Loading banner...</p>
            ) : (
              banner.map((item, index) => (
                <div key={index} className="shrink-0 w-64 sm:w-72">
                  <Image
                    src={item.banner_image}
                    alt={item.banner_name}
                    width={320}
                    height={160}
                    className="rounded-lg w-full"
                  />
                  <p className="text-sm font-semibold mt-2">
                    {item.banner_name}
                  </p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
