import React, { useState } from 'react';
import StormVoice from './StormVoice';

function StormInput({ onWillCasted }) {
  const [userWill, setUserWill] = useState('');
  const [isCasting, setIsCasting] = useState(false);

  const handleCastWill = () => {
    setIsCasting(true);
    onWillCasted(userWill);
    setTimeout(() => setIsCasting(false), 2000);
  };

  return (
    <div className="StormInput">
      <input
        type="text"
        placeholder="Your will to the storm..."
        value={userWill}
        onChange={(e) => setUserWill(e.target.value)}
        disabled={isCasting}
      />
      <button onClick={handleCastWill} disabled={isCasting || !userWill}>
        {isCasting ? "The storm is weaving..." : "Cast Your Will"}
      </button>
      {isCasting && <StormVoice text={userWill} />}
    </div>
  );
}

export default StormInput;
