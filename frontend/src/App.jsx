
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import {
  clearCart,
  removeFromCart,
  selectCartCount,
  selectCartItems,
  updateQuantity,
} from "./features/cart/cartSlice";

export default function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />
      <Home />
      <Footer />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={(id) => dispatch(removeFromCart(id))}
        onQuantityChange={(id, quantity) =>
          dispatch(updateQuantity({ id, quantity }))
        }
        onClear={() => dispatch(clearCart())}
      />
    </>
  );
}
