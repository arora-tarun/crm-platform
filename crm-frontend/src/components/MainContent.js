import React from 'react';

function MainContent({ children, sidebarVisible }) {
  return (
    <main
      className="flex-grow-1 p-4"
      style={{ marginLeft: sidebarVisible ? 10 : 0, transition: 'margin-left 0.3s ease' }}
    >
      {children}
    </main>
  );
}

export default MainContent;
