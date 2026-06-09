/* ============================================================
   Products · Quality · Clients
   ============================================================ */

/* ---------------- PRODUCTS ---------------- */
function ProductFeature({ idx, name, code, blurb, specs, schematic, reversed }) {
  return (
    <Reveal className={`pf ${reversed ? "pf--rev" : ""}`}>
      <div className="pf__visual corner-mark">
        <div className="pf__visual-head mono">
          <span>{code}</span>
          <span className="dim">SECTION VIEW</span>
        </div>
        {schematic}
        <div className="pf__visual-foot mono dim">
          <span>BLUEPRINT · NOT TO SCALE</span>
        </div>
      </div>
      <div className="pf__info">
        <span className="pf__idx mono accent">{idx}</span>
        <h3 className="pf__name">{name}</h3>
        <p className="pf__blurb">{blurb}</p>
        <dl className="pf__specs">
          {specs.map(([k, v]) => (
            <div className="pf__spec" key={k}>
              <dt className="mono">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}

function Products() {
  const small = [
    {
      idx: "03", name: "Valve Guides", code: "AL-GDE-003",
      blurb: "Precision-bored guides that keep valve stems true and manage heat transfer across thousands of cycles.",
      specs: [["MATERIAL", "Leaded bronze / cast iron"], ["BORE", "Reamed ±0.008 mm"], ["FIT", "Interference, OEM spec"]],
      label: "Product — valve guides, bronze & cast iron",
    },
    {
      idx: "04", name: "Valve Seat Inserts", code: "AL-SET-004",
      blurb: "Hardened seat inserts that seal the combustion chamber and resist wear at sustained temperature.",
      specs: [["MATERIAL", "Alloy / sintered steel"], ["HARDNESS", "42–48 HRC"], ["FINISH", "Ground 3-angle seat"]],
      label: "Product — valve seat inserts, hardened",
    },
  ];
  return (
    <section className="section products" id="products">
      <div className="wrap">
        <SecHead
          index="02"
          kicker="What We Make"
          title="Two parts. Zero compromise."
          sub="Our catalogue centres on the components that decide how an engine breathes and seals. Every line is built for the high-volume motorcycle market — 70cc to 150cc and beyond."
        />

        <div className="products__features">
          <ProductFeature
            idx="01"
            name="Engine Valves"
            code="AL-VLV-001"
            blurb="Intake and exhaust valves forged from heat-resistant alloy steel, hardened and precision-ground for a perfect seal under combustion load."
            specs={[
              ["MATERIAL", "21-4N / EN52 alloy steel"],
              ["STEM ⌀", "5.0 / 5.5 mm"],
              ["TOLERANCE", "±0.005 mm"],
              ["FACE", "Induction hardened 45°"],
            ]}
            schematic={<ValveSchematic className="pf__svg" style={{ color: "var(--text-2)" }} />}
          />
          <ProductFeature
            idx="02"
            name="Cylinder Sleeves"
            code="AL-SLV-002"
            blurb="Centrifugally cast iron liners, honed to a controlled crosshatch for ring sealing and long service life."
            reversed
            specs={[
              ["MATERIAL", "Centrifugal cast iron"],
              ["BORE ⌀", "47 – 57 mm"],
              ["FINISH", "Plateau honed"],
              ["TOLERANCE", "±0.01 mm"],
            ]}
            schematic={<SleeveSchematic className="pf__svg" style={{ color: "var(--text-2)" }} />}
          />
        </div>

        <div className="products__small">
          {small.map((p, i) => (
            <Reveal key={p.idx} delay={i * 80} className="ps corner-mark">
              <Placeholder tag={p.code} label={p.label} style={{ aspectRatio: "16 / 9", width: "100%" }} />
              <div className="ps__body">
                <div className="ps__head">
                  <span className="ps__idx mono accent">{p.idx}</span>
                  <h3 className="ps__name">{p.name}</h3>
                </div>
                <p className="ps__blurb dim">{p.blurb}</p>
                <dl className="ps__specs">
                  {p.specs.map(([k, v]) => (
                    <div className="ps__spec" key={k}><dt className="mono">{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- QUALITY ---------------- */
function Quality() {
  const steps = [
    ["01", "Material Intake", "Certified alloy steel and cast iron, verified on arrival."],
    ["02", "Forming", "Forging and centrifugal casting to near-net shape."],
    ["03", "Machining", "CNC turning, drilling and reaming to print."],
    ["04", "Heat Treatment", "Hardening and tempering for fatigue resistance."],
    ["05", "Grinding & Honing", "Stem, face and bore finished to micron tolerance."],
    ["06", "Inspection", "Dimensional gauging and visual QA on every batch."],
  ];
  const certs = [
    ["ISO", "9001", "Quality Management System"],
    ["QA", "100%", "Final batch inspection"],
    ["MET", "µm", "In-house metrology lab"],
    ["OEM", "SPEC", "Built to original tolerances"],
  ];
  return (
    <section className="section quality" id="quality">
      <div className="wrap">
        <div className="quality__head">
          <SecHead
            index="03"
            kicker="Quality & Process"
            title="Six stages, one standard."
            sub="Raw bar to finished part, every step happens under our roof — which is how tolerance stays a promise, not a hope."
          />
        </div>

        <div className="quality__flow">
          {steps.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 60} className="qstep">
              <div className="qstep__top">
                <span className="qstep__n mono">{n}</span>
                <span className="qstep__line" aria-hidden="true"></span>
              </div>
              <h4 className="qstep__t">{t}</h4>
              <p className="qstep__d dim">{d}</p>
            </Reveal>
          ))}
        </div>

        <div className="quality__certs">
          <Reveal className="quality__certs-media">
            <Placeholder
              tag="METROLOGY"
              label="Photo — inspection / gauging lab"
              style={{ height: "100%", minHeight: 280 }}
            />
          </Reveal>
          <div className="quality__certs-list">
            <Reveal><p className="eyebrow quality__certs-label">// Certifications & Assurance</p></Reveal>
            {certs.map(([a, b, d], i) => (
              <Reveal key={a} delay={i * 70} className="cert corner-mark">
                <div className="cert__badge">
                  <span className="cert__a mono">{a}</span>
                  <span className="cert__b">{b}</span>
                </div>
                <span className="cert__d">{d}</span>
              </Reveal>
            ))}
            <p className="quality__certs-note mono dim">
              * Certification marks shown as placeholders — replace with your held credentials.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CLIENTS ---------------- */
function Clients() {
  const partners = ["OEM-A", "MOTO-B", "AUTO-C", "RIDE-D", "PWR-E", "GEAR-F", "VOLT-G", "AXLE-H"];
  return (
    <section className="section section--tight clients" id="clients">
      <div className="wrap">
        <div className="clients__inner">
          <div className="clients__copy">
            <SecHead index="04" kicker="Partners" title={<>Trusted on the<br/>assembly line.</>} />
            <Reveal delay={120}>
              <p className="lead clients__p">
                We supply assemblers, distributors and aftermarket brands across Pakistan —
                quietly keeping engines running, one valve and sleeve at a time.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="clients__note mono dim">// Logos shown as placeholders — add your real client marks here.</p>
            </Reveal>
          </div>
          <div className="clients__grid">
            {partners.map((p, i) => (
              <Reveal key={p} delay={i * 45} className="clients__cell">
                <span className="clients__mono mono">{p}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Products, Quality, Clients });
