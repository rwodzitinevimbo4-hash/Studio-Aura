import React, { useState } from 'react';
import { ShoppingCart, User, ArrowRight, Trash2, Plus, Minus, LogOut } from 'lucide-react';

// Types
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

type CartItem = Product & { quantity: number };

// Mock Data
const PRODUCTS: Product[] = [
  { id: 1, name: "Abstract Harmony", price: 45, image: "https://picsum.photos/seed/art1/600/800", category: "Print" },
  { id: 2, name: "Digital Dreamscape", price: 30, image: "https://picsum.photos/seed/art2/600/800", category: "Digital" },
  { id: 3, name: "Minimalist Geometry", price: 55, image: "https://picsum.photos/seed/art3/600/800", category: "Canvas" },
  { id: 4, name: "Neon Nights", price: 25, image: "https://picsum.photos/seed/art4/600/800", category: "Digital" },
  { id: 5, name: "Ethereal Flora", price: 60, image: "https://picsum.photos/seed/art5/600/800", category: "Print" },
  { id: 6, name: "Urban Decay", price: 40, image: "https://picsum.photos/seed/art6/600/800", category: "Canvas" },
];

const Hero = () => (
  <div className="hero-container">
    <div className="hero-header">
      <div className="hero-logo">
        <div className="logo-icon"></div>
        Studio Aura
      </div>
    </div>
    
    <div className="hero-content">
      <div className="hero-text-block">
        <p>Curated collections for contemporary spaces. Elevate your environment with our exclusive digital and physical prints.</p>
        <div>
          <p className="featured-artist-label">Featured Artist</p>
          <p className="featured-artist-name">Elena Rostova</p>
        </div>
      </div>
      
      <h1 className="hero-title">
        Modern<br />Digital Art<br />& Prints
      </h1>
    </div>
  </div>
);

