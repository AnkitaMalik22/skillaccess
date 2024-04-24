/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      "2xs": "380px",
      xs: "420px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1600px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      transitionProperty: {
        width: "width",
        height: "height",
      },
      backgroundImage: {
        login: "url('../public/images/loginBg.jpg')",
        pic2: "url('../public/pic2.jpg')",
      },
      colors: {
        lGray: "#8F92A1",
        snow: "#F3F6F8",
        aqua: "#247ba0",
        blued: "#95ACFA",
        "gray-100": "#F8F8F9",
      },
      fontFamily: {
        dmSans: ["DM Sans"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#FFFFFF",
          secondary: "#95ACFA",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#FFFFFF",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
