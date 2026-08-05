import pathlib, re, sys

NL = re.compile(r'\b(de|het|een|niet|dus|zodat|want|geen|maar|deze|die|omdat|wordt|staat|kan|hier|dan|zijn|worden|moet|alleen|altijd|nooit|ook|nog|elke|zoals|waarde|breedte|hoogte|kolom|lijst|toegankelijkheid|selectie|lijsten)\b', re.I)
BRIT = re.compile(r'\b\w*(colour|behaviour|centre|centred|centring|grey|favourite|licence|defence|whilst|catalogue|dialogue|analyse|analysing|initialise|organise|optimise|normalise|serialise|synchronise|recognise|prioritise|customise|visualise|realise|cancelled|cancelling|labelled|labelling|modelled|travelled|signalling|fulfil|enrol)\w*\b', re.I)

def blocks(path):
    """Yield (lineno, text) for comment lines, skipping the leading @element JSDoc."""
    lines = path.read_text().splitlines()
    skip_to = -1
    for i, l in enumerate(lines):
        if l.strip().startswith('/**') and any('@element' in x for x in lines[i:i+60]):
            for j in range(i, len(lines)):
                if '*/' in lines[j]:
                    skip_to = j
                    break
            break
    for i, l in enumerate(lines):
        if i <= skip_to:
            continue
        s = l.strip()
        if s.startswith('//') or s.startswith('/*') or s.startswith('*'):
            yield i + 1, l

roots = [pathlib.Path('src'), pathlib.Path('scripts')]
nl_hits, br_hits = [], []
for root in roots:
    for path in sorted(root.rglob('*')):
        if path.suffix not in ('.ts', '.js', '.mjs') or not path.is_file():
            continue
        if '.stories.' in path.name:
            continue
        for ln, text in blocks(path):
            if NL.search(text):
                nl_hits.append((path, ln, text.strip()))
            if BRIT.search(text):
                br_hits.append((path, ln, text.strip()))

print("### Nederlands in comments:", len(nl_hits))
for p, ln, t in nl_hits:
    print(f"  {p}:{ln}: {t[:100]}")
print("\n### Britse spelling in comments:", len(br_hits))
for p, ln, t in br_hits:
    print(f"  {p}:{ln}: {t[:100]}")
