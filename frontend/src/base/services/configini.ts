import { utilities } from "../utils/utilities";


export enum EnumTipoVideo {
   ACAO_COMERCIAL = 'AC',
   MEU_CADASTRO = 'MC',
   PESSOAS = 'PE',
   MINHAS_NOTAS = 'MN',
   MEUS_TITULOS = 'MT',
   SAC = 'SA',
   ASSISTENCIA_TECNICA = 'AT',
   MESTRE = "MESTRE"
}

export enum EnumTipoAmbienteConfig {
   PRODUCAO = 1,
   HOMOLOGACAO = 2,
   DESENVOLVIMENTO = 3
}

export interface IConfigProps {
   WSCommandBaseUrl: string,
   WSCommandTimeOut: number
}

export interface IConfigPropsWithAuth extends IConfigProps {
   WSCommandAUTH_USER: string,
   WSCommandAUTH_PASS: string
}

export interface IConfigPropsWithSocket extends IConfigProps {
   WSCommandSocketUrl: string
}

export interface IConfigPropsPortal extends IConfigPropsWithAuth {
   WSCommandSocketUrl: string,
   imagemBannerLogin: string,
   imagemLogo: string,
   tituloPortal: string,

   chavesParceiro?: Array<string>,
   bannersParceiro?: Array<string>,
   logosParceiro?: Array<string>,
   titulosParceiro?: Array<string>,

   urlVideoAcaoComercial?: string,
   urlVideoMeuCadastro?: string,
   urlVideoPessoas?: string,
   urlVideoSAC?: string,
   urlVideoAssistenciaTecnica?: string,
   urlVideoMeusTitulos?: string,
   urlVideoMinhasNotas?: string,
   urlVideoMestre?: string,

   bannerCpPortal: (chave?: string) => string,
   logoCpPortal: (chave?: string) => string,
   tituloCpPortal: (chave?: string) => string
}

interface ICFGIni<T> {
   ambiente: EnumTipoAmbienteConfig,
   producao: T,
   homologacao: T,
   desenvolvimento: T,
   horarioAtendimento: IHorarioAtendimento
}

export interface ICFGIniAgenda {
   minutosOffSetAgenda: IMinutosLembreteAgenda;
}

export interface IConfigIniAgenda {
   minutosOffSetAgenda: IMinutosLembreteAgenda;
}

interface ICFGIniPortal extends ICFGIni<IConfigPropsPortal> {
   imagemBannerLogin: string,
   imagemLogo: string,
   tituloPortal: string,

   chavesParceiro?: Array<string>,
   bannersParceiro?: Array<string>,
   logosParceiro?: Array<string>,
   titulosParceiro?: Array<string>,

   urlVideoAcaoComercial?: string,
   urlVideoMeuCadastro?: string,
   urlVideoPessoas?: string,
   urlVideoSAC?: string,
   urlVideoAssistenciaTecnica?: string,
   urlVideoMeusTitulos?: string,
   urlVideoMinhasNotas?: string,
   urlVideoMestre?: string,

   bannerCpPortal: (chave?: string) => string | undefined,
   logoCpPortal: (chave?: string) => string | undefined,
   tituloCpPortal: (chave?: string) => string | undefined
}

export interface IHorarioAtendimento {
   segundaSexta: { inicioManha: string; fimManha: string; inicioTarde: string; fimTarde: string };
   sabado: { inicio: string; fim: string };
}

export interface IMinutosLembreteAgenda {
   minutosOffSet: Array<number>
   minutosOffSetAtrasado: Array<number>
}

export interface IConfigIniProps extends IConfigProps {
   ambiente: EnumTipoAmbienteConfig
   horarioAtend: IHorarioAtendimento
}

export interface IConfigIniPropsWithAuth extends IConfigPropsWithAuth {
   ambiente: EnumTipoAmbienteConfig
   horarioAtend: IHorarioAtendimento
}

export interface IConfigIniPropsWithSocket extends IConfigPropsWithSocket {
   ambiente: EnumTipoAmbienteConfig
   horarioAtend: IHorarioAtendimento
}

export interface IConfigIniPropsPortal extends IConfigPropsPortal {
   ambiente: EnumTipoAmbienteConfig
   horarioAtend: IHorarioAtendimento
}

type TConfigIni = "ERP" | "ERP_WITH_AUTH" | "PORTAL" | "CONTROLDOC" | "CALLCENTER" | "AGENDA";

