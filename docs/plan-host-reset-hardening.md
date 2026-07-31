# Host-styles beschermen tegen resets van de consumer

Plan bij [issue #160](https://github.com/MinBZK/storybook/issues/160). Status: uitgevoerd op `feat/timeline-track-cell-visibility` (31 juli 2026). De guard vond naast de audittabel nog 2 restgevallen: de padding van `nldd-menu-divider` (opgelost als marge op het lijn-element, met een `flow-root`-host die de marge binnenboord houdt) en de forced-colors-border van het progress-bar-segment (verhuisd naar het inset-0 tooltip-vlak dat de host al exact bedekt).

Een universele reset in een consumerende app, zoals `* { margin: 0; padding: 0 }`, wint van elke `:host`-regel in onze shadow roots. Dat is geen bug in de browser maar CSS Scoping: bij normale declaraties wint de buitenste context, ongeacht specificiteit. Het faalt bovendien stil. `getComputedStyle` toont 0px terwijl de custom property keurig 12px zegt. Het issue meldt dit voor `nldd-menu`, `nldd-switch` en `nldd-banner`. Het mechanisme klopt, de componentlijst niet.

### De melding klopt voor banner, half voor menu, en niet voor switch

1. **Banner**: het visuele kader staat volledig op `:host`: padding, inset box-shadow als rand, background, grid. De beschrijving in het issue (grid-template-columns, box-shadow, padding die als 0px terugkomt) is exact banner. Dit is de kroongetuige.
2. **Menu**: de menu-host is al gebouwd zoals het issue voorstelt. Het kader zit op `.menu`, de host staat op `margin: 0`, `padding: 0`, `border: none`. Een reset zet dezelfde waarden en breekt niets. Het lek zit een export verderop in hetzelfde bestand: `nldd-menu-group` zet dividers (border-top/-bottom), margins en padding op z'n host. Een reset sloopt de groepsdividers en de spatiëring, en dat oogt als "het menu is stuk".
3. **Switch**: de host bevat alleen layout (display, width, height, position). Dat was in 0.8.70 al zo, gecontroleerd met `git show v0.8.70`. Een margin-, padding- of border-reset raakt hem niet. Deze claim reproduceert vermoedelijk niet, fase 1 stelt dat vast.

### De werkelijke scope is groter dan 3 componenten

Een audit over alle `*.styles.ts` levert deze kwetsbare host-declaraties op:

| Component | Op de host | Effect van een reset |
|---|---|---|
| `nldd-banner` | padding, padding-right bij `[dismissible]` | inhoud tegen de rand, sluitknop over de tekst |
| `nldd-menu-group` | border-top/-bottom, margin, padding | dividers en groepsspatiëring in menu's weg |
| `nldd-container` | padding op 4 zijden, per breakpoint | paginapadding volledig weg |
| 7 celcomponenten | padding-block via `--context-cell-padding-block` | rijen in lijsten en tabellen klappen dicht |
| `nldd-table-row` | border-bottom, padding-inline | rijdividers en inline inset weg |
| `nldd-list-item` (`.is-interactive`) | negatieve margin-inline | inset-uitlijning van interactieve rijen breekt |

Container en de cellen wegen zwaarder dan de gemelde banner: daar valt de complete lijst- en paginalayout om. Fase 1 herhaalt de audit preciezer en vult de restgevallen aan (onder andere forced-colors-borders).

### Alleen wat een reset echt zet is kwetsbaar

Resets zetten margin, padding en border. Tailwind preflight zet `border-width: 0` op elk element, dus ook op onze custom elements. Properties als background-color, box-shadow en border-radius op de host overleven elke gangbare reset. Alleen `* { all: unset }` raakt ze, en wie dat schrijft heeft een groter probleem dan dit design system kan oplossen. De fix hoeft daarom niet elke `:host`-property te verhuizen: margin, padding en border op de host zijn het doelwit.

### Wrapper waar het kan, !important waar het moet

Het issue stelt de wrapper als generieke oplossing voor. Voor een deel van de componenten kan dat niet, dus het plan kent 2 remedies:

1. **Wrapper (voorkeur)**: het visuele kader verhuist naar een element in de shadow root, de host houdt positionering en sizing. Dit past bij banner, container, en de border en padding van menu-group.
2. **`!important` binnen de shadow root**: bij important-declaraties wint de binnenste context, ook van een `!important`-reset buiten. Dit is de route waar een wrapper de layout breekt: de cellen en `nldd-table-row` (subgrid werkt alleen direct parent-child, een tussenliggende wrapper verbreekt de kolomrelatie) en de negatieve margin-inline van list-item (een binnenelement kan niet buiten de host steken). Spaarzaam, per declaratie, met een comment die uitlegt waarom hij daar staat. Gewone marges kunnen wél naar binnen zodra de host een eigen formatting context is (flex-item, `flow-root`): dan wordt de wrapper-marge interieurruimte op precies dezelfde plek, zie menu-group en menu-divider. Zelfs een query-container kan mee naar binnen, zolang de padding meeverhuist zodat de content-box dezelfde binnenmaat blijft rapporteren, zie container.

### Geen breaking change, wel het contract aanscherpen

`nldd-banner { padding: 24px }` in consumer-CSS wint vandaag van onze `:host`-regel. Na de fix niet meer: bij een wrapper landt de consumer-padding op de host en doet daar niets, bij `!important` verliest de consumer-regel. Dat is geen breuk, want direct properties op het element zetten was nooit gedekt gedrag. Het contract is styling via CSS-variabelen (`--components-banner-padding`), en dat blijft werken. De changelog noemt de fix en herhaalt de variabele-route.

### Fasering

1. **Repro en bevestiging.** Een test-helper in `src/test-utils.ts` die een universele reset in het testdocument zet, in 2 smaken: `* { margin: 0; padding: 0; border: 0 }` en de Tailwind-preflight-variant. Daarmee falende tests schrijven voor elke rij uit de audittabel. De bevindingen over switch en menu gaan als comment terug op issue #160 (Bart post, gh is hier niet ingelogd).
2. **Guard in de build.** `scripts/validate-host-styles.js` die margin, padding en border direct op een top-level `:host` zonder `!important` flagt, naast `validate:styles` in `npm run build`. Zo keert het patroon niet terug bij nieuwe componenten.
3. **Fixes per component**, aflopend naar impact: container (drie lagen: kale host, `.container` als querycontainer met de padding, `.container__inner` voor de layout), cellen en table-row (`!important`), banner (wrapper), menu-group en menu-divider (wrapper met `flow-root`-host, zodat de marges binnenboord blijven), list-item (`!important` op de negatieve margin). De tests uit fase 1 draaien groen als bewijs.
4. **Doctrine vastleggen.** Regel in de /component- en /css-skills: de host draagt het externe contract (display, sizing, positie, custom properties), het visuele kader zit op een element binnen de shadow root. Daarna `npm run generate:skill-docs`.
5. **Changelog en praktijktest.** Fixed-entry met de variabele-route als stylingcontract. Een tarball-install in regelrecht als smoke-test.

### Branch en omvang

Het werk loopt mee op `feat/timeline-track-cell-visibility`. Fase 1 en 2 zijn samen een dagdeel. Fase 3 is het echte werk: banner en container zijn klein, cellen en table-row vragen het meest omdat subgrid en baseline-uitlijning meekijken.
