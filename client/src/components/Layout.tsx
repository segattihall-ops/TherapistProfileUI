import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const SkipToContent = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
  >
    Skip to main content
  </a>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <SkipToContent />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </>
  );
};
