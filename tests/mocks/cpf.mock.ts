export const cpfsValidos = [
  '11144477735',
  '111.444.777-35',
  '12345678909',
  '123.456.789-09',
  '98765432100',
  '987.654.321-00',
  '85914571080',
  '859.145.710-80',
];

export const cpfsInvalidos = [
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '00000000000',
  '12345678901',
  '111.444.777-36',
  '123.456.789-10',
  '987.654.321-11',
  '1234567890',
  '123456789012',
  '',
  'abc.def.ghi-jk',
  '123.abc.789-01',
];

export const cpfComCaracteresEspeciais = [
  '111.444.777-35',
  '111-444-777-35',
  '111 444 777 35',
  '111/444/777-35',
  '111.444.777.35',
];

export const casosTesteFormatacaoCpf = [
  {
    entrada: '11144477735',
    formatado: '111.444.777-35',
    descricao: 'Formatar CPF numérico',
  },
  {
    entrada: '111.444.777-35',
    semFormatacao: '11144477735',
    descricao: 'Remover formatação do CPF',
  },
];

export const opcoesMockCPF = {
  padrao: {},
  pularValidacaoDigito: { skipDigitValidation: true },
  removerFormatacao: { removeFormat: true },
  permitirInvalidosConhecidos: { allowKnownInvalid: true },
  mensagemPersonalizada: { message: 'CPF inválido personalizado' },
  todasOpcoes: {
    skipDigitValidation: true,
    removeFormat: true,
    allowKnownInvalid: true,
    message: 'Mensagem personalizada completa',
  },
};
