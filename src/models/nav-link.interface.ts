import { ComponentAttributes } from './component-attrs.interface'

export interface NavLink extends ComponentAttributes {
  title: string;
  route?: string;
  icon?: JSX.Element;
}
