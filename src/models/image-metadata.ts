import { ComponentAttributes } from '@models/component-attrs'

export interface ImageMetadata extends ComponentAttributes {
  src: string
  alt: string
}
