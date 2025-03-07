import React from 'react';

const FrameVRRoom = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="https://framevr.io/xtq-kar-ifh"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        allow="microphone; camera; midi; encrypted-media; xr-spatial-tracking;"
        title="Frame VR Room"
      />
    </div>
  );
};

export default FrameVRRoom;
