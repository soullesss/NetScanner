# Security

Este repositorio e um teste estatico. Ele nao deve executar varreduras reais, coletar credenciais ou enviar dados para terceiros.

## Uso aceitavel

- Laboratorios proprios.
- Ambientes com autorizacao escrita.
- Demonstracoes de fluxo, validacao e documentacao.

## Fora de escopo

- Scan de redes de terceiros sem permissao.
- Armazenamento de tokens, cookies, senhas ou dumps sensiveis.
- Automacao que tente contornar controles de acesso.

## Diretriz de implementacao futura

Se este projeto virar uma CLI Python real, mantenha por padrao:

- Loguru com logs estruturados e retencao curta.
- Validacao de entrada com Pydantic antes de tocar na rede.
- Nmap com checagem de instalacao e modo conservador sem privilegio.
- Exportacao que remova segredos e reduza dados pessoais.
