import React from 'react';
import { Trash2 } from 'lucide-react';

const TextElementCard = ({
  textEl,
  isSelected,
  onSelect,
  onDelete,
}) => (
  <div
    onClick={onSelect}
    style={{
      padding: '12px',
      borderRadius: '8px',
      border: `2px solid ${isSelected ? '#3b82f6' : '#e5e7eb'}`,
      cursor: 'pointer',
      marginBottom: '12px',
      background: isSelected ? '#eff6ff' : 'white',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          fontWeight: '600',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {textEl.text || 'Empty'}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        style={{
          background: 'none',
          border: 'none',
          color: '#ef4444',
          cursor: 'pointer',
        }}
      >
        <Trash2 size={18} />
      </button>
    </div>
  </div>
);

export default TextElementCard;