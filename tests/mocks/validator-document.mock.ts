import { IsCPF } from '../../src/module/validators/cpf/cpf.decorator';
import { IsCNPJ } from '../../src/module/validators/cnpj/cnpj.decorator';

export const documentosValidos = {
  cpfs: [
    '11144477735',
    '111.444.777-35',
    '12345678909',
    '123.456.789-09',
  ],
  cnpjs: [
    '11222333000181',
    '11.222.333/0001-81',
    '34238864000168',
    '34.238.864/0001-68',
  ],
};

export const documentosInvalidos = {
  cpfs: [
    '11111111111',
    '12345678901',
    '111.444.777-36',
    '123.456.789-10',
  ],
  cnpjs: [
    '11111111111111',
    '11222333000182',
    '11.222.333/0001-82',
    '34.238.864/0001-69',
  ],
};

export const casosTesteValidacaoMista = [
  {
    nome: 'CPF e CNPJ válidos',
    cpf: '11144477735',
    cnpj: '11222333000181',
    errosEsperados: 0,
  },
  {
    nome: 'CPF inválido, CNPJ válido',
    cpf: '11111111111',
    cnpj: '11222333000181',
    errosEsperados: 1,
  },
  {
    nome: 'CPF válido, CNPJ inválido',
    cpf: '11144477735',
    cnpj: '11111111111111',
    errosEsperados: 1,
  },
  {
    nome: 'Ambos inválidos',
    cpf: '11111111111',
    cnpj: '11111111111111',
    errosEsperados: 2,
  },
];

export const formatosDocumentos = {
  cpf: {
    semFormatacao: '11144477735',
    formatado: '111.444.777-35',
    formatosAlternativos: [
      '111-444-777-35',
      '111 444 777 35',
      '111/444/777-35',
    ],
  },
  cnpj: {
    semFormatacao: '11222333000181',
    formatado: '11.222.333/0001-81',
    formatosAlternativos: [
      '11-222-333-0001-81',
      '11 222 333 0001 81',
      '11/222/333/0001/81',
    ],
  },
};
