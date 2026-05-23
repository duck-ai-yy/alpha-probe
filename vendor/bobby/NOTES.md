# Bobby — upstream snapshot

Frozen copy of [BillionsBobby/Major-Partnership-Insider-Skill](https://github.com/BillionsBobby/Major-Partnership-Insider-Skill)
captured for reference. The alpha-probe integration in
`.dexter/skills/major-partnership-insider/` is derived from these files.

## Provenance

- Upstream: `https://github.com/BillionsBobby/Major-Partnership-Insider-Skill.git`
- Pinned commit: `6345965b9065e4e28c9755cab8bdfb859461f565`
- Commit date: 2026-05-10
- Commit message: "Add Major Partnership Insider skill"
- Snapshot taken: 2026-05-23

## What's here

| File | Status |
|---|---|
| `SKILL.md` | byte-identical copy of upstream |
| `README.md` | byte-identical copy of upstream |

No transformations applied. Use these as the canonical source of Bobby's
methodology. Our adaptation diverges in three deliberate ways (and only those):

1. **Frontmatter rewritten as folded YAML scalar** to fit Dexter's gray-matter
   loader — see `.dexter/skills/major-partnership-insider/SKILL.md` line 3.
2. **Each step rewritten to name exact Dexter tool calls** with concrete
   query strings (Bobby's original is tool-agnostic).
3. **Step 2/3 redesigned as user-paste mode** because Dexter has no options
   data API; original assumes the analyst already has options flow in hand.

Bobby's 4-layer Purpose section and Step 8 scoring rubric are preserved
byte-identical in our adaptation (verified in the integration validation
report).

## License

Upstream has no LICENSE file as of the pinned commit. Treat as
"publicly published methodology" rather than redistributable code. Our use
here is reference + adaptation under fair-use reasoning; we do not
re-publish Bobby's SKILL.md as our own work.

If the upstream repo is ever taken down or relicensed restrictively, this
snapshot remains the authoritative record of the methodology we built on.

## How to refresh

```
git clone https://github.com/BillionsBobby/Major-Partnership-Insider-Skill.git /tmp/bobby
cp /tmp/bobby/SKILL.md /tmp/bobby/README.md vendor/bobby/
# update the "Pinned commit" line above with new SHA
```

Only refresh deliberately. Casual `git pull` upstream can shift the
methodology under our adaptation without notice.
