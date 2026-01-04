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
        <div className="max-w-7xl mx-auto">
          <UserHeader />
          {/* TOP UP FORM */}
          <div className="mt-10 flex flex-wrap mx-auto px-6 py-4">
            <div className="flex flex-col items-start justify-center">
              <p className="text-base">Silahkan Masukan</p>
              <h1 className="text-xl font-bold">Nominal Top Up Saldo</h1>

              <div className="mt-5 w-170">
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

            {/* PRESET BUTTONS */}
            <div className="grid grid-cols-3 items-start gap-6 mx-auto px-6 py-4 mt-20">
              {[10000, 20000, 50000, 100000, 250000, 500000].map((nominal) => (
                <div
                  key={nominal}
                  onClick={() => setAmount(nominal)}
                  className="px-4 py-2 bg-gray-100 rounded sm cursor-pointer hover:bg-gray-200 hover:scale-105 transition duration-150"
                >
                  <h1>Rp. {nominal.toLocaleString("id-ID")}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
