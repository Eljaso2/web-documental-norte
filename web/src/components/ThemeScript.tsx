// Inline script to set theme before first paint (prevents flash)
export function ThemeScript() {
  const script = `
    (function() {
      try {
        var stored = localStorage.getItem('hn-theme');
        if (stored) {
          document.documentElement.setAttribute('data-theme', stored);
        }
      } catch(e) {}
    })();
  `
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
