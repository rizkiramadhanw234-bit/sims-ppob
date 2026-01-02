"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import Avatar from "../../assets/avatar/Profile Photo.png";
import BgSaldo from "../../assets/images/Background Saldo.png";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionHistory } from "../../redux/historySlice";
import { fetchProfile } from "../../redux/profileSlice";
import { fetchBalance } from "../../redux/balanceSlice";
import { toggleBalance } from "../../redux/uiSlice";

export default function HistoryPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [offset, setOffset] = React.useState(0);
  const limit = 3;

  //   Profile
  const profile = useSelector((state) => state.profile.data);
  const loading = useSelector((state) => state.profile.loading);

  //   Balance
  const balance = useSelector((state) => state.balance.data);
  const loadingBalance = useSelector((state) => state.balance.loading);

  const showBalance = useSelector((state) => state.ui.showBalance);

  //   History
  const history = useSelector((state) => state.history.records || []);
  const historyLoading = useSelector((state) => state.history.loading);

  // redirect if not login
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  // fetch profile, balance
  React.useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  // fetch history
  React.useEffect(() => {
    dispatch(fetchTransactionHistory({ offset: 0, limit }));
    setOffset(limit);
  }, [dispatch]);

  const fetchMoreHistory = () => {
    dispatch(fetchTransactionHistory({ offset, limit }));
    setOffset((prevOffset) => prevOffset + limit);
  };

  if (loading || !profile)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-white min-h-screen mb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-6 mx-auto px-6 py-4">
          {/* avatar */}
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

          {/* SALDO */}
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

        {/* TRANSACTION HISTORY */}
        <div className="mt-10 ml-10 max-w-7xl mx-auto px-6 py-4">
          <h2 className="text-lg font-bold mb-4">Semua Transaksi</h2>
          {historyLoading ? (
            <p>Loading...</p>
          ) : history.length === 0 ? (
            <p>Tidak ada transaksi</p>
          ) : (
            <div className="flex flex-col gap-4">
              {history.map((item) => (
                <div
                  key={item.invoice_number}
                  className="flex justify-between items-center border rounded p-4"
                >
                  <div className="flex flex-col">
                    <span
                      className={`font-semibold ${
                        item.transaction_type === "TOPUP"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.transaction_type === "TOPUP" ? "+" : "-"} Rp{" "}
                      {item.total_amount.toLocaleString("id-ID")}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(item.created_on).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          )}
          {history.length >= limit && (
            <p
              className="text-red-500 text-sm mt-4 cursor-pointer"
              onClick={fetchMoreHistory}
            >
              Show more
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
