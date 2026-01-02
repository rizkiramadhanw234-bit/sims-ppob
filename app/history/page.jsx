"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import UserHeader from "../../components/userHeader";
import Image from "next/image";
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
        <UserHeader />
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
