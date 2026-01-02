import "./globals.css";
import ReduxProvider from "../app/reduxProvider";

export const metadata = {
  title: "SIMS PPOB-[MUHAMMAD RIZKI RAMADHAN]",
  description: "Sistem Informasi Manajemen SIMS PPOB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
