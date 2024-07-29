import React from 'react';
import { helix } from 'ldrs';

helix.register();

const Loader = () => {
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <l-helix size="80" speed="2.5" color="white"></l-helix>
    </div>
  );
};

export default Loader;