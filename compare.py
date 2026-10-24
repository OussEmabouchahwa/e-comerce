with open(r'c:\Users\ousse\Downloads\index12.html', encoding='utf-8') as f:
    orig = f.read()

with open(r'c:\Users\ousse\OneDrive\Desktop\WebProjects\E-commerce\src\app\page.tsx', encoding='utf-8') as f:
    page = f.read()

with open(r'c:\Users\ousse\OneDrive\Desktop\WebProjects\E-commerce\src\app\globals.css', encoding='utf-8') as f:
    css = f.read()

print("Original length:", len(orig))
print("Page length:", len(page))
print("CSS length:", len(css))

# Check font sizes in CSS
import re
print("text- classes in CSS:")
text_classes = set(re.findall(r'\.text-[a-z0-9\-\[\]\\]+', css))
print(sorted(list(text_classes))[:20])

# Check breakpoints in CSS
bp_classes = set(re.findall(r'\.[a-z0-9\-]+:[a-z0-9\-\[\]\\]+', css))
print("Breakpoints count:", len(bp_classes))
