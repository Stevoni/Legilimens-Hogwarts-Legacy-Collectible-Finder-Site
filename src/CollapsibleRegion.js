import React, { useState } from 'react';
import './style/collapsible-region.css'

function CollapsibleRegion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-region">
      <div className="collapsible-header" onClick={toggleOpen}>
        <h2>{title}</h2>
        <div className={`arrow ${isOpen ? 'open' : ''}`}>&#9658;</div>
      </div>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  );
}

export default CollapsibleRegion;