const ProductGrid = ({ onAdd }: { onAdd: (p: Product) => void }) => (
  <div className="product-grid-container">
    <div className="product-grid-header">
      <h2 className="product-grid-title">Latest Works</h2>
      <button className="view-all-btn">View All</button>
    </div>
    
    <div className="products-grid">
      {PRODUCTS.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-image-container">
            <img 
              src={product.image} 
              alt={product.name}
              className="product-image"
              referrerPolicy="no-referrer"
            />
            <div className="product-overlay">
              <button 
                onClick={(e) => { e.stopPropagation(); onAdd(product); }}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="product-info">
            <div>
              <p className="product-category">{product.category}</p>
              <h3 className="product-name">{product.name}</h3>
            </div>
            <p className="product-price">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CartView = ({ cart, onUpdate, onCheckout, onContinue, cartTotal }: any) => (
  <div className="cart-container">
    <h2 className="cart-title">Your Cart</h2>
    
    {cart.length === 0 ? (
      <div className="empty-cart">
        <p>Your cart is empty.</p>
        <button onClick={onContinue} className="btn-primary">
          Continue Shopping
        </button>
      </div>
    ) : (
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item: CartItem) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image-wrapper">
                <img src={item.image} alt={item.name} className="cart-item-image" referrerPolicy="no-referrer" />
              </div>
              <div className="cart-item-details">
                <div className="cart-item-header">
                  <div>
                    <p className="cart-item-category">{item.category}</p>
                    <h3 className="cart-item-name">{item.name}</h3>
                  </div>
                  <p className="cart-item-price">${item.price * item.quantity}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => onUpdate(item.id, -1)} className="quantity-btn"><Minus size={16} /></button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button onClick={() => onUpdate(item.id, 1)} className="quantity-btn"><Plus size={16} /></button>
                  </div>
                  <button onClick={() => onUpdate(item.id, -item.quantity)} className="remove-btn">
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="order-summary">
          <h3 className="summary-title">Order Summary</h3>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span className="summary-value">${cartTotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="summary-value">Calculated at checkout</span>
            </div>
            <div className="summary-total-row">
              <span className="total-label">Total</span>
              <span className="total-value">${cartTotal}</span>
            </div>
          </div>
          <button onClick={onCheckout} className="btn-primary checkout-btn">
            Proceed to Checkout <ArrowRight size={20} />
          </button>
        </div>
      </div>
    )}
  </div>
);

const CheckoutView = ({ cartTotal, onComplete }: any) => (
  <div className="checkout-container">
    <h2 className="checkout-title">Checkout</h2>
    <div className="checkout-card">
      <form onSubmit={(e) => { e.preventDefault(); onComplete(); }} className="checkout-form">
        <div className="form-section">
          <h3 className="form-section-title">Contact Information</h3>
          <input type="email" placeholder="Email address" required className="form-input" />
        </div>
        
        <div className="form-section">
          <h3 className="form-section-title">Shipping Address</h3>
          <div className="form-grid">
            <input type="text" placeholder="First name" required className="form-input" />
            <input type="text" placeholder="Last name" required className="form-input" />
            <input type="text" placeholder="Address" required className="form-input full-width" />
            <input type="text" placeholder="City" required className="form-input" />
            <input type="text" placeholder="Postal code" required className="form-input" />
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">Payment (Dummy)</h3>
          <div className="demo-notice">
            This is a demo. No actual payment will be processed.
          </div>
          <div>
             <input type="text" placeholder="Card number" required className="form-input mb-4" />
             <div className="form-grid">
               <input type="text" placeholder="MM/YY" required className="form-input" />
               <input type="text" placeholder="CVC" required className="form-input" />
             </div>
          </div>
        </div>

        <div className="checkout-footer">
          <div className="checkout-total-block">
            <p className="checkout-total-label">Total to pay</p>
            <p className="checkout-total-value">${cartTotal}</p>
          </div>
          <button type="submit" className="btn-primary pay-btn">
            Pay Now
          </button>
        </div>
      </form>
    </div>
  </div>
);

const LoginView = ({ onLogin, onRegister, onBack }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="login-container">
      {/* Left side - Template mimic */}
      <div className="login-visual content-relative">
        <div className="login-logo" onClick={onBack}>
          <div className="logo-icon"></div>
          <span className="logo-text">Studio Aura</span>
        </div>
        
        <div className="login-visual-content">
          <h1 className="hero-title">
            {isLogin ? 'Welcome\nBack to\nthe Studio' : 'Start\nYour\nCollection'}
          </h1>
          
          <div className="login-visual-subtitle">
            <p className="mb-4">Curated digital and physical art prints for the modern aesthetic.</p>
            <p className="login-visual-tag">Secure Authentication</p>
          </div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <h2 className="login-title">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="login-subtitle">
            {isLogin ? 'Enter your details to access your account.' : 'Sign up to start collecting art.'}
          </p>
          
          <form onSubmit={(e) => { e.preventDefault(); isLogin ? onLogin() : onRegister(); }} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" required className="form-input" />
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" required className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" required className="form-input" />
            </div>
            
            <button type="submit" className="btn-primary login-btn">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <div className="login-toggle">
            <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutUsView = () => (
  <div className="about-container">
    <div className="about-header">
      <h2 className="about-title">About Us</h2>
      <p className="about-subtitle">Get to know the creator behind Studio Aura.</p>
    </div>
    
    <div className="about-content">
      <div className="about-image-wrapper">
        <img 
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" 
          alt="Studio workspace" 
          className="about-image" 
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="about-details">
        <h3 className="about-heading">The Vision</h3>
        <p className="about-text">
          Studio Aura was founded with a simple mission: to bring curated, modern aesthetics into everyday spaces. 
          We believe that art should be accessible, inspiring, and seamlessly integrated into your lifestyle.
        </p>
        
        <div className="about-creator">
          <h4 className="creator-title">Creator Profile</h4>
          <div className="creator-info">
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">Tinevimbo Rwodzi</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <a href="mailto:rwodzitinevimbo4@gmail.com" className="info-link">rwodzitinevimbo4@gmail.com</a>
            </div>
            <div className="info-row">
              <span className="info-label">Instagram:</span>
              <a href="https://instagram.com/tanaka_tinez" target="_blank" rel="noopener noreferrer" className="info-link">@tanaka_tinez</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'cart' | 'checkout' | 'login' | 'about'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} added to cart!`);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const Navbar = () => (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand" onClick={() => setCurrentView('home')}>
            <div className="logo-icon"></div>
            <span className="logo-text">Studio Aura</span>
          </div>
          
          <div className="navbar-actions">
            {user ? (
              <div className="user-menu">
                <span className="user-email">{user.email}</span>
                <button onClick={() => setUser(null)} className="nav-btn" title="Sign Out">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button onClick={() => setCurrentView('login')} className="nav-btn">
                <User size={20} />
                <span className="nav-text">Sign In</span>
              </button>
            )}
            <button onClick={() => setCurrentView('cart')} className="nav-btn relative">
              <ShoppingCart size={20} />
              <span className="nav-text">Cart</span>
              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="app-container">
      {currentView !== 'login' && <Navbar />}
      
      <main className={currentView !== 'login' ? "main-content" : ""}>
        {currentView === 'home' && (
          <>
            <Hero />
            <ProductGrid onAdd={addToCart} />
          </>
        )}
        {currentView === 'cart' && (
          <CartView 
            cart={cart} 
            onUpdate={updateQuantity} 
            onCheckout={() => setCurrentView('checkout')} 
            onContinue={() => setCurrentView('home')}
            cartTotal={cartTotal}
          />
        )}
        {currentView === 'checkout' && (
          <CheckoutView 
            cartTotal={cartTotal} 
            onComplete={() => {
              alert('Order placed successfully!');
              setCart([]);
              setCurrentView('home');
            }} 
          />
        )}
        {currentView === 'login' && (
          <LoginView 
            onLogin={() => { setUser({ email: 'user@example.com' }); setCurrentView('home'); }}
            onRegister={() => { setUser({ email: 'user@example.com' }); setCurrentView('home'); }}
            onBack={() => setCurrentView('home')}
          />
        )}
        {currentView === 'about' && (
          <AboutUsView />
        )}
      </main>
      
      {currentView !== 'login' && (
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-icon"></div>
                <span className="footer-logo-text">Studio Aura</span>
              </div>
              <p className="footer-description">Curated digital and physical art prints for the modern aesthetic. Elevate your space with our exclusive collections.</p>
            </div>
            <div className="footer-links">
              <h4 className="footer-links-title">Shop</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}>All Products</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}>Digital Designs</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}>Canvas Prints</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4 className="footer-links-title">Support</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('about'); }}>About Us</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Shipping & Returns</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            &copy; {new Date().getFullYear()} Studio Aura. All rights reserved.
          </div>
        </footer>
      )}
    </div>
  );
}
