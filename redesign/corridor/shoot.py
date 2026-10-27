import sys, pathlib, os
from playwright.sync_api import sync_playwright
page = os.environ.get("PAGE", "index.html"); stem = pathlib.Path(page).stem
pins = [float(x) for x in sys.argv[1:]] or [0, .04, .17, .21, .3, .36, .45, .5, .55, .62, .66, .7, .77, .88, .96, 1]
mobile = os.environ.get("MOBILE", "1") == "1"
with sync_playwright() as p:
    b = p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
    for w, dpr, tag in [(1440, 1.5, 'd')] + ([(390, 2, 'm')] if mobile else []):
        pg = b.new_page(viewport={'width': w, 'height': 900 if tag=='d' else 844}, device_scale_factor=dpr)
        logs=[]; pg.on('console', lambda m: logs.append(m.type+': '+m.text)); pg.on('pageerror', lambda e: logs.append('ERR '+str(e)))
        for pin in pins:
            pg.goto(pathlib.Path(page).resolve().as_uri()+f'?p={pin}'); pg.wait_for_timeout(2200 if pin==0 else 1100)
            pg.screenshot(path=f'shots/{stem}-{tag}-{pin:.2f}.png')
        print(stem, tag, 'done'); print('\n'.join(l for l in logs if 'deprecated' not in l and 'GL Driver' not in l)[:2000])
        pg.close()
    b.close()
