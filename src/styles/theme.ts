import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: [
      'New Atten, New Atten bold, New Atten extraBold, sans-serif'
    ].join(',')
  },
  palette: {
    primary: {
      main: '#556cd6'
    },
    success: {
      main: '#06AB31'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: '#CF1317'
    }
  }
})

export default theme
