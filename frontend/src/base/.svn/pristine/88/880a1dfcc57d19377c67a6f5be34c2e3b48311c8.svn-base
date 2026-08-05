import { MenuGroup, MenuItem } from "./types";

interface MenuParamns<T> {
   addGroups?: (groups: Array<MenuGroup>) => void,
   addItens?: (itens: Array<MenuItem<T>>) => void
}

export class Menu<T> {
   private _itens: Array<MenuItem<T>> = [];
   private _groups: Array<MenuGroup> = [];

   constructor(params: MenuParamns<T>) {
      this.init(params);
      // params.addGroups(this._groups);
      // params.addItens(this._itens);
   }

   groups = (): Array<MenuGroup> => {
      return this._groups;
   }

   itens = (groupName?: string): Array<MenuItem<T>> => {
      let itens = this._itens.filter(item => {
         return item.group?.name === groupName;
      })

      return itens;
   }

   init = (params: MenuParamns<T>) => {
      if (params.addGroups)
         params.addGroups(this._groups);

      if (params.addItens)
         params.addItens(this._itens);
   }
}