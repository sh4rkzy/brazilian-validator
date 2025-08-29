import { validateBrazilianDocs, IsCPF, IsCNPJ } from '../src/module/validators/validator-document';
import {
  documentosValidos,
  documentosInvalidos,
  casosTesteValidacaoMista,
  formatosDocumentos,
} from './mocks/validator-document.mock';
import { validate } from 'class-validator';
import 'reflect-metadata';

describe('Validador de Documentos Brasileiros', () => {
  describe('validateBrazilianDocs', () => {
    class ClasseTesteCombinada {
      @IsCPF()
      cpf: string;

      @IsCNPJ()
      cnpj: string;

      constructor(cpf: string, cnpj: string) {
        this.cpf = cpf;
        this.cnpj = cnpj;
      }
    }

    test.each(casosTesteValidacaoMista)(
      'deve validar documentos mistos: $nome',
      async ({ cpf, cnpj, errosEsperados }) => {
        const instancia = new ClasseTesteCombinada(cpf, cnpj);
        const mensagensErro = await validateBrazilianDocs(instancia);
        expect(mensagensErro).toHaveLength(errosEsperados);
      }
    );

    test('deve retornar mensagens de erro apropriadas', async () => {
      const instancia = new ClasseTesteCombinada('11111111111', '11111111111111');
      const mensagensErro = await validateBrazilianDocs(instancia);

      expect(mensagensErro.length).toBeGreaterThan(0);
      mensagensErro.forEach((mensagem) => {
        expect(typeof mensagem).toBe('string');
        expect(mensagem.length).toBeGreaterThan(0);
      });
    });

    test('deve validar documentos válidos sem erros', async () => {
      const instancia = new ClasseTesteCombinada(
        documentosValidos.cpfs[0],
        documentosValidos.cnpjs[0]
      );
      const mensagensErro = await validateBrazilianDocs(instancia);
      expect(mensagensErro).toHaveLength(0);
    });
  });

  describe('Exportação de Decorators', () => {
    test('deve exportar decorator IsCPF', () => {
      expect(IsCPF).toBeDefined();
      expect(typeof IsCPF).toBe('function');
    });

    test('deve exportar decorator IsCNPJ', () => {
      expect(IsCNPJ).toBeDefined();
      expect(typeof IsCNPJ).toBe('function');
    });
  });

  describe('Integração de Validação', () => {
    class ClassePessoa {
      @IsCPF()
      cpf: string;

      constructor(cpf: string) {
        this.cpf = cpf;
      }
    }

    class ClasseEmpresa {
      @IsCNPJ()
      cnpj: string;

      constructor(cnpj: string) {
        this.cnpj = cnpj;
      }
    }

    test('deve funcionar com classes separadas para CPF', async () => {
      const pessoaValida = new ClassePessoa(documentosValidos.cpfs[0]);
      const errosPessoaValida = await validateBrazilianDocs(pessoaValida);
      expect(errosPessoaValida).toHaveLength(0);

      const pessoaInvalida = new ClassePessoa(documentosInvalidos.cpfs[0]);
      const errosPessoaInvalida = await validateBrazilianDocs(pessoaInvalida);
      expect(errosPessoaInvalida.length).toBeGreaterThan(0);
    });

    test('deve funcionar com classes separadas para CNPJ', async () => {
      const empresaValida = new ClasseEmpresa(documentosValidos.cnpjs[0]);
      const errosEmpresaValida = await validateBrazilianDocs(empresaValida);
      expect(errosEmpresaValida).toHaveLength(0);

      const empresaInvalida = new ClasseEmpresa(documentosInvalidos.cnpjs[0]);
      const errosEmpresaInvalida = await validateBrazilianDocs(empresaInvalida);
      expect(errosEmpresaInvalida.length).toBeGreaterThan(0);
    });
  });

  describe('Manipulação de Formatos', () => {
    class ClasseFormatoDiverso {
      @IsCPF()
      cpf: string;

      @IsCNPJ()
      cnpj: string;

      constructor(cpf: string, cnpj: string) {
        this.cpf = cpf;
        this.cnpj = cnpj;
      }
    }

    test('deve aceitar diferentes formatos de CPF', async () => {
      const { formatado, formatosAlternativos } = formatosDocumentos.cpf;

      const instanciaFormatada = new ClasseFormatoDiverso(formatado, documentosValidos.cnpjs[0]);
      const errosFormatada = await validateBrazilianDocs(instanciaFormatada);
      expect(errosFormatada).toHaveLength(0);

      for (const formato of formatosAlternativos) {
        const instancia = new ClasseFormatoDiverso(formato, documentosValidos.cnpjs[0]);
        const erros = await validateBrazilianDocs(instancia);
        expect(erros.length).toBeDefined();
      }
    });

    test('deve aceitar diferentes formatos de CNPJ', async () => {
      const { formatado, formatosAlternativos } = formatosDocumentos.cnpj;

      const instanciaFormatada = new ClasseFormatoDiverso(documentosValidos.cpfs[0], formatado);
      const errosFormatada = await validateBrazilianDocs(instanciaFormatada);
      expect(errosFormatada).toHaveLength(0);

      for (const formato of formatosAlternativos) {
        const instancia = new ClasseFormatoDiverso(documentosValidos.cpfs[0], formato);
        const erros = await validateBrazilianDocs(instancia);
        expect(erros.length).toBeDefined();
      }
    });
  });

  describe('Casos Extremos', () => {
    class ClasseCasosExtremos {
      @IsCPF()
      cpf: string;

      @IsCNPJ()
      cnpj: string;

      constructor(cpf: string, cnpj: string) {
        this.cpf = cpf;
        this.cnpj = cnpj;
      }
    }

    test('deve lidar com valores vazios', async () => {
      const instancia = new ClasseCasosExtremos('', '');
      const erros = await validateBrazilianDocs(instancia);
      expect(erros).toHaveLength(0);
    });

    test('deve lidar com objeto vazio', async () => {
      const objetoVazio = {};
      const erros = await validateBrazilianDocs(objetoVazio);
      expect(Array.isArray(erros)).toBe(true);
    });

    test('deve retornar array mesmo quando não há validações', async () => {
      const objetoSemValidacoes = { propriedadeQualquer: 'valor' };
      const erros = await validateBrazilianDocs(objetoSemValidacoes);
      expect(Array.isArray(erros)).toBe(true);
    });
  });
});
