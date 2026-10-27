import sys, glob
from PIL import Image
stem, tag = sys.argv[1], sys.argv[2]; cols = int(sys.argv[3]) if len(sys.argv) > 3 else 3
fs = sorted(glob.glob(f'shots/{stem}-{tag}-*.png')); ims = [Image.open(f) for f in fs]
w, h = ims[0].size; sc = 1000 / w if tag == 'd' else 300 / w; tw, th = int(w*sc), int(h*sc); rows = (len(ims)+cols-1)//cols
sh = Image.new('RGB', (tw*cols, th*rows), 'black')
for i, im in enumerate(ims): sh.paste(im.resize((tw, th)), ((i%cols)*tw, (i//cols)*th))
sh.save(f'shots/sheet-{stem}-{tag}.jpg', quality=80); print(sh.size, len(ims))
