import React from 'react'

import { createTheme, MantineProvider } from "@mantine/core";
import { SessionProvider } from 'next-auth/react';
import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';

const theme = createTheme({
  /** Put your mantine theme override here */
});


type Props = {
  children: React.ReactNode;
}

export default async function Providers({ children, ...props }: Props) {

  const session = await auth()
  

  if (!session?.user) await signIn()
  
  return (
    <MantineProvider theme={theme}>
      <SessionProvider session={session}>
        {/* <pre>
          {JSON.stringify(session, null, 2)}
        </pre> */}
        
        {children}
      </SessionProvider>
    </MantineProvider>
  );
}