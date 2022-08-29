import React from 'react';

export const CenteredContent: React.FC<React.PropsWithChildren> = (props) => (
  <main {...props} className="min-h-screen md:flex md:items-center md:justify-center md:py-8" />
);
