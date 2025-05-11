import _ from "lodash";
import { colors, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { softShadows, strongShadows } from "./shadows";
import typography from "./typography";

const baseOptions = {
  palette: {
    primary: {
      main: "#262424",
    },
    secondary: {
      main: "rgba(38, 36, 36, 0.87)",
    },
    background: {
      main: "#080031",
    },
    text: {
      primary: "#262424",
      secondary: "rgba(0, 0, 0, 0.6)",
    },
  },
  direction: "ltr",
  typography,
  overrides: {
    MuiTable: {
      root: {
        background: "#fff",
      },
    },
    // MuiTableHead: {
    //   root: {
    //     background: "rgb(99 212 241 / 36%)",
    //   },
    // },

    MuiTableHead: {
      root: {
        background: "rgb(99 212 241 / 36%)",
        "&:hover": {
          backgroundColor: "none",
        },
      },
    },
    MuiTableBody: {
      root: {
        background: "rgba(255, 255, 255, 0.04)",
      },
    },
    MuiTableRow: {
      root: {
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        // "&:hover": {
        //   backgroundColor: "#ffffff14",
        // },
        "&:last-child": {
          borderBottom: "none",
        },
      },
    },
    MuiTableCell: {
      head: {
        padding: "18px 14px",
        fontWeight: "400",
        color: "#262424",
        whiteSpace: "pre",
        fontSize: "14px",
      },
      body: {
        color: "rgba(0, 0, 0, 0.87)",
        whiteSpace: "pre",
        fontWeight: "300",
        fontSize: "14px",
      },
      root: {
        // borderBottom: "none",
        padding: "16px 14px",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.12)",
      },
    },
    MuiPickersModal: {
      dialogRoot: {
        background:
          "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%),linear-gradient(0deg, #51ACED, #51ACED)",
      },
    },
    MuiPickersCalendarHeader: {
      // dayLabel: {
      //   color: "#fff",
      // },
      iconButton: {
        padding: "6px",
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        background:
          "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%),linear-gradient(0deg, #51ACED, #51ACED)",
      },
    },
    MuiPickersDay: {
      // day: {
      //   color: "#fff",
      // },
      dayDisabled: {
        color: "#52565c",
      },
    },

    MuiPickersBasePicker: {
      pickerView: {
        backgroundColor: "#fff",
      },
    },
    MuiDialog: {
      paperScrollPaper: {
        Width: 450,
        maxWidth: "100%",
      },
      paper: {
        borderRadius: "10px",
        background: "rgba(255, 255, 255, 1)",
        filter: "none",
      },
      paperWidthSm: {
        maxWidth: "647px !important",
      },
      paperWidthXs: {
        maxWidth: "521px !important",
      },
    },

    MuiDialogActions: {
      root: {
        padding: "20px 18px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      },
    },
    MuiDialogContent: {
      root: {
        padding: "20px 20px 0px",
      },
    },
    MuiInput: {
      underline: {
        "&::before": {
          left: "0",
          right: "0",
          bottom: "0",
          content: '"\\00a0"',
          position: "absolute",
          transition:
            "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          borderBottom: "2px solid rgb(94 207 240)",
          pointerEvents: "none",
        },
      },
    },
    MuiInputBase: {
      input: {
        borderRadius: "10px",
        "&:-webkit-autofill": {
          caretColor: "transparent",
          borderRadius: "inherit",
          WebkitBoxShadow: "0 0 0 100px #ffffff inset",
          WebkitBackgroundClip: "text !important",
          WebkitTextFillColor: "rgba(0, 0, 0, 0.60)",
        },
        "&:-internal-autofill-selected": {
          color: "rgba(0, 0, 0, 0.60)",
        },
      },
    },
    MuiOutlinedInput: {
      input: {
        borderRadius: "10px",
        "&:-webkit-autofill": {
          caretColor: "transparent",
          borderRadius: "inherit",
          WebkitBoxShadow: "0 0 0 100px #ffffff inset",
          WebkitBackgroundClip: "text !important",
          WebkitTextFillColor: "rgba(0, 0, 0, 0.60)",
        },
        "&:-internal-autofill-selected": {
          color: "rgba(0, 0, 0, 0.60)",
        },
      },
    },
    MuiPaper: {
      outlined: {
        padding: "20px",
        width: "100%",
      },
      elevation2: {
        padding: "20px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.16)",
      },
      root: {
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        background: "#fff",
        boxShadow: "0px 0px 32px rgba(129, 23, 147, 0.03)",
      },
    },

    MuiAppBar: {
      colorPrimary: {
        color: "#fff",
        // backgroundColor: "#212226",
      },
      colorDefault: {
        backgroundColor: "none",
      },
    },

    MuiAccordionSummary: {
      root: {
        // background: "#171616",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "15px 15px 0px 0px",
      },
    },
    MuiAccordionDetails: {
      root: {
        background: "rgba(255, 255, 255, 0.025)",
        borderRadius: "0px 0px 15px 15px",
      },
    },
    MuiSelect: {
      icon: {
        top: "calc(50% - 20px)",
        color: "#fff",
        right: "0",
        position: "absolute",
        pointerEvents: "none",
        background: "rgba(255, 255, 255, 0.025)",
        borderRadius: "50%",
        padding: "8px",
      },
    },
    MuiFormHelperText: {
      contained: {
        marginLeft: "0px",
        marginRight: "0px",
      },
    },
    MuiButton: {
      root: {
        "&:hover": {
          backgroundColor: "none",
        },
      },
      containedSizeSmall: {
        height: "44px",
        fontSize: "14px",
      },
      containedSecondary: {
        color: "rgba(38, 36, 36, 0.87)",
        padding: "10px 35px",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "21px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.16)",
        backgroundColor: "#fff",
        height: "48px",
        whiteSpace: "pre",
        "&:hover": {
          color: "#ffffff",
          background:
            "var(--Linear, linear-gradient(262deg, #62D3F0 13.12%, #35A5F5 83.57%))",
          backgroundColor: "#fff",
        },
        "@media(max-width:767px)": {
          fontSize: "12px !important",
        },
      },

      containedPrimary: {
        color: "#fff",
        padding: "10px 35px",
        fontSize: "14px",
        borderRadius: "10px",
        border: "none",
        background:
          "var(--Linear, linear-gradient(262deg, #62D3F0 13.12%, #35A5F5 83.57%))",
        boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.16)",
        fontWeight: "400",
        lineHeight: "21px",
        height: "48px",
        whiteSpace: "pre",
        backgroundColor: "#fff",
        "&:hover": {
          background: "#fff !important",
          backgroundColor: "#fff",
          color: "rgba(38, 36, 36, 0.87)",
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.16)",
        },
        "@media(max-width:767px)": {
          fontSize: "12px !important",
        },
      },
    },
  },
};

const themesOptions = [
  {
    name: "LIGHT",

    typography: {},
    palette: {
      type: "light",
      action: {
        active: colors.blueGrey[600],
      },
    },
    shadows: softShadows,
  },
  {
    name: "DARK",

    typography: {},

    shadows: strongShadows,
  },
];

export const createTheme = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  let theme = createMuiTheme(
    _.merge({}, baseOptions, themeOptions, { direction: config.direction })
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
