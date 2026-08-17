import { Menu } from "../../../base/menu/menu";
import { MenuGroup, MenuItem, MenuType } from "../../../base/menu/types";

export type MenuName = MenuType<"meucadastro" | "administracao" | "concorrentes" | "itemlicitacao" | "licitacoes" | "resultadoslicitacao">;

export const MenuGroupCadastros: MenuGroup = { name: "Cadastros" }
export const MenuGroupLicitação: MenuGroup = { name: "Licitação", hidden: true }

//itens de menu do menu cadastras

export const MenuItemResultadosLicitacao: MenuItem<MenuName> = {
   name: "resultadoslicitacao",
   label: "Resultados",
   group: MenuGroupLicitação,
   classIcon: "mdi mdi-trophy-outline nav-icon",
}

export const MenuItemLicitacao: MenuItem<MenuName> = {
   name: "licitacoes",
   label: "Licitações",
   group: MenuGroupCadastros,
   classIcon: "mdi mdi-file-sign nav-icon",
}

export const MenuItemItemLicitacao: MenuItem<MenuName> = {
   name: "itemlicitacao",
   label: "Itens da Licitação",
   group: MenuGroupCadastros,
   classIcon: "mdi mdi-package-variant nav-icon",
}

export const MenuItemConcorrentes: MenuItem<MenuName> = {
   name: "concorrentes",
   label: "Concorrentes",
   group: MenuGroupCadastros,
   classIcon: "mdi mdi-domain nav-icon",
}

export const menu = new Menu<MenuName>({
   addGroups(groups) {
      groups.push(MenuGroupLicitação);
      groups.push(MenuGroupCadastros);
   },
   addItens(itens) {
      itens.push(MenuItemResultadosLicitacao);
      itens.push(MenuItemLicitacao);
      itens.push(MenuItemItemLicitacao);
      itens.push(MenuItemConcorrentes);
   },
});