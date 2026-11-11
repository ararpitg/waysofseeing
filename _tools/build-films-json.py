#!/usr/bin/env python3
"""Build assets/data/akhra-films.json from the Akhra film dataset workbook.

Usage: python3 _tools/build-films-json.py <dataset.xlsx>

Public metadata only. Permission status, sound candidates, and working notes stay in the
workbook. A film or region whose district cell carries CONFIRM is marked provisional and
drawn dashed on the map until it is verified against the film. District level is the floor:
nothing finer than a district name leaves the workbook.
"""
import json, re, sys, datetime, pathlib
from openpyxl import load_workbook

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = pathlib.Path(sys.argv[1])
OUT = ROOT / "assets" / "data" / "akhra-films.json"
GEO = ROOT / "assets" / "data" / "jharkhand-districts.geojson"

names = [f["properties"]["name"] for f in json.load(open(GEO))["features"]]
# "Pashchimi Singhbhum (West Singhbhum)" matches on either spelling
aliases = {}
for n in names:
    aliases[n.lower()] = n
    m = re.match(r"(.+?)\s*\((.+)\)", n)
    if m:
        aliases[m.group(1).strip().lower()] = n
        aliases[m.group(2).strip().lower()] = n

def districts_in(text):
    """District names that appear in a free-text cell, in GeoJSON spelling; order kept."""
    found = []
    low = (text or "").lower()
    for key, name in aliases.items():
        if re.search(r"\b" + re.escape(key) + r"\b", low) and name not in found:
            found.append(name)
    return found

# site record ids -> catalog links
site = {}
js = (ROOT / "assets" / "js" / "wos-data.js").read_text()
for m in re.finditer(r'id:\s*"(WOS-\d+)"', js):
    site[m.group(1)] = "catalog.html#" + m.group(1)

wb = load_workbook(SRC, data_only=True)
films = []
for r in wb["Films"].iter_rows(min_row=2, values_only=True):
    if not r[1]:
        continue
    sid, title, english, year, directors, funder, region, dist, phase, right, section, access, perm, sound, notes = r[:15]
    region_code = (region or "").split(" ")[0] if region and region.startswith("R") else None
    films.append({
        "id": sid or None,
        "title": title,
        "english": english or None,
        "year": str(year) if year else None,
        "directors": directors,
        "funder": funder,
        "region": region_code,
        "districts": districts_in(dist),
        "provisional": bool(("CONFIRM" in str(dist)) or ("CONFIRM" in str(region))),
        "phase": (phase or "").split(" ")[0] or None,
        "right": right,
        "section": section,
        "access": (access or "").split(" ")[0] or None,
        "url": site.get(sid) if sid else None,
    })

regions = []
for r in wb["Regions"].iter_rows(min_row=2, values_only=True):
    code, name, maps, dist, status = r[:5]
    if not code:
        continue
    regions.append({
        "code": code, "name": name, "maps": maps,
        "districts": districts_in(dist),
        "districts_note": dist,
        "provisional": "CONFIRM" in str(dist),
        "status": status,
        "films": [f["title"] for f in films if f["region"] == code],
    })

out = {
    "generated": datetime.date.today().isoformat(),
    "source": SRC.name,
    "scale": "district",
    "note": "Film, not village, is the unit. A film resolves to the district only where the film itself names the place. Provisional entries are drawn dashed until confirmed.",
    "regions": regions,
    "films": films,
}
OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n")
print("wrote", OUT.relative_to(ROOT), len(films), "films,", len(regions), "regions")
for g in regions:
    print(" ", g["code"], g["name"], "->", g["districts"] or "no geometry", "(provisional)" if g["provisional"] else "")
