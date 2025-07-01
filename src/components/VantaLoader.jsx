// src/components/VantaLoader.jsx
import React, { useEffect, useState } from 'react'; // Asegurar React está importado

// --- Configuración de Estilos y Contenido ---
const commonStyles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    fontFamily: '"Fira Code", "Source Code Pro", Menlo, Monaco, Consolas, "Courier New", monospace',
    fontSize: '16px',
    lineHeight: '1.7',
    padding: '20px',
    overflow: 'hidden',
    boxSizing: 'border-box',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  codeLine: {
    whiteSpace: 'pre-wrap',
    display: 'block',
    minHeight: '27.2px',
  },
  topFadeBase: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100px',
    zIndex: 1,
    transition: 'background 0.3s ease',
  },
};

const darkThemeStyles = {
  containerBg: '#000000', text: '#E0E0E0', keyword: '#569CD6', class: '#4EC9B0',
  string: '#CE9178', comment: '#6A9955', property: '#9CDCFE', function: '#DCDCAA',
  operator: '#D4D4D4', punctuation: '#D4D4D4',
  topFadeBackground: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 100%)',
};

const lightThemeStyles = {
  containerBg: '#F5F5F5', text: '#212121', keyword: '#0000FF', class: '#267F99',
  string: '#A31515', comment: '#008000', property: '#001080', function: '#795E26',
  operator: '#333333', punctuation: '#333333',
  topFadeBackground: 'linear-gradient(to bottom, rgba(245,245,245,1) 0%, rgba(245,245,245,0.8) 30%, rgba(245,245,245,0) 100%)',
};

const BlinkingCursor = ({ color }) => (
  <span style={{ fontWeight: 'bold', color: color, animation: 'blink 1s step-end infinite' }}>
    _<style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
  </span>
);

const initialCodeLines = [
  { segments: [{ type: 'comment', text: '// Iniciando el ecosistema digital de Molly Inc.' }] },
  { segments: [{ type: 'keyword', text: 'import ' }, { type: 'string', text: "'package:molly_framework/molly_framework.dart'" },{ type: 'keyword', text: ' as ' },{ type: 'property', text: 'molly' },{ type: 'punctuation', text: ';' }] },
  { text: '' },
  { segments: [{ type: 'keyword', text: 'void ' },{ type: 'function', text: 'main' },{ type: 'punctuation', text: '() {' }] },
  { segments: [{ type: 'text', text: '  ' },{ type: 'class', text: 'MollyApp ' },{ type: 'property', text: 'app ' },{ type: 'operator', text: '= ' },{ type: 'property', text: 'molly.' },{ type: 'function', text: 'bootstrap' },{ type: 'punctuation', text: '(' }] },
  { segments: [{ type: 'text', text: '    ' },{ type: 'property', text: 'name: ' },{ type: 'string', text: "'Molly Inc: Soluciones Digitales'" },{ type: 'punctuation', text: ',' }] },
  { segments: [{ type: 'text', text: '    ' },{ type: 'property', text: 'version: ' },{ type: 'string', text: "'3.0.0-beta'" },{ type: 'punctuation', text: ', ' },{ type: 'comment', text: '// Innovación constante' }] },
  { segments: [{ type: 'text', text: '    ' },{ type: 'property', text: 'environment: ' },{ type: 'property', text: 'molly.' },{ type: 'class', text: 'Environment' },{ type: 'operator', text: '.' },{ type: 'property', text: 'production' },{ type: 'punctuation', text: ',' }] },
  { segments: [{ type: 'text', text: '    ' },{ type: 'property', text: 'modules: ' },{ type: 'punctuation', text: '[' }] },
  { segments: [{ type: 'text', text: '      ' },{ type: 'class', text: 'TecnologiaModulo' },{ type: 'punctuation', text: '(' },{ type: 'string', text: "'IA & Automatización'" },{ type: 'punctuation', text: '),' }] },
  { segments: [{ type: 'text', text: '      ' },{ type: 'class', text: 'DisenoCreativoModulo' },{ type: 'punctuation', text: '(' },{ type: 'string', text: "'UX/UI Centrado en el Usuario'" },{ type: 'punctuation', text: '),' }] },
  { segments: [{ type: 'text', text: '      ' },{ type: 'class', text: 'EstrategiaDigitalModulo' },{ type: 'punctuation', text: '(' },{ type: 'string', text: "'Crecimiento Sostenible'" },{ type: 'punctuation', text: '),' }] },
  { segments: [{ type: 'text', text: '      ' },{ type: 'class', text: 'InnovacionContinua' },{ type: 'punctuation', text: '(' },{ type: 'string', text: "'I+D+i'" },{ type: 'punctuation', text: '),' }] },
  { segments: [{ type: 'text', text: '      ' },{ type: 'class', text: 'SoporteBase' },{ type: 'punctuation', text: '(' },{ type: 'string', text: "'Capacitación y Asesoría'" },{ type: 'punctuation', text: ')' }] },
  { segments: [{ type: 'text', text: '    ' }, { type: 'punctuation', text: '],' }] },
  { segments: [{ type: 'text', text: '  ' }, { type: 'punctuation', text: ');' }] },
  { text: '' },
  { segments: [{ type: 'text', text: '  ' },{ type: 'property', text: 'app.' },{ type: 'function', text: 'registerService' },{ type: 'punctuation', text: '<' },{ type: 'class', text: 'AnaliticaAvanzada' },{ type: 'punctuation', text: '>()' },{ type: 'operator', text: ', ' },{ type: 'keyword', text: 'await ' },{ type: 'class', text: 'AnaliticaService.' },{ type: 'function', text: 'init' },{ type: 'punctuation', text: '());' }] },
  { segments: [{ type: 'text', text: '  ' },{ type: 'property', text: 'app.' },{ type: 'function', text: 'onReady' },{ type: 'punctuation', text: '(() => {' }] },
  { segments: [{ type: 'text', text: '    ' },{ type: 'property', text: 'print' },{ type: 'punctuation', text: '(' },{ type: 'string', text: "'🚀 Molly Inc. lista para transformar tu negocio!'" },{ type: 'punctuation', text: ');' }] },
  { segments: [{ type: 'text', text: '  ' }, { type: 'punctuation', text: '});' }] },
  { segments: [{ type: 'text', text: '  ' },{ type: 'property', text: 'app.' },{ type: 'function', text: 'run' },{ type: 'punctuation', text: '();' }] },
  { segments: [{ type: 'comment', text: '// Molly Inc. - Tu socio en la transformación digital.' }] },
  { segments: [{ type: 'punctuation', text: '}' }] },
];

