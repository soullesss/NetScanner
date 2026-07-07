# Teste

Repositorio de teste organizado pelo Codex para validar escrita no GitHub e evoluir uma ideia com cuidado.

Agora o projeto representa um pequeno painel estatico inspirado em uma ferramenta de auditoria defensiva de rede. Ele nao executa varreduras reais. O objetivo e mostrar estrutura, tom, validacao de entrada e postura opsec sem criar risco desnecessario.

## Principios

- Escopo explicito antes de qualquer teste.
- Entrada validada antes de gerar plano de execucao.
- Logs pensados para auditoria, sem segredos em texto puro.
- Nmap tratado como dependencia externa, nao como magia escondida.
- Codigo simples o bastante para revisar rapido.

## Arquivos

- `index.html`: interface do painel.
- `styles.css`: visual responsivo e discreto.
- `script.js`: validacao local e geracao de plano simulado.
- `.gitignore`: ignora lixo de editor, sistema e builds futuros.

## Como usar

Abra `index.html` no navegador. Preencha um alvo permitido, portas e modo de scan para gerar um plano seguro.

## Importante

Use scanners de rede apenas em ambientes onde voce tem autorizacao. Este repositorio e um teste de estrutura e UX, nao uma ferramenta ofensiva.
