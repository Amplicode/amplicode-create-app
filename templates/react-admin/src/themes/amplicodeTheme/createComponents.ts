import { alpha, darken, lighten, Theme, rgbToHex } from "@mui/material";
import { CSSInterpolation, Components as MuiComponents } from "@mui/material/styles";

export type BaseRaComponentProps = {
  styleOverrides: {
    root: CSSInterpolation;
  };
};

type RaComponents = {
  RaLogin: BaseRaComponentProps;
  RaLayout: BaseRaComponentProps;
  RaSidebar: BaseRaComponentProps;
  RaList: BaseRaComponentProps;
  RaListToolbar: BaseRaComponentProps;
  RaTopToolbar: BaseRaComponentProps;
  RaShow: BaseRaComponentProps;
  RaEdit: BaseRaComponentProps;
  RaEmpty: BaseRaComponentProps;
  RaDatagrid: BaseRaComponentProps;
};

export const createComponents = (theme: Theme): MuiComponents & RaComponents => {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        "#root": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
      },
    },

    RaLogin: {
      styleOverrides: {
        root: {
          background: "none",
        },
      },
    },

    RaLayout: {
      styleOverrides: {
        root: {
          background: theme.palette.background.default,

          "& .RaLayout-appFrame": {
            marginTop: "64px",
            background: darken(theme.palette.background.default, 0.01),
          },

          "& header.MuiPaper-root": {
            "& .MuiToolbar-root": {
              minHeight: "64px",
              padding: "0 16px",
            },
          },

          "& .RaLayout-content": {
            padding: "32px 0",

            [theme.breakpoints.up("sm")]: {
              maxWidth: "1400px",
              marginLeft: theme.spacing(3),
              marginRight: theme.spacing(3),
            },
            background: darken(theme.palette.background.default, 0.01),
          },
        },
      },
    },

    RaEmpty: {
      styleOverrides: {
        root: {
          "& .RaEmpty-toolbar": {
            margin: "2em 0",
          },
        },
      },
    },

    RaSidebar: {
      styleOverrides: {
        root: {
          height: "auto",
          borderRight: `1px solid ${darken(theme.colors.neutral[100], 0.03)}`,

          "& .RaLayout-appFrame": {
            marginTop: "64px",
          },

          "& .MuiList-root": {
            padding: "16px",
          },

          "& .MuiMenuItem-root": {
            padding: "12px 6px",
            fontSize: "14px",
            fontWeight: "500",
            transition: "background .2s",
            borderRadius: "10px",

            "&:hover": {
              background: "none",
            },

            "& .MuiListItemIcon-root": {
              color: theme.colors.neutral[500],
            },

            "& .MuiTouchRipple-root": {
              color: lighten(theme.palette.secondary.main, 0.6),
            },

            "&.RaMenuItemLink-active": {
              color: theme.palette.primary.main,
              fontWeight: "600",
            },
          },
        },
      },
    },

    RaList: {
      styleOverrides: {
        root: {
          background: theme.palette.background.paper,
          boxShadow: `${theme.colors.neutral[100]} 0px 0px 1px, ${alpha(
            theme.colors.neutral[900],
            0.08
          )} 0px 1px 3px`,
          borderRadius: "6px",
          maxWidth: `100%`,

          "& .RaList-main": {
            maxWidth: "100%",

            "& .RaList-content": {
              maxWidth: "100%",

              "& .RaDatagrid-root": {
                maxWidth: "100%",

                "& .RaDatagrid-tableWrapper": {
                  maxWidth: "100%",
                  overflow: "hidden",
                  overflowX: "auto",
                },
              },
            },
          },

          "& .MuiPaper-root": {
            boxShadow: "none",
          },

          "& .MuiTableBody-root": {
            "& .MuiTableRow-root:hover": {
              background: lighten(theme.colors.neutral[50], 0.03),
            },
          },

          "& .MuiTableCell-root": {
            padding: theme.spacing(2),
            borderBottomColor: theme.colors.neutral[100],

            "&:not(:last-of-type)": {
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },

            "& span": {
              maxWidth: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },

            "&.MuiTableCell-head": {
              background: lighten(theme.colors.neutral[50], 0.03),
              color: theme.colors.neutral[500],
            },
          },
        },
      },
    },

    RaDatagrid: {
      styleOverrides: {
        root: {
          "& .RaDatagrid-headerCell": {
            // background: "none",
            zIndex: 3,
          },

          "& .RaDatagrid-headerCell:first-of-type": {
            width: "56px",
          },

          "& .MuiButton-startIcon": {
            display: "flex",
          },
        },
      },
    },

    RaListToolbar: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          paddingLeft: `${theme.spacing(2)}!important`,
          borderBottom: `1px solid ${theme.colors.neutral[100]}`,

          "& .hide-filter": {
            padding: "0",
            paddingRight: theme.spacing(1),
          },

          "& .MuiFormControl-root": {
            "& .MuiFormLabel-root": {
              position: "absolute",
              fontSize: "14px",
              fontWeight: 500,
              height: "1.4375em", // it's lineheight from default RA component styles
              top: 0,
              bottom: 0,
              left: "14px",
              margin: "auto",
              transform: "none",
              transition: "none",
              color: theme.colors.neutral[400],

              "&.Mui-focused": {
                color: theme.palette.primary.main,
              },

              "&.Mui-error": {
                color: theme.palette.error.main,
              },

              "&.MuiFormLabel-filled": {
                transform: "scale(0)",
              },

              "& .MuiInputBase-input": {
                fontWeight: 500,
                fontSize: "14px",
              },
            },
          },
        },
      },
    },

    RaTopToolbar: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          padding: `0 ${theme.spacing(2)}!important`,
          borderBottom: `1px solid ${theme.colors.neutral[100]}`,

          ".RaList-main &": {
            borderBottom: `none`,
          },

          "& .MuiButton-root": {
            borderRadius: "6px",
            transition: `background-color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut} 0ms, box-shadow ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut} 0ms, border-color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut} 0ms, color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut} 0ms`,
            color: "#fff",
            backgroundColor: theme.palette.primary.main,
            boxShadow: `${theme.colors.neutral[200]} 0px 0px 1px, ${alpha(
              theme.colors.neutral[800],
              0.08
            )} 0px 1px 3px`,
            lineHeight: 1.75,
            minWidth: "64px",
            padding: "4px 18px",
            fontWeight: 600,
            fontSize: "14px",
          },

          "& .MuiButton-root:hover": {
            textDecoration: "none",
            backgroundColor: theme.palette.primary.dark,
            boxShadow: `${theme.colors.neutral[200]} 0px 0px 1px, ${alpha(
              theme.colors.neutral[800],
              0.08
            )} 0px 3px 8px`,
          },
        },
      },
    },

    RaShow: {
      styleOverrides: {
        root: {
          background: theme.palette.background.paper,
          boxShadow: `${theme.colors.neutral[100]} 0px 0px 1px, ${alpha(
            theme.colors.neutral[900],
            0.08
          )} 0px 1px 3px`,
          borderRadius: "6px",

          "& .MuiPaper-root": {
            boxShadow: "none",
          },

          "& .RaSimpleShowLayout-stack": {
            display: "block",

            "& .RaSimpleShowLayout-row": {
              display: "inline-flex",
              width: "33%",
              padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
              margin: 0,
              color: theme.colors.neutral[500],

              "& .RaLabeled-label": {
                fontSize: "14px",
                fontWeight: 500,
              },
            },
          },
        },
      },
    },

    RaEdit: {
      styleOverrides: {
        root: {
          background: theme.palette.background.paper,
          boxShadow: `${theme.colors.neutral[100]} 0px 0px 1px, ${alpha(
            theme.colors.neutral[900],
            0.08
          )} 0px 1px 3px`,
          borderRadius: "6px",

          "& .MuiPaper-root": {
            boxShadow: "none",
          },

          "& .RaSimpleShowLayout-stack": {
            display: "block",

            "& .RaSimpleShowLayout-row": {
              display: "inline-flex",
              width: "33%",
              padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
              margin: 0,
              color: theme.colors.neutral[500],

              "& .RaLabeled-label": {
                fontSize: "14px",
                fontWeight: 500,
              },
            },
          },
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2),

          "&.RaBulkActionsToolbar-toolbar": {
            // transform: `translateY(-${theme.spacing(8)})`,

            "&.RaBulkActionsToolbar-collapsed": {
              transform: `translateY(0)`,
            },

            [theme.breakpoints.up("xs")]: {
              // minHeight: theme.spacing(8),
            },
          },
        },
      },
    },

    MuiList: {
      styleOverrides: {},
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: 0,
          transform: "none",

          "& .MuiFormLabel-root": {
            position: "static",
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: theme.spacing(1),
            transform: "none",
            transition: "none",

            "&.Mui-focused": {
              color: theme.palette.primary.main,
            },

            "&.Mui-error": {
              color: theme.palette.error.main,
            },

            "& .MuiInputBase-input": {
              fontWeight: 500,
              fontSize: "14px",
            },
          },

          "& .MuiAutocomplete-inputRoot": {
            padding: "0 9px",
          },

          "& .MuiOutlinedInput-notchedOutline": {
            top: 0,

            "& legend": {
              display: "none",

              "& span": {
                display: "none",
              },
            },
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: 500,

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${theme.colors.neutral[300]}`,
            transition: `box-shadow ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut} 0ms, border-color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut} 0ms, color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut} 0ms`,
          },

          "&:not(.Mui-focused):hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px",
              borderColor: `${theme.colors.neutral[300]}`,
            },
          },

          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px",
              boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0px 0px 0px 0.2rem`,
            },
          },

          "&.Mui-focused.Mui-error": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px",
              boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0px 0px 0px 0.2rem`,
            },
          },
        },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          boxShadow: `${theme.colors.neutral[200]} 0px 0px 1px, ${alpha(
            theme.colors.neutral[800],
            0.08
          )} 0px 3px 8px`,
        },

        listbox: {
          padding: theme.spacing(1),
        },

        option: {
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          fontSize: "14px",
          fontWeight: "500",
          borderRadius: "8px",

          "&:hover": {
            background: `${alpha(theme.palette.primary.main, 0.1)}!important`,
          },
        },
      },
    },

    MuiPopover: {
      styleOverrides: {
        root: {
          boxShadow: `${theme.colors.neutral[200]} 0px 0px 1px, ${alpha(
            theme.colors.neutral[800],
            0.08
          )} 0px 3px 8px`,

          "& .MuiMenuItem-root": {
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "8px",

            "&:hover": {
              background: `${alpha(theme.palette.primary.main, 0.1)}!important`,
            },
          },
        },
      },
    },

    MuiTablePagination: {
      styleOverrides: {
        root: {
          "& .MuiTablePagination-spacer": {
            display: "none",
          },

          "& .MuiTablePagination-selectLabel": {
            order: 1,
            width: "108px",
          },

          "& .MuiInputBase-root.MuiInputBase-colorPrimary": {
            order: 2,
            width: "48px",
          },

          "& .MuiTablePagination-actions": {
            order: 3,
            flex: 1,

            "& .MuiPagination-root": {
              display: "flex",
              justifyContent: "center",
            },
          },

          "& .MuiTablePagination-displayedRows": {
            order: 4,
            width: "156px",
            textAlign: "right",
          },
        },
        toolbar: {
          [theme.breakpoints.up("xs")]: {
            padding: `0 ${theme.spacing(2)}`,
          },
        },
      },
    },

    MuiPaginationItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
          },

          "&.Mui-selected": {
            color: theme.palette.background.paper,
            backgroundColor: theme.palette.primary.main,
            boxShadow: `${theme.colors.neutral[200]} 0px 0px 1px, ${alpha(
              theme.colors.neutral[800],
              0.08
            )} 0px 3px 8px`,

            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
          },
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            minWidth: "250px",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  };
};
