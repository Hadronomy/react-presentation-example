// App.tsx
import { useEffect, useRef } from "react";
import Reveal from "reveal.js";
import MarkdownPlugin from "reveal.js/plugin/markdown/markdown";
import RevealHightlight from "reveal.js/plugin/highlight/highlight";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import "reveal.js/plugin/highlight/monokai.css";

import './App.css';

const CODE = `\
export function MyReactComponent() {
  return (
    <div>
      <h1>My React Component</h1>
      <p>This is a simple React component.</p>
    </div>
  );
}
` 

const CODE2 = `\
import { useState } from "react";

export function MyReactComponent() {
  const { count, setCount } = useState(0);

  return (
    <div>
      <h1>My React Component</h1>
      <p>This is a simple React component.</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`  

function App() {
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance

  useEffect(() => {
    // Prevents double initialization in strict mode
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current!, {
      view: 'scroll',
      scrollLayout: 'full',
      scrollProgress: true,
      transition: "slide",
      plugins: [MarkdownPlugin, RevealHightlight]
        // other config options
    });

    deckRef.current.initialize().then(() => {

    });

    return () => {
        try {
            if (deckRef.current) {
                deckRef.current.destroy();
                deckRef.current = null;
            }
        } catch (e) {
            console.warn("Reveal.js destroy call failed.");
        }
    };
  }, []);

  return (
    // Your presentation is sized based on the width and height of
    // our parent element. Make sure the parent is not 0-height.
    <div className="reveal" ref={deckDivRef}>
        <div className="slides" style={{ width: "1920px", height: "1080px" }}>
          <section data-auto-animate>
            <pre data-id="code-animation">
              <code data-line-numbers="3,4" data-noescape>
                {CODE}
              </code>
            </pre>
          </section>
          <section data-auto-animate>
            <pre data-id="code-animation">
              <code data-line-numbers="1,4,10-13" data-noescape>
                {CODE2}
              </code>
            </pre>
          </section>
        </div>
    </div>
  );
}

export default App;