#!/usr/bin/env python3
"""
build.py — generates the English page (en/index.html) from the Greek index.html.

Also refreshes the static Greek text inside index.html from js/language-switcher.js.

Run from the repo root after editing index.html or js/language-switcher.js:
    python3 tools/build.py

Needs: python3 + node (to read the translations from js/language-switcher.js).
Never edit en/index.html by hand — it is overwritten.
"""
import html, json, re, subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = 'https://tsiardaka-apartment.gr'

NODE = """
global.document={addEventListener(){}};global.window={};
const s=require('fs').readFileSync('js/language-switcher.js','utf8');
console.log(JSON.stringify(new Function(s+';return translations')()));
"""
tr = json.loads(subprocess.check_output(['node', '-e', NODE], cwd=ROOT))


el_html = (ROOT / 'index.html').read_text(encoding='utf-8')

# 0. Keep the Greek page's own static text in sync with the Greek translations, so that
#    editing js/language-switcher.js is enough (search engines read the static HTML).
def sync_el(m):
    key = m.group(3)
    el = tr['el']
    if key not in el:
        return m.group(0)
    return m.group(1) + html.escape(el[key], quote=False) + m.group(5)
el_html = re.sub(r'(<(\w+)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)(.*?)(</\2>)', sync_el, el_html, flags=re.S)
(ROOT / 'index.html').write_text(el_html, encoding='utf-8')

s = el_html
en = tr['en']

# 1. translate every data-i18n element
missing = set()
def translate(m):
    open_tag, tag, key, _, close = m.group(1), m.group(2), m.group(3), m.group(4), m.group(5)
    if key not in en:
        missing.add(key)
        return m.group(0)
    return open_tag + html.escape(en[key], quote=False) + close
s = re.sub(r'(<(\w+)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)(.*?)(</\2>)', translate, s, flags=re.S)

# 2. <head> metadata
HEAD = [
    ('<html lang="el">', '<html lang="en">'),
    ('<title>800 steps from MAGIC - ΤΟ ΚΕΝΤΡΟ ΣΤΑ ΠΟΔΙΑ ΣΟΥ | Tsiardaka Apartment Τρίκαλα</title>',
     '<title>800 steps from MAGIC - ΤΟ ΚΕΝΤΡΟ ΣΤΑ ΠΟΔΙΑ ΣΟΥ | Tsiardaka Apartment Trikala</title>'),
    ('content="Άνετο διαμέρισμα στο κέντρο των Τρικάλων, 800 βήματα από τον Μύλο των Ξωτικών. Ιδανικό για οικογένειες και ζευγάρια. Κράτηση απευθείας για καλύτερες τιμές!"',
     'content="Comfortable apartment in the centre of Trikala, 800 steps from the Elf Mill. Ideal for families and couples. Book direct for better prices!"'),
    ('<link rel="canonical" href="https://tsiardaka-apartment.gr/">', '<link rel="canonical" href="%s/en/">' % SITE),
    ('<meta property="og:title" content="800 steps from MAGIC - ΤΟ ΚΕΝΤΡΟ ΣΤΑ ΠΟΔΙΑ ΣΟΥ | Tsiardaka Apartment Τρίκαλα">', '<meta property="og:title" content="800 steps from MAGIC - ΤΟ ΚΕΝΤΡΟ ΣΤΑ ΠΟΔΙΑ ΣΟΥ | Tsiardaka Apartment Trikala">'),
    ('<meta property="og:description" content="800 βήματα από τον Μύλο των Ξωτικών. Άνετο διαμέρισμα στο κέντρο των Τρικάλων.">',
     '<meta property="og:description" content="800 steps from the Elf Mill. Comfortable apartment in the centre of Trikala.">'),
    ('<meta property="og:url" content="https://tsiardaka-apartment.gr/">', '<meta property="og:url" content="%s/en/">' % SITE),
    ('<meta property="og:locale" content="el_GR">', '<meta property="og:locale" content="en_US">'),
    ('<meta property="og:locale:alternate" content="en_US">', '<meta property="og:locale:alternate" content="el_GR">'),
    ('<meta name="twitter:title" content="800 steps from MAGIC - ΤΟ ΚΕΝΤΡΟ ΣΤΑ ΠΟΔΙΑ ΣΟΥ | Tsiardaka Apartment Τρίκαλα">', '<meta name="twitter:title" content="800 steps from MAGIC - ΤΟ ΚΕΝΤΡΟ ΣΤΑ ΠΟΔΙΑ ΣΟΥ | Tsiardaka Apartment Trikala">'),
    ('<meta name="twitter:description" content="800 βήματα από τον Μύλο των Ξωτικών.">', '<meta name="twitter:description" content="800 steps from the Elf Mill.">'),
    ('"description": "Άνετο διαμέρισμα στο κέντρο των Τρικάλων, 800 βήματα από τον Μύλο των Ξωτικών.",',
     '"description": "Comfortable apartment in the centre of Trikala, 800 steps from the Elf Mill.",\n        "inLanguage": "en",'),
    ('"url": "https://tsiardaka-apartment.gr/",', '"url": "%s/en/",' % SITE),
    ('"streetAddress": "Αθηνάς Εργάνης 8"', '"streetAddress": "Athinas Erganis 8"'),
    ('"addressLocality": "Τρίκαλα"', '"addressLocality": "Trikala"'),
    ('class="lang-btn active" data-lang="el"', 'class="lang-btn" data-lang="el"'),
    ('class="lang-btn" data-lang="en"', 'class="lang-btn active" data-lang="en"'),
    ('href="privacy.html"', 'href="../privacy.html#en"'),
]
for a, b in HEAD:
    if a not in s:
        raise SystemExit('build.py: head string not found: ' + a[:60])
    s = s.replace(a, b)

# 3. relative asset paths → one level up
s = re.sub(r'\b(href|src|data-image|data-full|data-src)="(?!https?:|//|#|/|\.\./|mailto:|tel:|viber:|data:)([^"]+)"', r'\1="../\2"', s)
def prefix_srcset(m):
    items = [i.strip() for i in m.group(2).split(',')]
    return '%s="%s"' % (m.group(1), ', '.join(('../' + i) if i.startswith('images/') else i for i in items))
s = re.sub(r'\b(srcset|imagesrcset|data-srcset)="([^"]+)"', prefix_srcset, s)
s = re.sub(r"url\((['\"]?)(images/)", r"url(\1../\2", s)

# 4. Cache-busting: ?v=<hash of all css/js files> on the main CSS/JS links, so a changed site is never
#    shown with stale files by browsers, hosts or the old service worker.
import hashlib
_h = hashlib.sha1()
for _f in sorted(list((ROOT / 'css').glob('*.css')) + list((ROOT / 'js').rglob('*.js'))):
    if _f.name != 'script.js':
        _h.update(_f.read_bytes())
VERSION = _h.hexdigest()[:8]
def bust(text):
    return re.sub(r'((?:\.\./)?(?:css/style\.css|js/main\.js|js/language-switcher\.js))(\?v=\w+)?"', r'\1?v=%s"' % VERSION, text)
s = bust(s)
(ROOT / 'index.html').write_text(bust((ROOT / 'index.html').read_text(encoding='utf-8')), encoding='utf-8')

out = ROOT / 'en'
out.mkdir(exist_ok=True)
(out / 'index.html').write_text(
    s.replace('<!DOCTYPE html>', '<!DOCTYPE html>\n<!-- GENERATED by tools/build.py from index.html — do not edit by hand -->', 1), encoding='utf-8')
print('en/index.html written; untranslated keys:', sorted(missing) or 'none')
