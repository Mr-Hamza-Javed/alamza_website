/* ============================================================
   Shared UI primitives + technical schematics
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---- Reveal on scroll ---- */
function Reveal({ children, className = "", delay = 0, as = "div", style = {} }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const check = () => {
      if (done || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.9 && r.bottom > 0) {
        done = true;
        setShown(true);
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    // safety net: ensure visible even if events never fire
    const t = setTimeout(() => {if (!done) {done = true;setShown(true);}}, 1400);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      clearTimeout(t);
    };
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ animationDelay: shown ? `${delay}ms` : "0ms", ...style }}>
      
      {children}
    </Tag>);

}

/* ---- Kicker label ---- */
function Kicker({ children, plain }) {
  return <span className={`kicker ${plain ? "kicker--plain" : ""}`}>{children}</span>;
}

/* ---- blueprint placeholder image ---- */
function Placeholder({ label, tag, style = {}, className = "" }) {
  return (
    <div className={`ph ${className}`} data-label={label} style={style}>
      {tag && <span className="ph__tag">{tag}</span>}
    </div>);

}

/* ---- Logo mark ---- */
function LogoMark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="1.2" y="1.2" width="29.6" height="29.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="8.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="2.4" fill="currentColor" />
      <path d="M16 3.6V8.2M16 23.8V28.4M3.6 16H8.2M23.8 16H28.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>);

}

/* ---- Section heading block ---- */
function SecHead({ index, kicker, title, sub, align = "left" }) {
  return (
    <div className="sechead" style={{ textAlign: align }}>
      <Reveal>
        <div className="sechead__top">
          {index && <span className="sechead__idx mono">{index}</span>}
          <Kicker>{kicker}</Kicker>
        </div>
      </Reveal>
      <Reveal delay={70}>
        <h2 className="h-sec sechead__title">{title}</h2>
      </Reveal>
      {sub &&
      <Reveal delay={120}>
          <p className="lead sechead__sub">{sub}</p>
        </Reveal>
      }
    </div>);

}

/* ============================================================
   SCHEMATIC: Engine poppet valve (blueprint, simple primitives)
   ============================================================ */
function ValveSchematic({ className = "", style = {} }) {
  return (
    <svg className={className} style={{ ...style, height: "600px" }} viewBox="0 0 260 380" fill="none"
    stroke="currentColor" aria-label="Engine valve schematic">
      {/* centerline */}
      <line x1="120" y1="14" x2="120" y2="372" stroke="var(--accent-line)" strokeWidth="1" strokeDasharray="3 5" />
      {/* tip + keeper grooves */}
      <rect x="111" y="20" width="18" height="22" strokeWidth="1.3" />
      <line x1="111" y1="28" x2="129" y2="28" strokeWidth="1" opacity="0.6" />
      <line x1="111" y1="34" x2="129" y2="34" strokeWidth="1" opacity="0.6" />
      {/* stem */}
      <rect x="113.5" y="42" width="13" height="226" strokeWidth="1.3" />
      <line x1="120" y1="42" x2="120" y2="268" strokeWidth="0.8" opacity="0.35" />
      {/* fillet transition to head */}
      <path d="M113.5 268 C 100 286, 78 300, 58 318 L 182 318 C 162 300, 140 286, 126.5 268 Z" strokeWidth="1.3" style={{ opacity: "1" }} />
      {/* valve head / face */}
      <path d="M58 318 L 56 332 L 184 332 L 182 318 Z" strokeWidth="1.3" />
      <line x1="56" y1="332" x2="184" y2="332" strokeWidth="1.6" />
      {/* margin line */}
      <line x1="64" y1="324" x2="176" y2="324" strokeWidth="0.8" opacity="0.4" />

      {/* dimension: overall length (right) */}
      <g stroke="var(--accent)" strokeWidth="1">
        <line x1="214" y1="20" x2="214" y2="332" />
        <path d="M210 26 L214 20 L218 26" fill="none" />
        <path d="M210 326 L214 332 L218 326" fill="none" />
        <line x1="208" y1="20" x2="222" y2="20" opacity="0.5" />
        <line x1="208" y1="332" x2="222" y2="332" opacity="0.5" />
      </g>
      <text x="226" y="180" fill="var(--accent)" fontFamily="var(--mono)" fontSize="11" transform="rotate(90 226 180)">OAL · 90.0</text>

      {/* dimension: head diameter (bottom) */}
      <g stroke="var(--accent)" strokeWidth="1">
        <line x1="56" y1="350" x2="184" y2="350" />
        <path d="M62 346 L56 350 L62 354" fill="none" />
        <path d="M178 346 L184 350 L178 354" fill="none" />
      </g>
      <text x="120" y="368" fill="var(--accent)" fontFamily="var(--mono)" fontSize="11" textAnchor="middle">⌀ HEAD · 25.0</text>

      {/* stem dia leader */}
      <g stroke="var(--text-3)" strokeWidth="0.9">
        <line x1="126.5" y1="120" x2="170" y2="100" />
        <circle cx="126.5" cy="120" r="1.6" fill="var(--text-3)" stroke="none" />
      </g>
      <text x="172" y="98" fill="var(--text-3)" fontFamily="var(--mono)" fontSize="10.5">⌀ STEM · 5.0</text>

      {/* angle callout */}
      <text x="36" y="312" fill="var(--text-3)" fontFamily="var(--mono)" fontSize="10.5">45°</text>
    </svg>);

}

