with open(r'c:\Users\ousse\Downloads\index12.html', encoding='utf-8') as f:
    orig = f.read()

# Let's inspect the exact CSS rules in index12.html for font-size, html, body
import re
print("HTML tag in index12:")
print(re.findall(r'<html[^>]*>', orig))
print("Body tag in index12:")
print(re.findall(r'<body[^>]*>', orig))
print("Head tag in index12:")
head = re.search(r'<head>(.*?)</head>', orig, re.DOTALL).group(1)
print(head[:400])
