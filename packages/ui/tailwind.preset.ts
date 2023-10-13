import type {Config} from "tailwindcss";

const COLORS = {
  current: "currentColor",
  transparent: "transparent",
  inherit: "inherit",

  /* BRAND */
  black: "hsl(var(--color-black) / <alpha-value>)",
  "black-active": "hsl(var(--color-black-active) / <alpha-value>)",
  ultramarine: "hsl(var(--color-ultramarine) / <alpha-value>)",
  "ultramarine-active": "hsl(var(--color-ultramarine-active) / <alpha-value>)",
  lavender: "hsl(var(--color-lavender) / <alpha-value>)",
  "lavender-active": "hsl(var(--color-lavender-active) / <alpha-value>)",
  verdigris: "hsl(var(--color-verdigris) / <alpha-value>)",
  "verdigris-active": "hsl(var(--color-verdigris-active) / <alpha-value>)",
  sand: "hsl(var(--color-sand) / <alpha-value>)",
  "sand-active": "hsl(var(--color-sand-active) / <alpha-value>)",
  lightSand: "hsl(var(--color-lightSand) / <alpha-value>)",
  "lightSand-active": "hsl(var(--color-lightSand-active) / <alpha-value>)",
  saffron: "hsl(var(--color-saffron) / <alpha-value>)",
  "saffron-active": "hsl(var(--color-saffron-active) / <alpha-value>)",
  sienna: "hsl(var(--color-sienna) / <alpha-value>)",
  "sienna-active": "hsl(var(--color-sienna-active) / <alpha-value>)",
  wave: "hsl(var(--color-wave) / <alpha-value>)",
  "wave-active": "hsl(var(--color-wave-active) / <alpha-value>)",
  white: "hsl(var(--color-white) / <alpha-value>)",
  "white-active": "hsl(var(--color-white-active) / <alpha-value>)",

  /* LAYOUT */
  darkGrey: "hsl(var(--color-darkGrey) / <alpha-value>)",
  middleGrey: "hsl(var(--color-middleGrey) / <alpha-value>)",
  grey: "hsl(var(--color-grey) / <alpha-value>)",
  lightGrey: "hsl(var(--color-lightGrey) / <alpha-value>)",
  pearl: "hsl(var(--color-pearl) / <alpha-value>)",
  green: "hsl(var(--color-green) / <alpha-value>)",
  red: "hsl(var(--color-red) / <alpha-value>)",
  orange: "hsl(var(--color-orange) / <alpha-value>)"
};

