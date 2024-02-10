import React from 'react';
import { MantineProvider } from '@mantine/core';
import { theme } from '../src/theme';

import type { Preview } from '@storybook/react'
// core styles are required for all packages
import '@mantine/core/styles.css';
// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <MantineProvider theme={theme}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        {/* <Story /> */}
        {Story()}
      </MantineProvider>
    ),
  ],
};

export default preview;