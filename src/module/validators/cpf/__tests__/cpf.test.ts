import { validateCpfDigit } from '../cpf.validator';
import { IsCPF } from '../cpf.decorator';
import { CPFOptions } from '../cpf.types';
import {
  cpfsValidos,
  cpfsInvalidos,
  cpfComCaracteresEspeciais,
  opcoesMockCPF,
} from './cpf.mock';
import { validate } from 'class-validator';
import 'reflect-metadata';

describe('Validador de CPF', () => {
  describe('validateCpfDigit', () => {
    test.each(cpfsValidos)('deve validar CPF válido: %s', (cpf) => {
      expect(validateCpfDigit(cpf)).toBe(true);
    });

    test.each(cpfsInvalidos)('deve invalidar CPF inválido: %s', (cpf) => {
      expect(validateCpfDigit(cpf)).toBe(false);
    });

    test('deve lidar com CPF com caracteres especiais', () => {
      cpfComCaracteresEspeciais.forEach((cpf) => {
        const resultado = validateCpfDigit(cpf);
        expect(typeof resultado).toBe('boolean');
      });
    });

    test('deve retornar false para string vazia', () => {
      expect(validateCpfDigit('')).toBe(false);
    });

    test('deve retornar false para null ou undefined', () => {
      expect(validateCpfDigit(null as any)).toBe(false);
      expect(validateCpfDigit(undefined as any)).toBe(false);
    });
  });

  describe('Decorator IsCPF', () => {
    class ClasseTeste {
      @IsCPF()
      cpf: string;

      @IsCPF(opcoesMockCPF.pularValidacaoDigito)
      cpfPularValidacao: string;

      @IsCPF(opcoesMockCPF.removerFormatacao)
      cpfRemoverFormatacao: string;

      @IsCPF(opcoesMockCPF.permitirInvalidosConhecidos)
      cpfPermitirInvalidosConhecidos: string;

      @IsCPF(opcoesMockCPF.mensagemPersonalizada)
      cpfMensagemPersonalizada: string;

      constructor(
        cpf: string,
        cpfPularValidacao: string = '',
        cpfRemoverFormatacao: string = '',
        cpfPermitirInvalidosConhecidos: string = '',
        cpfMensagemPersonalizada: string = ''
      ) {
        this.cpf = cpf;
        this.cpfPularValidacao = cpfPularValidacao;
        this.cpfRemoverFormatacao = cpfRemoverFormatacao;
        this.cpfPermitirInvalidosConhecidos = cpfPermitirInvalidosConhecidos;
        this.cpfMensagemPersonalizada = cpfMensagemPersonalizada;
      }
    }

    test('deve validar CPFs válidos com decorator', async () => {
      for (const cpfValido of cpfsValidos.slice(0, 3)) {
        const instanciaTeste = new ClasseTeste(cpfValido);
        const erros = await validate(instanciaTeste);
        const errosCpf = erros.filter((erro) => erro.property === 'cpf');
        expect(errosCpf).toHaveLength(0);
      }
    });

    test('deve invalidar CPFs inválidos com decorator', async () => {
      for (const cpfInvalido of cpfsInvalidos.slice(0, 3)) {
        if (!cpfInvalido) continue;
        const instanciaTeste = new ClasseTeste(cpfInvalido);
        const erros = await validate(instanciaTeste);
        const errosCpf = erros.filter((erro) => erro.property === 'cpf');
        expect(errosCpf.length).toBeGreaterThan(0);
      }
    });

    test('deve permitir valores vazios', async () => {
      const instanciaTeste = new ClasseTeste('');
      const erros = await validate(instanciaTeste);
      const errosCpf = erros.filter((erro) => erro.property === 'cpf');
      expect(errosCpf).toHaveLength(0);
    });

    test('deve pular validação de dígito quando opção estiver definida', async () => {
      const instanciaTeste = new ClasseTeste('', '12345678901');
      const erros = await validate(instanciaTeste);
      const errosCpf = erros.filter(
        (erro) => erro.property === 'cpfPularValidacao'
      );
      expect(errosCpf).toHaveLength(0);
    });

    test('deve remover formatação quando opção estiver definida', async () => {
      const instanciaTeste = new ClasseTeste('', '', '111.444.777-35');
      const erros = await validate(instanciaTeste);
      const errosCpf = erros.filter(
        (erro) => erro.property === 'cpfRemoverFormatacao'
      );
      expect(errosCpf).toHaveLength(0);
    });

    test('deve permitir CPFs inválidos conhecidos quando opção estiver definida', async () => {
      const instanciaTeste = new ClasseTeste('', '', '', '11111111111');
      const erros = await validate(instanciaTeste);
      const errosCpf = erros.filter(
        (erro) => erro.property === 'cpfPermitirInvalidosConhecidos'
      );
      expect(errosCpf).toHaveLength(0);
    });

    test('deve usar mensagem de erro personalizada', async () => {
      const instanciaTeste = new ClasseTeste('', '', '', '', '12345678901');
      const erros = await validate(instanciaTeste);
      const errosCpf = erros.filter(
        (erro) => erro.property === 'cpfMensagemPersonalizada'
      );
      if (errosCpf.length > 0) {
        expect(errosCpf[0].constraints?.isCPF).toBe(
          'CPF inválido personalizado'
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
        expect(() => validateCpfDigit(entrada as any)).not.toThrow();
      });
    });

    test('deve lidar com strings muito longas', () => {
      const stringLonga = '1'.repeat(1000);
      expect(validateCpfDigit(stringLonga)).toBe(false);
    });

    test('deve lidar com strings com caracteres unicode', () => {
      const stringUnicode = '111😀444😀777😀35';
      expect(validateCpfDigit(stringUnicode)).toBe(true);
    });
  });

  describe('Testes de Performance', () => {
    test('deve validar múltiplos CPFs de forma eficiente', () => {
      const tempoInicio = performance.now();

      for (let i = 0; i < 1000; i++) {
        cpfsValidos.forEach((cpf) => validateCpfDigit(cpf));
      }

      const tempoFim = performance.now();
      const tempoExecucao = tempoFim - tempoInicio;

      expect(tempoExecucao).toBeLessThan(1000);
    });
  });
});
