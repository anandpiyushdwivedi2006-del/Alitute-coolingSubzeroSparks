import { useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  ChevronRight,
  Fan,
  Menu,
  Radio,
  ShieldCheck,
  Thermometer,
  Wind,
  X,
  Zap,
} from "lucide-react";
import "./App.css";

const layers = [
  {
    number: "01",
    icon: Wind,
    title: "Passive radiative shell",
    label: "Always-on · zero power",
    text: "The outer surface releases heat toward the sky, reducing dependence on convection without consuming electrical power.",
    color: "cyan",
  },
  {
    number: "02",
    icon: Fan,
    title: "Adaptive airflow",
    label: "PWM control with feedback",
    text: "A 4-wire fan moves air through the heat sink. GPIO25 controls fan speed while GPIO26 reads tachometer feedback.",
    color: "blue",
  },
  {
    number: "03",
    icon: Zap,
    title: "Hotspot and energy layer",
    label: "Piezo actuator + TEG sensing",
    text: "A piezoelectric disc targets a local hotspot, while GPIO35 monitors the TEG voltage through a resistor divider.",
    color: "violet",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Thermal protection",
    label: "Indicators, alarm, and derating",
    text: "Status LEDs and a buzzer communicate system conditions. Unsafe temperatures can trigger a protective load-reduction response.",
    color: "orange",
  },
];

const pinRows = [
  ["Fan PWM", "GPIO 25", "Blue wire · speed control"],
  ["Fan tachometer", "GPIO 26", "Green wire · speed feedback"],
  ["PTC heater control", "GPIO 27", "MOSFET gate through 220 Ω"],
  ["ACS712 current sensor", "GPIO 32", "Analog current output"],
  ["DS18B20 temperature", "GPIO 4", "1-Wire data with 4.7 kΩ pull-up"],
  ["OLED display SDA", "GPIO 21", "I2C data line"],
  ["OLED display SCL", "GPIO 22", "I2C clock line"],
  ["Green status LED", "GPIO 14", "220 Ω series resistor"],
  ["Yellow status LED", "GPIO 12", "220 Ω series resistor"],
  ["Red alarm LED", "GPIO 13", "220 Ω series resistor"],
  ["Alarm buzzer", "GPIO 15", "Direct or transistor-driven"],
  ["Piezoelectric disc", "GPIO 17", "Transistor driver control"],
  ["TEG voltage sense", "GPIO 35", "10 kΩ / 10 kΩ divider"],
];

const risks = [
  ["Piezo fatigue", "Use a continuous-duty-rated module and inspect it periodically."],
  ["TEG thermal cycling", "Avoid abrupt temperature changes and check mechanical contact."],
  ["Fan failure", "Use tachometer feedback and trigger an alarm if pulses are lost."],
  ["Sensor failure", "Apply plausibility checks and fall back to a safe cooling state."],
];

