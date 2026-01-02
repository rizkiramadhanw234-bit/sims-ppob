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

  // Profile
  const profile = useSelector((state) => state.profile.data);
  const loadingProfile = useSelector((state) => state.profile.loading);

  const services = useSelector((state) => state.services.data);
  const loadingServices = useSelector((state) => state.services.loading);

  const banner = useSelector((state) => state.banner.data);
  const loadingBanner = useSelector((state) => state.banner.loading);

  // redirect
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  // profile, balance
  React.useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  // services
  React.useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // banner
  React.useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);

  if (loadingProfile || !profile)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <div className="bg-white min-h-screen mb-20">
        <Navbar />
        <div className=" max-w-7xl mx-auto">
          <UserHeader />
          {/* ITEMS MENU */}
          <div className="flex items-center justify-center gap-6 mt-5 max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-center gap-10 px-4 flex-wrap">
              {loadingServices ? (
                <p>Loading services...</p>
              ) : (
                services.map((item, index) => (
                  <Link
                    key={index}
                    href={`/pembayaran?code=${item.service_code}`}
                    className="flex flex-col items-center gap-2 w-24 cursor-pointer hover:scale-105 transition no-underline"
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
                ))
              )}
            </div>
          </div>

          {/* promo menrik */}
          <div className="ml-10 mr-10 mt-10">
            <h1 className="text-base">Temukan Promo Menarik</h1>
            {/* banner */}
            <div className="flex gap-10 mt-5 items-center justify-center">
              {loadingBanner ? (
                <p>Loading banner...</p>
              ) : (
                banner.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <Image
                      src={item.banner_image}
                      alt={item.banner_name}
                      width={300}
                      height={150}
                      className="w-100 rounded-lg"
                    />
                    <p className="text-sm font-semibold">{item.banner_name}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
