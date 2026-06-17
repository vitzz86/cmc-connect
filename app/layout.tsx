import type { Metadata } from "next";
import { FlowProvider } from "./lib/flow-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "CMC Connect",
  description: "AI-powered partner and supplier matchmaking for CEO Masterclass champions."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <FlowProvider>{children}</FlowProvider>
      </body>
    </html>
  );
}
