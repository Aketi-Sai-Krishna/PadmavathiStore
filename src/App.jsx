import { useEffect, useState } from "react";
import Home from "./pages/Home.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import CartPage from "./pages/CartPage.jsx";
import CataloguePage from "./pages/CataloguePage.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function getRoute() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const categoryMatch = path.match(/^\/category\/([^/]+)$/);
  const productMatch = path.match(/^\/product\/([^/]+)$/);
  if (categoryMatch) return { type: "category", slug: decodeURIComponent(categoryMatch[1]) };
  if (productMatch) return { type: "product", productId: decodeURIComponent(productMatch[1]) };
  if (path === "/cart") return { type: "cart" };
  if (path === "/catalogue") return { type: "catalogue" };
  return { type: "home" };
}
function RoutedApp() {
  const [route, setRoute] = useState(getRoute);
  useEffect(() => {
    const update = () => setRoute(getRoute());
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  if (route.type === "category") return <CategoryPage slug={route.slug}/>;
  if (route.type === "product") return <ProductDetails productId={route.productId}/>;
  if (route.type === "cart") return <CartPage/>;
  if (route.type === "catalogue") return <CataloguePage/>;
  return <Home/>;
}
export default function App() {
  return <CartProvider><RoutedApp/></CartProvider>;
}
