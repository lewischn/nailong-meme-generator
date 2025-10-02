# 💛 Nailong Meme Generator

A fun and easy-to-use meme generator featuring a collection of 78 Nailong images. Create custom memes by adding draggable text with various fonts, colors, and styling options.

## Features

- **Image Library**: Browse through 78 pre-loaded Nailong images
- **Random Image**: Get a random Nailong image with one click
- **Upload Custom Images**: Use your own images to create memes
- **Draggable Text**: Add and position text anywhere on the image
- **Text Customization**:
  - Multiple font options
  - Adjustable font size (20-120px)
  - Color picker for text color
  - Optional black outline for better readability
- **Download**: Export your meme as a PNG image

## Installation

1. Clone the repository:
git clone https://github.com/lewischn/nailong-meme-generator.git
cd nailong-meme-generator
2. Install dependencies:
npm install
3. Start the development server:
npm start
4. Open http://localhost:3000 in your browser

## Usage

### Select an Image:
- Click "Library" to browse all available images
- Click "Random" for a random image
- Click "Upload your own image!" to use a custom image

### Add Text:
- Click "Add Text" to create a new text element
- Drag the text to position it on the image
- Select text to edit its properties in the right panel

### Customize Text:
- Edit the text content
- Adjust font size with the slider
- Choose from multiple fonts
- Change text color
- Toggle black outline for better visibility

### Download:
- Click "Download Meme" to save your creation as a PNG

## Technologies Used

- React
- Lucide React (for icons)
- HTML Canvas API (for image export)

## Project Structure

- **nailong-meme-generator/**
  - **public/**
    - **nailongImages/**
      - nailong1.jpeg
      - nailong2.jpeg
      - ...
    - nalong.jpeg
  - **src/**
    - **components/**
      - ImageLibrary.js
      - MemeCanvas.js
      - TextEditor.js
    - App.js
    - index.js
  - package.json

## License

MIT License

---

Made with 💛