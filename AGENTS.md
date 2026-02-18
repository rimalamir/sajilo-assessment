# Agent Guide: Mini Delivery App (React Native)

## Mission
Build the "Mini Delivery App" per the technical assessment. Focus on clean architecture, offline handling, and a polished, accessible UI. This guide is the single source of truth for requirements and UX behavior.

## Project Constraints
- Platform: React Native (Expo or RN CLI). JS or TS is allowed.
- Network: restricted; prefer mock data if needed.
- Storage: must support offline saved requests (local storage).
- Keep code maintainable and well-structured.

## Core Screens (Stack Navigator)
1. `OrderListScreen` (root)
2. `CreateRequestScreen`
3. `OrderDetailsScreen`
4. `TrackingScreen`

### Header Pattern
- Title per screen.
- Back button on all non-root screens.
- Optional right actions (e.g., Filter, Help, Debug: Clear local in dev only).

## Design Tokens
- 8pt spacing grid.
- Buttons: Primary (filled), Secondary (outline).
- Status must include text + icon (do not rely on color alone).
- Typography levels: Title, Subtitle, Body, Caption.

## Reusable Components
- `OrderCard`
- `StatusPill`
- `PendingBadge` (local unsynced)
- `OfflineBanner`
- `EmptyState`
- `ErrorState`
- `PrimaryFAB`

## Screen Requirements

### 1) Main Order Hub (`OrderListScreen`)
**Purpose**: Show merged orders from remote/mock + local pending requests.

**Layout (top to bottom)**
1. Header: Title "Orders", optional Filter icon.
2. Connectivity/Sync strip:
   - Offline: "Offline — new requests will be saved locally" (persistent).
   - Online + pending: "Pending requests: X — will sync when online".
3. Order list (FlatList) with pull-to-refresh.
   - Prefer sections: "Pending (Local)" and "All Orders".
   - If not sections, still group pending first with a visible divider label.
4. FAB bottom-right: "+" creates request.

**OrderCard content**
- Left: icon (package/truck) OR colored dot.
- Main: Order ID (bold), Sender (label + value), Recipient (label + value).
- Right: StatusPill; if local, show PendingBadge and optional cloud-off icon.
- Optional chevron for tap affordance.

**Tap behavior**
- If status == "In Transit" -> `TrackingScreen`.
- Else -> `OrderDetailsScreen`.

**States**
- Loading: skeletons or spinner.
- Empty: illustration + "No orders yet" + CTA "Create Request".
- Error: inline error; still show local pending; allow "Retry".

### 2) Create Delivery Request (`CreateRequestScreen`)
**Purpose**: Create new delivery request. Must work offline.

**Layout**
- Header: "New Delivery".
- Offline hint banner when offline.
- Form fields (scrollable):
  - Recipient Name
  - Address (multiline)
  - Contact Info (phone/email)
  - Notes (optional)
- Primary action: sticky bottom "Save Request".
- Secondary: "Cancel" with discard confirm if dirty.

**Validation**
- Inline errors on blur and on submit.
- Disable Save until required fields present or validate on submit.

**Submit outcomes**
- Offline: save locally, toast/snackbar "Saved locally as Pending", navigate back.
- Online: save locally then mark as synced OR simulate API success.
- Always return to hub and show new item at top under Pending.

### 3) Order Details (`OrderDetailsScreen`)
**Purpose**: Detail view for non-in-transit or local pending orders.

**Layout**
- Header: "Order Details".
- Summary card: Order ID + StatusPill (+ Not synced if local).
- Parties: Sender, Recipient, Contact.
- Delivery: Address, Created timestamp, optional ETA/Delivered time.
- Actions: optional "Sync now" if local and online; optional "Reorder" for delivered.

**State**
- If local-only and missing fields, show "—" placeholders.

### 4) Tracking (`TrackingScreen`)
**Purpose**: Map with moving marker for "In Transit" orders.

**Layout**
- Header: "Tracking".
- Map full height (react-native-maps or similar).
- Markers: vehicle + destination (optional).
- Bottom info sheet: Order ID, Status "In Transit", location/ETA.

**Motion**
- Smooth marker movement every 500–1500ms.
- Map camera follow (optional toggle).
- If offline, still simulate movement and show banner.

## Data & Sorting Rules (Must Pass Evaluation)
- Pending local items are always visible even if remote fetch fails.
- Pull-to-refresh updates remote data; local pending remains unchanged.
- Sorting priority:
  1. Pending local (most recent first)
  2. In Transit
  3. Others (recent first)

## Accessibility
- Touch targets >= 44x44.
- FAB accessibilityLabel: "Create delivery request".
- Status pills include text + icon.
- Form fields: labels, correct keyboard types, and next/done behavior.

## Suggested Architecture
- Data layer: mock API (static list or local JSON) + local storage for pending.
- Storage: AsyncStorage or similar. Keep a single source of truth for local pending.
- State: local state or light-weight global store (be ready to justify choice).
- Navigation: stack navigator per above.

## README Requirements
- List libraries used.
- Justify at least two key choices (state management, storage, etc.).

## Developer Notes
- Keep UI clean and consistent with tokens.
- Prefer small reusable components.
- Avoid network dependency if not necessary.
- Include concise comments only when logic is non-obvious.

## Visual UI Description (Reference)
Use this as the visual guide for layout and states. It maps directly to the assessment requirements.