interface IConfigIni {
   iniFactory: <T>(type: TConfigIni) => Promise<T>
}


const ConfigIni = (function () {
   var instance: IConfigIni;

   const configIniProps = (ini: ICFGIni<IConfigProps>): IConfigIniProps => {
      var cfgIni: IConfigIniProps = {
         horarioAtend: ini.horarioAtendimento,
         ambiente: EnumTipoAmbienteConfig.DESENVOLVIMENTO,
         WSCommandBaseUrl: '',
         WSCommandTimeOut: 0
      };

      let configProps: IConfigProps = ini.desenvolvimento;

      if (import.meta.env.PROD) {
         cfgIni.ambiente = ini.ambiente;

         configProps = ini.homologacao;
         if (ini.ambiente === EnumTipoAmbienteConfig.PRODUCAO)
            configProps = ini.producao;
      }

      cfgIni.WSCommandBaseUrl = String(configProps.WSCommandBaseUrl);
      cfgIni.WSCommandTimeOut = Number(configProps.WSCommandTimeOut);

      return cfgIni;
   }

   const configIniPropsWithAuth = (ini: ICFGIni<IConfigPropsWithAuth>): IConfigIniProps => {
      var cfgIni: IConfigIniPropsWithAuth = {
         ambiente: EnumTipoAmbienteConfig.DESENVOLVIMENTO,
         horarioAtend: ini.horarioAtendimento,
         WSCommandBaseUrl: '',
         WSCommandTimeOut: 0,
         WSCommandAUTH_PASS: '',
         WSCommandAUTH_USER: ''
      };

      let configProps: IConfigPropsWithAuth = ini.desenvolvimento;

      if (import.meta.env.PROD) {
         cfgIni.ambiente = ini.ambiente;

         configProps = ini.homologacao;
         if (ini.ambiente === EnumTipoAmbienteConfig.PRODUCAO)
            configProps = ini.producao;
      }

      cfgIni.WSCommandBaseUrl = String(configProps.WSCommandBaseUrl);
      cfgIni.WSCommandTimeOut = Number(configProps.WSCommandTimeOut);
      cfgIni.WSCommandAUTH_USER = String(configProps.WSCommandAUTH_USER);
      cfgIni.WSCommandAUTH_PASS = String(configProps.WSCommandAUTH_PASS);


      return cfgIni;
   }

   const configIniPropsWithSocket = (ini: ICFGIni<IConfigPropsWithSocket>): IConfigIniProps => {
      var cfgIni: IConfigIniPropsWithSocket = {
         ambiente: EnumTipoAmbienteConfig.DESENVOLVIMENTO,
         horarioAtend: ini.horarioAtendimento,
         WSCommandBaseUrl: '',
         WSCommandTimeOut: 0,
         WSCommandSocketUrl: ''
      };

      let configProps: IConfigPropsWithSocket = ini.desenvolvimento;

      if (import.meta.env.PROD) {
         cfgIni.ambiente = ini.ambiente;

         configProps = ini.homologacao;
         if (ini.ambiente === EnumTipoAmbienteConfig.PRODUCAO)
            configProps = ini.producao;
      }

      cfgIni.WSCommandBaseUrl = String(configProps.WSCommandBaseUrl);
      cfgIni.WSCommandTimeOut = Number(configProps.WSCommandTimeOut);
      cfgIni.WSCommandSocketUrl = String(configProps.WSCommandSocketUrl);


      return cfgIni;
   }

   const configIniPropsPortal = (ini: ICFGIniPortal): IConfigIniPropsPortal => {
      var cfgIni: IConfigIniPropsPortal = {
         ambiente: EnumTipoAmbienteConfig.DESENVOLVIMENTO,
         horarioAtend: ini.horarioAtendimento,
         WSCommandBaseUrl: '',
         WSCommandTimeOut: 0,
         WSCommandAUTH_USER: '',
         WSCommandAUTH_PASS: '',
         WSCommandSocketUrl: '',
         imagemBannerLogin: '',
         imagemLogo: '',
         tituloPortal: '',
         chavesParceiro: [],
         bannersParceiro: [],
         logosParceiro: [],
         titulosParceiro: [],
         urlVideoAcaoComercial: '',
         urlVideoMeuCadastro: '',
         urlVideoPessoas: '',
         urlVideoSAC: '',
         urlVideoAssistenciaTecnica: '',
         urlVideoMeusTitulos: '',
         urlVideoMestre: '',
         bannerCpPortal(chave) {
            const idx = this.chavesParceiro?.indexOf(chave || '') ?? -1;
            return this.bannersParceiro && idx >= 0 ? this.bannersParceiro[idx] : this.imagemBannerLogin;
         },
         logoCpPortal(chave) {
            const idx = this.chavesParceiro?.indexOf(chave || '') ?? -1;
            return this.logosParceiro && idx >= 0 ? this.logosParceiro[idx] : this.imagemLogo;
         },
         tituloCpPortal(chave) {
            const idx = this.chavesParceiro?.indexOf(chave || '') ?? -1;
            return this.titulosParceiro && idx >= 0 ? this.titulosParceiro[idx] : this.tituloPortal;
         }
      };

      let configProps: IConfigPropsPortal = ini.desenvolvimento;

      if (import.meta.env.PROD) {
         cfgIni.ambiente = ini.ambiente;

         configProps = ini.homologacao;
         if (ini.ambiente === EnumTipoAmbienteConfig.PRODUCAO)
            configProps = ini.producao;
      }

      cfgIni.WSCommandBaseUrl = String(configProps.WSCommandBaseUrl);
      cfgIni.WSCommandTimeOut = Number(configProps.WSCommandTimeOut);
      cfgIni.WSCommandAUTH_USER = String(configProps.WSCommandAUTH_USER);
      cfgIni.WSCommandAUTH_PASS = String(configProps.WSCommandAUTH_PASS);
      cfgIni.WSCommandSocketUrl = String(configProps.WSCommandSocketUrl);
      cfgIni.imagemBannerLogin = String(ini.imagemBannerLogin);
      cfgIni.imagemLogo = String(ini.imagemLogo);
      cfgIni.tituloPortal = String(ini.tituloPortal);
      cfgIni.urlVideoAcaoComercial = String(ini.urlVideoAcaoComercial);
      cfgIni.urlVideoMeuCadastro = String(ini.urlVideoMeuCadastro);
      cfgIni.urlVideoPessoas = String(ini.urlVideoPessoas);
      cfgIni.urlVideoSAC = String(ini.urlVideoSAC);
      cfgIni.urlVideoAssistenciaTecnica = String(ini.urlVideoAssistenciaTecnica);
      cfgIni.urlVideoMeusTitulos = String(ini.urlVideoMeusTitulos);
      cfgIni.urlVideoMinhasNotas = String(ini.urlVideoMinhasNotas);
      cfgIni.urlVideoMestre = String(ini.urlVideoMestre);
      cfgIni.chavesParceiro = ini.chavesParceiro;
      cfgIni.bannersParceiro = ini.bannersParceiro;
      cfgIni.logosParceiro = ini.logosParceiro;
      cfgIni.titulosParceiro = ini.titulosParceiro;

      return cfgIni;
   }

   const configIniAgenda = (ini: ICFGIniAgenda): IConfigIniAgenda => ({
      minutosOffSetAgenda: ini.minutosOffSetAgenda
   });

   const createInstance = (): IConfigIni => {
      let urlConfigJson = `${utilities.baseURL()}config.json`;
      return {
         iniFactory<T>(type: TConfigIni) {
            return new Promise<T>((resolve, reject) => {
               fetch(urlConfigJson).then(async res => {
                  let cfgIni: any;
                  let ini: any = await res.json();

                  switch (type) {
                     case "ERP":
                     case "CONTROLDOC":
                        cfgIni = configIniProps(ini)
                        break;

                     case "ERP_WITH_AUTH":
                        cfgIni = configIniPropsWithAuth(ini)
                        break;

                     case "PORTAL":
                        cfgIni = configIniPropsPortal(ini)
                        break;

                     case "CALLCENTER":
                        cfgIni = configIniPropsWithSocket(ini)
                        break;

                     case "AGENDA":
                        cfgIni = configIniAgenda(ini);
                        break;

                     default:
                        break;
                  }

                  resolve(cfgIni);
               }).catch(error => {
                  reject(error);
               });
            });
         }
      }
   }

   return {
      getInstance: function () {
         if (!instance) {
            instance = createInstance();
         }
         return instance;
      }
   };
})();

export default ConfigIni;