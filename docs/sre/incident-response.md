# Playbook: Gestão de Incidentes e Cultura SRE

A resiliência de um sistema não depende apenas da ausência de falhas, mas da velocidade e eficiência com que a equipe se recupera quando elas acontecem.

Este documento consolida as práticas fundamentais de resposta a incidentes e treinamento para nossa engenharia, baseadas nos modelos do Google SRE.

---

## 1. Gestão de Incidentes (Durante a Crise)

Durante uma interrupção (_Outage_), a clareza na comunicação e divisão de responsabilidades é mais importante do que a genialidade técnica isolada. O gerenciamento de incidentes segue um modelo hierárquico, recursivo e explícito.

### Os Três Papéis Críticos

1. **Comandante do Incidente (Incident Commander - IC):**
   - Possui o cenário macro. Sua responsabilidade é **gerenciar o estado do incidente**.
   - **Não toca no teclado** para consertar o sistema. Toma decisões baseadas em inputs e delega tarefas.
   - Declara quando o incidente começou e quando terminou.
2. **Trabalho Operacional (Operations):**
   - Engenheiros atuando no front técnico.
   - São as **únicas pessoas** autorizadas a fazer alterações nos sistemas (rollbacks, escalonamento, mudanças em infra) durante a crise, sempre sob a autorização do Comandante.
3. **Comunicação (Communications):**
   - O escudo do time. Responsável por informar stakeholders e responder clientes.
   - Permite que o Comandante e os Operacionais foquem 100% no problema, sem interrupções externas.

> _Nota: Em incidentes pequenos (ex: plantões menores), a mesma pessoa pode acumular as três funções. Conforme a crise cresce, o IC deve focar puramente na gestão e recrutar mais pessoas para Operação e Comunicação._

---

## 2. Cultura Blameless (Após a Crise)

Quando o incidente termina, o aprendizado começa. Todo incidente de impacto médio/alto deve gerar um **Postmortem**.

- Utilize nosso template no GitHub: [`.github/ISSUE_TEMPLATE/postmortem.md`](../../.github/ISSUE_TEMPLATE/postmortem.md).
- **Regra de Ouro:** Sistemas falham. Processos falham. Pessoas não são a causa raiz. Se um humano quebrou o sistema, a falha real é do sistema por ter permitido que o humano causasse o problema.
- Adicione **labels rigorosamente** ao postmortem para acompanhar tendências (ex: `cause:network`, `frontend`).
- A seção "Lições Aprendidas" deve celebrar sucessos também: "O Sentry disparou 3 minutos antes da degradação geral, salvando a Vercel de exceder limites."

---

## 3. Treinamento: A "Roda do Infortúnio" (Wheel of Misfortune)

Testes automatizados garantem que código quebrado não suba, mas sistemas distribuídos falham de maneiras imprevisíveis. Para evitar a "atrofia operacional", precisamos testar as pessoas.

A **Roda do Infortúnio (Wheel of Misfortune)** é um exercício de _Role Playing_ (RPG de SRE) regular que conduzimos com a equipe:

### Como funciona:

1. **O Game Master (Facilitador):** Prepara um cenário de falha. Pode ser um postmortem antigo, ou um cenário hipotético crível (ex: "O banco de dados exauriu as conexões" ou "A CDN está fora do ar").
2. **O Engenheiro On-Call (Jogador):** Recebe o alerta inicial (simulado pelo Game Master) e deve investigar e mitigar o problema "em voz alta".
3. **A Dinâmica:**
   - O Jogador diz o que faria: _"Eu olho as métricas do Sentry para ver a latência LCP"_.
   - O Game Master responde com o resultado: _"O LCP está em 4000ms. O tráfego não caiu"_.
   - O Jogador pede acesso a logs, dashboards, sugere ações de mitigação (ex: escalar banco de dados, iniciar rollback).
4. **Debriefing:** Ao fim, a equipe discute o que foi feito de bom, gaps de documentação que o jogador sofreu para encontrar, e falhas de monitoramento ocultas que dificultaram a investigação no RPG.

### Benefícios:

- Constrói **memória muscular** para incidentes.
- Garante que novos membros percam o "medo" de sistemas críticos em um ambiente totalmente seguro.
- Identifica gaps nos runbooks e alertas antes que uma falha real aconteça.
