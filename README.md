# react-sandbox
Sandbox Repo for Mini React Projects

# setup new:
npm create vite@latest
cd vite-react-app
npm install
npm install sass
npm install react-router-dom

- Update `vite.config.js`:

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})



# material ui
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components (For styled components instead of default Emotion)
npm install @fontsource/roboto
npm install @mui/icons-material