import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ColorSchemeScript } from "@mantine/core";


// core styles are required for all packages
// import '@mantine/core/styles.css';

import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <ColorSchemeScript />
      </head>
      <body className={cn(inter.className, 'h-full')}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
