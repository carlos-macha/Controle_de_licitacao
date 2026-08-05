import { OptionsInputSelect } from "../../base/components/form/form"

export const OptionsSelectPublicoPrivado: OptionsInputSelect = [
   {
      label: 'Público',
      value: "U"
   },
   {
      label: 'Privado',
      value: "R"
   }
]

export const OptionsSelectStatusDocumento: OptionsInputSelect = [
   {
      label: 'Liberado',
      value: "L"
   },
   {
      label: 'Em Alteração',
      value: "E"
   }
]

export const SENHA_PADRAO: string = 'mudar.123';