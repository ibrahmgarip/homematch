import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { BottomNav } from '@/components/layout/bottom-nav';

export const metadata: Metadata = {
  title: 'HomeMatch Hub',
  description: 'Encuentra tu piso ideal y haz match con compañeros afines.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <div className="flex min-h-screen flex-col pb-16 md:pb-0">
                <Header />
                <main className="flex-grow">{children}</main>
              </div>
              <Toaster />
              <BottomNav />
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
