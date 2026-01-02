"use client";

import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import UserHeader from "../../components/userHeader";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/profileSlice";
import { fetchBalance } from "../../redux/balanceSlice";
import { fetchServices } from "../../redux/servicesSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { doPembayaran, resetPaymentStatus } from "../../redux/pembayaranSlice";

export default function Pembayaran() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const serviceCode = searchParams.get("code");

  // Profile
  const profile = useSelector((state) => state.profile.data);
  const loadingProfile = useSelector((state) => state.profile.loading);

  // Services
  const services = useSelector((state) => state.services.data);
  const loadingServices = useSelector((state) => state.services.loading);

  // Pembayaran
  const pembayaranLoading = useSelector((state) => state.pembayaran.loading);
  const pembayaranSuccess = useSelector((state) => state.pembayaran.success);
  const pembayaranError = useSelector((state) => state.pembayaran.error);

  const [customerNumber, setCustomerNumber] = useState("");

  // Memo selected service
  const selectedService = useMemo(() => {
    return services?.find((s) => s.service_code === serviceCode);
  }, [services, serviceCode]);

  // Redirect if not logged in
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [router]);

  // Fetch profile, balance, services
  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
    dispatch(fetchServices());
  }, [dispatch]);

  // guard
  useEffect(() => {
    if (!loadingServices && services?.length > 0 && !selectedService) {
      router.replace("/dashboard");
    }
  }, [services, selectedService, loadingServices, router]);

  // Handle pembayaran success
  useEffect(() => {
    if (pembayaranSuccess) {
      alert("Pembayaran berhasil");
      dispatch(resetPaymentStatus());
      router.replace("/dashboard");
    }
  }, [pembayaranSuccess, dispatch, router]);

  // Handle pembayaran error
  useEffect(() => {
    if (pembayaranError) {
      alert(pembayaranError.message || "Pembayaran gagal");
      dispatch(resetPaymentStatus());
    }
  }, [pembayaranError, dispatch]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!serviceCode) {
      alert("Service tidak valid");
      return;
    }

    if (!customerNumber.trim()) {
      alert("Nomor pelanggan tidak boleh kosong");
      return;
    }

    dispatch(
      doPembayaran({
        service_code: serviceCode,
        customer_id: customerNumber,
      })
    );
  };

  if (loadingProfile || !profile)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-white min-h-screen mb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <UserHeader />

        {/* Title */}
        <div className="mt-10 ml-10 flex flex-col items-start justify-center max-w-7xl mx-auto px-6 py-4">
          <p className="text-base">Pembayaran</p>

          {selectedService ? (
            <h1 className="mt-2 flex items-center gap-3">
              <Image
                src={selectedService.service_icon}
                alt={selectedService.service_name}
                width={32}
                height={32}
              />
              <span className="font-bold text-xl">
                {selectedService.service_name}
              </span>
            </h1>
          ) : (
            <h1 className="mt-2 flex items-center gap-3">Loading...</h1>
          )}

          {selectedService && (
            <p className="text-gray-600 text-sm mt-2">
              Tarif:{" "}
              <span className="font-semibold text-black">
                Rp {selectedService.service_tariff.toLocaleString("id-ID")}
              </span>
            </p>
          )}
        </div>

        {/* Form Pembayaran */}
        <form
          onSubmit={handleSubmit}
          className="ml-10 flex flex-col items-start justify-center max-w-7xl mx-auto px-6 py-4"
        >
          <input
            className="w-full mb-6 shadow border rounded py-2 px-3"
            type="text"
            placeholder="Masukan Nomor Pelanggan"
            value={customerNumber}
            onChange={(e) => setCustomerNumber(e.target.value)}
          />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full flex justify-center items-center gap-2"
            type="submit"
            disabled={pembayaranLoading}
          >
            {pembayaranLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Memproses...</span>
              </>
            ) : (
              "Bayar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