const impacts = [
  ["Telecom", "Fewer outages and less maintenance at remote high-altitude sites."],
  ["Defence and radar", "Graceful degradation during operationally important periods."],
  ["Computing and power", "Improved reliability for equipment exposed to difficult thermal conditions."],
  ["Deployment", "A low-cost architecture that can be tested and upgraded module by module."],
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app">
      <nav className="navbar">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark">
            <Thermometer size={17} />
          </span>

          <span>
            ALT<span className="brand-accent">/</span>COOL
          </span>
        </a>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {[
            ["problem", "Problem"],
            ["solution", "Design"],
            ["prototype", "Prototype"],
            ["wiring", "Wiring"],
            ["prototype-glimpse", "Prototype Images"],
            ["prototype-links", "Prototype Links"],
            ["validation", "Validation"],
            ["impact", "Impact"],
          ].map(([id, label]) => (
            <a href={`#${id}`} key={id} onClick={closeMenu}>
              {label}
            </a>
          ))}

          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Contact <ArrowUpRight size={14} />
          </a>
        </div>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <p className="project-status">
              SMART INDIA HACKATHON · WORKING PROTOTYPE AND DOCUMENTATION
            </p>

            <h1>Altitude-Adaptive Cooling System</h1>

            <p className="hero-lead">
              A sensor-controlled cooling system for electronics operating where
              thin air makes conventional heat removal less effective.
            </p>

            <div className="hero-meta">
              <span>ESP32 CONTROL</span>
              <span>4-WIRE PWM FAN</span>
              <span>THERMAL MONITORING</span>
            </div>

            <div className="hero-buttons">
              <a className="plain-button primary-button" href="#problem">
                View the project
              </a>

              <a className="plain-button" href="#prototype">
                Prototype details
              </a>
            </div>
          </div>

          <div className="hero-evidence">
            <div className="hero-stat-box">
              <span className="hero-stat-number">04</span>
              <span className="hero-stat-label">
                Integrated cooling layers
              </span>
            </div>

            <div className="hero-stat-box">
              <span className="hero-stat-number">13</span>
              <span className="hero-stat-label">
                Controller connections
              </span>
            </div>

            <div className="hero-stat-box">
              <span className="hero-stat-number">01</span>
              <span className="hero-stat-label">
                Working prototype
              </span>
            </div>

            <p>
              Current build: ESP32 control, adaptive airflow, heater control,
              thermal sensing, protection logic, and auxiliary energy
              monitoring.
            </p>
          </div>
        </section>

        <section className="section report-section" id="problem">
          <div className="section-label">01 / PROBLEM</div>

          <div className="two-column">
            <div>
              <h2>Why altitude changes the cooling problem</h2>
            </div>

            <div className="section-copy">
              <p>
                At high altitude, air density decreases. This reduces the
                amount of heat that can be carried away by ordinary convection,
                even when the surrounding air feels cold.
              </p>

              <p>
                For computers, telecom equipment, radar electronics, and power
                systems, this can lead to higher component temperatures, lower
                reliability, and more difficult maintenance.
              </p>

              <div className="plain-list">
                <div>
                  <strong>01</strong>
                  <span>Lower air density reduces convective heat transfer.</span>
                </div>

                <div>
                  <strong>02</strong>
                  <span>Fans and heat sinks become less effective.</span>
                </div>

                <div>
                  <strong>03</strong>
                  <span>Remote equipment is difficult to service.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section report-section" id="solution">
          <div className="section-label">02 / DESIGN APPROACH</div>

          <SectionHeading
            eyebrow="System architecture"
            title="Four layers working together"
            description="The design combines passive heat rejection, controlled airflow, local hotspot cooling, and protection logic."
          />

          <div className="layer-grid">
            {layers.map((layer) => {
              const Icon = layer.icon;

              return (
                <article
                  className={`layer-card ${layer.color}`}
                  key={layer.number}
                >
                  <div className="layer-top">
                    <span>{layer.number}</span>
                    <Icon size={22} />
                  </div>

                  <div>
                    <p className="layer-label">{layer.label}</p>
                    <h3>{layer.title}</h3>
                    <p>{layer.text}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="design-note">
            <strong>Design principle</strong>

            <p>
              The  improvement is not simply to increase fan speed. Tip
              clearance, blade pitch, blade count, hub size, motor efficiency,
              and duct resistance all affect useful airflow.
            </p>
          </div>
        </section>

        <section className="section report-section" id="prototype">
          <div className="section-label">03 / PROTOTYPE</div>

          <div className="two-column">
            <div>
              <h2>What has been built so far</h2>
            </div>

            <div className="section-copy">
              <p>
                The prototype uses a PTC heater as a repeatable heat source. The
                ESP32 reads the temperature sensor and controls the fan and
                heater response according to the measured condition.
              </p>

              <div className="status-list">
                <div>
                  <span className="status-tag built">BUILT</span>
                  <p>12V input, fuse, main switch, and emergency-stop path.</p>
                </div>

                <div>
                  <span className="status-tag built">BUILT</span>
                  <p>4-wire PWM fan with separate tachometer feedback.</p>
                </div>

                <div>
                  <span className="status-tag built">BUILT</span>
                  <p>PTC heater controlled through a MOSFET stage.</p>
                </div>

                <div>
                  <span className="status-tag built">BUILT</span>
                  <p>DS18B20 temperature sensor and ACS712 current sensing.</p>
                </div>

                <div>
                  <span className="status-tag built">BUILT</span>
                  <p>
                    OLED display, status LEDs, buzzer, piezo control, and TEG
                    voltage sensing.
                  </p>
                </div>

                <div>
                  <span className="status-tag next">NEXT</span>
                  <p>
                    Low-pressure testing, fan geometry comparison, and
                    endurance testing of the piezo and TEG subsystems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section report-section wiring-section" id="wiring">
          <div className="section-label">04 / ELECTRICAL CONNECTIONS</div>

          <SectionHeading
            eyebrow="Updated GPIO reference"
            title="Controller connections"
            description="This table reflects the latest wiring arrangement, including fan feedback, current measurement, display output, alarm devices, piezo control, and TEG voltage sensing."
          />

          <div className="power-chain">
            <div className="chain-node">12V DC IN</div>
            <ChevronRight />
            <div className="chain-node">5A FUSE</div>
            <ChevronRight />
            <div className="chain-node">MAIN SWITCH</div>
            <ChevronRight />
            <div className="chain-node">E-STOP NC</div>
            <ChevronRight />
            <div className="chain-node active-node">12V DISTRIBUTION</div>
          </div>

          <p className="power-note">
            The negative input connects directly to the common ground rail. The
            12V rail supplies the fan and heater, while a buck converter provides
            verified 5V for the ESP32 and ACS712.
          </p>

          <div className="pin-table">
            <div className="table-heading">
              <span>DEVICE / SIGNAL</span>
              <span>GPIO</span>
              <span>CONNECTION</span>
            </div>

            {pinRows.map(([device, gpio, connection]) => (
              <div className="table-row" key={device}>
                <span>{device}</span>
                <code>{gpio}</code>
                <span>{connection}</span>
              </div>
            ))}
          </div>

          <div className="wiring-summary">
            <div className="wiring-block">
              <h4>Power distribution</h4>
              <p>
                The 12V input passes through a 5A fuse, main switch, and
                normally closed emergency-stop before reaching the distribution
                block. The ground input connects directly to the common ground
                rail.
              </p>
            </div>

            <div className="wiring-block">
              <h4>Fan and heater</h4>
              <p>
                The 4-wire fan receives 12V and ground from the distribution
                block. GPIO25 controls PWM speed, while GPIO26 reads the
                tachometer signal. GPIO27 drives the heater MOSFET through a
                220 Ω gate resistor and a 10 kΩ pull-down.
              </p>
            </div>

            <div className="wiring-block">
              <h4>Monitoring and display</h4>
              <p>
                The DS18B20 uses GPIO4 with a 4.7 kΩ pull-up. The ACS712 output
                is read through GPIO32. The OLED uses GPIO21 for SDA and GPIO22
                for SCL.
              </p>
            </div>

            <div className="wiring-block">
              <h4>Indicators and auxiliary devices</h4>
              <p>
                GPIO14, GPIO12, and GPIO13 control the green, yellow, and red
                LEDs. GPIO15 controls the buzzer, GPIO17 drives the piezo
                through a transistor, and GPIO35 monitors the divided TEG
                voltage.
              </p>
            </div>

            <div className="safety-note">
              <strong>Safety note</strong>

              <span>
                All grounds are common. No 5V or 12V supply is connected
                directly to an ESP32 GPIO. The TEG output is reduced through a
                resistor divider before reaching GPIO35.
              </span>
            </div>
          </div>
        </section>

        <section
          className="section report-section prototype-glimpse-section"
          id="prototype-glimpse"
        >
          <div className="section-label">05 / WORKING PROTOTYPE</div>

          <div className="prototype-glimpse-header">
            <div>
              <p className="eyebrow">Build documentation</p>
              <h2>A Glimpse of the Working Prototype</h2>
            </div>

            <p>
              A dedicated gallery showing the physical prototype, controller,
              airflow arrangement, and thermal testing setup.
            </p>
          </div>

          <div className="prototype-gallery">
  <figure className="gallery-card gallery-card-large">
    <div className="gallery-image-box gallery-large-box">
      <img
        src={`${import.meta.env.BASE_URL}images/prototype-main.jpg`}
        alt="Complete altitude-adaptive cooling prototype"
      />
    </div>

    <figcaption>
      Complete working prototype showing the enclosure, airflow path,
      controller, and thermal test arrangement.
    </figcaption>
  </figure>

  <figure className="gallery-card">
    <div className="gallery-image-box">
      <img
        src={`${import.meta.env.BASE_URL}images/prototype-side.jpg`}
        alt="Side view of the cooling prototype"
      />
    </div>

    <figcaption>
      Side view of the fan and heat-sink arrangement.
    </figcaption>
  </figure>

  <figure className="gallery-card">
    <div className="gallery-image-box">
      <img
        src={`${import.meta.env.BASE_URL}images/control-panel.jpg`}
        alt="ESP32 controller and power section"
      />
    </div>

    <figcaption>
      ESP32, buck converter, protection, and wiring section.
    </figcaption>
  </figure>

  <figure className="gallery-card">
    <div className="gallery-image-box">
      <img
        src={`${import.meta.env.BASE_URL}images/fan-assembly.jpg`}
        alt="Cooling fan and heat-sink assembly"
      />
    </div>

    <figcaption>
      Fan and heat-sink assembly used to develop the airflow path.
    </figcaption>
  </figure>

  <figure className="gallery-card">
    <div className="gallery-image-box">
      <img
        src={`${import.meta.env.BASE_URL}images/thermal-test.jpg`}
        alt="Sheep wool insulation test setup"
      />
    </div>

    <figcaption>
      Sheep wool insulation test setup.
    </figcaption>
  </figure>
</div>
        </section>

        <section
          className="section report-section prototype-links-section"
          id="prototype-links"
        >
          <div className="section-label">06 / PROTOTYPE LINKS</div>

          <div className="prototype-links-header">
            <div>
              <p className="eyebrow">Explore the implementation</p>
              <h2>Prototype files and references</h2>
            </div>

            <p>
              Add your circuit files, source code, CAD models, demonstration
              videos, simulation files, or presentation links below.
            </p>
          </div>

          <div className="prototype-links-grid">
            <a
              className="prototype-link-card"
              href=" https://drive.google.com/file/d/1mVvoyTuEStE-BktjZ53u3vXni6UA0LxI/view?usp=drivesdk"
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <span className="prototype-link-type">SOURCE CODE</span>
                <h3>ESP32 control code</h3>
                <p>
                 https://drive.google.com/file/d/1mVvoyTuEStE-BktjZ53u3vXni6UA0LxI/view?usp=drivesdk
                </p>
              </div>

              <ArrowUpRight size={19} />
            </a>

            <a
              className="prototype-link-card"
              href="https://drive.google.com/"
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <span className="prototype-link-type">
                  CIRCUIT DOCUMENTATION
                </span>
                <h3>Full circuit and wiring diagram</h3>
                <p>
                 https://drive.google.com/file/d/1NlLRSjsMfJHDeytlAiCF0CQlga11KF4p/view?usp=drivesdk
                </p>
              </div>

              <ArrowUpRight size={19} />
            </a>

            <a
              className="prototype-link-card"
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <span className="prototype-link-type">DEMONSTRATION</span>
                <h3>Prototype demonstration video</h3>
                <p>
                  https://youtu.be/rsI85HH3Di8?si=JThxF3Q8_IWcApTR
                </p>
              </div>

              <ArrowUpRight size={19} />
            </a>

            <a
              className="prototype-link-card"
              href="https://drive.google.com/"
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <span className="prototype-link-type">REPORT</span>
                <h3>Project report or presentation</h3>
                <p>
                 https://drive.google.com/file/d/1ADgHiU5qNEzGDScyrf4bYTk6jIo8QYpK/view?usp=drivesdk
                </p>
              </div>

              <ArrowUpRight size={19} />
            </a>
          </div>

        
        </section>

        <section className="section report-section" id="validation">
          <div className="section-label">07 / VALIDATION STATUS</div>

          <div className="two-column">
            <div>
              <h2>What is verified and what remains</h2>
            </div>

            <div className="section-copy">
              <p>
                The current prototype demonstrates the control and wiring
                concept. Remaining tests focus on controlled thermal and
                low-pressure validation.
              </p>

              <div className="validation-table">
                <div>
                  <span className="validation-state verified">VERIFIED</span>
                  <p>Temperature feedback through the DS18B20.</p>
                </div>

                <div>
                  <span className="validation-state verified">VERIFIED</span>
                  <p>Fan PWM control through GPIO25.</p>
                </div>

                <div>
                  <span className="validation-state verified">VERIFIED</span>
                  <p>Heater control through GPIO27 and the MOSFET stage.</p>
                </div>

                <div>
                  <span className="validation-state planned">PLANNED</span>
                  <p>Fan curve and static-pressure measurements.</p>
                </div>

                <div>
                  <span className="validation-state planned">PLANNED</span>
                  <p>Low-pressure chamber testing and endurance tests.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section report-section" id="impact">
          <div className="section-label">08 / APPLICATION</div>

          <SectionHeading
            eyebrow="Where this could be useful"
            title="Designed for equipment that is difficult to reach."
            description="The project is aimed at electronics installed in locations where heat management, power availability, and maintenance access are all constraints."
          />

          <div className="impact-grid">
            {impacts.map(([title, text]) => (
              <div className="impact-card" key={title}>
                <span className="impact-number">/</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="risk-section">
            <div className="risk-heading">
              <ShieldCheck size={21} />

              <div>
                <p className="eyebrow">Reliability considerations</p>
                <h3>Known risks are included in the design.</h3>
              </div>
            </div>

            <div className="risk-list">
              {risks.map(([risk, mitigation]) => (
                <div className="risk-row" key={risk}>
                  <strong>{risk}</strong>
                  <span>{mitigation}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-card">
            <Radio size={25} className="contact-icon" />

            <p className="eyebrow">Project status</p>

            <h2>Prototype completed. Validation continues.</h2>

            <p>
              We will also validate the design under low-pressure
              conditions, compare fan configurations, and document final
              circuit and test results.
            </p>

            <div className="contact-actions">
              <a
                className="plain-button primary-button"
                href="mailto:anandpiyushdwivedi2006@gmail.com"
              >
                Contact the team <ArrowUpRight size={16} />
              </a>

              <a
                className="plain-button"
                href="https://github.com/anandpiyushdwivedi2006-del/Alitute-coolingSubzeroSparks"
                target="_blank"
                rel="noreferrer"
              >
                Repository <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-mark">
            <Thermometer size={16} />
          </span>

          <span>
            ALT<span className="brand-accent">/</span>COOL
          </span>
        </a>

        <p>Altitude-Adaptive Cooling System · Prototype Portfolio</p>

        <a href="#home" className="back-top">
          Back to top <ArrowUp size={14} />
        </a>
      </footer>
    </div>
  );
}

export default App;