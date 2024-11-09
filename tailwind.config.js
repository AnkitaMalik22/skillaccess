

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
      boxShadow: {
        "inner-lg": "inset 2px 2px 0px 0px rgba(1, 10, 1,0.3)",
      },
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
        blued: "#0D9AAC",
        lightBlue: "#0AB8C8",
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
//Skillaccess Final Colors -
// #043345
// #0D9AAC
// #0AB8C8
        mytheme: {
          primary: "#FFFFFF",
          secondary: "#043345",
          accent: "#0D9AAC",
          neutral: "#0AB8C8",
          "base-100": "#FFFFFF",
         
   
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
  ],
};
