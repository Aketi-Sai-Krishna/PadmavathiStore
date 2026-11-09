// Edit this file to add, rename or reorder the category cards on the home page.
// The slug must match the category value used by products.js.
export const categories = [
  {
    title: "Pantry", slug: "pantry",
    subtitle: "Everyday essentials",
    description: "Staples and useful everyday products for local retailers.",
    image: "https://elevaremarket.com/cdn/shop/files/pantryy.webp?v=1790246427&width=900",
    tag: "Pantry picks", tone: "sand",
  },
  {
    title: "Household", slug: "household",
    subtitle: "Home & personal care",
    description: "Household supplies, soaps and daily-use essentials.",
    image: "https://elevaremarket.com/cdn/shop/files/household-2.webp?v=1790246447&width=900",
    tag: "Daily essentials", tone: "sage",
  },
  {
    title: "Snacks", slug: "snacks",
    subtitle: "Crunchy favourites",
    description: "Packaged snacks and traditional South Indian treats.",
    image: "https://elevaremarket.com/cdn/shop/files/snackv2.webp?v=1790246583&width=900",
    tag: "Popular", tone: "peach",
  },
  {
    title: "Biscuits & Cookies", slug: "biscuits",
    subtitle: "Tea-time classics",
    description: "Cream biscuits, cookies, crackers and family favourites.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1000&q=85",
    tag: "Tea-time", tone: "biscuit",
  },
  {
    title: "Chocolates", slug: "chocolates",
    subtitle: "Sweet little moments",
    description: "Chocolate treats, moulded chocolates, balls and lentils.",
    image: "https://images.unsplash.com/photo-1548907040-4d42c0c6b9c2?auto=format&fit=crop&w=1000&q=85",
    tag: "Sweet treats", tone: "chocolate",
  },
  {
    title: "Wafers & Rolls", slug: "wafers",
    subtitle: "Light, crispy favourites",
    description: "Cream wafers, coated wafers, wafer sticks and rolls.",
    image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=1000&q=85",
    tag: "Crispy treats", tone: "biscuit",
  },
  {
    title: "Candies & Eclairs", slug: "candies",
    subtitle: "Little bursts of flavour",
    description: "Fruit candies, centre-filled candies, mints and eclairs.",
    image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=1000&q=85",
    tag: "Colourful treats", tone: "peach",
  },
  {
    title: "Lollipops", slug: "lollipops",
    subtitle: "Colourful treats",
    description: "Fruit-flavoured lollipops and chatpata lollipop treats.",
    image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=1000&q=85",
    tag: "Fun favourites", tone: "peach",
  },
  {
    title: "Bubble Gum", slug: "bubble-gum",
    subtitle: "Fun in every piece",
    description: "Jelly bubble gum and assorted bubble gum products.",
    image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=1000&q=85",
    tag: "Fun treats", tone: "sage",
  },
  {
    title: "Cakes & Bakery", slug: "cakes",
    subtitle: "Soft and delicious",
    description: "Layered cakes and bakery-style packaged treats.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85",
    tag: "Bakery", tone: "biscuit",
  },
  {
    title: "Cones & Novelty", slug: "novelty",
    subtitle: "Something different",
    description: "Chocolate cones, surprise products and novelty treats.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1000&q=85",
    tag: "Discover more", tone: "chocolate",
  },
  {
    title: "Drinks & Dairy", slug: "drinks",
    subtitle: "Refresh your range",
    description: "Packaged beverages and dairy-based drinks, subject to availability.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=85",
    tag: "Refreshments", tone: "drink",
  },
  {
    title: "Traditional Snacks", slug: "traditional-snacks",
    subtitle: "A taste of home",
    description: "Local savouries and nostalgic South Indian snack favourites.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85",
    tag: "Local favourites", tone: "traditional",
  },
  {
    title: "Personal Care", slug: "personal-care",
    subtitle: "Everyday care",
    description: "Soaps and personal-care products for neighbourhood shops.",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85",
    tag: "Daily care", tone: "care",
  },
];


// Hierarchical catalogue navigation. Add or edit a node here to extend the mega menu.
// Leaf labels are navigation groupings; product records continue to reference the category slugs above.
export const categoryNavigation = [
  { title: "Confectionery", children: [
    { title: "Chocolates", slug: "chocolates", children: ["Moulded Chocolates", "Chocolate Balls", "Choco Lentils", "Chocolate Coins", "Filled Chocolates"] },
    { title: "Wafers & Rolls", slug: "wafers", children: ["Cream Wafers", "Coated Wafers", "Wafer Sticks", "Wafer Rolls"] },
    { title: "Candies & Eclairs", slug: "candies", children: ["Fruit Candies", "Centre-filled Candies", "Mints", "Eclairs"] },
    { title: "Lollipops", slug: "lollipops", children: ["Fruit Lollipops", "Novelty Lollipops"] },
    { title: "Bubble Gum", slug: "bubble-gum", children: ["Jelly Bubble Gum", "Regular Bubble Gum"] },
    { title: "Cones & Novelty", slug: "novelty", children: ["Filled Cones", "Novelty Chocolates"] },
  ]},
  { title: "Biscuits & Bakery", children: [
    { title: "Biscuits & Cookies", slug: "biscuits", children: ["Cream Biscuits", "Sandwich Biscuits", "Butter Cookies", "Crackers"] },
    { title: "Cakes & Bakery", slug: "cakes", children: ["Packaged Cakes"] },
  ]},
  { title: "Snacks & Beverages", children: [
    { title: "Snacks", slug: "snacks", children: ["Packaged Snacks", "Traditional Snacks"] },
    { title: "Drinks & Dairy", slug: "drinks", children: ["Soft Drinks", "Dairy Drinks"] },
  ]},
  { title: "Daily Essentials", children: [
    { title: "Household", slug: "household", children: ["Home Care"] },
    { title: "Personal Care", slug: "personal-care", children: ["Soaps", "Hair Care"] },
  ]},
];
