import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
  title: 'PPDB SDIT Cahaya Ilmu 2026/2027',
  description: 'Sekolah Islam Terpadu modern dengan program Tahfidz Qur’an, teknologi, dan karakter Islami.',
  metadataBase: new URL('https://ppdb.sditcahayailmu.sch.id'),
  openGraph: {
    title: 'PPDB SDIT Cahaya Ilmu',
    description: 'Penerimaan Peserta Didik Baru SDIT Cahaya Ilmu.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
