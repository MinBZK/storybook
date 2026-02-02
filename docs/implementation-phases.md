# Component Implementation Phases

Overview of remaining components grouped into implementation phases. Each phase targets 10-20 components grouped by functionality and dependencies.

**Last updated:** 2026-02-02

## Summary

| Phase | Name | Components | Status | Dependencies |
|-------|------|------------|--------|--------------|
| 1 | Form Fields | 13 | In Progress | - |
| 2 | List Cells Extended | 8 | Pending | List, List Item |
| 3 | Standalone Inputs | 8 | Pending | - |
| 4 | Navigation Extended | 7 | Pending | Menu Bar |
| 5 | Toolbars & Button Groups | 7 | Pending | Button, Icon Button |
| 6 | Page Layout | 12 | Pending | Page: Sticky Area Background |
| 7 | Overlays & Feedback | 6 | Pending | Button, Button Group |
| 8 | Content & Typography | 1 | Pending | - |

**Total:** 62 components remaining (18 implemented, 5 removed)

## Recommended Order

```
Phase 1 ──────────────────────────────────────────────────────► (in progress)
    │
    ├── Phase 2 (List Cells) ─────────────────────────────────►
    │
    ├── Phase 3 (Standalone Inputs) ──────────────────────────►
    │
    └── Phase 4 (Navigation) ─────────────────────────────────►
                │
                └── Phase 5 (Toolbars) ───────────────────────►
                        │
                        └── Phase 7 (Overlays) ───────────────►

Phase 6 (Page Layout) ────────────────────────────────────────► (independent)

Phase 8 (Content) ────────────────────────────────────────────► (lowest priority)
```

---

## Phase 1: Form Fields

**Status:** In Progress (Open PR exists)
**Components:** 13
**Description:** Core form input components. Foundation for data entry UI.

| Component | Node ID | Priority | Notes |
|-----------|---------|----------|-------|
| Text Field | 192:37504 | High | |
| Text Field Cell | 1019:3941 | High | |
| Drop Down Field | 358:717 | High | |
| Drop Down Field Cell | 1014:3843 | High | |
| Form Field | 376:2395 | High | Wrapper component for field layout |
| Number Field | 266:344 | Medium | |
| Password Field | 1380:5781 | Medium | |
| Search Field | 243:3235 | Medium | |
| Checkbox Field | 241:2345 | Medium | |
| Radio Button Field | 241:2382 | Medium | |
| Switch Field | 348:2635 | Medium | |
| Input Field Button | 272:353 | Medium | Button for input field actions |
| Combo Box Field | 362:2435 | Low | |

---

## Phase 2: List Cells Extended

**Status:** Pending
**Components:** 8
**Dependencies:** List, List Item (already implemented)
**Description:** Additional cell types for list items. Extends existing List/ListItem implementation.

| Component | Node ID | Priority | Notes |
|-----------|---------|----------|-------|
| Text Cell | 236:41152 | High | |
| Description Cell | 236:41321 | High | |
| Icon Cell | 236:41365 | High | |
| Timeline Track Cell | 1404:10417 | Medium | |
| Flexible Spacer Cell | 1061:3456 | Medium | |
| List Item Drag Handle | 1342:3114 | Medium | |
| List Item Drag Handle Cell | 1342:3143 | Medium | |
| Stepper Cell | 236:41344 | Low | |

---

## Phase 3: Standalone Inputs

**Status:** Pending
**Components:** 8
**Dependencies:** None
**Description:** Standalone versions of input controls (without cell wrapper). Includes steppers and segmented controls.

| Component | Node ID | Priority | Notes |
|-----------|---------|----------|-------|
| Checkbox (standalone) | 204:38347 | High | |
| Radio Button (standalone) | 219:38433 | High | |
| Switch (standalone) | 232:38506 | High | |
| Stepper | 236:39011 | Medium | |
| Token | 354:3680 | Medium | Tag/chip component for selections |
| Segmented Control | 336:2899 | Medium | |
| Segmented Control: Item | 262:3512 | Medium | |
| Icon Button (standalone) | 31:75 | Low | May share styles with icon-button-cell |

---

## Phase 4: Navigation Extended

**Status:** Pending
**Components:** 7
**Dependencies:** Menu Bar (already implemented)
**Description:** Tab bars, document tabs, and navigation helpers.

| Component | Node ID | Priority | Notes |
|-----------|---------|----------|-------|
| Tab Bar | 1366:43642 | High | |
| Tab Bar: Item | 1366:43604 | High | |
| Document Tab Bar: Item | 38:784 | Medium | |
| Top Navigation Bar: Logo | 22:28 | Medium | |
| Menu Bar: Menu Item | 87:6523 | Medium | |
| Menu Item | 331:1456 | Medium | Dropdown menu item |
| Pagination | 1353:3779 | Low | |

---

## Phase 5: Toolbars & Button Groups

**Status:** Pending
**Components:** 7
**Dependencies:** Button, Icon Button (already implemented)
**Description:** Toolbar components and button grouping patterns.

| Component | Node ID | Priority | Notes |
|-----------|---------|----------|-------|
| Toolbar | 1380:3538 | High | |
| Toolbar: Divider | 1356:13969 | High | |
| Button Group | 1339:3762 | High | |
| Toolbar: Title Group | 1406:12871 | Medium | |
| Button Bar | 1263:6841 | Medium | |
| Button Bar: Divider | 1263:6851 | Medium | |
| Split Button | 1304:2775 | Medium | |

---

## Phase 6: Page Layout

**Status:** Pending
**Components:** 12
**Dependencies:** Page: Sticky Area Background (already implemented)
**Description:** Page structure and section layouts. Foundation for app screens.

| Component | Node ID | Priority | Notes |
|-----------|---------|----------|-------|
| Page | 1255:1052 | High | |
| Title Bar: Title Group | 996:3541 | High | |
| Top Title Bar | 1048:2288 | High | |
| Simple Section | 1255:1471 | Medium | |
| Full Bleed Section | 1255:1496 | Medium | |
| Collection | 1435:29304 | Medium | |
| Box (Figma) | 1451:33442 | Medium | |
| One Third Two Thirds Section | 1255:1530 | Low | |
| Two Thirds One Third Section | 1255:1623 | Low | |
| One Half One Half Section | 1255:1815 | Low | |
| Lister Section | 1449:33380 | Low | |
| Split View: Divider | 39:927 | Low | |

---

## Phase 7: Overlays & Feedback

**Status:** Pending
**Components:** 6
**Dependencies:** Button, Button Group
**Description:** Modal dialogs, sheets, alerts, and tooltips.

| Component | Node ID | Priority | Notes |
|-----------|---------|----------|-------|
| Sheet | 108:25937 | High | |
| Dialog | 1340:4344 | High | |
| Alert | 1340:4678 | High | |
| Window | 1261:3627 | Medium | |
| Tooltip | 1398:10237 | Medium | |
| Tooltip: Arrow | 1398:10227 | Medium | |

---

## Phase 8: Content & Typography

**Status:** Pending
**Components:** 1
**Dependencies:** None
**Description:** Rich text and content display components.

| Component | Node ID | Priority | Notes |
|-----------|---------|----------|-------|
| Rich Text: Heading | 980:145 | Medium | |

---

## Notes

- **Phases 2-4 can be done in parallel** after Phase 1 completes
- **Phase 5 should come before Phase 7** because dialogs typically need button groups
- **Phase 6 can be done independently** at any point
- **Phase 8 is lowest priority** and can be done anytime
