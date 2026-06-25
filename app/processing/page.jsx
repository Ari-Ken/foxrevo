import React from 'react';

export default function Processing() {
  return (
    <div className="section-block" style={{ textAlign: 'center' }}>
      <h2>Processing Your Results...</h2>
      <p>0% to 100% loading animation will go here.</p>
      {/* We will automatically redirect to /score from this page when it hits 100% */}
    </div>
  );
}
