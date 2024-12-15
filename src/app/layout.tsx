import { StoreProvider } from "@/Providers/StoreProvider";
import "./globals.css";
import { DnDProvider } from "@/Providers/DnDProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <DnDProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </DnDProvider>
    </StoreProvider>
  );
}
