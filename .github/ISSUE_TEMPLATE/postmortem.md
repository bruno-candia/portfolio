---
name: Blameless Postmortem
about: Relatório de incidente para aprendizado e resiliência, focado em sistemas, não em pessoas.
title: 'Postmortem: [Nome Curto do Incidente]'
labels: 'postmortem'
assignees: ''
---

> Por favor, após abrir a issue, aplique labels adicionais para categorizar a área impactada (ex: `frontend`, `database`, `infra`) e a causa raiz (ex: `cause:network`, `cause:deploy`, `cause:config`). Isso facilita a análise de tendências de longo prazo.

## Sumário Executivo

**Data:** YYYY-MM-DD
**Autores:** @seu-usuario
**Status:** [Rascunho | Em Revisão | Concluído]
**Resumo:** [Explique em 2-3 frases o que aconteceu, por que aconteceu, o impacto no negócio e como foi mitigado.]

## Impacto

- **Usuários Afetados:** [Ex: 100% dos usuários durante 15 minutos não conseguiam fazer login]
- **Severidade:** [SEV-1 | SEV-2 | SEV-3]

## Detecção

**Como o incidente foi descoberto?**

- [ ] Alerta Automático (Sentry, Monitoramento)
- [ ] Time Interno notou
- [ ] Reporte de Cliente/Usuário

**Poderia ter sido detectado mais rápido? Como?**
[Sua análise sobre a detecção]

## Linha do Tempo (Timeline)

_(Use o fuso horário local e seja preciso)_

- **14:00** - Deploy da versão `v1.2.3` concluído.
- **14:05** - Alerta do Sentry disparou (Latência alta LCP).
- **14:10** - Investigação iniciada pelo @oncall.
- **14:15** - Identificado problema de performance devido à imagem não otimizada.
- **14:20** - Mitigação aplicada (Rollback para `v1.2.2`). Incidente resolvido.

## Causa Raiz (Os "5 Whys")

1. **Por que o site ficou lento?** O LCP aumentou drasticamente na home.
2. **Por que o LCP aumentou?** Uma imagem de hero muito pesada foi introduzida sem as tags `sizes`.
3. **Por que a imagem foi introduzida dessa forma?** Falha no code review e no lint (Next.js Image rule estava como warning).
4. **Por que a rule estava como warning?** Configuração antiga que não acompanhou a atualização do Next.
5. **Por que o pipeline de CI não bloqueou?** Porque a política do PR não proíbe warnings, apenas errors.

## Lições Aprendidas

**O que deu certo?**

- O Sentry alertou o esgotamento do Error Budget imediatamente.
- O rollback da Vercel foi instantâneo e mitigou a falha em minutos.

**O que deu errado?**

- A detecção no pipeline CI/CD falhou em encontrar o problema com antecedência, impactando o usuário.

## Action Items

_(O que a engenharia precisa fazer para evitar a reincidência deste incidente ou diminuir o impacto?)_

- [ ] Atualizar o ESLint para tratar `next/image` sem `sizes` como Error (em vez de Warning).
- [ ] Adicionar um teste E2E com Lighthouse/Playwright para validar o LCP mínimo no frontend.
