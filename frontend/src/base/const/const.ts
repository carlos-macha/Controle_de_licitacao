import { OptionsInputSelect } from "../components/form/form"
import { EnumStatusDevolucao, EnumOrigemDevolucao, EnumTipoDevolucao } from "../enumsss/enumsdevolucao"

export const OptionsSelectSimNao: OptionsInputSelect = [
   {
      label: 'Sim',
      value: "S"
   },
   {
      label: 'Não',
      value: "N"
   }
]

export const OptionsSelectAtivoInativo: OptionsInputSelect = [
   {
      label: 'Ativo',
      value: "A"
   },
   {
      label: 'Inativo',
      value: "I"
   }
]

export const OptionsSelectStatusDevolucao: Array<any> = [
   {
      label: 'Aberto',
      value: EnumStatusDevolucao.emDev_Status_Aberto
   },
   {
      label: 'Autorizado',
      value: EnumStatusDevolucao.emDev_Status_Autorizado
   },
   {
      label: 'Cancelado',
      value: EnumStatusDevolucao.emDev_Status_Cancelado
   },
   {
      label: 'Confirmado',
      value: EnumStatusDevolucao.emDev_Status_Confirmado
   },
   {
      label: 'Rejeitado',
      value: EnumStatusDevolucao.emDev_Status_Rejeitado
   }, {
      label: 'Solicitação',
      value: EnumStatusDevolucao.emDev_Status_Solicitacao
   },
]

export const OptionsSelectOrigemDevolucao: Array<any> = [
   {
      label: 'Interno',
      value: EnumOrigemDevolucao.emDev_Origem_Interno
   },
   {
      label: 'Web',
      value: EnumOrigemDevolucao.emDev_Origem_Web
   }
]

export const OptionsSelectTipoDevolucao: Array<any> = [
   {
      label: 'Venda com Nota da Empresa',
      value: EnumTipoDevolucao.emDev_Tipo_EntradaNotaInterna
   },
   {
      label: 'Venda com Nota do Cliente',
      value: EnumTipoDevolucao.emDev_Tipo_EntradaNotaTereceiro
   },
   {
      label: 'Compra com Nota da Empresa',
      value: EnumTipoDevolucao.emDev_Tipo_SaidaNotaInterna
   }
]

export const SENHA_PADRAO: string = 'mudar.123';