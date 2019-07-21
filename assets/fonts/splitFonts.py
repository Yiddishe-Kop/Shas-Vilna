import sys
import os
import re
from fontTools.subset import main as ss


files = [f for f in os.listdir('.') if os.path.isfile(f)]
os.mkdir('webfonts')

for f in files:
    # do something
    fontExtension = "\.(ttf|otf|woff2?)$"
    x = re.search(fontExtension, f) # a font file
    if x:
#        # STAGE 1:
#        outputFilename = re.sub(fontExtension, 'Hebrew.woff2', f)
#        sys.argv = [None, f, '--output-file=webfonts/'+ outputFilename, '--no-hinting', '--desubroutinize', '--flavor=woff2', '--layout-features=ccmp,locl,mark,mkmk,kern,rlig,liga,dlig,salt', '--unicodes=U+05B0-05F5,U+E811,U+E802,U+0021,U+0030-0039']
#        ss()
        # STAGE 2:
        outputFilename = re.sub(fontExtension, 'Hebrew.woff2', f)
        sys.argv = [None, f, '--output-file=webfonts/'+ outputFilename, '--no-hinting', '--desubroutinize','--flavor=woff2', '--layout-features=ccmp,locl,mark,mkmk,kern,rlig,liga,dlig,salt', '--unicodes=U+05B0-05F5,U+E811,U+E802,U+0021,U+0030-0039']
        ss()
