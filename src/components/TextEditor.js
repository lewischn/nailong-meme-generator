import React from 'react';
import TextElementCard from './TextElementCard';

const TextEditor = ({ textElements, selectedText, setSelectedTextId, updateTextElement, deleteTextElement, fonts }) => (
  <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', marginTop: window.innerWidth < 1024 ? '24px' : '0' }}>
    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Text Elements</h2>
    {textElements.length === 0 ? (
      <p style={{ color: '#6b7280', textAlign: 'center', padding: '32px 0' }}>Click "Add Text" to get started!</p>
    ) : (
      textElements.map(textEl => (
        <TextElementCard
          key={textEl.id}
          textEl={textEl}
          isSelected={selectedText?.id === textEl.id}
          onSelect={() => setSelectedTextId(textEl.id)}
          onDelete={() => deleteTextElement(textEl.id)}
        />
      ))
    )}

    {selectedText && (
      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '16px' }}>Edit Text</h3>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Text</label>
          <input type="text" value={selectedText.text} onChange={(e) => updateTextElement(selectedText.id, { text: e.target.value })}
                 style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Font</label>
          <select value={selectedText.font} onChange={(e) => updateTextElement(selectedText.id, { font: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}>
            {fonts.map(font => <option key={font} value={font}>{font}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Size: {selectedText.fontSize}px</label>
          <input type="range" min="12" max="120" value={selectedText.fontSize}
                 onChange={(e) => updateTextElement(selectedText.id, { fontSize: parseInt(e.target.value) })} style={{ width: '100%' }} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Color</label>
          <input type="color" value={selectedText.color} onChange={(e) => updateTextElement(selectedText.id, { color: e.target.value })}
                 style={{ width: '100%', height: '40px', borderRadius: '8px', cursor: 'pointer' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" id="stroke" checked={selectedText.stroke} onChange={(e) => updateTextElement(selectedText.id, { stroke: e.target.checked })} style={{ width: '16px', height: '16px' }} />
          <label htmlFor="stroke" style={{ fontSize: '14px', fontWeight: '500' }}>Black Outline</label>
        </div>
      </div>
    )}
  </div>
);

export default TextEditor;