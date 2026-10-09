
"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "10px",
          fontSize: "13px",
        },
        success: {
          iconTheme: {
            primary: "#15803d",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}