/* ============================================================
   Nav · Hero · About · Products
   ============================================================ */

/* ---------------- NAV ---------------- */
function Nav({ onApply }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["About", "#about"],
    ["Products", "#products"],
    ["Quality", "#quality"],
    ["Clients", "#clients"],
    ["Careers", "#careers"],
  ];
  return (
    <header className={`nav ${scrolled ? "nav--solid" : ""}`}>
      <div className="nav__inner wrap">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__mark"><LogoMark size={26} /></span>
          <span className="nav__name">
            ALAMZA <span className="nav__name-sub">INDUSTRY</span>
          </span>
        </a>
        <nav className="nav__links">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="nav__link">{label}</a>
          ))}
        </nav>
        <div className="nav__right">
          <button className="btn btn--primary nav__cta" onClick={onApply}>
            Apply as Intern <span className="arr">→</span>
          </button>
          <button className={`nav__burger ${open ? "is-open" : ""}`} aria-label="Menu" onClick={() => setOpen(v => !v)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div className={`nav__mobile ${open ? "is-open" : ""}`}>
        {links.map(([label, href]) => (
          <a key={href} href={href} className="nav__mobile-link" onClick={() => setOpen(false)}>{label}</a>
        ))}
        <button className="btn btn--primary" onClick={() => { setOpen(false); onApply(); }}>
          Apply as Intern <span className="arr">→</span>
        </button>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ onApply }) {
  return (
    <section className="hero" id="top">
      <div className="hero__grid-glow" aria-hidden="true"></div>
      <div className="hero__inner wrap">
        <div className="hero__copy">
          <Reveal className="hero__loc">
            <span className="mono">EST. SAHIWAL · PUNJAB · PAKISTAN</span>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="hero__title">
              <span className="hero__title-line">PRECISION</span>
              <span className="hero__title-line hero__title-line--accent">ENGINE</span>
              <span className="hero__title-line">COMPONENTS</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="hero__lead">
              Alamza Industry manufactures high-tolerance <strong>engine valves</strong> and
              <strong> cylinder sleeves</strong> for motorcycles — engineered, ground and
              inspected to OEM specification.
            </p>
          </Reveal>
          <Reveal delay={210} className="hero__cta-row">
            <a href="#products" className="btn btn--primary">Explore Products <span className="arr">→</span></a>
            <button className="btn btn--ghost" onClick={onApply}>Internship Program</button>
          </Reveal>
          <Reveal delay={280} className="hero__meta">
            <div className="hero__meta-item">
              <span className="hero__meta-k mono">TOLERANCE</span>
              <span className="hero__meta-v">±0.005<span className="hero__meta-u"> mm</span></span>
            </div>
            <div className="hero__meta-item">
              <span className="hero__meta-k mono">PRODUCT LINES</span>
              <span className="hero__meta-v">04</span>
            </div>
            <div className="hero__meta-item">
              <span className="hero__meta-k mono">PROCESS</span>
              <span className="hero__meta-v">CNC<span className="hero__meta-u"> ground</span></span>
            </div>
          </Reveal>
        </div>

        <div className="hero__visual">
          <Reveal delay={120} className="hero__schematic corner-mark">
            <div className="hero__schematic-head">
              <span className="mono">DWG · AL-VLV-001</span>
              <span className="mono dim">REV C</span>
            </div>
            <ValveSchematic className="hero__valve" style={{ color: "var(--text-2)" }} />
            <div className="hero__schematic-foot mono">
              <span>MAT'L · 21-4N STEEL</span>
              <span>SCALE 1:1</span>
            </div>
          </Reveal>
          <div className="hero__visual-tick mono" aria-hidden="true">
            <span>0</span><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span>
          </div>
        </div>
      </div>

      <div className="hero__ticker">
        <div className="hero__ticker-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="hero__ticker-row mono" aria-hidden={i === 1}>
              ENGINE VALVES <i>◇</i> CYLINDER SLEEVES <i>◇</i> VALVE GUIDES <i>◇</i> VALVE SEAT INSERTS
              <i>◇</i> CNC GRINDING <i>◇</i> HEAT TREATMENT <i>◇</i> HARD CHROME <i>◇</i> METROLOGY <i>◇</i>&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  const stats = [
    ["25+", "Years of manufacturing", "Serving the local two-wheeler aftermarket since the late 1990s."],
    ["04", "Core product lines", "Valves, sleeves, guides and seat inserts under one roof."],
    ["±5µm", "Working tolerance", "Held across grinding, lapping and final inspection."],
    ["100%", "Inspected output", "Every batch verified before it leaves the floor."],
  ];
  return (
    <section className="section about" id="about">
      <div className="wrap">
        <div className="about__top">
          <div className="about__lead-col">
            <SecHead index="01" kicker="The Company" title={<>Built on tolerances,<br/>not tolerance for error.</>} />
          </div>
          <div className="about__body-col">
            <Reveal delay={80}>
              <p className="lead about__p">
                From a single grinding line in Sahiwal, Alamza Industry has grown into a
                trusted manufacturer of motorcycle engine internals. We specialise in the two
                components an engine can least afford to get wrong — the <strong>valve</strong> and
                the <strong>sleeve</strong>.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="about__p dim">
                Our work pairs hardened tooling and CNC precision with hands-on metrology.
                Material selection, heat treatment, grinding and final gauging happen in-house,
                so every part we ship carries one signature: consistency.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="about__media">
          <Placeholder
            tag="FACILITY"
            label="Photo — factory floor / CNC grinding line, Sahiwal"
            style={{ aspectRatio: "16 / 7", width: "100%" }}
          />
        </Reveal>

        <div className="about__stats">
          {stats.map(([k, t, d], i) => (
            <Reveal key={k} delay={i * 70} className="about__stat corner-mark">
              <div className="about__stat-k">{k}</div>
              <div className="about__stat-t">{t}</div>
              <div className="about__stat-d dim">{d}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, About });
