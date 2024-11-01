"use client";
import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import "./assets/styles/button.css";
import "./assets/styles/globals.css";
import "./assets/styles/library.css"
import { AuthProvider } from "./provider";
import ClippedDrawer from "./components/drawer";
import { RecoilRoot } from "recoil";
import { useRecoilValue } from "recoil";
import { drawerState } from "./store/drawerState";
import { useSession } from "next-auth/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function LayoutContent({ children }) {
  const isOpen = useRecoilValue(drawerState);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("qq", session, status);
    if (status === "loading") return;
    if (!session) router.replace("/login");

  }, [session, status, router]);

  return (
    <div>
      {!session ? null : <ClippedDrawer />}
      {/* <ClippedDrawer /> */}
      <div style={{ marginLeft: isOpen ? 270 : 25, marginRight: 25 }}>
        {children}
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
          </AuthProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
