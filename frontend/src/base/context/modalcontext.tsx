import React from 'react';
import { EnumCrudStateRecordType } from '../components/crud/enums';
import { ModalLargeType } from '../components/modal/modal';
import { EnumPessoa_TipoPessoa } from '../enumsss/enumspessoa';
import { IModelMOB001 } from '../2/modelMOB001';
import { IModelMOB002 } from '../2/modelMOB002';
import { IModelMOB015 } from '../2/modelMOB015';
import { IModelPOR001 } from '../2/modelPOR001';
import { IModelPortalAssitenciaTecnica } from '../2/modelPortalAssistenciaTecnica';
import { IModelPortalEst018 } from '../2/modelPortalEST018';
import { IModelPortalEquipamento, IModelPortalMultiplosEquipamento } from '../2/modelPortalEquipamento';
import { IModelPortalFiltroACProdutos } from '../2/modelPortalFiltroACProdutos';
import { IModelEst079 } from '../2/modellEST079';
import { CustomJsonFile } from '../types/types';
import { IModelAux012 } from '../2/modelAUX012';
import { IModelMOB012 } from '../2/modelMOB012';
import { OptionsInputSelect } from '../components/form/form';
import { IModelCrm019 } from '../2/modelCRM019';
import { IModelEST069 } from '../2/modelEST069';
import { QuadroCard } from '../components/quadro/quadro';
import { IModelAux131 } from '../2/modelAUX131';

type ModalAction = {
   type: 'close'
} | {
   type: 'equipamentos',
   empresa: number,
   onBtnSelecionar: (equipamento: IModelPortalEquipamento) => Promise<void>
} | {
   type: 'pessoaContatoManutencaoModal',
   pessoaId: number,
   contato?: IModelMOB002,
   state: EnumCrudStateRecordType,
   isProspect?: boolean,
   onSave: (data: IModelMOB002) => Promise<void>
} | {
   type: 'pessoaEnderecoManutencaoModal',
   pessoaId: number,
   endereco?: IModelMOB015,
   state: EnumCrudStateRecordType,
   isProspect?: boolean,
   onSave: (data: IModelMOB015) => Promise<void>
} | {
   type: 'politicas&termos',
   render: JSX.Element,
   title: string,
   onRender?: () => void
} | {
   type: 'carrinhoCompraProdutoViewModal',
   produto: IModelPortalFiltroACProdutos
} | {
   type: 'pessoas',
   tipoPessoa: EnumPessoa_TipoPessoa,
   onBtnSelecionar: (pessoa: IModelMOB001) => Promise<void>
} | {
   type: 'permissoes',
   onBtnSelecionar: (permissao: IModelPOR001) => Promise<void>
} | {
   type: 'motivos-devolucao',
   onBtnSelecionar: (motivo: IModelEst079) => Promise<void>
} | {
   type: 'anexos' | 'anexos-fotos',
   onBtnSelecionar: (anexos: Array<CustomJsonFile>) => Promise<void>
} | {
   type: 'assistenciaTecnicaAddEquipamentoModal',
   empresa: number,
   pessoaId: number,
   cat: IModelPortalAssitenciaTecnica,
   onBtnSelecionar: (equipamentos: Array<IModelPortalMultiplosEquipamento>) => Promise<void>
} | {
   type: 'assistenciaTecnicaIntervensoesModal',
   equipamento?: IModelPortalMultiplosEquipamento
} | {
   type: 'minhasnotas',
   dataInicial: number,
   dataFinal: number,
   onBtnSelecionar: (notaFiscal: IModelPortalEst018) => Promise<void>
} | {
   type: 'textArea',
   title?: string,
   largeType?: ModalLargeType,
   captionBtnSave?: string,
   onText?: (text?: string, base64?: string) => Promise<void>
} | {
   type: 'help',
   body: JSX.Element,
   title: string
} | {
   type: 'vendedores',
   onBtnSelecionar: (vendedor?: IModelAux012) => Promise<void>
} | {
   type: 'compromisso',
   compromissoModalType?: 'edit' | 'reschedule' | 'create',
   date?: Date,
   compromisso?: IModelMOB012,
   changeFuncionario?: boolean,
   changePessoaProspect?: boolean,
   changeRealizado?: boolean,
   optionsCompromissos?: OptionsInputSelect,
   optionsFuncionarios?: OptionsInputSelect,
   onDelete?: (data: any, state?: EnumCrudStateRecordType) => Promise<void>,
   onSave?: (data: any, state?: EnumCrudStateRecordType) => Promise<void>,
   onCopy?: (data: any) => void
} | {
   type: 'relatorioResultadosPesquisa',
   pesquisa?: IModelCrm019
} | {
   type: 'kanbanCard',
   kanbanCard: QuadroCard,
   changeFuncionario?: boolean,
   optionsCompromissos?: OptionsInputSelect,
   optionsFuncionarios?: OptionsInputSelect,
   onSave?: (data: any, state?: EnumCrudStateRecordType) => Promise<void>
} | {
   type: 'recado',
   recado?: IModelAux131,
   docTpOrigem?: string,
   codOrigem?: number,
   descricao?: string,
   pessoaCod?: string,
   pessoaNome?: string
   assuntoProp?: string
}

