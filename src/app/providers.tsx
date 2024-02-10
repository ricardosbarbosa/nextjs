import React from 'react'

import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

type Props = {
  children: React.ReactNode;
}

export default function Providers({children}: Props) {
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
}