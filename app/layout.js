import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "simplebar-react/dist/simplebar.min.css";

import NotistackProvider from "@/components/NotistackProvider";
import MotionLazyContainer from "@/components/animate/MotionLazyContainer";
import { defaultSettings } from "@/config";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { store } from "@/redux/store";
import ThemeProvider from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Providers } from "../redux/provider";
import { UserProvider } from "@/contexts/UserContext"; // Import UserProvider

import { cookies } from "next/headers";

export const metadata = {
  title: "Abroad Inquiry - Your Guide to Study Abroad",
  description:
    "Abroad Inquiry provides aspiring students with reliable information on studying abroad, offering expert guidance on admissions, scholarships, visa services, and document legalization. From applying on your behalf to ensuring a smooth visa process for both students and dependents, we help you achieve your dream of higher education abroad with comprehensive support.",
  openGraph: {
    images: [
      {
        url: "https://www.abroadinquiry.com/_next/static/media/countries-banner.62d3dc78.webp",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  const cookiesValue = cookies()
    .getAll()
    .reduce((acc, cookie) => {
      acc[cookie.name] = cookie.value || defaultSettings[cookie.name];
      return acc;
    }, {});

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <SettingsProvider defaultSettings={cookiesValue}>
            <ThemeProvider>
              <NotistackProvider>
                <MotionLazyContainer>
                  <UserProvider> {/* Wrap children with UserProvider */}
                    <Providers store={store}>{children}</Providers>
                  </UserProvider>
                </MotionLazyContainer>
              </NotistackProvider>
            </ThemeProvider>
          </SettingsProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
