#!/usr/bin/env python3
"""Build assets/data/films-map.json for the Counter-Mapping page.

Merges the catalog (assets/js/wos-data.js: titles, makers, blurbs, thumbnails, access links)
with assets/data/film-places.json (district-level placement, provisional flags, movements).
Public metadata only. Run after editing either source:  python3 _tools/build-films-map.py
"""
import json, re, pathlib, datetime
ROOT = pathlib.Path(__file__).resolve().parent.parent
js = (ROOT / "assets/js/wos-data.js").read_text()
# pull the WOS_RECORDS array as JSON-ish: evaluate with node for safety
import subprocess
recs = json.loads(subprocess.check_output(["node", "-e", """
const fs=require('fs'); const window={}; eval(fs.readFileSync(process.argv[1],'utf8').replace(/^export\\s+/mg,''));
process.stdout.write(JSON.stringify(window.WOS_RECORDS.filter(r=>r.type==='film')));
""", str(ROOT / "assets/js/wos-data.js")]))
places = json.load(open(ROOT / "assets/data/film-places.json"))
names = [f["properties"]["name"] for f in json.load(open(ROOT / "assets/data/jharkhand-districts.geojson"))["features"]]
films = []
for r in recs:
    p = places["films"].get(r["id"])
    if not p:
        continue
    for d in p.get("districts", []):
        assert d in names, (r["id"], d)
    films.append({
        "id": r["id"], "title": r["title"], "year": r.get("year") or None, "creator": r.get("creator"),
        "description": r.get("description"), "thumb": r.get("thumb") or None,
        "access": r.get("access"), "url": r.get("url"), "urlLabel": r.get("urlLabel"),
        "catalog": "catalog.html#" + r["id"],
        "group": p["group"], "districts": p.get("districts", []), "provisional": bool(p.get("provisional")),
        "movement": p.get("movement"), "beyond": p.get("beyond"),
        "theme": p["theme"], "funder": p["funder"], "institution": p.get("institution"), "points": [dict(places["places"][k], key=k) for k in p.get("points", [])],
    })
for x in places.get("extras", []):
    for d in x.get("districts", []):
        assert d in names, (x["id"], d)
    films.append({"id": x["id"], "title": x["title"], "year": x.get("year"), "creator": x.get("creator"),
                  "description": x.get("description"), "thumb": None, "access": x.get("access"), "url": x.get("url"),
                  "urlLabel": x.get("urlLabel"), "catalog": None, "group": x["group"], "districts": x.get("districts", []),
                  "provisional": bool(x.get("provisional")), "movement": x.get("movement"), "beyond": x.get("beyond"),
                  "theme": x["theme"], "funder": x["funder"], "institution": x.get("institution"), "points": [dict(places["places"][k], key=k) for k in x.get("points", [])]})
for m in places["movements"]:
    for d in m["districts"]:
        assert d in names, (m["key"], d)
out = {"generated": datetime.date.today().isoformat(), "note": places["note"], "groups": places["groups"], "themes": places["themes"], "funders": places["funders"], "institutions": places["institutions"], "offmap_institutions": places["offmap_institutions"],
       "films": films, "movements": places["movements"]}
(ROOT / "assets/data/films-map.json").write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n")
placed = [f for f in films if f["districts"]]
print("films", len(films), "placed", len(placed), "provisional", sum(f["provisional"] for f in placed), "beyond", sum(1 for f in films if f.get("beyond") and not f["districts"]), "movements", len(places["movements"]))
