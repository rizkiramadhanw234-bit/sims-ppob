import { Suspense } from "react";
import PembayaranClient from "./pembayaranClient";

export default function PembayaranPage() {
  return (
    <Suspense
      fallback={<div className="text-center mt-10">Loading Pembayaran...</div>}
    >
      <PembayaranClient />
    </Suspense>
  );
}
