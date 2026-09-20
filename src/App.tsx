import { CartProvider } from "./store/cart";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandStatement from "./components/BrandStatement";
import SignatureMenu from "./components/SignatureMenu";
import ProductStory from "./components/ProductStory";
import OrderSection from "./components/OrderSection";
import Combo from "./components/Combo";
import BrandStory from "./components/BrandStory";
import Locations from "./components/Locations";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  return (
    <CartProvider>
      <div id="top" className="min-h-screen bg-coal text-bone">
        <a
          href="#menu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[2px] focus:bg-ember focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-coal"
        >
          Skip to menu
        </a>
        <Navbar />
        <main>
          <Hero />
          <BrandStatement />
          <SignatureMenu />
          <ProductStory />
          <OrderSection />
          <Combo />
          <BrandStory />
          <Locations />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
