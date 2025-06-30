// src/components/VantaLoader.jsx
import { useEffect, useState } from 'react';

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
    fontSize: '16px', // Fuente más grande
    lineHeight: '1.7',
    padding: '20px',
    overflow: 'hidden',
    boxSizing: 'border-box',
    transition: 'background-color 0.3s ease, color 0.3s ease', // Transición suave de tema
  },
  codeLine: {
    whiteSpace: 'pre-wrap',
    display: 'block',
    minHeight: '27.2px', // fontSize * lineHeight para evitar saltos al borrar
  },
  topFadeBase: { // Estilos base para el degradado superior
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100px', // Altura del degradado
    zIndex: 1, // Por encima del código pero debajo del contenido de la página
    transition: 'background 0.3s ease',
  },
};

const darkThemeStyles = {
  containerBg: '#000000', // Fondo negro oscuro
  text: '#E0E0E0',       // Texto general gris claro
  keyword: '#569CD6',    // Azul
  class: '#4EC9B0',      // Turquesa
  string: '#CE9178',     // Naranja
  comment: '#6A9955',    // Verde
  property: '#9CDCFE',   // Celeste
  function: '#DCDCAA',   // Amarillo
  operator: '#D4D4D4',   // Gris claro para operadores como = ( ) , ;
  punctuation: '#D4D4D4',// Gris claro para puntuación como : [ ] { }
  topFadeBackground: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 100%)',
};

const lightThemeStyles = {
  containerBg: '#F5F5F5', // Fondo blanco/gris muy claro
  text: '#212121',       // Texto general oscuro
  keyword: '#0000FF',    // Azul oscuro
  class: '#267F99',      // Turquesa oscuro
  string: '#A31515',      // Rojo oscuro para strings
  comment: '#008000',    // Verde oscuro
  property: '#001080',   // Azul marino
  function: '#795E26',   // Marrón/ocre
  operator: '#333333',   // Gris oscuro
  punctuation: '#333333',// Gris oscuro
  topFadeBackground: 'linear-gradient(to bottom, rgba(245,245,245,1) 0%, rgba(245,245,245,0.8) 30%, rgba(245,245,245,0) 100%)',
};


const BlinkingCursor = ({ color }) => (
  <span
    style={{
      fontWeight: 'bold',
      color: color,
      animation: 'blink 1s step-end infinite',
    }}
  >
    _
    <style>{`
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    `}</style>
  </span>
);

// Estructura de las líneas de código:
// Cada objeto puede tener:
// - text: el contenido principal de la línea o segmento.
// - type: (opcional) el tipo de token para aplicar estilo (keyword, class, string, etc.)
// - segments: (opcional) un array de sub-segmentos si una línea tiene múltiples estilos.
//             Cada segmento tiene 'text' y 'type'.
const initialCodeLines = [
  { segments: [{ type: 'comment', text: '// Iniciando el ecosistema digital de Molly Inc.' }] },
  { segments: [
      { type: 'keyword', text: 'import ' },
      { type: 'string', text: "'package:molly_framework/molly_framework.dart'" },
      { type: 'keyword', text: ' as ' },
      { type: 'property', text: 'molly' },
      { type: 'punctuation', text: ';' }
  ]},
  { text: '' },
  { segments: [
      { type: 'keyword', text: 'void ' },
      { type: 'function', text: 'main' },
      { type: 'punctuation', text: '() {' }
  ]},
  { segments: [
      { type: 'text', text: '  ' },
      { type: 'class', text: 'MollyApp ' },
      { type: 'property', text: 'app ' },
      { type: 'operator', text: '= ' },
      { type: 'property', text: 'molly.' },
      { type: 'function', text: 'bootstrap' },
      { type: 'punctuation', text: '(' }
  ]},
  { segments: [
      { type: 'text', text: '    ' },
      { type: 'property', text: 'name: ' },
      { type: 'string', text: "'Molly Inc: Soluciones Digitales'" },
      { type: 'punctuation', text: ',' }
  ]},
  { segments: [
      { type: 'text', text: '    ' },
      { type: 'property', text: 'version: ' },
      { type: 'string', text: "'3.0.0-beta'" },
      { type: 'punctuation', text: ', ' },
      { type: 'comment', text: '// Innovación constante' }
  ]},
  { segments: [
      { type: 'text', text: '    ' },
      { type: 'property', text: 'environment: ' },
      { type: 'property', text: 'molly.' },
      { type: 'class', text: 'Environment' },
      { type: 'operator', text: '.' },
      { type: 'property', text: 'production' },
      { type: 'punctuation', text: ',' }
  ]},
  { segments: [
      { type: 'text', text: '    ' },
      { type: 'property', text: 'modules: ' },
      { type: 'punctuation', text: '[' }
  ]},
  { segments: [
      { type: 'text', text: '      ' },
      { type: 'class', text: 'TecnologiaModulo' },
      { type: 'punctuation', text: '(' },
      { type: 'string', text: "'IA & Automatización'" },
      { type: 'punctuation', text: '),' }
  ]},
  { segments: [
      { type: 'text', text: '      ' },
      { type: 'class', text: 'DisenoCreativoModulo' },
      { type: 'punctuation', text: '(' },
      { type: 'string', text: "'UX/UI Centrado en el Usuario'" },
      { type: 'punctuation', text: '),' }
  ]},
  { segments: [
      { type: 'text', text: '      ' },
      { type: 'class', text: 'EstrategiaDigitalModulo' },
      { type: 'punctuation', text: '(' },
      { type: 'string', text: "'Crecimiento Sostenible'" },
      { type: 'punctuation', text: '),' }
  ]},
  { segments: [
      { type: 'text', text: '      ' },
      { type: 'class', text: 'InnovacionContinua' },
      { type: 'punctuation', text: '(' },
      { type: 'string', text: "'I+D+i'" },
      { type: 'punctuation', text: '),' }
  ]},
  { segments: [
      { type: 'text', text: '      ' },
      { type: 'class', text: 'SoporteBase' },
      { type: 'punctuation', text: '(' },
      { type: 'string', text: "'Capacitación y Asesoría'" },
      { type: 'punctuation', text: ')' }
  ]},
  { segments: [{ type: 'text', text: '    ' }, { type: 'punctuation', text: '],' }] },
  { segments: [{ type: 'text', text: '  ' }, { type: 'punctuation', text: ');' }] },
  { text: '' },
  { segments: [
      { type: 'text', text: '  ' },
      { type: 'property', text: 'app.' },
      { type: 'function', text: 'registerService' },
      { type: 'punctuation', text: '<' },
      { type: 'class', text: 'AnaliticaAvanzada' },
      { type: 'punctuation', text: '>()' },
      { type: 'operator', text: ', ' },
      { type: 'keyword', text: 'await ' },
      { type: 'class', text: 'AnaliticaService.' },
      { type: 'function', text: 'init' },
      { type: 'punctuation', text: '());' }
  ]},
  { segments: [
      { type: 'text', text: '  ' },
      { type: 'property', text: 'app.' },
      { type: 'function', text: 'onReady' },
      { type: 'punctuation', text: '(() => {' }
  ]},
  { segments: [
      { type: 'text', text: '    ' },
      { type: 'property', text: 'print' },
      { type: 'punctuation', text: '(' },
      { type: 'string', text: "'🚀 Molly Inc. lista para transformar tu negocio!'" },
      { type: 'punctuation', text: ');' }
  ]},
  { segments: [
      { type: 'text', text: '  ' },
      { type: 'punctuation', text: '});' }
  ]},
  { segments: [
      { type: 'text', text: '  ' },
      { type: 'property', text: 'app.' },
      { type: 'function', text: 'run' },
      { type: 'punctuation', text: '();' }
  ]},
  { segments: [{ type: 'comment', text: '// Molly Inc. - Tu socio en la transformación digital.' }] },
  { segments: [{ type: 'punctuation', text: '}' }] },
];
// --- Fin Configuración ---