export default function VantaLoader() {
  console.log('VantaLoader: Component rendering/re-rendering');
  const [currentDisplayedLines, setCurrentDisplayedLines] = useState([]);
  const [overallLineIndex, setOverallLineIndex] = useState(0);
  const [currentCharIndexInLine, setCurrentCharIndexInLine] = useState(0);
  const [activeThemeStyles, setActiveThemeStyles] = useState(() => {
    // Leer el tema inicial de forma síncrona si es posible
    if (typeof window !== 'undefined') {
      const theme = document.documentElement.getAttribute('data-theme');
      console.log('VantaLoader: Initial theme read:', theme);
      return theme === 'light' ? lightThemeStyles : darkThemeStyles;
    }
    return darkThemeStyles; // Fallback para SSR si window no está definido (aunque es client:only)
  });
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    console.log('VantaLoader: Theme effect triggered.');
    const getAstroTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      console.log('VantaLoader: getAstroTheme - data-theme:', theme);
      return theme === 'light' ? lightThemeStyles : darkThemeStyles;
    };

    // Setea el tema al montar, por si el observer no se dispara inmediatamente o el atributo ya está
    setActiveThemeStyles(getAstroTheme());

    const observer = new MutationObserver((mutationsList) => {
      for(const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme');
          console.log('VantaLoader: MutationObserver - new data-theme:', newTheme);
          setActiveThemeStyles(newTheme === 'light' ? lightThemeStyles : darkThemeStyles);
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      console.log('VantaLoader: Disconnecting theme observer.');
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(`VantaLoader: Animation effect. Line: ${overallLineIndex}, Char: ${currentCharIndexInLine}`);

    if (overallLineIndex >= initialCodeLines.length) { // Cambio aquí >=
      console.log('VantaLoader: All lines displayed. Setting up loop.');
      setShowCursor(true);
      const timer = setTimeout(() => {
        console.log('VantaLoader: Loop: Resetting animation.');
        setCurrentDisplayedLines([]);
        setOverallLineIndex(0);
        setCurrentCharIndexInLine(0);
      }, 3000);
      return () => {
        console.log('VantaLoader: Loop: Clearing loop timer.');
        clearTimeout(timer);
      };
    }

    setShowCursor(true);
    const currentLineObject = initialCodeLines[overallLineIndex];
    if (!currentLineObject) {
        console.error('VantaLoader: Error - currentLineObject is undefined for overallLineIndex:', overallLineIndex);
        return; // Salir si no hay línea (debería ser prevenido por el check de arriba)
    }

    const segments = currentLineObject.segments || [{ type: 'text', text: currentLineObject.text || '' }];

    let fullTextOfCurrentLine = '';
    if (currentLineObject.segments) {
        fullTextOfCurrentLine = currentLineObject.segments.reduce((acc, seg) => acc + (seg.text || ''), '');
    } else {
        fullTextOfCurrentLine = currentLineObject.text || '';
    }

    if (currentCharIndexInLine < fullTextOfCurrentLine.length) {
      const typingSpeed = currentLineObject.segments?.[0]?.type === 'comment' ? 60 : 30;
      const timer = setTimeout(() => {
        setCurrentDisplayedLines(prevLines => {
          const newLines = [...prevLines];
          let lineToUpdate = newLines[overallLineIndex] || { segments: [] };

          let charCount = 0;
          let newSegments = [];
          for (const seg of segments) {
            const segmentText = seg.text || '';
            if (charCount + segmentText.length > currentCharIndexInLine) {
              newSegments.push({
                ...seg,
                text: segmentText.substring(0, currentCharIndexInLine - charCount + 1)
              });
              break;
            } else {
              newSegments.push(seg);
              charCount += segmentText.length;
            }
          }
          lineToUpdate.segments = newSegments;

          // Asegurar que la línea se añade o actualiza correctamente
          if (newLines.length <= overallLineIndex) {
             while(newLines.length <= overallLineIndex) newLines.push({segments: []}); // Rellenar si es necesario
             newLines[overallLineIndex] = lineToUpdate;
          } else {
             newLines[overallLineIndex] = lineToUpdate;
          }
          // console.log('VantaLoader: setCurrentDisplayedLines (char update)', JSON.stringify(newLines.map(l => l.segments.map(s=>s.text).join(""))));
          return newLines;
        });
        setCurrentCharIndexInLine(currentCharIndexInLine + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      const displayTime = fullTextOfCurrentLine.length < 5 ? 150 : 250;
      const timer = setTimeout(() => {
        setCurrentDisplayedLines(prevLines => {
            const newLines = [...prevLines];
            // Asegurar que la línea completa (original) se muestre
            newLines[overallLineIndex] = initialCodeLines[overallLineIndex];
            // console.log('VantaLoader: setCurrentDisplayedLines (line complete)', JSON.stringify(newLines.map(l => l.segments.map(s=>s.text).join(""))));
            return newLines;
        });
        setOverallLineIndex(overallLineIndex + 1);
        setCurrentCharIndexInLine(0);
      }, displayTime);
      return () => clearTimeout(timer);
    }
  }, [overallLineIndex, currentCharIndexInLine, activeThemeStyles]); // activeThemeStyles en dependencias por si el tema cambia mientras escribe

  console.log('VantaLoader: Rendering. Displayed lines:', currentDisplayedLines.length, 'Current theme bg:', activeThemeStyles.containerBg);

  const renderSegment = (segment, theme) => {
    if (!segment || typeof segment.text === 'undefined') return null; // Chequeo adicional
    const style = theme[segment.type] || { color: theme.text };
    return <span style={style}>{segment.text}</span>;
  };

  return (
    <div style={{ ...commonStyles.container, backgroundColor: activeThemeStyles.containerBg, color: activeThemeStyles.text }}>
      <div style={{ ...commonStyles.topFadeBase, background: activeThemeStyles.topFadeBackground }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {currentDisplayedLines.map((line, lineIdx) => (
          <span key={lineIdx} style={commonStyles.codeLine}>
            {line.segments ? line.segments.map((seg, segIdx) => (
              <React.Fragment key={segIdx}>{renderSegment(seg, activeThemeStyles)}</React.Fragment>
            )) : (line.text || '')}
            {/* Cursor al final de la línea que se está escribiendo */}
            {lineIdx === currentDisplayedLines.length - 1 && overallLineIndex < initialCodeLines.length && showCursor && <BlinkingCursor color={activeThemeStyles.text} />}
          </span>
        ))}
        {/* Cursor al final si toda la animación terminó y está en pausa antes del loop */}
        {overallLineIndex >= initialCodeLines.length && showCursor && ( // Cambio aquí >=
          <span style={commonStyles.codeLine}>
            <BlinkingCursor color={activeThemeStyles.text} />
          </span>
        )}
      </div>
    </div>
  );
}
