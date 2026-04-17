import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HerbaMed Pro — Advanced Homeopathic Clinic Suite',
  description: 'Production-grade homeopathic clinic management system',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* Original CSS loaded as static file — bypasses PostCSS, zero modification */}
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
