import { ComponentAttributes } from './component-attrs'

export interface NavLink extends ComponentAttributes {
  title: string
  route?: string
  icon?: JSX.Element
}
