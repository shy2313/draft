# Social Snap Studio

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>ஒviyam Studio | Immersive Social Photoshoot</title>
  <!-- Google Fonts & Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <!-- AOS Library for scroll animations -->
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: #030303;
      color: #f0ece3;
      overflow-x: hidden;
    }

    /* custom scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #111;
    }
    ::-webkit-scrollbar-thumb {
      background: #d4af37;
      border-radius: 10px;
    }

    h1, h2, h3, .logo, .glow-text {
      font-family: 'Playfair Display', serif;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 40px;
    }

    /* ===== DEEP UI ELEMENTS ===== */
    .gold-border {
      border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    }

    /* Hero Parallax Background */
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: radial-gradient(circle at 20% 30%, #0a0806, #000000);
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" opacity="0.08"><path fill="none" stroke="%23d4af37" stroke-width="1.2" d="M0,400 L1200,400 M600,0 L600,800 M300,200 L900,200 M200,500 L1000,500 M100,600 L1100,600 M500,100 L700,700" stroke-dasharray="6 8"/><circle cx="200" cy="200" r="80" stroke="%23d4af37" stroke-width="0.6" fill="none"/><circle cx="1000" cy="600" r="120" stroke="%23d4af37" stroke-width="0.5" fill="none"/></svg>');
      background-repeat: repeat;
      background-size: 400px;
      pointer-events: none;
      animation: slowDrift 90s linear infinite;
    }

    @keyframes slowDrift {
      0% { background-position: 0 0; }
      100% { background-position: 400px 400px; }
    }

    /* Navigation - Glassmorphic */
    header {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(212, 175, 55, 0.25);
      transition: all 0.3s;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 40px;
      flex-wrap: wrap;
    }

    .logo .main-name {
      font-size: 2rem;
      font-weight: 700;
      color: #d4af37;
      letter-spacing: -0.3px;
    }

    .logo .tagline {
      font-size: 0.7rem;
      letter-spacing: 2px;
      color: #d4af37aa;
    }

    .nav-links {
      display: flex;
      gap: 42px;
      list-style: none;
    }

    .nav-links a {
      text-decoration: none;
      font-weight: 500;
      color: #e0d6c5;
      transition: 0.2s;
      font-size: 0.95rem;
      letter-spacing: 0.3px;
    }

    .nav-links a:hover {
      color: #d4af37;
    }

    .btn-glow {
      background: transparent;
      border: 1px solid #d4af37;
      padding: 10px 28px;
      border-radius: 40px;
      font-weight: 600;
      color: #d4af37;
      cursor: pointer;
      transition: 0.25s;
      box-shadow: 0 0 6px rgba(212,175,55,0.2);
    }

    .btn-glow:hover {
      background: #d4af37;
      color: #030303;
      box-shadow: 0 0 20px rgba(212,175,55,0.6);
      transform: scale(1.02);
    }

    /* Hero content */
    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 900px;
      margin: 0 auto;
      padding: 120px 20px;
    }

    .hero h1 {
      font-size: 5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #fff2df, #d4af37, #b38f40);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      margin-bottom: 24px;
      letter-spacing: -1px;
    }

    .hero-glow {
      text-shadow: 0 0 15px rgba(212,175,55,0.3);
    }

    .hero p {
      font-size: 1.25rem;
      color: #cdc2ae;
      max-width: 700px;
      margin: 0 auto 32px;
      line-height: 1.6;
    }

    /* premium badge */
    .scroll-indicator {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      animation: bounce 2s infinite;
      color: #d4af37;
      font-size: 1.8rem;
    }

    @keyframes bounce {
      0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.6; }
      50% { transform: translateX(-50%) translateY(10px); opacity: 1; }
    }

    /* Packages section - deep card design */
    .packages {
      padding: 100px 0;
      background: #020202;
      position: relative;
    }

    .section-title {
      text-align: center;
      font-size: 3rem;
      font-weight: 700;
      color: #d4af37;
      margin-bottom: 20px;
    }

    .section-sub {
      text-align: center;
      color: #aa9f86;
      margin-bottom: 70px;
      font-size: 1rem;
      letter-spacing: 1px;
    }

    .packages-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 48px;
    }

    .deep-card {
      background: rgba(15, 15, 15, 0.8);
      backdrop-filter: blur(2px);
      border-radius: 32px;
      padding: 36px 28px;
      transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
      border: 1px solid rgba(212, 175, 55, 0.2);
      box-shadow: 0 20px 35px -15px rgba(0,0,0,0.8);
      position: relative;
      overflow: hidden;
    }

    .deep-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent);
      transition: 0.6s;
    }

    .deep-card:hover::after {
      left: 100%;
    }

    .deep-card:hover {
      transform: translateY(-12px);
      border-color: rgba(212, 175, 55, 0.7);
      box-shadow: 0 28px 40px -12px rgba(212,175,55,0.2);
    }

    .card-icon {
      font-size: 2.8rem;
      color: #d4af37;
      margin-bottom: 20px;
    }

    .deep-card h3 {
      font-size: 1.8rem;
      margin-bottom: 12px;
      color: #ecd89e;
    }

    .price {
      font-size: 1.8rem;
      font-weight: 800;
      color: #e5bc6e;
      margin: 18px 0 12px;
    }

    .desc {
      color: #bcaf95;
      line-height: 1.5;
      margin-bottom: 18px;
    }

    /* Immersive Gallery - 3D hover */
    .immersive-gallery {
      padding: 80px 0;
      background: #000000cb;
      background-image: radial-gradient(circle at 10% 20%, #1f1a10 0%, #020202 90%);
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-top: 40px;
    }

    .gallery-tile {
      position: relative;
      border-radius: 28px;
      overflow: hidden;
      aspect-ratio: 1 / 1.1;
      background: #1e1912;
      border: 1px solid rgba(212,175,55,0.3);
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
    }

    .gallery-tile i {
      font-size: 3.2rem;
      color: #d4af37;
      margin-bottom: 15px;
      transition: 0.2s;
    }

    .gallery-tile span {
      font-weight: 500;
      letter-spacing: 1px;
    }

    .gallery-tile:hover {
      transform: scale(1.02);
      border-color: #d4af37;
      background: #2c241a;
      box-shadow: 0 0 28px rgba(212,175,55,0.2);
    }

    /* Testimonial / social proof */
    .testimonial {
      background: #0a0704;
      padding: 90px 0;
      text-align: center;
    }

    .testimonial-card {
      max-width: 800px;
      margin: 0 auto;
      background: #11100c;
      border-radius: 60px;
      padding: 48px 40px;
      border: 1px solid #d4af3720;
      box-shadow: 0 20px 30px -12px black;
    }

    .testimonial-card i {
      font-size: 2.5rem;
      color: #d4af37;
      margin-bottom: 20px;
    }

    .testimonial-card p {
      font-size: 1.3rem;
      font-style: italic;
      color: #f2e1c0;
    }

    /* CTA Section with depth */
    .cta-deep {
      padding: 100px 0;
      background: linear-gradient(145deg, #000000, #0e0b07);
      text-align: center;
      border-top: 1px solid #d4af3715;
    }

    .cta-gold {
      font-size: 3rem;
      font-weight: bold;
      color: #d4af37;
      margin-bottom: 20px;
    }

    /* Footer */
    footer {
      background: #020202;
      padding: 55px 0 35px;
      border-top: 1px solid #d4af3720;
      text-align: center;
    }

    .social-icons i {
      font-size: 1.6rem;
      margin: 0 15px;
      color: #d4af37;
      transition: 0.2s;
    }

    .social-icons i:hover {
      transform: translateY(-5px);
      color: #ffdf99;
    }

    @media (max-width: 768px) {
      .container {
        padding: 0 24px;
      }
      .hero h1 {
        font-size: 2.8rem;
      }
      .navbar {
        flex-direction: column;
        gap: 14px;
        padding: 16px 24px;
      }
      .nav-links {
        gap: 28px;
        flex-wrap: wrap;
        justify-content: center;
      }
      .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .section-title {
        font-size: 2.2rem;
      }
      .cta-gold {
        font-size: 2rem;
      }
    }
  






    


      

ஒviyam Studio


      

PHOTOGRAPHY & FILMS


    


    


      

HOME


      

PACKAGES


      

THE SOCIAL MOMENTS


      

CONNECT


    


    BOOK INSPIRATION






    


      

Social Photoshoot
Experiences


      

Step into a world where every frame tells your story — curated for the modern soul. Prewedding, Graduation, Maternity, Birthday & Personal.


      Explore Collections →
    


    


      
    



  


    


      

Our Signature Packages


      

tailored for every milestone • cinematic & authentic


      


        
        


          


          

💍 Pre-Wedding


          

RM1500


          

Capture your love story with a romantic and cinematic photoshoot. Perfect for couples who want timeless memories before their big day.


          ✦ cinematic couple ✦
        


        
        


          


          

🎓 Graduation


          

RM600


          

Celebrate your achievements with a professional shoot that highlights your success and unforgettable milestone moments.


          ✦ honor frame ✦
        


        
        


          


          

🤰 Maternity


          

RM600


          

Preserve the beauty of motherhood with elegant and heartfelt photos that you will cherish forever.


          ✦ radiant glow ✦
        


        
        


          


          

🎉 Birthday


          

RM1000


          

Make your special day unforgettable with vibrant and fun-filled photos capturing every joyful moment.


          ✦ celebration soul ✦
        


        
        


          


          

📷 Personal


          

RM800


          

Perfect for individuals looking to create stunning portraits for personal branding, social media, or keepsakes.


          ✦ signature portrait ✦
        


      


    



  


    


      

Social Frames


      

moments that go viral • visual storytelling


      


        

Pre-Wedding Diaries


        

Grad Celebrations


        

Maternity Elegance


        

Birthday Energy


      


    



  


    


      


        
        

"The most immersive photoshoot experience — every detail felt curated for our social vibe. The gold-black aesthetic is unmatched!"


        

— Aina & Riz, Prewedding


      


    



  


    


      


        

Create your Signature Moment


        

Let’s craft a session that resonates with your soul. Reach out for bespoke packages.


        Request a consultation →
        


          
          

 +60 16-749 6806


          

 studio@oviyam.com</span></div>
          

 @oviyam.studio</span></div>
        
      
    
  





    


      
      
      
      
    


    


      About
      Portfolio
      Investment
    


    

© 2025 ஒviyam Studio — Black & Gold Aesthetics | Social Photoshoot Curators





@2.3.1/dist/aos.js"></script>
<script>
  AOS.init({
    duration: 800,
    once: true,
    offset: 50
  });

  const toast = document.getElementById('toastDeep');
  function showDeepToast(msg) {
    toast.style.opacity = '1';
    toast.textContent = msg || "✨ We'll craft your dream social shoot. Our team will reach out shortly ✨";
    setTimeout(() => { toast.style.opacity = '0'; }, 3000);
  }

  // navigation interactions + smooth scroll
  document.querySelectorAll('.nav-links a, #exploreDeepBtn, #ctaNavBtn, #deepInquiryBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if(btn.id === 'exploreDeepBtn') {
        e.preventDefault();
        document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
      } else if(btn.id === 'ctaNavBtn' || btn.id === 'deepInquiryBtn') {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        showDeepToast("📸 Let's create magic — send us a message, we'll reply within 12h.");
      } else if(btn.getAttribute('href') && btn.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = btn.getAttribute('href').substring(1);
        const el = document.getElementById(target);
        if(el) el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Optional: gallery click message
  const tiles = document.querySelectorAll('.gallery-tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      showDeepToast("🌟 This story can be yours. Book your social photoshoot session today.");
    });
  });

  // active link highlight based on scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if(scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });
    navItems.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if(href === current) link.style.color = '#d4af37';
      else link.style.color = '#e0d6c5';
    });
  });
</script>
</body>
</html>

Add this picture as view

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mahaphotoshoot.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3886d25b-161a-475a-ac3a-bdf820d08758).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