const config = {
  content: [],
  darkMode: "media", // or 'class'
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1220px",
      "2xl": "96em"
    },
    colors: COLORS,
    columns: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      "3xs": "16rem",
      "2xs": "18rem",
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem"
    },
    spacing: {
      0: "0",
      1: "1px",
      2: "0.125rem",
      4: "0.25rem",
      8: "0.5rem",
      12: "0.75rem",
      16: "1rem",
      20: "1.25rem",
      24: "1.5rem",
      32: "2rem",
      40: "2.5rem",
      60: "3.75rem",
      80: "5rem",
      120: "7.5rem",
      160: "10rem"
    },
    animation: {
      none: "none",
      spin: "spin 1s linear infinite",
      loaderDash: "loaderDash 1.5s ease-in-out infinite",
      wave: "wave 4s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      rotatesIn: "rotatesIn .4s ease-in-out",
      bounce: "bounce 1s infinite",
      toastEnter: "toastEnter .4s ease",
      toastExit: "toastExit .4s ease",
      filling: "filling 10s linear"
    },
    aspectRatio: {
      auto: "auto",
      square: "1 / 1",
      horizontal: "19 / 12",
      vertical: "19 / 25",
      video: "16 / 9",
      verticalVideo: "9 / 16"
    },
    backdropBlur: ({theme}) => theme("blur"),
    backdropBrightness: ({theme}) => theme("brightness"),
    backdropContrast: ({theme}) => theme("contrast"),
    backdropGrayscale: ({theme}) => theme("grayscale"),
    backdropHueRotate: ({theme}) => theme("hueRotate"),
    backdropInvert: ({theme}) => theme("invert"),
    backdropOpacity: ({theme}) => theme("opacity"),
    backdropSaturate: ({theme}) => theme("saturate"),
    backdropSepia: ({theme}) => theme("sepia"),
    backgroundColor: ({theme}) => theme("colors"),
    backgroundImage: {
      none: "none",
      "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
      "gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))",
      "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
      "gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))",
      "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
      "gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))",
      "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
      "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))"
    },
    backgroundOpacity: ({theme}) => theme("opacity"),
    backgroundPosition: {
      bottom: "bottom",
      center: "center",
      left: "left",
      "left-bottom": "left bottom",
      "left-top": "left top",
      right: "right",
      "right-bottom": "right bottom",
      "right-top": "right top",
      top: "top"
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain"
    },
    blur: {
      0: "0",
      none: "0",
      sm: "4px",
      DEFAULT: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
      "2xl": "40px",
      "3xl": "64px"
    },
    brightness: {
      0: "0",
      50: ".5",
      75: ".75",
      90: ".9",
      95: ".95",
      100: "1",
      105: "1.05",
      110: "1.1",
      125: "1.25",
      150: "1.5",
      200: "2"
    },
    borderColor: ({theme}) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.200", "currentColor")
    }),
    borderOpacity: ({theme}) => theme("opacity"),
    borderRadius: {
      0: "0rem",
      4: "0.25rem",
      8: ".5rem",
      16: "1rem",
      pill: "7.5rem",
      full: "100%"
    },
    borderSpacing: ({theme}) => ({
      ...theme("spacing")
    }),
    borderWidth: {
      DEFAULT: "1px",
      0: "0px",
      2: "2px",
      4: "4px",
      8: "8px"
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      none: "none"
    },
    boxShadowColor: ({theme}) => theme("colors"),
    caretColor: ({theme}) => theme("colors"),
    accentColor: ({theme}) => ({
      ...theme("colors"),
      auto: "auto"
    }),
    contrast: {
      0: "0",
      50: ".5",
      75: ".75",
      100: "1",
      125: "1.25",
      150: "1.5",
      200: "2"
    },
    container: {},
    content: {
      none: "none"
    },
    cursor: {
      auto: "auto",
      default: "default",
      pointer: "pointer",
      wait: "wait",
      text: "text",
      move: "move",
      help: "help",
      "not-allowed": "not-allowed",
      none: "none",
      "context-menu": "context-menu",
      progress: "progress",
      cell: "cell",
      crosshair: "crosshair",
      "vertical-text": "vertical-text",
      alias: "alias",
      copy: "copy",
      "no-drop": "no-drop",
      grab: "grab",
      grabbing: "grabbing",
      "all-scroll": "all-scroll",
      "col-resize": "col-resize",
      "row-resize": "row-resize",
      "n-resize": "n-resize",
      "e-resize": "e-resize",
      "s-resize": "s-resize",
      "w-resize": "w-resize",
      "ne-resize": "ne-resize",
      "nw-resize": "nw-resize",
      "se-resize": "se-resize",
      "sw-resize": "sw-resize",
      "ew-resize": "ew-resize",
      "ns-resize": "ns-resize",
      "nesw-resize": "nesw-resize",
      "nwse-resize": "nwse-resize",
      "zoom-in": "zoom-in",
      "zoom-out": "zoom-out"
    },
    divideColor: ({theme}) => theme("borderColor"),
    divideOpacity: ({theme}) => theme("borderOpacity"),
    divideWidth: ({theme}) => theme("borderWidth"),
    dropShadow: {
      sm: "0 1px 1px rgb(0 0 0 / 0.05)",
      DEFAULT: "0 0 12px rgb(0 0 0 / 0.2)",
      md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
      lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
      xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
      "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
      none: "0 0 #0000"
    },
    fill: ({theme}) => theme("colors"),
    grayscale: {
      0: "0",
      DEFAULT: "100%"
    },
    hueRotate: {
      0: "0deg",
      15: "15deg",
      30: "30deg",
      60: "60deg",
      90: "90deg",
      180: "180deg"
    },
    invert: {
      0: "0",
      DEFAULT: "100%"
    },
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none"
    },
    flexBasis: ({theme}) => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      full: "100%"
    }),
    flexGrow: {
      0: "0",
      DEFAULT: "1"
    },
    flexShrink: {
      0: "0",
      DEFAULT: "1"
    },
    fontFamily: {
      sans: ["Inter", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      serif: ["Newsreader", "Times New Roman", "Times", "serif"]
    },
    fontSize: {
      b6: ["0.625rem", {lineHeight: ".75rem"}],
      b5: ["0.75rem", {lineHeight: ".875rem"}],
      b4: ["0.875rem", {lineHeight: "1.25rem"}],
      b3: ["1rem", {lineHeight: "1.5rem"}],
      b2: ["1.25rem", {lineHeight: "1.75rem"}],
      b1: ["1.5rem", {lineHeight: "1.75rem"}],
      b0: ["1.75rem", {lineHeight: "2rem"}],
      h5: ["1.5rem", {lineHeight: "1.625rem", fontWeight: "700"}],
      h4: ["1.75rem", {lineHeight: "1.875rem", fontWeight: "700"}],
      h3: ["2rem", {lineHeight: "2.125rem", fontWeight: "700"}],
      h2: ["2.5rem", {lineHeight: "2.625rem", fontWeight: "700"}],
      h1: ["3rem", {lineHeight: "3.125rem", fontWeight: "700"}],
      h0: ["4rem", {lineHeight: "4.125rem", fontWeight: "700"}]
    },
    fontWeight: {
      normal: "400",
      semibold: "600",
      bold: "700"
    },
    gap: ({theme}) => theme("spacing"),
    gradientColorStops: ({theme}) => theme("colors"),
    gridAutoColumns: {
      auto: "auto",
      min: "min-content",
      max: "max-content",
      fr: "minmax(0, 1fr)"
    },
    gridAutoRows: {
      auto: "auto",
      min: "min-content",
      max: "max-content",
      fr: "minmax(0, 1fr)"
    },
    gridColumn: {
      auto: "auto",
      "span-1": "span 1 / span 1",
      "span-2": "span 2 / span 2",
      "span-3": "span 3 / span 3",
      "span-4": "span 4 / span 4",
      "span-5": "span 5 / span 5",
      "span-6": "span 6 / span 6",
      "span-7": "span 7 / span 7",
      "span-8": "span 8 / span 8",
      "span-9": "span 9 / span 9",
      "span-10": "span 10 / span 10",
      "span-11": "span 11 / span 11",
      "span-12": "span 12 / span 12",
      "span-full": "1 / -1"
    },
    gridColumnEnd: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13"
    },
    gridColumnStart: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13"
    },
    gridRow: {
      auto: "auto",
      "span-1": "span 1 / span 1",
      "span-2": "span 2 / span 2",
      "span-3": "span 3 / span 3",
      "span-4": "span 4 / span 4",
      "span-5": "span 5 / span 5",
      "span-6": "span 6 / span 6",
      "span-full": "1 / -1"
    },
    gridRowStart: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7"
    },
    gridRowEnd: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7"
    },
    gridTemplateColumns: {
      none: "none",
      1: "repeat(1, minmax(0, 1fr))",
      2: "repeat(2, minmax(0, 1fr))",
      3: "repeat(3, minmax(0, 1fr))",
      4: "repeat(4, minmax(0, 1fr))",
      5: "repeat(5, minmax(0, 1fr))",
      6: "repeat(6, minmax(0, 1fr))",
      7: "repeat(7, minmax(0, 1fr))",
      8: "repeat(8, minmax(0, 1fr))",
      9: "repeat(9, minmax(0, 1fr))",
      10: "repeat(10, minmax(0, 1fr))",
      11: "repeat(11, minmax(0, 1fr))",
      12: "repeat(12, minmax(0, 1fr))"
    },
    gridTemplateRows: {
      none: "none",
      1: "repeat(1, minmax(0, 1fr))",
      2: "repeat(2, minmax(0, 1fr))",
      3: "repeat(3, minmax(0, 1fr))",
      4: "repeat(4, minmax(0, 1fr))",
      5: "repeat(5, minmax(0, 1fr))",
      6: "repeat(6, minmax(0, 1fr))"
    },
    height: ({theme}) => ({
      auto: "auto",
      48: "48px",
      100: "100px",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      full: "100%",
      screen: ["100vh", "100dvh"],
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    }),
    inset: ({theme}) => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      full: "100%"
    }),
    keyframes: {
      spin: {
        to: {
          transform: "rotate(360deg)"
        }
      },
      loaderDash: {
        "0%": {
          strokeDashoffset: "38",
          strokeDasharray: "38"
        },
        "50%": {
          strokeDashoffset: "70",
          strokeDasharray: "70",
          transform: "rotate(180deg)"
        },
        "100%": {
          transform: "rotate(360deg)"
        }
      },
      wave: {
        "0%": {
          transform: "translate(100px, 140px)"
        },
        "10%": {
          transform: "translate(100px, 140px)"
        },
        "100%": {
          transform: "translate(0px, 0px)"
        }
      },
      ping: {
        "75%, 100%": {
          transform: "scale(2)",
          opacity: "0"
        }
      },
      pulse: {
        "25%": {
          scale: "1.25"
        },
        "50%": {
          scale: "1"
        }
      },
      rotatesIn: {
        "0%": {
          transform: "translateY(-20px)",
          opacity: "0"
        },
        "100%": {
          transform: "translateY(0)",
          opacity: "1"
        }
      },
      bounce: {
        "0%, 100%": {
          transform: "translateY(-25%)",
          animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
        },
        "50%": {
          transform: "none",
          animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
        }
      },
      toastEnter: {
        "0%": {
          transform: "translateX(100%)",
          opacity: "0"
        },
        "100%": {
          transform: "translateX(0%)",
          opacity: "1"
        }
      },
      toastExit: {
        "0%": {
          transform: "translateX(0%)"
        },
        "100%": {
          transform: "translateX(101%)"
        }
      },
      filling: {
        "0%": {
          transform: "scaleX(0)"
        },
        "100%": {
          transform: "scaleX(1)"
        }
      }
    },
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em"
    },
    lineClamp: {
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7"
    },
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
      3: ".75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem"
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal"
    },
    margin: ({theme}) => ({
      auto: "auto",
      ...theme("spacing")
    }),
    maxHeight: ({theme}) => ({
      ...theme("spacing"),
      full: "100%",
      screen: ["100vh", "100dvh"],
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    }),
    maxWidth: ({theme, breakpoints}) => ({
      none: "none",
      0: "0rem",
      360: "360px",
      1220: "1220px",
      "1/2": "50%",
      "1/3": "33.333333%",
      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
      prose: "65ch",
      ...breakpoints(theme("screens"))
    }),
    minHeight: {
      0: "0px",
      full: "100%",
      screen: ["100vh", "100dvh"],
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    },
    minWidth: {
      0: "0px",
      360: "360px",
      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    },
    objectPosition: {
      bottom: "bottom",
      center: "center",
      left: "left",
      "left-bottom": "left bottom",
      "left-top": "left top",
      right: "right",
      "right-bottom": "right bottom",
      "right-top": "right top",
      top: "top"
    },
    opacity: {
      0: "0",
      5: "0.05",
      10: "0.1",
      20: "0.2",
      25: "0.25",
      30: "0.3",
      40: "0.4",
      50: "0.5",
      60: "0.6",
      70: "0.7",
      75: "0.75",
      80: "0.8",
      90: "0.9",
      95: "0.95",
      100: "1"
    },
    order: {
      first: "-9999",
      last: "9999",
      none: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12"
    },
    padding: ({theme}) => theme("spacing"),
    placeholderColor: ({theme}) => theme("colors"),
    placeholderOpacity: ({theme}) => theme("opacity"),
    outlineColor: ({theme}) => theme("colors"),
    outlineOffset: {
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px"
    },
    outlineWidth: {
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px"
    },
    ringColor: ({theme}) => ({
      DEFAULT: theme("colors.blue.500", "#3b82f6"),
      ...theme("colors")
    }),
    ringOffsetColor: ({theme}) => theme("colors"),
    ringOffsetWidth: {
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px"
    },
    ringOpacity: ({theme}) => ({
      DEFAULT: "0.5",
      ...theme("opacity")
    }),
    ringWidth: {
      DEFAULT: "3px",
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px"
    },
    rotate: {
      0: "0deg",
      1: "1deg",
      2: "2deg",
      3: "3deg",
      6: "6deg",
      12: "12deg",
      45: "45deg",
      90: "90deg",
      180: "180deg"
    },
    saturate: {
      0: "0",
      50: ".5",
      100: "1",
      150: "1.5",
      200: "2"
    },
    scale: {
      0: "0",
      50: ".5",
      75: ".75",
      90: ".9",
      95: ".95",
      100: "1",
      105: "1.05",
      110: "1.1",
      125: "1.25",
      150: "1.5"
    },
    scrollMargin: ({theme}) => ({
      ...theme("spacing")
    }),
    scrollPadding: ({theme}) => theme("spacing"),
    sepia: {
      0: "0",
      DEFAULT: "100%"
    },
    skew: {
      0: "0deg",
      1: "1deg",
      2: "2deg",
      3: "3deg",
      6: "6deg",
      12: "12deg"
    },
    space: ({theme}) => ({
      ...theme("spacing")
    }),
    stroke: ({theme}) => theme("colors"),
    strokeWidth: {
      0: "0",
      1: "1",
      2: "2"
    },
    textColor: ({theme}) => theme("colors"),
    textDecorationColor: ({theme}) => theme("colors"),
    textDecorationThickness: {
      auto: "auto",
      "from-font": "from-font",
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px"
    },
    textUnderlineOffset: {
      auto: "auto",
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px"
    },
    textIndent: ({theme}) => ({
      ...theme("spacing")
    }),
    textOpacity: ({theme}) => theme("opacity"),
    transformOrigin: {
      center: "center",
      top: "top",
      "top-right": "top right",
      right: "right",
      "bottom-right": "bottom right",
      bottom: "bottom",
      "bottom-left": "bottom left",
      left: "left",
      "top-left": "top left"
    },
    transitionDelay: {
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1000: "1000ms"
    },
    transitionDuration: {
      DEFAULT: "150ms",
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1000: "1000ms"
    },
    transitionProperty: {
      none: "none",
      all: "all",
      DEFAULT:
        "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
      colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
      opacity: "opacity",
      "transform/opacity": "opacity, transform",
      shadow: "box-shadow",
      transform: "transform",
      rotate: "rotate",
      "bg-size": "background-size"
    },
    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
    },
    translate: ({theme}) => ({
      ...theme("spacing"),
      0: 0,
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      full: "100%"
    }),
    width: ({theme}) => ({
      auto: "auto",
      px: "1px",
      48: "48px",
      100: "100px",
      240: "240px",
      360: "360px",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      full: "100%",
      screen: "100vw",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    }),
    willChange: {
      auto: "auto",
      scroll: "scroll-position",
      contents: "contents",
      transform: "transform"
    },
    zIndex: {
      auto: "auto",
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5"
    }
  },
  variantOrder: [
    "first",
    "last",
    "odd",
    "even",
    "visited",
    "checked",
    "empty",
    "read-only",
    "group-hover",
    "group-focus",
    "focus-within",
    "hover",
    "focus",
    "focus-visible",
    "active",
    "disabled"
  ],
  future: {
    hoverOnlyWhenSupported: true
  }
} satisfies Config;

export default config;