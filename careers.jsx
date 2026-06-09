/* ============================================================
   Careers / Internship registration form
   ============================================================ */

function Field({ id, label, num, required, error, children, full }) {
  return (
    <div className={`field ${error ? "invalid" : ""} ${full ? "field--full" : ""}`}>
      <label htmlFor={id}>
        {num && <span className="num mono">{num}</span>}
        {label}{required && <span className="req">*</span>}
      </label>
      {children}
      {error && <span className="err">↳ {error}</span>}
    </div>
  );
}

const INTERESTS = [
  ["mechanical", "Mechanical", "Design & tooling"],
  ["production", "Production", "Machining & ops"],
  ["qa", "Quality / QA", "Metrology & testing"],
  ["design", "Design / CAD", "Drafting & modelling"],
];
const DURATIONS = ["6 weeks", "8 weeks", "3 months", "6 months", "Flexible"];

function Careers({ formRef }) {
  const empty = {
    name: "", email: "", phone: "", city: "",
    degree: "", institution: "", interest: "", duration: "", start: "",
    cover: "", link: "", resume: null,
  };
  const [v, setV] = useState(empty);
  const [errs, setErrs] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [ref, setRef] = useState("");

  const set = (k) => (e) => {
    const val = e && e.target ? e.target.value : e;
    setV((s) => ({ ...s, [k]: val }));
    setErrs((s) => (s[k] ? { ...s, [k]: undefined } : s));
  };

  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    setV((s) => ({ ...s, resume: f || null }));
  };

  const validate = () => {
    const e = {};
    if (!v.name.trim()) e.name = "Required";
    if (!v.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email";
    if (!v.phone.trim()) e.phone = "Required";
    else if (v.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a valid number";
    if (!v.city.trim()) e.city = "Required";
    if (!v.degree.trim()) e.degree = "Required";
    if (!v.institution.trim()) e.institution = "Required";
    if (!v.interest) e.interest = "Select a field";
    if (!v.duration) e.duration = "Select a duration";
    if (!v.start) e.start = "Pick a date";
    return e;
  };

  const submit = (e) => {
    e.preventDefault();
    const e2 = validate();
    setErrs(e2);
    if (Object.keys(e2).length) {
      const first = document.querySelector(".careers .field.invalid input, .careers .field.invalid select");
      if (first) first.focus();
      return;
    }
    const code = "ALZ-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    setRef(code);
    setSubmitted(true);
  };

  const reset = () => { setV(empty); setErrs({}); setSubmitted(false); setRef(""); };

  const perks = [
    ["Shop-floor exposure", "Rotate through machining, grinding and inspection with the people who run them."],
    ["Real metrology", "Learn how micron-level tolerance is measured, held and signed off."],
    ["Mentored projects", "Ship a scoped project — from CAD to a part you can hold."],
    ["Certificate", "Completion certificate and a reference for strong performers."],
  ];

  return (
    <section className="section careers" id="careers" ref={formRef}>
      <div className="wrap">
        <div className="careers__grid">
          {/* LEFT — program info */}
          <div className="careers__intro">
            <SecHead index="05" kicker="Internship Program" title={<>Learn the craft<br/>of precision.</>} />
            <Reveal delay={120}>
              <p className="lead careers__lead">
                Alamza opens its floor to engineering students and recent graduates who want to
                see how parts are really made — not in theory, but in steel, swarf and gauge blocks.
              </p>
            </Reveal>
            <ul className="careers__perks">
              {perks.map(([t, d], i) => (
                <Reveal key={t} delay={i * 70} as="li" className="careers__perk">
                  <span className="careers__perk-mk mono">0{i + 1}</span>
                  <div>
                    <h4 className="careers__perk-t">{t}</h4>
                    <p className="careers__perk-d dim">{d}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal className="careers__who corner-mark">
              <span className="eyebrow">// Who should apply</span>
              <p>Diploma / BSc / BE students in Mechanical, Mechatronics, Industrial or Manufacturing — and anyone genuinely curious about engines.</p>
            </Reveal>
          </div>

          {/* RIGHT — form */}
          <Reveal className="careers__formwrap corner-mark">
            {!submitted ? (
              <form className="careers__form" onSubmit={submit} noValidate>
                <div className="careers__form-head">
                  <span className="mono accent">APPLICATION · FORM AL-INT</span>
                  <h3 className="careers__form-title">Register your interest</h3>
                  <p className="careers__form-sub dim">Fields marked <span className="accent">*</span> are required. Takes about 3 minutes.</p>
                </div>

                <p className="careers__group mono">A · Personal</p>
                <div className="careers__rows">
                  <Field id="f-name" label="Full name" num="01" required error={errs.name}>
                    <input id="f-name" className="input" value={v.name} onChange={set("name")} placeholder="e.g. Ahmad Raza" autoComplete="name" />
                  </Field>
                  <div className="careers__row2">
                    <Field id="f-email" label="Email" num="02" required error={errs.email}>
                      <input id="f-email" type="email" className="input" value={v.email} onChange={set("email")} placeholder="you@email.com" autoComplete="email" />
                    </Field>
                    <Field id="f-phone" label="Phone" num="03" required error={errs.phone}>
                      <input id="f-phone" className="input" value={v.phone} onChange={set("phone")} placeholder="03xx-xxxxxxx" autoComplete="tel" inputMode="tel" />
                    </Field>
                  </div>
                  <Field id="f-city" label="City / address" num="04" required error={errs.city}>
                    <input id="f-city" className="input" value={v.city} onChange={set("city")} placeholder="e.g. Sahiwal, Punjab" autoComplete="address-level2" />
                  </Field>
                </div>

                <p className="careers__group mono">B · Education & Interest</p>
                <div className="careers__rows">
                  <div className="careers__row2">
                    <Field id="f-degree" label="Degree / program" num="05" required error={errs.degree}>
                      <input id="f-degree" className="input" value={v.degree} onChange={set("degree")} placeholder="e.g. BSc Mechanical Eng." />
                    </Field>
                    <Field id="f-inst" label="Institution" num="06" required error={errs.institution}>
                      <input id="f-inst" className="input" value={v.institution} onChange={set("institution")} placeholder="University / college" />
                    </Field>
                  </div>

                  <Field id="f-interest" label="Field of interest" num="07" required error={errs.interest}>
                    <div className="chips" role="radiogroup" aria-label="Field of interest">
                      {INTERESTS.map(([id, label, d]) => (
                        <button
                          type="button" key={id} role="radio" aria-checked={v.interest === id}
                          className={`chip ${v.interest === id ? "is-sel" : ""}`}
                          onClick={() => set("interest")(id)}
                        >
                          <span className="chip__dot" aria-hidden="true"></span>
                          <span className="chip__main">{label}</span>
                          <span className="chip__sub mono">{d}</span>
                        </button>
                      ))}
                    </div>
                  </Field>

                  <div className="careers__row2">
                    <Field id="f-dur" label="Preferred duration" num="08" required error={errs.duration}>
                      <div className="selectwrap">
                        <select id="f-dur" className="select" value={v.duration} onChange={set("duration")}>
                          <option value="" disabled>Select…</option>
                          {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <span className="selectwrap__arr" aria-hidden="true">▾</span>
                      </div>
                    </Field>
                    <Field id="f-start" label="Earliest start" num="09" required error={errs.start}>
                      <input id="f-start" type="date" className="input" value={v.start} onChange={set("start")} />
                    </Field>
                  </div>
                </div>

                <p className="careers__group mono">C · Application</p>
                <div className="careers__rows">
                  <Field id="f-resume" label="Resume / CV" num="10">
                    <label className={`filedrop ${v.resume ? "has-file" : ""}`} htmlFor="f-resume-input">
                      <span className="filedrop__icon mono">{v.resume ? "✓" : "↥"}</span>
                      <span className="filedrop__text">
                        {v.resume ? v.resume.name : "Upload PDF or DOC"}
                        <span className="filedrop__hint mono dim">{v.resume ? "Click to replace" : "Max ~10 MB · optional but recommended"}</span>
                      </span>
                      <input id="f-resume-input" type="file" accept=".pdf,.doc,.docx" onChange={onFile} hidden />
                    </label>
                  </Field>
                  <Field id="f-cover" label="Why Alamza? (cover note)" num="11" full>
                    <textarea id="f-cover" className="textarea" value={v.cover} onChange={set("cover")} placeholder="Tell us what draws you to manufacturing and what you'd like to learn here…" />
                  </Field>
                  <Field id="f-link" label="LinkedIn / portfolio link" num="12">
                    <input id="f-link" className="input" value={v.link} onChange={set("link")} placeholder="https://" inputMode="url" />
                  </Field>
                </div>

                <div className="careers__submit">
                  <button type="submit" className="btn btn--primary careers__submit-btn">
                    Submit Application <span className="arr">→</span>
                  </button>
                  <span className="careers__submit-note mono dim">We review applications on a rolling basis.</span>
                </div>
              </form>
            ) : (
              <div className="careers__done">
                <div className="careers__done-mark mono">✓</div>
                <span className="mono accent">APPLICATION RECEIVED</span>
                <h3 className="careers__done-title">Thank you, {v.name.split(" ")[0] || "applicant"}.</h3>
                <p className="careers__done-sub dim">
                  Your internship application has been logged. Our team reviews submissions on a
                  rolling basis and will reach out by email if there's a fit.
                </p>
                <div className="careers__done-ref corner-mark">
                  <span className="mono dim">REFERENCE NO.</span>
                  <span className="careers__done-code mono">{ref}</span>
                </div>
                <div className="careers__done-summary">
                  <div><span className="mono dim">NAME</span><span>{v.name}</span></div>
                  <div><span className="mono dim">FIELD</span><span>{(INTERESTS.find(i => i[0] === v.interest) || [,"—"])[1]}</span></div>
                  <div><span className="mono dim">DURATION</span><span>{v.duration}</span></div>
                  <div><span className="mono dim">START</span><span>{v.start}</span></div>
                </div>
                <button className="btn btn--ghost" onClick={reset}>Submit another application</button>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Careers });
