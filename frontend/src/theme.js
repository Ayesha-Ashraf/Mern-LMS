// import { createTheme } from '@mui/material/styles';
import { green, grey, lightGreen } from '@mui/material/colors';

// export const theme = createTheme({
//     palette: {
//         primary: {
//             main: blue[500]
//         },
//         secondary: {
//             main: lightBlue[800],
//             midNightBlue: "#003366"
//         }
//     }
// });

export const themeColors = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: green[500],
                    white: "#fff"
                },
                secondary: {
                    main: lightGreen[500],
                   green : "#1b5e20"
                },
            }
            : {
                // palette values for dark mode
                primary: {
                    main: "#1b5e20",
                    white: "#1b5e20"
                },
                secondary: {
                    main: green[500],
                    green: "#2e7d32"
                },
                background: {
                    default: "#1e1e1e",
                },
                text: {
                    primary: '#fff',
                    secondary: grey[500],
                },
            }),
    },
});