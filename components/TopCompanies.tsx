import TiltedCard from "./TiltedCard";

import React from "react";

function TopCompanies() {
  return (
    <>
      <TiltedCard
        imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
        altText="Google"
        captionText="Google"
        containerHeight="160px"
        containerWidth="160px"
        imageHeight="160px"
        imageWidth="160px"
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
          <p className="tilted-card-demo-text">Google</p>
        }
      />
    </>
  );
}
export default TopCompanies;
