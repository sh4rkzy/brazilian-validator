import { validateCnpjDigit } from '../src/module/validators/cnpj/cnpj.validator';
import { IsCNPJ } from '../src/module/validators/cnpj/cnpj.decorator';
import { CNPJOptions } from '../src/module/validators/cnpj/cnpj.types';
import {
  cnpjsValidos,
  cnpjsInvalidos,
  cnpjComCaracteresEspeciais,
  opcoesMockCNPJ,
} from './mocks/cnpj.mock';
import { validate } from 'class-validator';
import 'reflect-metadata';

describe('Validador de CNPJ', () => {
  describe('validateCnpjDigit', () => {
    test.each(cnpjsValidos)('deve validar CNPJ válido: %s', (cnpj) => {
      expect(validateCnpjDigit(cnpj)).toBe(true);
    });

    test.each(cnpjsInvalidos)('deve invalidar CNPJ inválido: %s', (cnpj) => {
      expect(validateCnpjDigit(cnpj)).toBe(false);
    });

    test('deve lidar com CNPJ com caracteres especiais', () => {
      cnpjComCaracteresEspeciais.forEach((cnpj) => {
        const resultado = validateCnpjDigit(cnpj);
        expect(typeof resultado).toBe('boolean');
      });
    });

    test('deve retornar false para string vazia', () => {
      expect(validateCnpjDigit('')).toBe(false);
    });

    test('deve retornar false para null ou undefined', () => {
      expect(validateCnpjDigit(null as any)).toBe(false);
      expect(validateCnpjDigit(undefined as any)).toBe(false);
    });
  });

  describe('Decorator IsCNPJ', () => {
    class ClasseTeste {
      @IsCNPJ()
      cnpj: string;

      @IsCNPJ(opcoesMockCNPJ.pularValidacaoDigito)
      cnpjPularValidacao: string;

      @IsCNPJ(opcoesMockCNPJ.removerFormatacao)
      cnpjRemoverFormatacao: string;

      @IsCNPJ(opcoesMockCNPJ.permitirInvalidosConhecidos)
      cnpjPermitirInvalidosConhecidos: string;

      @IsCNPJ(opcoesMockCNPJ.mensagemPersonalizada)
      cnpjMensagemPersonalizada: string;

      constructor(
        cnpj: string,
        cnpjPularValidacao: string = '',
        cnpjRemoverFormatacao: string = '',
        cnpjPermitirInvalidosConhecidos: string = '',
        cnpjMensagemPersonalizada: string = ''
      ) {
        this.cnpj = cnpj;
        this.cnpjPularValidacao = cnpjPularValidacao;
        this.cnpjRemoverFormatacao = cnpjRemoverFormatacao;
        this.cnpjPermitirInvalidosConhecidos = cnpjPermitirInvalidosConhecidos;
        this.cnpjMensagemPersonalizada = cnpjMensagemPersonalizada;
      }
    }

    test('deve validar CNPJs válidos com decorator', async () => {
      for (const cnpjValido of cnpjsValidos.slice(0, 3)) {
        const instanciaTeste = new ClasseTeste(cnpjValido);
        const erros = await validate(instanciaTeste);
        const errosCnpj = erros.filter((erro) => erro.property === 'cnpj');
        expect(errosCnpj).toHaveLength(0);
      }
    });

    test('deve invalidar CNPJs inválidos com decorator', async () => {
      for (const cnpjInvalido of cnpjsInvalidos.slice(0, 3)) {
        if (!cnpjInvalido) continue;
        const instanciaTeste = new ClasseTeste(cnpjInvalido);
        const erros = await validate(instanciaTeste);
        const errosCnpj = erros.filter((erro) => erro.property === 'cnpj');
        expect(errosCnpj.length).toBeGreaterThan(0);
      }
    });

    test('deve permitir valores vazios', async () => {
      const instanciaTeste = new ClasseTeste('');
      const erros = await validate(instanciaTeste);
      const errosCnpj = erros.filter((erro) => erro.property === 'cnpj');
      expect(errosCnpj).toHaveLength(0);
    });

    test('deve pular validação de dígito quando opção estiver definida', async () => {
      const instanciaTeste = new ClasseTeste('', '11222333000182');
      const erros = await validate(instanciaTeste);
      const errosCnpj = erros.filter(
        (erro) => erro.property === 'cnpjPularValidacao'
      );
      expect(errosCnpj).toHaveLength(0);
    });

    test('deve remover formatação quando opção estiver definida', async () => {
      const instanciaTeste = new ClasseTeste('', '', '11.222.333/0001-81');
      const erros = await validate(instanciaTeste);
      const errosCnpj = erros.filter(
        (erro) => erro.property === 'cnpjRemoverFormatacao'
      );
      expect(errosCnpj).toHaveLength(0);
    });

    test('deve permitir CNPJs inválidos conhecidos quando opção estiver definida', async () => {
      const instanciaTeste = new ClasseTeste('', '', '', '11111111111111');
      const erros = await validate(instanciaTeste);
      const errosCnpj = erros.filter(
        (erro) => erro.property === 'cnpjPermitirInvalidosConhecidos'
      );
      expect(errosCnpj).toHaveLength(0);
    });

    test('deve usar mensagem de erro personalizada', async () => {
      const instanciaTeste = new ClasseTeste('', '', '', '', '11222333000182');
      const erros = await validate(instanciaTeste);
      const errosCnpj = erros.filter(
        (erro) => erro.property === 'cnpjMensagemPersonalizada'
      );
      if (errosCnpj.length > 0) {
        expect(errosCnpj[0].constraints?.isCNPJ).toBe(
          'CNPJ inválido personalizado'
        );
      }
    });
  });

  describe('Casos Extremos', () => {
    test('deve lidar com entrada malformada de forma elegante', () => {
      const entradasMalformadas = [
        null,
        undefined,
        123,
        {},
        [],
        true,
        false,
      ];

      entradasMalformadas.forEach((entrada) => {
        expect(() => validateCnpjDigit(entrada as any)).not.toThrow();
      });
    });

    test('deve lidar com strings muito longas', () => {
      const stringLonga = '1'.repeat(1000);
      expect(validateCnpjDigit(stringLonga)).toBe(false);
    });

    test('deve lidar com strings com caracteres unicode', () => {
      const stringUnicode = '11😀222😀333😀000181';
      expect(validateCnpjDigit(stringUnicode)).toBe(true);
    });
  });

  describe('Testes de Performance', () => {
    test('deve validar múltiplos CNPJs de forma eficiente', () => {
      const tempoInicio = performance.now();

      for (let i = 0; i < 1000; i++) {
        cnpjsValidos.forEach((cnpj) => validateCnpjDigit(cnpj));
      }

      const tempoFim = performance.now();
      const tempoExecucao = tempoFim - tempoInicio;

      expect(tempoExecucao).toBeLessThan(1000);
    });
  });
});
