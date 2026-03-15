import React from 'react';

const TriptychBackground = () => {
  const imageSrc = "/Images/location.png"; 

  return (
    <div className="w-full">
      {/* Grid setup: 2 columns. 
        Top row handles the two small "dissected" parts.
        Bottom row handles the large curved part.
      */}
      <div className="grid grid-cols-2 gap-3 h-[500px]">
        
        {/* Top Left "Slice" */}
        <div className="relative rounded-2xl overflow-hidden shadow-sm">
          <img 
            src={imageSrc} 
            alt="top-left-slice" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </div>

        {/* Top Right "Slice" */}
        <div className="relative rounded-2xl overflow-hidden shadow-sm">
          <img 
            src={imageSrc} 
            alt="top-right-slice" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </div>

        {/* Bottom Large "Slice" with the Big Curve */}
        <div className="col-span-2 relative rounded-2xl rounded-br-[120px] overflow-hidden shadow-sm">
          <img 
            src={imageSrc} 
            alt="main-slice" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </div>

      </div>
    </div>
  );
};

export default TriptychBackground;