# Swagger portal appearance and navigation plan

## Catalogue implementation

The user validated the sidebar/header and authorized the catalogue phase, accepting the recommendations except shortening the introduction. The full original introduction and existing configured mailto Contact us action are retained. The production shell remains the reference, while the attached `Homepage api.png` in CMAB-3949 supplies the content layout.

Implemented only in the full application's layout plugin: full-width introduction, navy submitted-search panel, desktop multi-select category filters, responsive modal filter drawer, result count, authorization action, tag cards and sand-colored endpoint summaries. Existing operation bodies, schemas, webhooks, bookmarks and request execution remain Swagger components. Scoped catalogue styles are imported only by the full app; Dataviz's standalone layout and styles are unchanged.

Search applies on Enter/Search, retains the existing three-character minimum and text matching, and has an independent clear action. Search URLs now encode query text and preserve other parameters and fragments. All categories is explicit; saved selections are reconciled against available tags. Reset criteria clears category/admin/deprecated restrictions without clearing search. Admin remains available with category restrictions. Result counts deduplicate method/path pairs across groups.

Validation: full and standalone production builds pass; eight navigation/filter tests pass; scoped lint and diff whitespace checks pass. Browser checks cover multi-selection, submit-only search, reset retaining search, empty results, inline request/response expansion, authorization modal, mobile drawer focus isolation/Escape/focus return and no horizontal overflow with the desktop sidebar expanded. Build warnings about existing source maps/module format remain. No API requests were executed by Try it out during validation.

The following proposal records the agreed design and implementation sequence; its original recommendation to shorten the introduction was explicitly superseded.

### Proposed structure

1. **Compact introduction.** Keep the mockup's heading, short explanation and yellow Contact us action, but reduce its vertical footprint. Suggested heading: “API catalogue”; suggested description: “Find Club Med API endpoints, explore their documentation and try requests.” Final copy and contact destination need confirmation.
2. **Always-visible search.** Retain the navy search panel, white input and yellow Search button. Enter and the button submit the same query. Add a clear action and preserve shareable search URLs. Use an honest plain-text placeholder such as “Search by endpoint path, method or description”. This replaces the floating search field rather than adding another search control.
3. **Filters and results.** Below search, use a roughly 260–280px filter column beside flexible results. Categories are generated from OpenAPI tags, alphabetized using their existing labels. Selected pills use the mockup's yellow treatment and check mark. Keep admin/deprecated switches, which the mockup omits. Place a result count and labelled API authorization action above the results.
4. **Grouped endpoint cards.** Use a bordered container per tag, heading above sand-colored endpoint rows. Each row shows an HTTP method badge, path, summary, existing authorization/bookmark controls and expansion chevron. Long paths wrap without covering controls. Method labels remain readable independently of color. Preserve existing deep links and copy-link actions.
5. **Inline operation details.** Expanding a row reveals the existing Swagger parameters, request body, responses, snippets and Try it out beneath that row. Multiple operations can remain open. Keep schemas and OpenAPI 3.1 webhooks accessible after the results. This phase changes presentation, not request execution.
6. **Narrow screens.** Stack the introduction and search; move filters into an accessible drawer opened by a labelled Filters button showing the active filter count. Determine the switch from two columns using the available content width, including when the portal sidebar is expanded. Keep one main page scroll region; avoid a second permanently scrolling category sidebar.

### Recommended interaction contract

- Categories are multi-select; selected categories combine with OR, then intersect with the search query and admin/deprecated settings.
- No category restriction means all categories. Represent this explicitly with “All categories”; do not imply that every unselected pill is excluded when no restriction is active.
- Reset criteria restores all categories and hides admin/deprecated operations; it preserves the search query. Clear search is a separate action. Retain existing local persistence for category/admin/deprecated settings.
- Preserve the current text search engine for this phase. It searches paths, methods, summaries, descriptions and certain Swagger 2 body model names; it does not parse `path:… AND method:…`. It currently ignores queries shorter than three characters, which must either be explained in the UI or deliberately changed with tests.
- Empty results show the query/filter context and a way to clear restrictions. Loading, failed definition, invalid specification and configuration failures remain distinct states.
- Category counts, if added, should count operations rather than rendered tag appearances; multi-tag operations can appear in multiple groups. Omit per-category counts initially to keep scope focused.

