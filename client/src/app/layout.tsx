import './globals.css'; 
import 'remixicon/fonts/remixicon.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DropSafe',
  description: 'Secure File Storage System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
