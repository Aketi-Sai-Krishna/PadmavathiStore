// SINGLE PRODUCT MASTER LIST
// Add/edit products here. Do not create product cards manually in JSX.
// category must match a slug in categories.js.
// brand must match an id in catalogueBrands (brands.js).
// Keep mrp / wholesalePrice as null until the actual pack price is verified.
// Add the real packshot path to image, e.g. "/images/products/neo/dairy-bite.webp".

const makeProducts = (brand, category, entries) =>
  entries.map(([title, description, flavours = []]) => ({
    id: `${brand}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
    brand,
    category,
    title,
    description,
    image: "",
    flavours,
    mrp: null,
    wholesalePrice: null,
    packSize: "",
    unit: "",
    availability: "catalogue",
    featured: false,
  }));

export const products = [
  // NEO — Wafers, wafer rolls and coated wafers
  ...makeProducts("neo", "wafers", [
    ["Rocket", "Cream wafer product.", ["Chocolate", "Strawberry", "Orange"]],
    ["Mania", "Cream wafer product.", ["Chocolate", "Strawberry", "Orange", "Vanilla"]],
    ["Mania 5", "Cream wafer product.", ["Chocolate", "Strawberry", "Orange"]],
    ["Mania Big", "Cream wafer product.", ["Chocolate", "Strawberry", "Orange"]],
    ["Mania Mini", "Mini cream wafer product.", ["Chocolate", "Strawberry", "Orange"]],
    ["Funny", "Cream wafer product.", ["Chocolate", "Strawberry", "Orange"]],
    ["Mr. Krunchy", "Cream wafer product.", ["Chocolate", "Strawberry", "Orange"]],
    ["Exotica", "Cream wafer product.", ["Chocolate", "Strawberry", "Orange"]],
    ["Krunchy Break Time", "Cream wafer product.", ["Chocolate", "Pineapple", "Strawberry", "Orange"]],
    ["Cute XXL", "Coated wafer product.", []],
    ["Choco Hack", "Caramel-coated wafer product.", []],
    ["Smaash", "Caramel-coated wafer product.", []],
    ["Stunner", "Caramel-coated wafer product.", []],
    ["Funny Wafer Sticks", "Wafer stick rolls.", ["Chocolate", "Strawberry", "Mango", "Orange", "Pineapple"]],
    ["Krunchy Wafer Sticks", "Wafer stick rolls.", ["Chocolate", "Strawberry", "Mango", "Orange", "Pineapple"]],
    ["Twisties", "Wafer stick rolls.", []],
    ["Fun! Roller", "Wafer stick rolls.", []],
    ["Rock & Roll", "Wafer stick rolls.", []],
  ]),

  // NEO — Chocolates and chocolate treats
  ...makeProducts("neo", "chocolates", [
    ["Trendy Hearts", "Moulded chocolate.", ["Dark", "White", "Strawberry"]],
    ["Dairy Bite", "Moulded chocolate.", ["Cocoa", "Dark", "White"]],
    ["Dairy Mate", "Moulded chocolate treat.", []],
    ["Kids Mate", "Moulded chocolate treat.", []],
    ["Elite Assorted Chocolates", "Assorted moulded chocolates.", []],
    ["Choco Spinny", "Chocolate lentils.", []],
    ["Choco Yorker", "Chocolate lentils.", []],
    ["Wonder Cup", "Chocolate cup product.", []],
    ["Co Creme Ca", "Chocolate cup product as named in the catalogue.", []],
  ]),

  // NEO — Candies and eclairs
  ...makeProducts("neo", "candies", [
    ["Choco Jlip", "Choki / choco confectionery product.", []],
    ["Rabdi Malai", "Choki / choco confectionery product.", []],
    ["Choco Dubliss", "Choki / choco confectionery product.", []],
    ["Kachaa Aam", "Fruit-flavoured candy.", []],
    ["Orange Candy", "Fruit-flavoured candy.", []],
    ["Mango Candy", "Fruit-flavoured candy.", []],
    ["Imli Candy", "Tamarind-flavoured candy.", []],
    ["Juicy Hearts", "Fruit-flavoured candy.", []],
    ["Juicy Orange Rich", "Orange-flavoured candy.", []],
    ["Kachaa Aam Mist", "Flavoured candy.", []],
    ["Mango Mist", "Flavoured candy.", []],
    ["Orange Mist", "Flavoured candy.", []],
    ["Guava Mist", "Flavoured candy.", []],
    ["Green Apple Mist", "Flavoured candy.", []],
    ["Pineapple Mist", "Flavoured candy.", []],
    ["Coffy Mist", "Coffee-flavoured candy.", []],
    ["Imli Mist", "Tamarind-flavoured candy.", []],
    ["Double Mints", "Mint candy.", []],
    ["Spicy Punch", "Spicy-flavoured candy.", []],
    ["Love Candy", "Flavoured candy.", []],
    ["Friend Zone", "Flavoured candy.", []],
    ["Mango Dubliss", "Mango-flavoured candy.", []],
    ["Kachaa Mango Dubliss", "Raw mango-flavoured candy.", []],
    ["Meetha Pan", "Pan-flavoured candy.", []],
    ["Asli Pan Flavoured Candy", "Pan-flavoured candy.", []],
    ["Center Filled Candy - Mixed Fruits", "Centre-filled mixed fruit candy.", ["Mixed Fruit"]],
    ["Flavour Center Filled Candy", "Centre-filled flavoured candy.", []],
    ["Eclair Red", "Eclair confectionery.", []],
    ["Eclair Blue", "Eclair confectionery.", []],
    ["Choco Eclair Delight", "Chocolate eclair.", []],
    ["Milk Cream Eclair Delight", "Milk cream eclair.", []],
    ["Eclair Delight Kaju", "Kaju-flavoured eclair.", []],
    ["Elaichi Eclair Delight", "Elaichi-flavoured eclair.", []],
    ["Coconut Eclair Delight", "Coconut-flavoured eclair.", []],
  ]),

  // NEO — Lollipops
  ...makeProducts("neo", "lollipops", [
    ["Funny Pop", "Flavoured lollipop.", []],
    ["Trendy Pop", "Flavoured lollipop.", []],
    ["Lolly Pop", "Flavoured lollipop.", []],
    ["Jingle Pop", "Assorted flavoured lollipop.", []],
    ["Assorted Flavoured Lollipops", "Assorted lollipop range.", ["Raw Mango", "Tamarind", "Strawberry", "Caramel"]],
  ]),

  // NEO — Cones and novelty / surprise products
  ...makeProducts("neo", "novelty", [
    ["Coneo Choco Filled Cone Delight", "Chocolate-filled cone treat.", []],
    ["Coneo Strawberry Filled Cone Delight", "Strawberry-filled cone treat.", []],
    ["Coneo Rose Filled Cone Delight", "Rose-filled cone treat.", []],
    ["Coneo Orange Filled Cone Delight", "Orange-filled cone treat.", []],
    ["Coneo Cookie 'n' Crème Filled Cone Delight", "Cookie and crème-filled cone treat.", []],
    ["Coneo Mango Filled Cone Delight", "Mango-filled cone treat.", []],
    ["Kidz Joy", "Chocolate egg / blister pack novelty product.", []],
    ["Double Trouble", "Chocolate egg / blister pack novelty product.", []],
    ["Zooni", "Chocolate egg / blister pack novelty product.", []],
    ["Hi Panda", "Chocolate egg / blister pack novelty product.", []],
    ["Ni No Joy", "Chocolate egg / blister pack novelty product.", []],
  ]),

  // PEPE — Chocolates
  ...makeProducts("pepe", "chocolates", [
    ["Choco Tools", "Novelty chocolate product.", []],
    ["Let's Go! Choco Racer", "Chocolate novelty product.", []],
    ["Timmy Panda", "Fun-filled choco panda treat.", []],
    ["Soccer Cup", "Chocolate balls.", []],
    ["Twin Balls", "Milk and chocolate balls.", ["Milk", "Chocolate"]],
    ["Choco Signal Balls", "Chocolate balls.", []],
    ["Wow Pops!", "Chocolate lentils.", []],
    ["Berry & Banana", "Chocolate lentil product.", ["Berry", "Banana"]],
    ["England", "Cream-filled milk chocolate.", []],
    ["Gold 999 F", "Bank of Chocolate product.", []],
    ["Gold Coin", "Chocolate coin.", []],
    ["Gold 999", "Bank of Chocolate product.", []],
    ["Rio", "Butterscotch-flavoured choco truffles.", ["Butterscotch"]],
    ["Rio Cacao", "Milk chocolate with rice crisps.", []],
    ["Snipers", "Peanuts with caramel cream.", []],
    ["Silko Milko", "Chocolade product.", []],
    ["It's My Life", "Fruit and nut chocolate.", ["Fruit & Nut"]],
  ]),

  // PEPE — Biscuits and cookies
  ...makeProducts("pepe", "biscuits", [
    ["Peppy & Zeppy", "Choco chip cream sandwich biscuits.", ["Chocolate", "Strawberry", "Vanilla"]],
    ["Oppo", "Cream sandwich biscuit.", []],
    ["Bourbon", "Flavoured sandwich biscuits.", []],
    ["Boogie Woogie", "Milk choco cream biscuits.", []],
    ["Butter Cookies - Blue Pack", "Butter cookies.", []],
    ["Butter Cookies - Red Pack", "Butter cookies.", []],
    ["Creamy", "Flavoured cream biscuits.", ["Chocolate", "Pineapple", "Orange", "Strawberry"]],
    ["Choco Chip Cookies", "Chocolate chip cookies.", []],
    ["Marie Biscuits - Snackday", "Marie biscuits.", []],
    ["Wacky Jacky", "Sweet and salt cracker biscuit.", []],
  ]),

  // PEPE — Wafers and wafer rolls
  ...makeProducts("pepe", "wafers", [
    ["Waffils", "Crunchy wafer biscuit.", ["Chocolate", "Orange", "Strawberry"]],
    ["Flute", "Cream rolls.", ["Chocolate", "Orange", "Strawberry"]],
    ["Krunchies", "Choco-coated wafer.", []],
    ["Teeny", "Flavoured wafers.", ["Chocolate", "Strawberry"]],
    ["Roooocket", "Strawberry-flavoured wafers.", ["Strawberry"]],
    ["Wafeez", "Flavoured wafers.", ["Chocolate", "Orange", "Strawberry", "Vanilla"]],
    ["Party", "Crunchy enrobed wafer.", []],
    ["First Bite", "Choco-coated wafer.", []],
    ["Yoxo", "Wafer sticks.", ["Chocolate", "Mix Fruit", "Orange", "Mango", "Strawberry"]],
    ["Rocking", "Choco stick.", ["Chocolate"]],
    ["Choco Filled Wafer Rolls", "Chocolate-filled wafer rolls.", ["Chocolate"]],
  ]),

  // PEPE — Candies and eclairs
  ...makeProducts("pepe", "candies", [
    ["Mango 3D", "Candy with centre filling.", []],
    ["Eclairs", "Centre-filled chocolate eclair.", []],
    ["Milky Eclairs", "Milk-flavoured eclair.", []],
    ["Kefi", "Rich coffee cappuccino candy.", ["Coffee", "Cappuccino"]],
    ["CC Stick", "Mixed fruit candy stick.", ["Mix Fruit"]],
    ["Ben 10 CC Stick", "Mixed fruit candy stick.", ["Mix Fruit"]],
    ["Motu Patlu CC Stick", "Mixed fruit candy stick.", ["Mix Fruit"]],
  ]),

  // PEPE — Lollipops
  ...makeProducts("pepe", "lollipops", [
    ["Dip & Joy", "Lollipop with chatpata masala powder.", ["Guava", "Kachaa Aam", "Orange"]],
    ["Ben 10 Ultra Pop", "Novelty lollipop.", []],
    ["Ringo Pop", "Mixed fruit-flavoured lollipop.", ["Mix Fruit"]],
  ]),

  // PEPE — Bubble gum
  ...makeProducts("pepe", "bubble-gum", [
    ["3D Jelly Bubble Gum", "Jelly bubble gum.", ["Orange", "Strawberry", "Watermelon"]],
    ["Olivary Bubble Gum", "Bubble gum product.", []],
  ]),

  // PEPE — Cakes and snacks
  ...makeProducts("pepe", "cakes", [
    ["Cake Joy", "Flavoured layered cake.", ["Banana", "Chocolate", "Strawberry", "Vanilla"]],
  ]),
  ...makeProducts("pepe", "snacks", [
    ["Maddy", "Two-minute snack: saucy masala sticks.", ["Saucy Masala"]],
  ]),

  // PEPE — Cones and novelty products
  ...makeProducts("pepe", "novelty", [
    ["Mr. Fun", "Chocolate cone product.", ["Choco"]],
    ["Fun-3", "Chocolate with surprise toys.", []],
  ]),
];
