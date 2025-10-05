import { useEffect } from 'react';

declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}

const UnicornBackground = () => {
  useEffect(() => {
    // Check if script is already loaded
    if (window.UnicornStudio?.isInitialized) {
      return;
    }

    // Load Unicorn Studio script
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false, init: () => {} };
      
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.32/dist/unicornStudio.umd.js';
      script.async = true;
      script.onload = () => {
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      
      (document.head || document.body).appendChild(script);
    }
  }, []);

  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-10 unicorn-container">
        <div 
          data-us-project="8cyZz9S3nvapmQIYY0LV" 
          className="w-full h-full"
          style={{ minHeight: '100vh' }}
        />
      </div>
      {/* Overlay to cover Unicorn Studio watermark */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-20 z-50 pointer-events-none"
        style={{ background: '#000000' }}
      />
    </>
  );
};

export default UnicornBackground;
