---
name: Vraag voordat je pusht
description: Altijd expliciet toestemming vragen voordat je git push uitvoert
type: feedback
---

Altijd vragen voordat je git push uitvoert. Niet pushen tenzij de gebruiker expliciet zegt "push" of "je mag pushen".

**Why:** Push is een actie die zichtbaar is voor anderen en niet makkelijk terug te draaien. Gebruiker wil controle houden.

**How to apply:** Na het committen altijd eerst vragen "Zal ik pushen?" voordat je `git push` uitvoert. Nooit automatisch pushen, ook niet als de gebruiker eerder al toestemming gaf voor een push. Alleen pushen als de gebruiker expliciet "ja", "push", "je mag pushen" of vergelijkbaar zegt.
