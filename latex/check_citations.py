import re
import sys

with open('D:/Kaiyo/Project/Aivora-studio/aivora-lab/latex/main.tex', 'r', encoding='utf-8') as f:
    tex = f.read()
with open('D:/Kaiyo/Project/Aivora-studio/aivora-lab/latex/references.bib', 'r', encoding='utf-8') as f:
    bib = f.read()

# Extract citation keys from main.tex
cites_pattern = r'\\cite[pey]*\{([^}]+)\}'
cites = re.findall(cites_pattern, tex)
all_keys = []
for c in cites:
    for k in c.split(','):
        all_keys.append(k.strip())
unique_cites = set(all_keys)

# Extract bib entry keys
bib_pattern = r'^@(?:article|inproceedings|book|misc|phdthesis|mastersthesis)\s*\{([^,]+),'
bib_keys = re.findall(bib_pattern, bib, re.MULTILINE)
unique_bib = set(bib_keys)

missing = unique_cites - unique_bib
extra = unique_bib - unique_cites

print(f'Citations in tex: {len(unique_cites)}')
print(f'Keys in bib: {len(unique_bib)}')
print(f'Missing from bib: {sorted(missing) if missing else "NONE"}')
print(f'Extra in bib: {sorted(extra) if extra else "NONE"}')

if missing:
    print("\nCITATION ERRORS - These keys are cited but not in bib:")
    for k in sorted(missing):
        print(f"  ! {k}")
sys.exit(1 if missing else 0)
