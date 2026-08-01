# Patronen: layout

## Layout van buiten naar binnen

De compositie loopt van de app-shell naar de inhoud:

```
nldd-app-view              (app-shell: kleurschema-context)
  └─ split view            (responsive auto-hide van panelen)
       └─ slot per paneel  (links = hoogste prioriteit)
            └─ nldd-page / nldd-container  (inhoud + padding)
```

### Twee panelen, prioriteit links

`nldd-side-by-side-split-view` verbergt panelen van rechts naar links als ze
niet meer passen. Zet de hoofdinhoud links, secundaire inhoud rechts.

```html
<nldd-app-view>
  <nldd-side-by-side-split-view panes="2">
    <div slot="pane-1">
      <!-- hoofdinhoud: blijft het langst zichtbaar -->
    </div>
    <div slot="pane-2">
      <!-- inspector/detail: verdwijnt eerst op smal scherm -->
    </div>
  </nldd-side-by-side-split-view>
</nldd-app-view>
```

### Een bar naast de hoofdinhoud

`nldd-bar-split-view` geeft een werkbalk-paneel naast de hoofdinhoud, met eigen
breakpoint-gedrag.

```html
<nldd-app-view>
  <nldd-bar-split-view>
    <nldd-split-view-pane slot="primary-bar-md"
      only="md"
    >
      <nldd-container padding="8">
        <nldd-toolbar size="md"><!-- ... --></nldd-toolbar>
      </nldd-container>
    </nldd-split-view-pane>
    <!-- hoofdinhoud -->
  </nldd-bar-split-view>
</nldd-app-view>
```

## Verticale ruimte: spacer versus container

```html
<!-- Vaste ruimte tussen twee verschillende componenten -->
<nldd-spacer size="32"></nldd-spacer>

<!-- Per breakpoint anders -->
<nldd-spacer sm-size="16"
  md-size="24"
  lg-size="32"
></nldd-spacer>

<!-- Padding rond een regio + layout van de kinderen -->
<nldd-container padding="16"
  sm-padding="8"
  gap="8"
>
  <!-- kinderen -->
</nldd-container>
```
