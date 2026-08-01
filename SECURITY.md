# Beveiliging

Ontdek je een kwetsbaarheid in het NLDD Design System, meld hem dan via het
Nationaal Cyber Security Centrum:

**https://www.ncsc.nl/contact/kwetsbaarheid-melden**

Vermeld daarbij "MinBZK/CIO-office github security response", zodat je melding
bij de juiste mensen terechtkomt. Meld een kwetsbaarheid niet in een openbaar
issue.

## Wat we van je vragen

Dit is een componentbibliotheek en geen draaiend systeem, dus een melding gaat
over het gepubliceerde pakket of de broncode. Daarmee helpen we je het snelst:

- **De versie** van `@nldd/design-system` waarin je het zag.
- **Het component of het bestand** waar het zit.
- **Hoe je het reproduceert**, met een klein stukje HTML of een code-voorbeeld
  waar het uit blijkt.
- **Wat er misgaat**, en waar mogelijk wat een aanvaller ermee zou kunnen.

Verder:

- Meld zo snel als redelijkerwijs kan, zodat de kans klein blijft dat iemand
  met kwade bedoelingen hem eerder vindt.
- Meld op een manier die de melding vertrouwelijk houdt.
- Deel de kwetsbaarheid niet met anderen voordat hij is opgelost.
- Ga niet verder dan nodig is om het bestaan aan te tonen. Bouw geen achterdeur
  en verander niets aan systemen van derden om je punt te maken.

## Wat je van ons mag verwachten

De afhandeling volgt het beleid van het NCSC, en de informatie op
https://www.ncsc.nl/contact/kwetsbaarheid-melden is daarin leidend. In het
kort:

- Je krijgt een reactie op je melding met een inschatting en een verwachte
  oplosdatum.
- Meld je volgens bovenstaande route, dan onderneemt de Rijksoverheid geen
  juridische stappen tegen je naar aanleiding van de melding.
- Je persoonsgegevens gaan niet naar derden zonder je toestemming, tenzij dat
  wettelijk moet. Melden onder pseudoniem of anoniem kan.
- Je hoort van ons hoe het staat met de oplossing.
- Bij publicatie noemen we je als ontdekker, tenzij je dat liever niet hebt.

## Welke versies

Er is één ondersteunde versie: de laatst gepubliceerde op npm. Fixes komen in
een nieuwe release en worden niet teruggezet naar oudere versies. Wat er per
release is veranderd staat in [`CHANGELOG.md`](./CHANGELOG.md).

## Geen kwetsbaarheid, wel een bug

Gaat het om een gewone fout in een component, gebruik dan de
[issues](https://github.com/MinBZK/storybook/issues). Hoe je dat het beste doet
staat in [`CONTRIBUTING.md`](./CONTRIBUTING.md).
