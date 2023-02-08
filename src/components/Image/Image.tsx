import React from 'react'

import { ImageMetadata } from '../../models/interfaces'

import './Image.css'


function ImageComponent(imageData: ImageMetadata): JSX.Element {
  const { src, alt, customClass = '' } = imageData

  return (
    <img
      src={ `${process.env.PUBLIC_URL}/assets/images/${src}` }
      alt={ alt }
      className={ `image ${customClass}` }
    />
  )
}


export default React.memo(ImageComponent)
