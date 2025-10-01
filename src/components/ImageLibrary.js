import React from 'react';

const ImageLibrary = ({ images, onSelect }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    padding: '16px',
    background: '#f9fafb',
    borderRadius: '8px',
    marginBottom: '24px'
  }}>
    {images.map((img, idx) => (
      <img
        key={idx}
        src={img}
        alt={`Library ${idx + 1}`}
        onClick={() => onSelect(img)}
        style={{
          width: '100%',
          height: '128px',
          objectFit: 'cover',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} 
      />
    ))}
  </div>
);

export default ImageLibrary;