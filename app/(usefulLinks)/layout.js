import MainFooter from "@/layouts/main/MainFooter";
import MainHeader from "@/layouts/main/MainHeader";
import DownloadApp from "@/sections/home/DownloadApp";

export default function RootLayout({ children }) {
  return (
    <>
      <MainHeader />
        {children}
      <DownloadApp />
      <MainFooter />
    </>
  );
}
