/* ============================================================
   Contact CTA + Footer
   ============================================================ */
function Footer({ onApply }) {
  const year = new Date().getFullYear();
  return (
    <>
      <section className="section contact" id="contact">
        <div className="wrap">
          <div className="contact__cta corner-mark">
            <div className="contact__cta-bg" aria-hidden="true"></div>
            <div className="contact__cta-inner">
              <Reveal><span className="kicker">Let's talk specs</span></Reveal>
              <Reveal delay={70}>
                <h2 className="contact__title">
                  Need valves or sleeves<br />built to your drawing?
                </h2>
              </Reveal>
              <Reveal delay={140} className="contact__actions">
                <a href="mailto:info@alamzaindustry.com" className="btn btn--primary">
                  Request a Quote <span className="arr">→</span>
                </a>
                <button className="btn btn--ghost" onClick={onApply}>Apply as Intern</button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <div className="footer__top">
            <div className="footer__brand">
              <span className="footer__mark"><LogoMark size={30} /></span>
              <div>
                <div className="footer__name">ALAMZA INDUSTRY</div>
                <div className="footer__tag mono dim">Precision motorcycle engine components</div>
              </div>
            </div>
            <div className="footer__cols">
              <div className="footer__col">
                <span className="footer__col-h mono">Navigate</span>
                <a href="#about">About</a>
                <a href="#products">Products</a>
                <a href="#quality">Quality</a>
                <a href="#careers">Careers</a>
              </div>
              <div className="footer__col">
                <span className="footer__col-h mono">Products</span>
                <a href="#products">Engine Valves</a>
                <a href="#products">Cylinder Sleeves</a>
                <a href="#products">Valve Guides</a>
                <a href="#products">Seat Inserts</a>
              </div>
              <div className="footer__col footer__col--wide">
                <span className="footer__col-h mono">Contact</span>
                <a href="mailto:info@alamzaindustry.com">info@alamzaindustry.com</a>
                <a href="tel:+92000000000">+92 (0) 00 0000000</a>
                <span className="footer__addr dim">Industrial Estate, Sahiwal,<br />Punjab, Pakistan</span>
              </div>
            </div>
          </div>
          <div className="footer__bar">
            <span className="mono dim">© {year} ALAMZA INDUSTRY · ALL RIGHTS RESERVED</span>
            <span className="mono dim">SAHIWAL · PK · 31.97°N 73.10°E</span>
          </div>
        </div>
      </footer>
    </>
  );
}
Object.assign(window, { Footer });