### Global UI Framework
**Navigation**
- Stack Navigator: `OrderListScreen` (root), `CreateRequestScreen`, `OrderDetailsScreen`, `TrackingScreen`.
- Header pattern: title per screen; back button on all non-root screens; optional right actions where useful (e.g., Filter, Help, Debug: Clear local only in dev).

**Design tokens**
- 8pt spacing grid.
- Primary button: filled.
- Secondary button: outline.
- Status indicators must use text + icon (do not rely on color only).
- Typography levels: Title, Subtitle, Body, Caption.

**Reusable components**
- `OrderCard`, `StatusPill`, `PendingBadge`, `OfflineBanner`, `EmptyState`, `ErrorState`, `PrimaryFAB`.

### Screen 1: Main Order Hub (`OrderListScreen`)
**Purpose**: Central dashboard showing merged orders (remote/mock + local pending). Supports pull-to-refresh.

**Layout (top to bottom)**
1. Header: Title \"Orders\", optional Filter icon.
2. Connectivity/Sync strip:
   - Offline: persistent banner \"Offline — new requests will be saved locally\".
   - Online + pending: \"Pending requests: X — will sync when online\".
3. Order list (FlatList) with pull-to-refresh.
   - Sections recommended: \"Pending (Local)\" and \"All Orders\".
   - If not sections, group pending first and show a divider label.
4. Floating Action Button bottom-right: \"+\" to create request.

**OrderCard contents**
- Left: small icon (package/truck) or colored dot.
- Main: Order ID (bold), Sender (label + value), Recipient (label + value).
- Right: StatusPill; if local unsynced, show PendingBadge (\"LOCAL\" or \"Not synced\") and optional cloud-off icon.
- Optional chevron for tap affordance.

**Unsynced visual indicator**
- Either a \"Not synced\" pill next to status plus cloud-off icon, or a thin left border with \"Pending\" label.

**Tap behavior**
- If status == \"In Transit\" -> `TrackingScreen`.
- Else -> `OrderDetailsScreen`.

**States**
- Loading: skeleton cards or spinner.
- Empty: illustration + \"No orders yet\" + CTA button \"Create Request\".
- Error (remote fetch): inline error; still show local pending list; provide \"Retry\".

### Screen 2: Create Delivery Request (`CreateRequestScreen`)
**Purpose**: Form entry; handles offline save; returns to hub with new pending item visible.

**Layout**
1. Header: Title \"New Delivery\".
2. Offline hint (conditional): banner \"You’re offline. This request will be saved and shown as Pending.\".
3. Form fields (scrollable): Recipient Name, Address (multiline), Contact Info (phone/email), optional Notes/Instructions.
4. Primary action: sticky bottom button \"Save Request\".
5. Secondary action: \"Cancel\" with discard confirm if dirty.

**Validation UX**
- Inline validation on blur and submit.
- Error text under each field.
- Disable Save until required fields present (or validate on submit).

**Submit outcomes**
- Offline: save locally, toast/snackbar \"Saved locally as Pending\", navigate back to Orders.
- Online: save locally then mark as synced or simulate API success.
- Always return to hub with new item visible at top under Pending.

### Screen 3: Order Details (`OrderDetailsScreen`)
**Purpose**: Details for non-in-transit orders and local pending.

**Layout**
1. Header: Title \"Order Details\".
2. Summary card: Order ID + StatusPill (+ \"Not synced\" if local).
3. Parties section: Sender name; Recipient name and contact.
4. Delivery section: Address, Created timestamp, optional ETA/Delivered time.
5. Actions (contextual): optional \"Sync now\" if local and online; optional \"Reorder\" for delivered.

**State**
- If local-only and missing remote fields, show \"—\" placeholders.

### Screen 4: Tracking (`TrackingScreen`)
**Purpose**: Real-time map with moving marker for in-transit orders.

**Layout**
1. Header: Title \"Tracking\".
2. Map full height; centered near route start; route bounds if polyline.
3. Markers: vehicle (animated) and destination (optional).
4. Bottom info sheet (collapsible or fixed): Order ID, Status \"In Transit\", driver location or \"Approaching…\", optional ETA.

**Motion behavior**
- Smooth marker movement every 500–1500ms.
- Map camera follows marker by default; optional \"Follow\" toggle.
- If offline, still simulate movement and show banner \"Offline — tracking is simulated\".

### Data Visualization Rules
- Pending local items are always visible even if remote fetch fails.
- Pull-to-refresh updates remote data only; local pending unchanged.
- Sorting priority:
  1. Pending local (most recent first)
  2. In Transit
  3. Others (recent first)

### Accessibility Checklist
- Touch targets >= 44x44.
- FAB accessibilityLabel: \"Create delivery request\".
- Status pills include text + icon.
- Form fields: proper labels, keyboard types (phone/email), and next/done behavior.

### Suggested Wireframe (Text)
**Orders**
- [Offline banner]
- Pending (Local)
  - [#L-001 | Sender | Recipient | Pending | Not synced]
- All Orders
  - [#102 | Sender | Recipient | In Transit >]
  - [#103 | Sender | Recipient | Delivered >]
- (+) FAB

**New Delivery**
- [Offline banner]
- Recipient Name [_____]
- Address [__________]
- Contact Info [_____]
- [Save Request]

**Order Details**
- #103 [Delivered]
- Sender: …
- Recipient: …
- Address: …
- Created: …

**Tracking**
- [Map with moving marker]
- Bottom sheet: #102 | In Transit | ETA …
