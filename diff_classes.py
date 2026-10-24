with open(r'c:\Users\ousse\Downloads\index12.html', encoding='utf-8') as f:
    orig = f.read()

with open(r'c:\Users\ousse\OneDrive\Desktop\WebProjects\E-commerce\src\app\page.tsx', encoding='utf-8') as f:
    page = f.read()

# Let's extract all class names used in index12.html
import re
classes_orig = set(re.findall(r'class="([^"]+)"', orig))
all_orig_classes = set()
for c in classes_orig:
    all_orig_classes.update(c.split())

classes_page = set(re.findall(r'className="([^"]+)"', page))
all_page_classes = set()
for c in classes_page:
    all_page_classes.update(c.split())

print("Classes in index12 but not page:", all_orig_classes - all_page_classes)
print("Classes in page but not index12:", all_page_classes - all_orig_classes)
