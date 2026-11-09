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


## Product catalogue (NEO + PEPE)

The existing homepage, Three.js hero, header, brand marquee, WhatsApp integration and styling have been retained. Product browsing has been added using the existing folder structure.

### New catalogue pages
- `/category/chocolates`
- `/category/biscuits`
- `/category/wafers`
- `/category/candies`
- `/category/lollipops`
- `/category/bubble-gum`
- `/category/cakes`
- `/category/snacks`
- `/category/novelty`

Click a category card on the homepage to open its product listing. Click a product card to open its detail page.

### The one file to edit products

Edit **`src/data/products.js`** to add or update products. Each product object contains:
- `id`: unique URL-safe identifier
- `brand`: `neo` or `pepe`
- `category`: category slug from `src/data/categories.js`
- `title` and `description`
- `image`: local image path (optional; category image is used until a packshot is added)
- `flavours`: variants/flavours
- `mrp` and `wholesalePrice`: left `null` until verified
- `packSize` and `unit`
- `availability` and `featured`

Example:
```js
{
  id: "neo-new-chocolate",
  brand: "neo",
  category: "chocolates",
  title: "New Chocolate",
  description: "Product description from the catalogue.",
  image: "/images/products/neo/new-chocolate.webp",
  flavours: ["Milk", "Dark"],
  mrp: null,
  wholesalePrice: null,
  packSize: "",
  unit: "",
  availability: "catalogue",
  featured: false,
}
```

### Adding categories and brands
- Add/edit homepage categories in `src/data/categories.js`. The `slug` must match the `category` value used by products.
- Add catalogue brands in `catalogueBrands` inside `src/data/brands.js`.
- Existing brand marquee names are kept in the same file and are separate from the NEO/PEPE catalogue filter.

### Product images and prices
The supplied project ZIP did not contain the original NEO/PEPE product packshot image files. Product cards currently use the relevant category photograph as a temporary fallback. Add real, licensed product images under `public/images/products/` and set each product's `image` path in `products.js`.
Catalogue MRP and wholesale prices are not assumed. Prices remain blank / enquiry-only until you enter verified values. Confirm stock and wholesale price through WhatsApp.

### Run locally
```bash
npm install
npm run dev
```


## Wholesale marketplace experience

The original Padmavathi Stores homepage and its visual components are retained. The catalogue experience has been extended with:

- Universal search across product names, descriptions, brands, flavours and categories, with live suggestions.
- A three-column expandable category mega menu.
- Dedicated category pages with a left-side filter panel.
- Brand, MRP range, availability and text filters, plus sorting.
- Product cards with MRP (only where supplied), quantity controls and Add to Cart.
- Product detail pages with quantity selection and WhatsApp enquiry.
- A persistent cart stored in browser local storage.
- Cart drawer and full cart page, with a prefilled WhatsApp order enquiry.

### Routes

- `/` — Existing homepage.
- `/catalogue` — All products and filters.
- `/category/chocolates` — Category listing (other slugs are in `src/data/categories.js`).
- `/product/<product-id>` — Product detail page.
- `/cart` — Cart review and WhatsApp enquiry.

### Data management

- `src/data/products.js` is the single product master list. Add or edit product objects here.
- `src/data/categories.js` contains homepage category cards and the hierarchical `categoryNavigation` mega-menu data.
- `src/data/brands.js` contains marquee brands and catalogue brands.
- `src/data/store.js` contains the store WhatsApp number.

Product records should use a stable unique `id`, a `brand` matching `catalogueBrands`, and a `category` matching a category `slug`. Keep `mrp: null` until the printed MRP is verified. Product images can be stored under `public/images/products/` and referenced by a path such as `/images/products/neo/dairy-bite.webp`.

### Pricing and order flow

The site displays MRP only when a verified value exists. It does not invent or display wholesale prices. The cart creates a product/quantity enquiry and opens WhatsApp; the store confirms availability, wholesale rates and delivery details. If any cart item has no MRP, the estimated MRP subtotal is shown as "To be confirmed" rather than calculating a partial total.

### Run locally

```bash
npm install
npm run dev
```
