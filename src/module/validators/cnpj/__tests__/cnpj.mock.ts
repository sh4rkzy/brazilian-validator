export const cnpjsValidos = [
  '11222333000181',
  '11.222.333/0001-81',
  '34238864000168',
  '34.238.864/0001-68',
  '47960950000121',
  '47.960.950/0001-21',
  '11444777000161',
  '11.444.777/0001-61',
];

export const cnpjsInvalidos = [
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
  '00000000000000',
  '11222333000182',
  '11.222.333/0001-82',
  '34.238.864/0001-69',
  '47.960.950/0001-22',
  '1122233300018',
  '112223330001812',
  '',
  'ab.cde.fgh/ijkl-mn',
  '11.abc.333/0001-81',
];

export const cnpjComCaracteresEspeciais = [
  '11.222.333/0001-81',
  '11-222-333-0001-81',
  '11 222 333 0001 81',
  '11/222/333/0001/81',
  '11.222.333.0001.81',
];

export const casosTesteFormatacaoCnpj = [
  {
    entrada: '11222333000181',
    formatado: '11.222.333/0001-81',
    descricao: 'Formatar CNPJ numérico',
  },
  {
    entrada: '11.222.333/0001-81',
    semFormatacao: '11222333000181',
    descricao: 'Remover formatação do CNPJ',
  },
];

export const opcoesMockCNPJ = {
  padrao: {},
  pularValidacaoDigito: { skipDigitValidation: true },
  removerFormatacao: { removeFormat: true },
  permitirInvalidosConhecidos: { allowKnownInvalid: true },
  mensagemPersonalizada: { message: 'CNPJ inválido personalizado' },
  todasOpcoes: {
    skipDigitValidation: true,
    removeFormat: true,
    allowKnownInvalid: true,
    message: 'Mensagem personalizada completa',
  },
};
