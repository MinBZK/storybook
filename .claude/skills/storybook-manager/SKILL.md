---
name: storybook-manager
description: Manage multiple Storybook instances across worktrees. Use when starting, stopping, or checking status of Storybook dev servers.
user-invocable: true
argument-hint: [start|stop|status|stop-all]
---

# Storybook Manager

Beheert meerdere Storybook instances, handig bij werken met git worktrees.

## Commands

| Command | Beschrijving |
|---------|-------------|
| `npm run sb:start` | Start Storybook vanuit huidige directory (auto-port) |
| `npm run sb:stop` | Stop Storybook voor huidige directory |
| `npm run sb:status` | Toon alle draaiende Storybook instances |
| `npm run sb:stop-all` | Stop alle Storybook instances |

## Hoe het werkt

- **Automatische poort toewijzing**: Eerste instance krijgt 6006, volgende 6007, etc.
- **Registry**: Alle instances worden bijgehouden in `~/.claude/storybook-instances.json`
- **Cross-platform**: Werkt op Windows, Mac en Linux
- **Worktree support**: Elke worktree kan eigen Storybook draaien op unieke poort

## Voorbeeld output `sb:status`

```
Running Storybook instances:

  feat/component-skill  http://localhost:6006  (PID 16748)
  main                  http://localhost:6007  (PID 36916)
```

## Implementatie

Script: `scripts/storybook-manager.js`

Het script:
1. Detecteert huidige git branch
2. Zoekt eerste vrije poort vanaf 6006
3. Start Storybook als detached process
4. Slaat PID, poort en pad op in registry
5. Bij stop: leest registry en killt correct process

## Tips

- Check altijd `sb:status` voordat je een nieuwe instance start
- Gebruik `sb:stop-all` bij port conflicts of om op te ruimen
- De oude `npm run storybook` werkt nog steeds (altijd poort 6006)
