# 🇧🇷 Brazilian Validator

<div align="center">

[![npm version](https://badge.fury.io/js/@sh4rkzy%2Fbrazilian-validator.svg)](https://badge.fury.io/js/@sh4rkzy%2Fbrazilian-validator)
[![npm downloads](https://img.shields.io/npm/dm/@sh4rkzy/brazilian-validator.svg)](https://www.npmjs.com/package/@sh4rkzy/brazilian-validator)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/sh4rkzy/brazilian-validator/ci.yml?branch=main&label=tests)](https://github.com/sh4rkzy/brazilian-validator/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Poku](https://img.shields.io/badge/Poku-3.0.2-green?logo=nodejs)](https://poku.io/)
[![Biome](https://img.shields.io/badge/Biome-2.2.2-purple?logo=biome)](https://biomejs.dev/)
[![Coverage Status](https://img.shields.io/badge/coverage-100%25-brightgreen)](https://github.com/sh4rkzy/brazilian-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D16.0.0-green?logo=node.js)](https://nodejs.org/)
[![ESM](https://img.shields.io/badge/ESM-supported-brightgreen)](https://nodejs.org/api/esm.html)
[![NestJS](https://img.shields.io/badge/NestJS-compatible-red?logo=nestjs)](https://nestjs.com/)
[![GitHub Stars](https://img.shields.io/github/stars/sh4rkzy/brazilian-validator?style=social)](https://github.com/sh4rkzy/brazilian-validator)

  🚀 Valide documentos brasileiros (CPF e CNPJ) no **NestJS/TypeScript** de forma simples, nativa e sem dependências extras.  

  [Instalação](#📦-instalação) •
  [Uso no TypeScript](#🟦-uso-no-typescript) •
  [Exemplos no NestJS](#🛠️-exemplos-no-nestjs) •
  [API e Decorators](#🎯-api-e-decorators) •
  [Testes](#🧪-testes) •
  [Roadmap](#🛣️-roadmap) •
  [Contribuindo](#🤝-contribuindo) •
  [Contribuindo](#🤝-contribuindo)
</div>

---

## 📦 Instalação

```bash
npm install @sh4rkzy/brazilian-validator class-validator class-transformer
```

ou

```bash
yarn add @sh4rkzy/brazilian-validator class-validator class-transformer
```

---

## 🟦 Uso no TypeScript

A biblioteca é **totalmente compatível com TypeScript** e pode ser usada sem NestJS.

```typescript
import 'reflect-metadata';
import { validate } from 'class-validator';
import { IsCPF, IsCNPJ } from '@sh4rkzy/brazilian-validator';

class User {
  @IsCPF({ message: 'CPF inválido' })
  cpf!: string;

  @IsCNPJ({ message: 'CNPJ inválido' })
  cnpj!: string;
}

async function run() {
  const user = new User();
  user.cpf = '12345678900'; // inválido
  user.cnpj = '11222333000181'; // válido

  const errors = await validate(user);
  console.log(errors);
}

run();
```

Também é possível usar funções utilitárias diretamente:

```typescript
import { validateCpfDigit, validateCnpjDigit } from '@sh4rkzy/brazilian-validator';

console.log(validateCpfDigit('111.444.777-35')); // true
console.log(validateCnpjDigit('11.222.333/0001-81')); // true
```

---

## 🛠️ Exemplos no NestJS

### DTO de criação de usuário
```typescript
import { IsCPF } from '@sh4rkzy/brazilian-validator';
import { Body, Controller, Post } from '@nestjs/common';

class CreateUserDto {
  @IsCPF()
  cpf!: string;
}

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() body: CreateUserDto) {
    return body;
  }
}
```

### Configurando ValidationPipe no main.ts
```typescript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

---

## 🎯 API e Decorators

### Funções utilitárias
- `validateCpfDigit(cpf: string): boolean`
- `validateCnpjDigit(cnpj: string): boolean`

### Decorators disponíveis
- `@IsCPF(options?)`
- `@IsCNPJ(options?)`

Opções dos decorators:

```typescript
class Company {
  @IsCPF()
  responsibleCpf!: string;

  @IsCPF({ lengthOnly: true })
  backupCpf!: string;

  @IsCNPJ({ message: 'CNPJ da empresa inválido' })
  companyCnpj!: string;
}
```

---

## 🧪 Testes

Este projeto possui **100% de cobertura de testes** com Poku.

### Executar testes
```bash
npm test
```

### Executar testes em modo watch
```bash
npm run test:watch
```

### Executar linting
```bash
npm run lint
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja como contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Desenvolvimento local

```bash
# Clone o repositório
git clone https://github.com/sh4rkzy/brazilian-validator.git

# Instale as dependências
npm install

# Execute os testes
npm test

# Execute o build
npm run build
```

---

## 🛣️ Roadmap

- [x] ✅ **v0.0.1** - Core CPF/CNPJ validation
- [x] ✅ **v0.0.2** - TypeScript decorators
- [x] ✅ **v0.0.4** - Complete test suite
- [ ] 🔄 **v0.1.0** - RG validation
- [ ] 🔄 **v0.2.0** - CEP validation
- [ ] 🔄 **v0.3.0** - Título de Eleitor validation
- [ ] 🔄 **v0.4.0** - React Hook Form integration

---


## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🔗 Links Úteis

- [📦 NPM Package](https://www.npmjs.com/package/@sh4rkzy/brazilian-validator)


## 📞 Suporte

- 🐛 **Issues**: [GitHub Issues](https://github.com/sh4rkzy/brazilian-validator/issues)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/sh4rkzy/brazilian-validator/discussions)

<div align="center">

**Feito com ❤️ para a comunidade**

⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!

[Kaue Campos - Software Engineer](https://github.com/sh4rkzy)

</div>