type ModalDispatch = (action: ModalAction) => void;

type ModalState = {
   type: 'close' | 'equipamentos' | 'politicas&termos' | 'pessoaContatoManutencaoModal' | 'pessoaEnderecoManutencaoModal' |
   'carrinhoCompraProdutoViewModal' | 'pessoas' | 'permissoes' | 'anexos' | 'anexos-fotos' |
   'assistenciaTecnicaAddEquipamentoModal' | 'assistenciaTecnicaIntervensoesModal' | 'minhasnotas' | 'motivos-devolucao' |
   'textArea' | 'help' | 'vendedores' | 'compromisso' | 'relatorioResultadosPesquisa' | 'kanbanCard' | 'recado',
   empresa?: number,
   pessoaId?: number,
   render?: JSX.Element,
   title?: string,
   contato?: IModelMOB002,
   endereco?: IModelMOB015,
   produto?: IModelPortalFiltroACProdutos,
   state?: EnumCrudStateRecordType,
   isProspect?: boolean,
   tipoPessoa?: EnumPessoa_TipoPessoa,
   cat?: IModelPortalAssitenciaTecnica,
   equipamento?: IModelPortalMultiplosEquipamento,
   dataInicial?: number,
   dataFinal?: number,
   largeType?: ModalLargeType,
   captionBtnSave?: string,
   body?: JSX.Element,
   onBtnSelecionar?: (data: any) => Promise<void>,
   onRender?: () => void,
   onDelete?: (data: any, state?: EnumCrudStateRecordType) => Promise<void>,
   onSave?: (data: any, state?: EnumCrudStateRecordType) => Promise<void>,
   onText?: (text?: string, base64?: string) => Promise<void>,
   onCopy?: (data: any) => void,

   compromissoModalType?: 'edit' | 'reschedule' | 'create',
   date?: Date,
   compromisso?: IModelMOB012,
   changeFuncionario?: boolean,
   changePessoaProspect?: boolean,
   changeRealizado?: boolean,

   optionsCompromissos?: OptionsInputSelect,
   optionsFuncionarios?: OptionsInputSelect,

   pesquisa?: IModelCrm019,

   kanbanCard?: QuadroCard,

   recado?: IModelAux131,
   docTpOrigem?: string,
   codOrigem?: number,
   descricao?: string,
   pessoaCod?: string,
   pessoaNome?: string,
   assuntoProp?: string,
}

interface ModalProviderProps { }

export interface ModalContextProps {
   modalState: ModalState,
   modalDispash: ModalDispatch
}

export const ModalStateContext = React.createContext<ModalContextProps | undefined>(undefined);

