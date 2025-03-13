"use client"
import { useState } from 'react';
import { generatePassword } from 'utils/password';
import { Copy, Check } from 'lucide-react';
import './style.css';

const Home = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 12) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    setStrength(score);
  };

  const handleGenerate = () => {
    const newPassword = generatePassword(length, useNumbers, useSymbols, useUppercase);
    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrengthClass = (index: number) => {
    if (index >= strength) return '';
    const classes = ['strength-bar-red', 'strength-bar-orange', 'strength-bar-yellow', 'strength-bar-green'];
    return classes[index];
  };

  return (
    <div className="password-container">
      <div className="password-card">
        <div className="password-input-group">
          <input 
            type="text" 
            value={password || 'Click Generate'}
            readOnly 
            className="password-input"
          />
          <button 
            onClick={copyToClipboard}
            className="copy-button"
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </button>
        </div>

        <div className="length-group">
          <div className="length-header">
            <span className="toggle-label">Length: {length}</span>
            <div className="strength-meter">
              {Array.from({ length: 4 }).map((_, i) => (
                <div 
                  key={i}
                  className={`strength-bar ${getStrengthClass(i)}`}
                />
              ))}
            </div>
          </div>
          <input 
            type="range" 
            min="8" 
            max="32" 
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {[
          { label: 'Numbers', state: useNumbers, setState: setUseNumbers },
          { label: 'Symbols', state: useSymbols, setState: setUseSymbols },
          { label: 'Uppercase', state: useUppercase, setState: setUseUppercase },
        ].map(({ label, state, setState }) => (
          <label key={label} className="toggle-option">
            <span className="toggle-label">{label}</span>
            <div 
              onClick={() => setState(!state)}
              className={`toggle-switch ${state ? 'toggle-switch-on' : 'toggle-switch-off'}`}
            >
              <div className={`toggle-dot ${state ? 'toggle-dot-on' : 'toggle-dot-off'}`} />
            </div>
          </label>
        ))}

        <button onClick={handleGenerate} className="generate-button">
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default Home;
