'use client'

import { useEffect } from 'react';

export default function MaintenanceOverlay() {
  const isLive = process.env.NEXT_PUBLIC_IS_LIVE === 'true';
  
  useEffect(() => {
    if (!isLive) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isLive]);

  if (isLive) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/50 flex items-center justify-center">
      <div className="bg-[#1a0033] border border-purple-700/20 rounded-lg p-8 max-w-2xl mx-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <h2 className="text-red-300 font-mono text-2xl tracking-wider">
            [SYSTEM_OFFLINE]
          </h2>
        </div>
        
        <p className="text-purple-200 mb-4 text-lg">
          The MUS PROTOCOL is currently undergoing development.
        </p>
        
        <p className="text-purple-300/70">
          Our scientists are working diligently to enhance the experimental procedures.
          Please check back later.
        </p>
        
        <div className="mt-8 flex justify-center gap-4">
          <a 
            href="https://twitter.com/MusProtocol" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-700/20 hover:bg-purple-700/40 
                     text-purple-300 rounded border border-purple-700/40
                     transition-colors font-mono"
          >
            [FOLLOW_UPDATES]
          </a>
        </div>
      </div>
    </div>
  );
} 