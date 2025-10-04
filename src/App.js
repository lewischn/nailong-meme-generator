import React, { useState, useRef } from 'react';
import { Upload, Shuffle, Type, Plus } from 'lucide-react';
import MemeCanvas from './components/MemeCanvas';
import TextEditor from './components/TextEditor';
import ImageLibrary from './components/ImageLibrary';
import nailongImage from './nalong.jpeg'; 

const totalImages = 78; 
const imageLibrary = Array.from({ length: totalImages }, (_, i) => `/nailongImages/nailong${i + 1}.jpeg`);

const fonts = [
  'Impact',
  'Arial Black',
  'Helvetica',
  'Futura',
  'Gill Sans',  
  'Century Gothic',
  'Trebuchet MS',
  'Verdana'
];

const NailongMemeGenerator = () => {
  const [currentImage, setCurrentImage] = useState(imageLibrary[0]);
  const [textElements, setTextElements] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [showLibrary, setShowLibrary] = useState(false);

  const fileInputRef = useRef(null);
  const imageContainerRef = useRef(null);

  const addTextElement = () => {
    const newText = {
      id: Date.now(),
      text: 'New Text',
      x: 50,
      y: 50,
      fontSize: 48,
      color: '#ffffff',
      font: 'Impact',
      stroke: true
    };
    setTextElements([...textElements, newText]);
    setSelectedTextId(newText.id);
  };

  const updateTextElement = (id, updates) => {
    setTextElements(textElements.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTextElement = (id) => {
    setTextElements(textElements.filter(t => t.id !== id));
    if (selectedTextId === id) setSelectedTextId(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCurrentImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageLibrary.length);
    setCurrentImage(imageLibrary[randomIndex]);
    setShowLibrary(false);
  };

  const handleImageSelect = (img) => {
    setCurrentImage(img);
    setShowLibrary(false);
  };

const downloadMeme = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.crossOrigin = 'anonymous';

  img.onload = () => {
    const rect = imageContainerRef.current.getBoundingClientRect();

    canvas.width = img.width;
    canvas.height = img.height;

    const scaleX = img.width / rect.width;
    const scaleY = img.height / rect.height;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    textElements.forEach(textEl => {
      ctx.font = `bold ${textEl.fontSize * scaleY}px ${textEl.font}`;
      ctx.fillStyle = textEl.color;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      if (textEl.stroke) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = Math.max(2, textEl.fontSize * scaleY / 15);
        ctx.strokeText(textEl.text, textEl.x * scaleX, textEl.y * scaleY);
      }

      ctx.fillText(textEl.text, textEl.x * scaleX, textEl.y * scaleY);
    });

    const link = document.createElement('a');
    link.download = 'nailong-meme.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  img.src = currentImage;
};

  const selectedText = textElements.find(t => t.id === selectedTextId);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '32px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundImage: `url(${nailongImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255, 255, 0, 0.3)',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '8px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          Nailong Meme Generator
        </h1>

        <p
          style={{
            color: 'white',
            textAlign: 'center',
            marginBottom: '32px',
            fontSize: '18px',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          💛Create the perfect Nailong meme!💛
        </p>

        <div
          style={{
            display: window.innerWidth >= 1024 ? 'grid' : 'block',
            gridTemplateColumns: '2fr 1fr',
            gap: '24px',
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <button
                onClick={() => fileInputRef.current.click()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'white',
                  background: '#3b82f6',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                <Upload size={20} /> Upload your own image!
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />

              <button
                onClick={() => setShowLibrary(!showLibrary)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'white',
                  background: '#22c55e',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                <Type size={20} /> Library
              </button>

              <button
                onClick={handleRandomImage}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'white',
                  background: '#a855f7',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                <Shuffle size={20} /> Random
              </button>

              <button
                onClick={addTextElement}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'white',
                  background: '#f97316',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                <Plus size={20} /> Add Text
              </button>
            </div>

            {showLibrary && <ImageLibrary images={imageLibrary} onSelect={handleImageSelect} />}

            <MemeCanvas
              image={currentImage}
              textElements={textElements}
              selectedTextId={selectedTextId}
              setSelectedTextId={setSelectedTextId}
              updateTextElement={updateTextElement}
              containerRef={imageContainerRef}
            />

            <button
              onClick={downloadMeme}
              style={{
                width: '100%',
                marginTop: '24px',
                background: 'linear-gradient(90deg, #ec4899 0%, #fb923c 100%)',
                color: 'white',
                fontWeight: 'bold',
                padding: '16px 24px',
                borderRadius: '8px',
                fontSize: '20px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              💛 Download Meme 💛
            </button>
          </div>

          <TextEditor
            textElements={textElements}
            selectedText={selectedText}
            setSelectedTextId={setSelectedTextId}
            updateTextElement={updateTextElement}
            deleteTextElement={deleteTextElement}
            fonts={fonts}
          />
        </div>
      </div>
    </div>
  );
}

export default NailongMemeGenerator;