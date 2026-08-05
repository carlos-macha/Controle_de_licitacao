export enum EnumUserType {
   CLIENTE = 'C',
   VENDEDOR = 'V'
}

export enum EnumSimNao {
   SIM = 'S',
   NAO = 'N'
}

export enum EnumAtivoInativo {
   ATIVO = 'A',
   INATIVO = 'I'
}

export enum EnumOperacaoPermissao {
   VISUALIZAR = 0,
   INCLUIR = 1,
   ALTERAR = 2,
   EXCLUIR = 3
}

export enum EnumEntradaSaida {
   emES_Entrada = 'E',
   emES_Saida = 'S'
}

export enum EnumTipoOutrasAgendas {
   AMBOS = 'A',
   PASSADO = 'P',
   FUTURO = 'F'
}

export enum EnumBlobVincTpDocOrigem {
   emBlobVincTpDocOrigem_NotaInterna = 'EST018',
   emBlobVincTpDocOrigem_DespesasAdicionaisOrdem = 'PCP134',
   emBlobVincTpDocOrigem_ProDescricaoTecnica = 'DES_TEC',
   emBlobVincTpDocOrigem_ProDescricaoReduzida = 'DES_RED',
   emBlobVincTpDocOrigem_Vendedor = 'AUX012',
   emBlobVincTpDocOrigem_Empresa = 'EST001',
   emBlobVincTpDocOrigem_MarcaPro = 'EST285',
   emBlobVincTpDocOrigem_TipoEPI = 'EPI002',
   emBlobVincTpDocOrigem_EPI = 'EPI003',
   emBlobVincTpDocOrigem_EPIFuncao = 'EPI004',
   emBlobVincTpDocOrigem_EntregaEPI = 'EPI005',
   emBlobVincTpDocOrigem_AnotacaoProcesso = 'PCP034',
   emBlobVincTpDocOrigem_MultEmbalagem = 'EST206',
   emBlobVincTpDocOrigem_Representante = 'AUX201',
   emBlobVincTpDocOrigem_AjusteManualImpRetidoFonte = 'FIN121',
   emBlobVincTpDocOrigem_PixChavePrivada = 'PIX_CHVP',
   emBlobVincTpDocOrigem_PixCertificado = 'PIX_CERT',
   emBlobVincTpDocOrigem_WSBancoChavePrivada = 'WSB_CHVP',
   emBlobVincTpDocOrigem_WSBancoCertificado = 'WSB_CERT',
   emBlobVincTpDocOrigem_ImportacaoAutomaticaArquivo = 'EXP044'
};

export enum EnumBlobVincEsteriotipo {
   emBlobVincEsteriotipo_Null = ' ',
   emBlobVincEsteriotipo_Geral = 'GERAL',
   emBlobVincEsteriotipo_XMLInutilizacaoNfe = 'XML_INUTILIZACAO_NFE',
   emBlobVincEsteriotipo_AssinaturaVendedor = 'ASSINATURA_VENDEDOR',
   emBlobVincEsteriotipo_CarimboEmpresa = 'CARIMBO_EMPRESA',
   emBlobVincEsteriotipo_AssinaturaRepresLegal = 'ASSINATURA_REPRES_LEGAL',
   emBlobVincEsteriotipo_Logo = 'LOGO',
   emBlobVincEsteriotipo_Pix = 'PIX',
   emBlobVincEsteriotipo_RetornoDDA = 'RETORNO_DDA'
};

export enum EnumBlobVincTpConteudo {
   emBlobVincTpConteudo_Texto = 'TEXTO',
   emBlobVincTpConteudo_Binario = 'BINARIO'
};

export enum EnumBlobVincTpLancamento {
   emBlobVincTpLancamento_Manual = 'MANUAL',
   emBlobVincTpLancamentoAutomatico = 'AUTOMATICO'
};