var ModalReducer = (modalState: ModalState, modalAction: ModalAction): ModalState => {
   let type: string = modalAction.type;
   switch (modalAction.type) {
      case 'equipamentos': {
         return {
            type: 'equipamentos',
            empresa: modalAction.empresa,
            onBtnSelecionar: modalAction.onBtnSelecionar
         }
      }

      case 'pessoas': {
         return {
            type: 'pessoas',
            tipoPessoa: modalAction.tipoPessoa,
            onBtnSelecionar: modalAction.onBtnSelecionar
         }
      }

      case 'pessoaContatoManutencaoModal': {
         return {
            type: 'pessoaContatoManutencaoModal',
            pessoaId: modalAction.pessoaId,
            onSave: modalAction.onSave,
            contato: modalAction.contato,
            state: modalAction.state,
            isProspect: modalAction.isProspect
         }
      }

      case 'pessoaEnderecoManutencaoModal': {
         return {
            type: 'pessoaEnderecoManutencaoModal',
            pessoaId: modalAction.pessoaId,
            onSave: modalAction.onSave,
            endereco: modalAction.endereco,
            state: modalAction.state,
            isProspect: modalAction.isProspect
         }
      }

      case 'politicas&termos': {
         return {
            type: 'politicas&termos',
            render: modalAction.render,
            onRender: modalAction.onRender,
            title: modalAction.title
         }
      }

      case 'carrinhoCompraProdutoViewModal': {
         return {
            type: 'carrinhoCompraProdutoViewModal',
            produto: modalAction.produto,
            // onSave: modalAction.onAddCart,
         }
      }

      case 'minhasnotas': {
         return {
            type: 'minhasnotas',
            dataInicial: modalAction.dataInicial,
            dataFinal: modalAction.dataFinal,
            onBtnSelecionar: modalAction.onBtnSelecionar
         }
      }

      case 'motivos-devolucao':
      case 'permissoes':
      case 'anexos-fotos':
      case 'anexos': {
         return {
            type: modalAction.type,
            onBtnSelecionar: modalAction.onBtnSelecionar
         }
      }

      case 'assistenciaTecnicaAddEquipamentoModal': {
         return {
            type: 'assistenciaTecnicaAddEquipamentoModal',
            onBtnSelecionar: modalAction.onBtnSelecionar,
            empresa: modalAction.empresa,
            pessoaId: modalAction.pessoaId,
            cat: modalAction.cat
         }
      }

      case 'assistenciaTecnicaIntervensoesModal': {
         return {
            type: 'assistenciaTecnicaIntervensoesModal',
            equipamento: modalAction.equipamento
         }
      }

      case 'textArea': {
         return {
            type: 'textArea',
            title: modalAction.title,
            largeType: modalAction.largeType,
            captionBtnSave: modalAction.captionBtnSave,
            onText: modalAction.onText
         }
      }

      case 'help': {
         return {
            type: 'help',
            body: modalAction.body,
            title: modalAction.title
         }
      }

      case 'vendedores': {
         return {
            type: 'vendedores',
            onBtnSelecionar: modalAction.onBtnSelecionar
         }
      }

      case 'compromisso': {
         return {
            type: 'compromisso',
            compromissoModalType: modalAction.compromissoModalType,
            date: modalAction.date,
            compromisso: modalAction.compromisso,
            changeFuncionario: modalAction.changeFuncionario,
            changePessoaProspect: modalAction.changePessoaProspect,
            changeRealizado: modalAction.changeRealizado,
            optionsCompromissos: modalAction.optionsCompromissos,
            optionsFuncionarios: modalAction.optionsFuncionarios,
            onDelete: modalAction.onDelete,
            onSave: modalAction.onSave,
            onCopy: modalAction.onCopy
         }
      }

      case 'relatorioResultadosPesquisa': {
         return {
            type: 'relatorioResultadosPesquisa',
            pesquisa: modalAction.pesquisa
         }
      }

      case 'kanbanCard': {
         return {
            type: 'kanbanCard',
            kanbanCard: modalAction.kanbanCard,
            changeFuncionario: modalAction.changeFuncionario,
            optionsCompromissos: modalAction.optionsCompromissos,
            optionsFuncionarios: modalAction.optionsFuncionarios,
            // onSave: modalAction.onSave
         }
      }
      
      case 'recado': {
         return {
            type: 'recado',
            docTpOrigem: modalAction.docTpOrigem,
            codOrigem: modalAction.codOrigem,
            descricao: modalAction.descricao,
            pessoaCod: modalAction.pessoaCod,
            pessoaNome: modalAction.pessoaNome,
            assuntoProp: modalAction.assuntoProp,
         }
      }

      case 'close': {
         return {
            type: 'close'
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${type}`)
      }
   }
}

const ModalProvider: React.FC<ModalProviderProps> = (props): JSX.Element => {
   const [modalState, modalDispash] = React.useReducer(ModalReducer, { type: 'close' });

   const value: ModalContextProps = { modalState, modalDispash };
   return (
      <ModalStateContext.Provider value={value}>
         {props.children}
      </ModalStateContext.Provider>
   );
}

export default ModalProvider;