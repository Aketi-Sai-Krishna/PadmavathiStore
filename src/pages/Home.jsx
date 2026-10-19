import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ArrowDownRight, Check, Package, MapPin, Handshake, Sparkles } from "lucide-react";
import ThreeHero from "../components/ThreeHero.jsx";
import BrandMarquee from "../components/BrandMarquee.jsx";
import Header from "../components/Header.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { categories } from "../data/categories.js";

function App() {
  const [reducedMotion, setReducedMotion] = useState(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    document.body.classList.toggle("reduce-motion", reducedMotion);
    window.dispatchEvent(new CustomEvent("padmavathi-motion-change", { detail: reducedMotion }));
  }, [reducedMotion]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="hero-section" id="home">
          <div className="hero-orbit hero-orbit-one" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow-pill"><span className="status-dot" /> Your local wholesale partner · Pithapuram</div>
              <h1>Good products.<br />Great business.<br /><em>Every day.</em></h1>
              <p className="hero-description">
                From everyday biscuits and chocolates to refreshing drinks and nostalgic
                South Indian snacks, we bring the products your customers love, closer to your business.
              </p>
              <div className="hero-actions">
                <a href="#categories" className="btn btn-dark">Explore categories <ArrowUpRight size={17} /></a>
                <a href="#contact" className="btn btn-light">Wholesale enquiry <ArrowRight size={17} /></a>
              </div>
              <div className="hero-note">
                <div className="mini-photo-stack" aria-hidden="true">
                  <span>🍪</span><span>🍫</span><span>🥤</span>
                </div>
                <p>Serving Pithapuram and nearby areas<br /><strong>Products for local retailers and businesses</strong></p>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-visual-glow" />
              <ThreeHero reducedMotion={reducedMotion} />
              <div className="float-card float-card-left">
                <span className="float-icon">🍪</span><span><strong>Everyday favourites</strong><small>Biscuits & snacks</small></span>
              </div>
              <div className="float-card float-card-right">
                <span className="float-icon green">📦</span><span><strong>Wholesale supply</strong><small>For local retailers</small></span>
              </div>
              <div className="float-card float-card-bottom">
                <span className="float-icon peach">🥤</span><span><strong>More variety</strong><small>Drinks & daily essentials</small></span>
              </div>
            </div>
          </div>
        </section>

        <section className="service-band" aria-label="Store highlights">
          <div className="container service-grid">
            <div><Package /><span><strong>Wholesale focused</strong><small>Business-friendly supply</small></span></div>
            <div><Sparkles /><span><strong>Product variety</strong><small>Snacks to daily essentials</small></span></div>
            <div><MapPin /><span><strong>Local expertise</strong><small>Pithapuram, Andhra Pradesh</small></span></div>
            <div><Handshake /><span><strong>Personal support</strong><small>Talk to our team</small></span></div>
          </div>
        </section>

        <BrandMarquee />

        <section className="section categories-section" id="categories">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">Explore our range</span>
                <h2>Our popular <em>categories</em></h2>
                <p>Everything your customers love, one wholesale partner away.</p>
              </div>
              <span className="heading-note">Browse the range <ArrowDownRight size={19} /></span>
            </div>
            <div className="category-grid">
              {categories.map((category, index) => (
                <CategoryCard key={category.title} category={category} index={index} />
              ))}
            </div>
            <p className="category-footnote">Product selection and availability may vary. Contact us for current stock and wholesale pricing.</p>
          </div>
        </section>

        <section className="wholesale-section" id="wholesale">
          <div className="container wholesale-panel">
            <div className="wholesale-copy reveal">
              <span className="eyebrow">Made for local business</span>
              <h2>Your shelves.<br /><em>Our product range.</em></h2>
              <p>Keep your shelves ready with popular packaged products, snacks, drinks and daily essentials from a local wholesale partner.</p>
              <ul className="benefit-list">
                <li><Check size={17} /> Multiple product categories</li>
                <li><Check size={17} /> Wholesale availability enquiries</li>
                <li><Check size={17} /> Personal communication</li>
                <li><Check size={17} /> Local business relationships</li>
              </ul>
              <WhatsAppButton message="Hello Padmavathi Stores! I run a retail business and would like to discuss wholesale products, availability and pricing.">
                Discuss your requirements <ArrowUpRight size={17} />
              </WhatsAppButton>
            </div>
            <div className="wholesale-visual reveal">
              <div className="wholesale-photo">
                <img src="https://images.unsplash.com/photo-1604719312566-8912e9c8a213?auto=format&fit=crop&w=1400&q=85" alt="Shelves stocked with products in a retail store" loading="lazy" />
                <div className="photo-overlay" />
                <div className="photo-caption"><span className="caption-mark">P</span><span><strong>PADMAVATHI STORES</strong><small>Wholesale · Distribution</small></span></div>
              </div>
              <div className="visual-sticker">A trusted local connection <span>↗</span></div>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">The Padmavathi difference</span>
                <h2>Local roots.<br /><em>Everyday value.</em></h2>
              </div>
              <p className="heading-description">Our goal is simple: help local retailers find the products their customers ask for.</p>
            </div>
            <div className="benefit-cards">
              <article className="benefit-card reveal"><span className="benefit-emoji">🧺</span><h3>Variety in one place</h3><p>Explore FMCG categories, from packaged snacks and confectionery to drinks and personal care.</p></article>
              <article className="benefit-card reveal"><span className="benefit-emoji">📍</span><h3>Rooted in Pithapuram</h3><p>A local wholesale business serving retailers around Pithapuram and nearby Kakinada areas.</p></article>
              <article className="benefit-card reveal"><span className="benefit-emoji">🤝</span><h3>Easy to get in touch</h3><p>Ask about stock, wholesale quantities, pricing and potential business partnerships.</p></article>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-banner reveal">
            <div><span className="eyebrow">Let's do business</span><h2>Looking for a wholesale supply partner?</h2><p>Tell us about your shop and the products you need. Let's discuss how Padmavathi Stores can help.</p></div>
            <WhatsAppButton message="Hello Padmavathi Stores! I am interested in wholesale products. Please share product availability and pricing.">
              Chat on WhatsApp <ArrowUpRight size={17} />
            </WhatsAppButton>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-about">
            <a className="brand" href="#home"><span className="brand-mark">P</span><span className="brand-text"><strong>Padmavathi Stores</strong><small>WHOLESALE & DISTRIBUTION</small></span></a>
            <p>Your local destination for popular snacks, biscuits, chocolates, drinks and everyday FMCG products in Pithapuram, Andhra Pradesh.</p>
          </div>
          <div className="footer-col"><h3>Explore</h3><a href="#home">Home</a><a href="#categories">Categories</a><a href="#wholesale">Wholesale supply</a><a href="#about">About us</a></div>
          <div className="footer-col"><h3>Product range</h3><a href="#categories">Snacks & namkeen</a><a href="#categories">Biscuits & chocolates</a><a href="#categories">Drinks & dairy</a><a href="#categories">Daily essentials</a></div>
          <div className="footer-col"><h3>Visit or contact</h3><p>Pithapuram, Andhra Pradesh, India</p><a href="#contact">Wholesale enquiries <ArrowUpRight size={14} /></a><p className="footer-small">Contact us to confirm exact address, operating hours and current product availability.</p></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Padmavathi Stores. All rights reserved.</span><span>Made for local business.</span></div>
      </footer>

      <button className="motion-toggle" onClick={() => setReducedMotion((value) => !value)} aria-pressed={reducedMotion}>
        {reducedMotion ? "▶ Enable motion" : "◉ Reduce motion"}
      </button>
    </>
  );
}

export default App;