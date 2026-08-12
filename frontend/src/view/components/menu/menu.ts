import { Menu } from "../../../base/menu/menu";
import { MenuGroup, MenuItem, MenuType } from "../../../base/menu/types";

export type MenuName = MenuType<"meucadastro" | "administracao" | "cadastrodelicitacao" | "concorrentes" | "produtos" | "licitacoes" | "produtoslicitacao" | "resultadoslicitacao">;

export const MenuGroupCadastros: MenuGroup = { name: "Cadastros" }
export const MenuGroupLicitação: MenuGroup = { name: "Licitação", hidden: true }

//itens de menu do menu cadastras

export const MenuItemResultadosLicitacao: MenuItem<MenuName> = {
   name: "resultadoslicitacao",
   label: "Resultados",
   group: MenuGroupLicitação,
   classIcon: "mdi mdi-trophy-outline nav-icon",
}

export const MenuItemConcorrentes: MenuItem<MenuName> = {
   name: "concorrentes",
   label: "Concorrentes",
   group: MenuGroupCadastros,
   classIcon: "mdi mdi-domain nav-icon",
}

export const MenuItemProdutos: MenuItem<MenuName> = {
   name: "produtos",
   label: "Produtos",
   group: MenuGroupCadastros,
   classIcon: "mdi mdi-package-variant nav-icon",
}

export const SubMenuItemlicitacoes: MenuItem<MenuName> = {
   name: "licitacoes",
   label: "Licitações",
   classIcon: "mdi mdi-file-sign nav-icon",
}

export const SubMenuItemProdutosLicitacao: MenuItem<MenuName> = {
   name: "produtoslicitacao",
   label: "Produtos da Licitação",
   classIcon: "mdi mdi-tag",
}

export const MenuItemCadastroDeLicitacao: MenuItem<MenuName> =
{
   name: "cadastrodelicitacao",
   label: "Cadastro de Licitação ",
   group: MenuGroupCadastros,
   classIcon: "mdi mdi-format-list-bulleted-square nav-icon",
   subMenu: [SubMenuItemlicitacoes, SubMenuItemProdutosLicitacao]
   // permission: 1
}


export const menu = new Menu<MenuName>({
   addGroups(groups) {
      groups.push(MenuGroupLicitação);
      groups.push(MenuGroupCadastros);
   },
   addItens(itens) {
      itens.push(MenuItemResultadosLicitacao);
      itens.push(MenuItemCadastroDeLicitacao);
      itens.push(MenuItemConcorrentes);
      itens.push(MenuItemProdutos);
      itens.push(SubMenuItemlicitacoes);
      itens.push(SubMenuItemProdutosLicitacao);
   },
});