with open(r'c:\Users\ousse\OneDrive\Desktop\WebProjects\E-commerce\src\app\globals.css', encoding='utf-8') as f:
    css = f.read()

import re
media_queries = re.findall(r'@media[^{]+\{', css)
print("Media queries in globals.css:")
for m in media_queries:
    print(" ", m.strip())

# Check if lg:col-span-6 exists
for cls in ['lg\\:col-span-6', 'sm\\:text-6xl', 'xl\\:text-7xl', 'lg\\:grid-cols-12', 'hidden', 'md\\:hidden', 'lg\\:hidden']:
    print(cls, cls in css)