### Decisions needed before implementation

Standalone usage verified on 14 October 2026: GitHub organization code search found an external consumer in `ClubMediterranee/digital-dataviz`. Its `packages/backend/server/views/swagger.ejs` imports the standalone JavaScript and CSS from the published `/swagger/latest/swagger-ui-standalone-v3/assets/` directory, configures the app as Dataviz and loads `/doc/swagger.json`. Its server configuration maps that template to `/doc`. The published standalone JavaScript returns HTTP 200. Separately, the live `https://api.clubmed.com/doc` HTML imports the full `swagger-ui-v3` assets. Thus standalone has a confirmed source-level consumer and must not be treated as unused. Dataviz's deployed runtime was not checked; organization search only covers accessible indexed repositories. Preserve its presentation when implementing this catalogue redesign.

Sources: [Dataviz template](https://github.com/ClubMediterranee/digital-dataviz/blob/8b29e080e6156f1aa3db51a81684e0336b13d010/packages/backend/server/views/swagger.ejs), [Dataviz route configuration](https://github.com/ClubMediterranee/digital-dataviz/blob/8b29e080e6156f1aa3db51a81684e0336b13d010/packages/backend/server/src/config/index.ts).

| Decision | Recommendation | Reason |
| --- | --- | --- |
| Intro and contact | Compact “API catalogue” copy; use an approved contact destination | The mockup does not specify the button URL or a content source |
| Search | Existing plain-text matching, submitted by Enter/Search; no query language in this phase | The displayed structured example is not implemented |
| Categories/reset | Multi-select, explicit All categories, reset filters only | The image shows one selected category but defines no interaction rules |
| Build scope | Apply the new catalogue to the full app first; retain standalone presentation through an explicit layout boundary | Shared plugins are used by both builds |

The first three decisions affect visible behavior or content. Build scope also needs confirmation before changing shared components. Existing authorization, bookmarks, schemas, deep links and request execution are retained by default rather than requiring individual product decisions.

### Implementation sequence after review

1. Extract reusable filter state/actions from the existing modal for desktop and mobile presentations; preserve storage and selector behavior.
2. Compose the intro, submitted search and two-column results layout using Trident components/tokens. Remove duplicate toolbar controls as their replacements become available.
3. Restyle tag containers and operation summaries while retaining Swagger's expanded operation components.
4. Add responsive and loading/error/empty states; verify keyboard focus and accessible labels.
5. Test search submission/clearing, category combinations/reset/persistence, deep links, expansion, bookmarks and authorization. Compare desktop, expanded sidebar and mobile widths; build both consumers and check standalone regressions.

Source review confirms the current filter panel already supports multi-select tags and local persistence, with admin handled separately. Its reset currently restores tag defaults and hides admin/deprecated operations. The current base layout renders operations, webhooks and models sequentially, so these can be retained without rebuilding the Swagger engine.

Swagger and the API portal remain separate applications connected by ordinary links. Swagger should feel like another section of the portal, with the same sidebar, branding, typography, and navigation behavior. This iteration covers appearance and navigation; shared login and language continuity are outside its scope.

The production [API portal](https://portal.api.clubmed/) is authoritative for the outer shell. The [CMAB-3949 mockup](https://clubmed.atlassian.net/browse/CMAB-3949) guides the catalogue content and can be rearranged for usability.

## Sidebar and header review

The first phase is implemented in the full Swagger app. It reuses Trident SidebarLayout and the portal's SVG logo and dropdown presentation. The nine production menu items and six submenu links are included, with OpenAPI active and linked to the current Swagger deployment. The standalone app retains its existing shell.

The menu is a production snapshot, with a typed `SwaggerUIConfiguration.portalNavigation` override for a later shared CMS feed. Language choices link to the localized portal; they do not translate Swagger. Portal login integration remains outside this phase.

Desktop comparisons verified matching header/logo geometry, sidebar item positions, row sizes, font sizes, and icons. Collapsed and expanded navigation, mobile opening/closing, the language dropdown, search, filters, and authorization dialogs were checked locally. Small scoped adaptations keep the collapse button visible when OpenAPI is below the fold, keep content inside the expanded layout, hide collapsed submenu links from keyboard navigation under React 18, and put existing dialogs above the sidebar. Search now scrolls the shell's main region; its Tailwind opacity class was corrected so the field remains visible.

Validation: full and standalone production builds passed; three navigation tests and three existing Popin tests passed; scoped lint reported no errors and four existing hook-dependency warnings. Builds also report module-format and sourcemap warnings. Trident emits a React 18 boolean-inert development warning; scoped visibility styles prevent collapsed links remaining focusable. The catalogue redesign remains pending review of this phase.

## Findings

The ticket contains a short user story and one image, with no comments or acceptance criteria. Its layout comprises a navy shell, collapsible icon sidebar, welcome text and contact button, prominent search, category filters, and grouped endpoint cards.

The production portal was inspected in collapsed and expanded desktop states on 14 October 2026. Its sidebar contains Home, Discover, Scenarios, Payment SDK, Release notes, Migration notes, Status page, OpenAPI, and Digital Accessibility. Discover and Payment SDK also expose submenus. The four icons in the mockup are therefore insufficient. Production uses a language dropdown rather than the mockup's inline language links. OpenAPI currently links to `https://api.clubmed.com/doc` in a new tab; Status page also opens a new tab.

The portal already uses `SidebarLayout` from Trident UI, with logo and header-action slots. Swagger's installed Trident v2 includes the same component. Reuse it with the same tokens, fonts, icons, item ordering, and responsive behavior. Recreating its appearance with separate CSS would make long-term parity harder.

Local portal dependencies resolve to Trident `2.0.0-beta.28`; Swagger resolves to `2.0.0`. Their SidebarLayout sources differ in keyboard focus styling and desktop sidebar scrolling. Local portal sources are useful references, but their version must not be assumed to be the deployed production version. Verify the production component baseline before choosing exact parity changes; do not downgrade Swagger automatically.

Portal navigation is CMS-driven: `loadSharedPageContext` loads it server-side and `mapNavigation` maps localized labels, icons, ordering, links, and children. Swagger currently has a simpler static navigation configuration. Sharing the visual component alone will not keep menu contents synchronized.

Swagger already has category selection, admin/deprecated switches, local filter persistence, endpoint bookmarks, operation authorization, expandable operations, copied search links, request snippets, and Try it out. Preserve these capabilities. The mockup's structured search example is already present in the existing input placeholder, but `ops-filter.ts` only implements text matching and exact method/path matching; it does not parse `path:... AND method:...`.

## Proposed implementation sequence

1. **Define the shell contract and reference states.** Record production collapsed/expanded/mobile layouts, active states, focus behavior, typography, assets, and header geometry. Set OpenAPI active inside Swagger using its stable menu identity, rather than defaulting to Home or matching unrelated cross-origin paths. Confirm scope of the full and standalone Swagger builds.

2. **Reuse the portal shell.** Replace the full Swagger app's existing header/layout with Trident SidebarLayout. Adapt the portal logo and icon providers; align typography, navy background, rounded white content surface, and header slots. Keep API authorization accessible in the catalogue toolbar, separate from portal account login. Make portal destinations absolute URLs so React Router does not treat them as Swagger routes. Keep ordinary anchors for cross-app navigation.

3. **Supply a shared navigation model.** Prefer a small public presentation-data contract produced from the portal's existing CMS mapping, containing stable IDs, labels, icons, URLs, children, and link targets. Swagger can receive this via its existing runtime configuration or a public JSON resource. Select delivery after checking the API host's bootstrap configuration and CORS needs. Do not expose CMS credentials to Swagger. If a coordinated portal change is unavailable, use an explicitly versioned navigation snapshot as a temporary option, with an owner and update process; this trades delivery simplicity for drift risk.

4. **Reshape the catalogue page.** Use a compact welcome/contact area, visible search bar, desktop category column, and grouped endpoint cards. Keep global portal navigation distinct from API category filters. Move filters into a drawer or stacked region on narrow screens. Allow less vertical space for the introduction than the mockup so developers reach endpoints sooner. Derive categories from OpenAPI tags rather than hardcoding the example list.

5. **Adapt existing Swagger components.** Change the plugin layout, tag groups, and operation summaries while retaining Swagger's operation body, schemas, parameters, responses, auth, and request execution. Preserve bookmark, copy-link, and authorization actions even where the mockup omits them. Scope catalogue CSS to avoid affecting the shared sidebar, dialogs, or the standalone consumer unexpectedly.

6. **Resolve search and filter semantics.** For the appearance-first release, keep current text search and give it an honest placeholder. Treat structured query parsing as an explicit additional feature if desired. Keep multi-select categories, admin/deprecated controls, and existing saved filters; specify reset behavior and empty-selection semantics before implementation. Today an empty tag array behaves like no tag restriction. Add loading, invalid-spec, failure, and no-results states consistent with the new layout.

7. **Verify parity and regressions.** Compare production portal and Swagger at identical viewport sizes, including collapsed/expanded sidebar, mobile navigation, long menus, hover/focus, and active OpenAPI state. Check all destinations and browser Back behavior. Exercise search links, filter reset/persistence, bookmarks, authorization, expanded requests/responses, schema views, snippets, and representative read-only Try it out calls. Run affected tests, TypeScript/build checks, and both Swagger builds where shared plugins change.

## Likely code boundaries

| Area | Existing source | Planned role |
| --- | --- | --- |
| Portal shell reference | [BaseLayout.tsx](/Volumes/clubmed/digital-portal-api/layouts/BaseLayout.tsx) | SidebarLayout, providers, logo and header slots |
| Portal navigation | [loadSharedPageContext.ts](/Volumes/clubmed/digital-portal-api/pages/loadSharedPageContext.ts), [mapNavigation.ts](/Volumes/clubmed/digital-portal-api/ui/helpers/mappers/mapNavigation.ts) | Source of the shared menu contract |
| Swagger shell | [layout.tsx](/Volumes/clubmed/swagger/packages/swagger-ui-v3/src/layout/layout.tsx), [App.tsx](/Volumes/clubmed/swagger/packages/swagger-ui-v3/src/App.tsx) | Replace header composition, configure shell/providers |
| Runtime options | [use-swagger-ui.hook.ts](/Volumes/clubmed/swagger/packages/swagger-ui-plugins/hooks/use-swagger-ui.hook.ts) | Add typed portal navigation/configuration inputs |
| Catalogue layout | [base-layout.component.tsx](/Volumes/clubmed/swagger/packages/swagger-ui-plugins/plugins/layout/base-layout.component.tsx) | Search/filter/results arrangement and states |
| Filters | [advanced-filter-panel.component.tsx](/Volumes/clubmed/swagger/packages/swagger-ui-plugins/plugins/filter/advanced-filter-panel.component.tsx), [ops-filter.ts](/Volumes/clubmed/swagger/packages/swagger-ui-plugins/plugins/filter/ops-filter.ts) | Reuse filter state; separate any search semantics change |
| Endpoint cards | [operation-summary.component.tsx](/Volumes/clubmed/swagger/packages/swagger-ui-plugins/plugins/operations/operation-summary.component.tsx), [operation-tag.component.tsx](/Volumes/clubmed/swagger/packages/swagger-ui-plugins/plugins/operations/operation-tag.component.tsx) | Restyle summaries and groups without replacing operation logic |

## Decisions remaining

- **Navigation delivery:** can this work include a small portal-side public menu contract, or should the initial release use a maintained snapshot? The former best supports an identical sidebar over time.
- **Tab behavior:** preserve production's current new-tab OpenAPI link, or switch portal-to-Swagger and return links to the same tab? Same-tab navigation is recommended for continuity; changing the portal link is a separate, small configuration change.
- **Search scope:** retain text search with corrected guidance for this release, or explicitly include the structured syntax shown in the mockup? Retaining current semantics keeps the work focused on appearance/navigation.
- **Language control:** appearance-first does not establish translated Swagger content. Decide whether the portal language dropdown should be omitted from Swagger initially or backed by actual translated UI; avoid a decorative control that suggests unavailable behavior.
- **Build coverage:** confirm whether the standalone Swagger build also receives the portal shell. Shared plugin styling needs regression checks regardless.

The first implementation milestone should be the portal shell with correct live-menu destinations and active OpenAPI state. Review that against production before building the catalogue layout. The core approach is feasible with the existing components; ongoing sidebar identity depends on both a matching component baseline and a shared navigation source.
