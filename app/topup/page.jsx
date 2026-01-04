"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import UserHeader from "../../components/userHeader";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../../redux/profileSlice";
import { fetchBalance } from "../../redux/balanceSlice";
import { doTopup, resetStatus } from "../../redux/topUpSlice";

export default function TopUp() {
  const router = useRouter();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile.data);
  const loading = useSelector((state) => state.profile.loading);

  const topupLoading = useSelector((state) => state.topup.loading);
  const topupSuccess = useSelector((state) => state.topup.success);

  const [amount, setAmount] = React.useState("");

  // redirect
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  // fetch saldo
  React.useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  // fetch profile
  React.useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // sukses topup
  React.useEffect(() => {
    if (topupSuccess) {
      alert("Top Up Berhasil!");
      router.push("/dashboard");

      dispatch(fetchBalance());
      setAmount("");

      dispatch(resetStatus());
    }
  }, [topupSuccess]);

  const handleTopup = () => {
    if (!amount || Number(amount) <= 0)
      return alert("Nominal topup harus diisi!");

    dispatch(doTopup(Number(amount)));
  };

  if (loading || !profile)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <div className="bg-white min-h-screen">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4">
          <UserHeader />

          <div className="mt-10 flex flex-col md:flex-row md:justify-between gap-10">
            {/* FORM TOPUP */}
            <div className="flex flex-col items-start md:w-1/2">
              <p className="text-base">Silahkan Masukan</p>
              <h1 className="text-xl font-bold">Nominal Top Up Saldo</h1>

              <div className="mt-5 w-full md:w-150">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Masukkan nominal Top Up"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                />

                <button
                  onClick={handleTopup}
                  disabled={topupLoading}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-5 w-full cursor-pointer"
                >
                  {topupLoading ? "Processing..." : "Top Up"}
                </button>
              </div>
            </div>

            {/* NOMINAL BUTTONS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:mt-15 gap-4 md:w-1/2 h-fit">
              {[10000, 20000, 50000, 100000, 250000, 500000].map((nominal) => (
                <div
                  key={nominal}
                  onClick={() => setAmount(nominal)}
                  className="px-4 py-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 hover:scale-105 transition text-center"
                >
                  <h1 className="font-semibold text-sm sm:text-base">
                    Rp {nominal.toLocaleString("id-ID")}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
