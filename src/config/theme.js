import { createTheme } from '@mui/material'

export const Theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1240
    }
  },
  palette: {
    custom: {
      main: '#ffffff',
      secondary: '#0000000a',
      icon: '#242424',
      border: '#4096ff'
    }
  }
})
