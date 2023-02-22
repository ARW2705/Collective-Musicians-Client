import React, { memo } from 'react'

import { ImageMetadata } from '../../models/image-metadata'

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


export default memo(ImageComponent)
