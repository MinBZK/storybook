---
name: Geen amend en force push
description: Gebruik aparte commits in plaats van git commit --amend
type: feedback
---

Gebruik altijd aparte fix-commits in plaats van git commit --amend + force push.

**Why:** Amend herschrijft history en vereist force push, wat riskant is en de git history onduidelijk maakt.

**How to apply:** Maak een nieuwe commit voor elke fix, ook als het een kleine wijziging is. Nooit --amend gebruiken, nooit --force-with-lease of --force pushen.
