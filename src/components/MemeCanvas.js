import React, { useState } from 'react';

const MemeCanvas = ({ image, textElements, selectedTextId, setSelectedTextId, updateTextElement, containerRef }) => {
  const [draggedText, setDraggedText] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, textId) => {
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const text = textElements.find(t => t.id === textId);
    setDraggedText(textId);
    setSelectedTextId(textId);
    setDragOffset({ x: e.clientX - rect.left - text.x, y: e.clientY - rect.top - text.y });
  };

  const handleMouseMove = (e) => {
    if (draggedText !== null) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;
      updateTextElement(draggedText, { x, y });
    }
  };

  const handleMouseUp = () => setDraggedText(null);

  return (
    <div ref={containerRef} style={{ position: 'relative', background: 'black', borderRadius: '8px', overflow: 'hidden', userSelect: 'none' }}
         onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <img src={image} alt="Meme" style={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'contain', display: 'block' }} draggable="false" />
      {textElements.map(textEl => (
        <div
          key={textEl.id}
          onMouseDown={(e) => handleMouseDown(e, textEl.id)}
          style={{
            position: 'absolute',
            left: textEl.x,
            top: textEl.y,
            fontSize: textEl.fontSize,
            color: textEl.color,
            fontFamily: textEl.font,
            fontWeight: 'bold',
            cursor: 'move',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            textShadow: textEl.stroke ? '3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000' : 'none',
            outline: selectedTextId === textEl.id ? '2px solid #60a5fa' : 'none'
          }}
        >
          {textEl.text}
        </div>
      ))}
    </div>
  );
};

export default MemeCanvas;