/* ============================================================
   SCHEMATIC: Cylinder sleeve / liner (blueprint)
   ============================================================ */
function SleeveSchematic({ className = "", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 300 360" fill="none"
    stroke="currentColor" aria-label="Cylinder sleeve schematic">
      {/* centerline */}
      <line x1="150" y1="16" x2="150" y2="344" stroke="var(--accent-line)" strokeWidth="1" strokeDasharray="3 5" />
      {/* top flange */}
      <path d="M86 30 H214 V44 H86 Z" strokeWidth="1.3" />
      {/* outer body */}
      <path d="M96 44 V330 M204 44 V330" strokeWidth="1.3" />
      {/* inner bore walls */}
      <path d="M118 44 V330 M182 44 V330" strokeWidth="1.3" />
      {/* bottom */}
      <path d="M96 330 H204" strokeWidth="1.3" />
      <path d="M118 330 H182" strokeWidth="1" opacity="0.5" />
      {/* hatching on walls (section) */}
      <g stroke="var(--line-2)" strokeWidth="0.8">
        <line x1="96" y1="60" x2="118" y2="48" /><line x1="96" y1="84" x2="118" y2="72" />
        <line x1="96" y1="108" x2="118" y2="96" /><line x1="96" y1="132" x2="118" y2="120" />
        <line x1="96" y1="156" x2="118" y2="144" /><line x1="96" y1="180" x2="118" y2="168" />
        <line x1="96" y1="204" x2="118" y2="192" /><line x1="96" y1="228" x2="118" y2="216" />
        <line x1="96" y1="252" x2="118" y2="240" /><line x1="96" y1="276" x2="118" y2="264" />
        <line x1="96" y1="300" x2="118" y2="288" /><line x1="96" y1="320" x2="118" y2="308" />
        <line x1="182" y1="48" x2="204" y2="60" /><line x1="182" y1="72" x2="204" y2="84" />
        <line x1="182" y1="96" x2="204" y2="108" /><line x1="182" y1="120" x2="204" y2="132" />
        <line x1="182" y1="144" x2="204" y2="156" /><line x1="182" y1="168" x2="204" y2="180" />
        <line x1="182" y1="192" x2="204" y2="204" /><line x1="182" y1="216" x2="204" y2="228" />
        <line x1="182" y1="240" x2="204" y2="252" /><line x1="182" y1="264" x2="204" y2="276" />
        <line x1="182" y1="288" x2="204" y2="300" /><line x1="182" y1="308" x2="204" y2="320" />
      </g>
      {/* bore dia dim */}
      <g stroke="var(--accent)" strokeWidth="1">
        <line x1="118" y1="200" x2="182" y2="200" />
        <path d="M124 196 L118 200 L124 204" fill="none" />
        <path d="M176 196 L182 200 L176 204" fill="none" />
      </g>
      <rect x="129" y="190" width="42" height="20" fill="var(--bg)" stroke="none" />
      <text x="150" y="204" fill="var(--accent)" fontFamily="var(--mono)" fontSize="11" textAnchor="middle">⌀47.0</text>
      {/* height dim */}
      <g stroke="var(--accent)" strokeWidth="1">
        <line x1="238" y1="30" x2="238" y2="330" />
        <path d="M234 36 L238 30 L242 36" fill="none" />
        <path d="M234 324 L238 330 L242 324" fill="none" />
      </g>
      <text x="250" y="180" fill="var(--accent)" fontFamily="var(--mono)" fontSize="11" transform="rotate(90 250 180)">H · 96.0</text>
      {/* flange leader */}
      <text x="60" y="40" fill="var(--text-3)" fontFamily="var(--mono)" fontSize="10.5" textAnchor="end">FLANGE</text>
      <line x1="63" y1="37" x2="86" y2="37" stroke="var(--text-3)" strokeWidth="0.8" />
    </svg>);

}

Object.assign(window, { Reveal, Kicker, Placeholder, LogoMark, SecHead, ValveSchematic, SleeveSchematic });