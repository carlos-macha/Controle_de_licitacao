export type MenuType<T> = T;

export type MenuGroup = {
   name: string,
   hidden?: boolean
}

export type MenuItem<T> = {
   name: T,
   label: string,
   classIcon?: string,
   group?: MenuGroup,
   typeVideoHelp?: string,
   tooltip?: string | JSX.Element
   data?: any,
   subMenu?: Array<MenuItem<any>>
}