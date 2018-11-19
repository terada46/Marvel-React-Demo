import React, { Fragment } from 'react';

//Check if all images have been loaded
export function isImagesLoaded(parentNode) {
  const imageElements = parentNode.querySelectorAll("img");
  for (const img of imageElements) {
    if (!img.complete) {
      return false;
    }
    img.classList.add("loaded");
  }
  return true;
}
  
  //Load spinner whild images are loading
export function LoadSpinner(props) {
  if(document.querySelector(".spinner")) {
    return null;
  }
  return(
    <Fragment>
      <div className="overlay"></div>
      <div className="spinner">Loading&#8230;</div>
    </Fragment>
  )
}

export const LoadSpinnerSmall = () => (
  <div className="sp sp-circle"></div>
)