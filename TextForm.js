import React, { useMemo, useState } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState('');

  const words = useMemo(
    () => (text.trim() ? text.trim().split(/\s+/) : []),
    [text]
  );

  const wordCount = words.length;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;
  const uniqueWords = new Set(words.map((word) => word.toLowerCase())).size;
  const readingTime = wordCount ? (wordCount * 0.008).toFixed(2) : '0.00';

  const handleUpperCase = () => setText(text.toUpperCase());
  const handleLowerCase = () => setText(text.toLowerCase());
  const handleSentenceCase = () => {
    if (!text) return;
    const newText = text
      .toLowerCase()
      .split(/(?<=[.!?]\s+)|\n+/)
      .map((sentence) =>
        sentence
          .trim()
          .replace(/^[a-z]/, (char) => char.toUpperCase())
      )
      .join(' ')
      .trim();

    setText(newText);
  };

  const handleCapitalize = () => {
    if (!text) return;
    const newText = text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setText(newText);
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      alert('Text copied to clipboard');
    } catch (err) {
      alert('Unable to copy text');
    }
  };

  const handleClear = () => setText('');

  return (
    <>
      <div className="form-field mb-3">
        <label htmlFor="fieldTextarea" className="form-label">
          {props.heading}
        </label>
        <textarea
          className="form-control"
          id="fieldTextarea"
          rows="6"
          value={text}
          style={{backgroundColor: props.mode === 'dark'?'#636d76':'white' , color: props.mode === 'dark'?'white':'black'}}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
        ></textarea>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3">
        <button className="btn btn-primary" type="button" onClick={handleUpperCase}>
          Uppercase
        </button>
        <button className="btn btn-primary" type="button" onClick={handleLowerCase}>
          Lowercase
        </button>
        <button className="btn btn-primary" type="button" onClick={handleCapitalize}>
          Capitalize
        </button>
        <button className="btn btn-primary" type="button" onClick={handleSentenceCase}>
          Sentence Case
        </button>
        <button className="btn btn-success" type="button" onClick={handleCopy}>
          Copy Text
        </button>
        <button className="btn btn-outline-secondary" type="button" onClick={handleClear}>
          Clear
        </button>
      </div>

      <div className="container my-3">
        <h1>Your text summary</h1>
        <p>
          {wordCount} words, {charCount} characters, and {charCountNoSpaces} characters without spaces
        </p>
        <p>{readingTime} minutes to read</p>

        <h3>Preview</h3>
        <p>{text || 'Enter something in the textbox above to preview it here'}</p>
      </div>

      <div className="container my-3">
        <h4>Words</h4>
        <p>Total Words: {wordCount}</p>
        <p>Unique Words: {uniqueWords}</p>
      </div>
    </>
  );
}