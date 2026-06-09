/* ============================================================
   App composition
   ============================================================ */
function App() {
  const careersRef = useRef(null);
  const scrollToCareers = useCallback(() => {
    const el = document.getElementById("careers");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <Nav onApply={scrollToCareers} />
      <main>
        <Hero onApply={scrollToCareers} />
        <hr className="rule" />
        <About />
        <hr className="rule" />
        <Products />
        <hr className="rule" />
        <Quality />
        <hr className="rule" />
        <Clients />
        <hr className="rule" />
        <Careers formRef={careersRef} />
        <Footer onApply={scrollToCareers} />
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
