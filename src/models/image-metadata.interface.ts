import { ComponentAttributes } from './component-attrs.interface';

export interface ImageMetadata extends ComponentAttributes {
  src: string
  alt: string
}
