// src/components/VantaLoader.jsx
import { useEffect, useRef, useState } from 'react';

// Estilos en línea para simplicidad, podrían moverse a un CSS si crece mucho
const codeContainerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  backgroundColor: '#1E1E1E', // Un fondo oscuro común en editores
  color: '#D4D4D4', // Color de texto claro general
  fontFamily: '"Fira Code", "Source Code Pro", Menlo, Monaco, Consolas, "Courier New", monospace',
  fontSize: '14px', // Ajustar según sea necesario
  lineHeight: '1.6',
  padding: '20px',
  overflow: 'hidden', // Para que el texto no se desborde si es muy largo
  boxSizing: 'border-box',
};

const codeLineStyle = {
  whiteSpace: 'pre-wrap', // Permite saltos de línea y respeta espacios
  display: 'block',
};

const keywordStyle = { color: '#569CD6' }; // Azul para keywords (Dart/TS like)
const classStyle = { color: '#4EC9B0' }; // Turquesa para clases
const stringStyle = { color: '#CE9178' }; // Naranja para strings
const commentStyle = { color: '#6A9955' }; // Verde para comentarios
const propertyStyle = { color: '#9CDCFE' }; // Celeste para propiedades/variables
const functionStyle = { color: '#DCDCAA' }; // Amarillo para funciones

const BlinkingCursor = () => (
  <span
    style={{
      fontWeight: 'bold',
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

const codeLines = [
  { text: <><span style={commentStyle}>// Iniciando el ecosistema digital de Molly Inc.</span></> },
  { text: <><span style={keywordStyle}>import</span> 'package:molly_framework/molly_framework.dart'<span style={keywordStyle}> as </span>molly;</> },
  { text: '' },
  { text: <><span style={keywordStyle}>void</span> <span style={functionStyle}>main</span>() {'{'}</> },
  { text: <>&nbsp;&nbsp;<span style={classStyle}>MollyApp</span> <span style={propertyStyle}>app</span> = molly.<span style={functionStyle}>bootstrap</span>(</> },
  { text: <>&nbsp;&nbsp;&nbsp;&nbsp;name: <span style={stringStyle}>'Molly Inc. Soluciones Digitales'</span>,</> },
  { text: <>&nbsp;&nbsp;&nbsp;&nbsp;version: <span style={stringStyle}>'2.0.0'</span>,</> },
  { text: <>&nbsp;&nbsp;&nbsp;&nbsp;modules: [</> },
  { text: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={classStyle}>TecnologiaModulo</span>(),</> },
  { text: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={classStyle}>DisenoCreativoModulo</span>(),</> },
  { text: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={classStyle}>EstrategiaDigitalModulo</span>(),</> },
  { text: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={classStyle}>InnovacionContinua</span>(),</> },
  { text: <>&nbsp;&nbsp;&nbsp;&nbsp;],</> },
  { text: <>&nbsp;&nbsp;);</> },
  { text: '' },
  { text: <>&nbsp;&nbsp;app.<span style={functionStyle}>run</span>();</> },
  { text: <>&nbsp;&nbsp;<span style={commentStyle}>// Potenciando negocios con soluciones modulares...</span></> },
  { text: <>{'}'}</> },
];

export default function VantaLoader() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Simulación de escritura
    const totalLines = codeLines.length;
    let currentLine = 0;

    const intervalId = setInterval(() => {
      if (currentLine < totalLines) {
        currentLine++;
        setVisibleLines(currentLine);
      } else {
        clearInterval(intervalId);
        // Opcional: hacer algo cuando termine, como ocultar el cursor o reiniciar
        setShowCursor(true); // Mantener el cursor al final
      }
    }, 250); // Velocidad de escritura (ms por línea)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={codeContainerStyle}>
      {codeLines.slice(0, visibleLines).map((line, index) => (
        <span key={index} style={codeLineStyle}>
          {line.text}
          {index === visibleLines - 1 && index < codeLines.length -1 && showCursor && <BlinkingCursor />}
        </span>
      ))}
      {/* Mostrar cursor en la última línea visible si la animación ha terminado */}
      {visibleLines === codeLines.length && showCursor && (
         <span style={codeLineStyle}>
            {/* Espacio para el cursor si la última línea está vacía o para que no se pegue al texto */}
            {codeLines[codeLines.length-1]?.text ? '' : '\u00A0'}
            <BlinkingCursor />
        </span>
      )}
    </div>
  );
}
