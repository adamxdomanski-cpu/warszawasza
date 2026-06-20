const drops = [
  {
    text: "MOJA WARSZAWA SZA",
    emotion: "Silence",
    score: "24",
  },
  {
    text: "TWOJA PRAGA KOLAPS",
    emotion: "Collapse",
    score: "23",
  },
  {
    text: "WASZA MURANÓW SZA",
    emotion: "Identity",
    score: "22",
  },
];

const fieldNotes = [
  "Urban language lab",
  "Limited identity drops",
  "Field maps and civic signals",
  "Warsaw-first digital publishing",
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <nav className="nav" aria-label="Main navigation">
          <a className="logo" href="#top" aria-label="Warszawasza home">
            WARSZAWASZA
          </a>
          <div className="navLinks">
            <a href="#drops">Drops</a>
            <a href="#field">Field</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="heroGrid" id="top">
          <div className="heroCopy">
            <p className="eyebrow">www.warszawasza.online</p>
            <h1>
              Moja.
              <br />
              Twoja.
              <br />
              Wasza Warszawa.
            </h1>
            <p className="lede">
              Warszawasza turns the city into language: wearable signals, live
              field notes, and a sharper vocabulary for belonging.
            </p>
            <div className="actions">
              <a className="primaryButton" href="#drops">
                View first drops
              </a>
              <a className="secondaryButton" href="mailto:hello@warszawasza.online">
                Start a collaboration
              </a>
            </div>
          </div>

          <div className="signalCard" aria-label="Warszawasza signal card">
            <div className="signalHeader">
              <span>FIELD PHASE</span>
              <strong>RECOVERY</strong>
            </div>
            <div className="signalScore">70.0</div>
            <p>
              A city signal engine for drops, maps, and moments that carry
              Warsaw back into the street.
            </p>
            <div className="signalLine" />
          </div>
        </div>
      </section>

      <section className="section manifesto" aria-labelledby="manifesto-title">
        <div>
          <p className="sectionLabel">Manifest</p>
          <h2 id="manifesto-title">Sokół wyrżnął orła na pawiu z gołąbków.</h2>
        </div>
        <p>
          Warszawasza is a studio for civic identity and urban myth. It takes
          fragments from Muranów, Praga, Śródmieście, silence, overload, and
          recovery, then turns them into products and public signals.
        </p>
      </section>

      <section className="section dropsSection" id="drops" aria-labelledby="drops-title">
        <div className="sectionHeader">
          <p className="sectionLabel">Drop 001</p>
          <h2 id="drops-title">Top identity drops</h2>
        </div>
        <div className="dropsGrid">
          {drops.map((drop) => (
            <article className="dropCard" key={drop.text}>
              <p>{drop.emotion}</p>
              <h3>{drop.text}</h3>
              <span>Total score {drop.score}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section fieldSection" id="field" aria-labelledby="field-title">
        <div>
          <p className="sectionLabel">Field system</p>
          <h2 id="field-title">From urban signal to cultural object.</h2>
        </div>
        <div className="fieldList">
          {fieldNotes.map((note) => (
            <div className="fieldItem" key={note}>
              <span />
              <p>{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta" id="contact" aria-labelledby="contact-title">
        <p className="sectionLabel">Now online</p>
        <h2 id="contact-title">Build the next Warsaw signal.</h2>
        <a className="primaryButton" href="mailto:hello@warszawasza.online">
          hello@warszawasza.online
        </a>
      </section>
    </main>
  );
}
