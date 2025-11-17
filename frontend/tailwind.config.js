// export const content = [
//   "./src/**/*.{html,js,jsx,ts,tsx}",
// ];
// export const theme = {
//   extend: {},
// };
// export const plugins = [];
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/flowbite/**/*.js"
  ],
  colors: {
    'custom-gray': '#b7bec3',
  },
  theme: {
    extend: {
      boxShadow: {
        'dark-lg': '0 10px 30px rgba(0, 0, 0, 0.8)', // Darker, more prominent shadow
      },
    },
  },
  plugins: [
    import('flowbite/plugin')
  ],
}