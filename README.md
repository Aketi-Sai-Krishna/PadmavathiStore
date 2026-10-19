# Padmavathi Stores — React + Tailwind + SCSS + Three.js

## Run locally
1. Install Node.js 20 or newer.
2. Extract the project folder.
3. Open a terminal in the folder.
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. Open the local URL printed by Vite.

## Build for deployment
```bash
npm run build
npm run preview
```
The production build is created in `dist/`.

## Configure WhatsApp
Open `src/App.jsx` and replace `91XXXXXXXXXX` in the `STORE.whatsappNumber` setting with the store's WhatsApp number in international format, digits only (for example, `919876543210`).

## Category photos
Category data lives in `src/data/categories.js`. Images are remote URLs for the visual prototype. The first three category photos use the supplied Elevare Market image URLs as visual references. For production, ensure you have permission to use each image and consider hosting licensed photos in `public/images/`, then update the URLs to `/images/your-file.webp`.

## Stack
- React JavaScript + Vite
- Tailwind CSS utilities
- SCSS styling
- Three.js procedural WebGL hero
- Lucide React icons


## Project structure

```text
src/
  components/   Reusable page sections and UI components (including BrandMarquee and ThreeHero)
  pages/        Page-level layouts (Home.jsx)
  data/         Editable arrays and store settings (categories.js, brands.js, products.js, store.js)
  utils/        Small shared helpers
  App.jsx       App entry component
  main.jsx      React bootstrap and stylesheet import
  styles.scss   Global styles and responsive component styles
```

## Add content without rewriting components

- **Brands:** add an object to `src/data/brands.js` with `name` and `style`. The marquee duplicates the array automatically for a seamless left-to-right loop.
- **Categories:** add an object to `src/data/categories.js` with `title`, `subtitle`, `description`, `image`, `tag`, and `tone`.
- **Products:** add an object to `src/data/products.js` with `id`, `title`, `description`, `category`, `brand`, `price`, `unit`, `image`, and `inStock`. Prices are deliberately `null` placeholders until you enter confirmed wholesale prices.
- **Store WhatsApp:** update `whatsappNumber` in `src/data/store.js` when you are ready. Use digits only with country code.

Brand names are currently styled wordmarks rather than official logo artwork. For a production site, use brand logos only when you have permission to display them.
