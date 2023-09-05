import React from 'react';
 // Create and import your footer-specific CSS file if needed

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-sm  text-center py-4">
        <p>&copy; {new Date().getFullYear()} Copyright SAMIMA HASSAN</p>
      </div>
    </footer>
  );
};

export default Footer;