export default function VantaLoader() {
  const [currentDisplayedLines, setCurrentDisplayedLines] = useState([]);
  const [overallLineIndex, setOverallLineIndex] = useState(0);
  const [currentCharIndexInLine, setCurrentCharIndexInLine] = useState(0);
  const [activeThemeStyles, setActiveThemeStyles] = useState(darkThemeStyles);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const getAstroTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      return theme === 'light' ? lightThemeStyles : darkThemeStyles;
    };
    setActiveThemeStyles(getAstroTheme());
    const observer = new MutationObserver(() => {
      setActiveThemeStyles(getAstroTheme());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (overallLineIndex === initialCodeLines.length) {
      setShowCursor(true); // Asegurar que el cursor se muestre al final
      const timer = setTimeout(() => { // Loop
        setCurrentDisplayedLines([]);
        setOverallLineIndex(0);
        setCurrentCharIndexInLine(0);
      }, 3000); // Pausa antes de reiniciar
      return () => clearTimeout(timer);
    }

    setShowCursor(true);
    const currentLineObject = initialCodeLines[overallLineIndex];
    const segments = currentLineObject.segments || [{ type: 'text', text: currentLineObject.text || '' }];

    // Calcular el texto completo de la línea actual para la animación char a char
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
          let lineToUpdate = newLines[overallLineIndex] || { segments: [] }; // Inicia con segments vacíos si es nueva

          // Reconstruir los segmentos de la línea actual hasta el currentCharIndexInLine
          let charCount = 0;
          let newSegments = [];
          for (const seg of segments) {
            if (charCount + (seg.text?.length || 0) > currentCharIndexInLine) {
              newSegments.push({
                ...seg,
                text: seg.text?.substring(0, currentCharIndexInLine - charCount + 1)
              });
              break;
            } else {
              newSegments.push(seg);
              charCount += (seg.text?.length || 0);
            }
          }
          lineToUpdate.segments = newSegments;

          if (newLines.length === overallLineIndex) { // Si es la primera vez que procesamos esta línea
             newLines.push(lineToUpdate);
          } else {
             newLines[overallLineIndex] = lineToUpdate;
          }
          return newLines;
        });
        setCurrentCharIndexInLine(currentCharIndexInLine + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      // Línea completada, pasar a la siguiente
      const displayTime = fullTextOfCurrentLine.length < 5 ? 150 : 250;
      const timer = setTimeout(() => {
        // Asegurar que la línea completa se muestre con todos sus estilos
        setCurrentDisplayedLines(prevLines => {
            const newLines = [...prevLines];
            newLines[overallLineIndex] = initialCodeLines[overallLineIndex];
            return newLines;
        });
        setOverallLineIndex(overallLineIndex + 1);
        setCurrentCharIndexInLine(0);
      }, displayTime);
      return () => clearTimeout(timer);
    }
  }, [overallLineIndex, currentCharIndexInLine, activeThemeStyles]);


  const renderSegment = (segment, theme) => {
    const style = theme[segment.type] || { color: theme.text }; // Fallback al color de texto general
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
        {overallLineIndex === initialCodeLines.length && showCursor && (
          <span style={commonStyles.codeLine}>
            <BlinkingCursor color={activeThemeStyles.text} />
          </span>
        )}
      </div>
    </div>
  );
}

// Necesitas importar React si usas React.Fragment explícitamente, aunque a veces es implícito
import React from 'react';
