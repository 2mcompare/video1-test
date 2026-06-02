import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

count = 0

# Find all blocks that contain const startT = performance.now()
while True:
    idx = content.find('const startT = performance.now()')
    if idx == -1:
        break
    
    # Go backwards to find the tl1.call(function() {
    call_start = content.rfind('tl1.call(function() {', 0, idx)
    if call_start == -1:
        break
    
    # Find the end of the block: tl1.call(function() { ... }, null, null, null, POS);
    # The block ends with ); at the right depth
    depth = 0
    end_idx = call_start
    paren_depth = 0
    # Find the matching close of tl1.call(...)
    for i in range(call_start, len(content)):
        if content[i] == '(':
            paren_depth += 1
        elif content[i] == ')':
            paren_depth -= 1
            if paren_depth == 0:
                end_idx = i + 1
                break
    
    block = content[call_start:end_idx]
    
    # Extract element ID, target value, and position
    id_match = re.search(r"document\.getElementById\('([^']+)'\)", block)
    val_match = re.search(r'to:\s*([\d.]+)', block)
    pos_match = re.search(r', null, null, ([\d.]+)\)\s*$', block)  # at the very end
    
    if not pos_match:
        pos_match = re.search(r', (\d+\.?\d*)\)\s*$', block)
    
    if id_match and val_match:
        el_id = id_match.group(1)
        target = val_match.group(1)
        pos = pos_match.group(1) if pos_match else '0'
        
        replacement = f'''tl1.to({{}}, {{ duration: 1.2, ease: 'none',
  onUpdate: function() {{ document.getElementById('{el_id}').textContent = spring(this.progress(), {{ from: 0, to: {target} }}).toFixed(1); }},
  onComplete: function() {{ document.getElementById('{el_id}').textContent = '{target}'; }}
}}, {pos});'''
        
        content = content[:call_start] + replacement + content[end_idx:]
        count += 1
        print(f"  Replaced spring counter for {el_id} -> {target} at pos {pos}")

# Now fix the leaderboard podium counters (s8-s1, s8-s2, s8-s3)
# These have setTimeout staggering
for el_id in ['s8-s1', 's8-s2', 's8-s3']:
    targets = {'s8-s1': '8.5', 's8-s2': '8.0', 's8-s3': '7.5'}
    target = targets[el_id]
    
    # Find the block for this element
    pattern = rf"tl1\.call\(function\(\) \{{[^}}]*document\.getElementById\('{el_id}'\)[^}}]+requestAnimationFrame[^}}]+null, null, ([\d.]+)\);"
    match = re.search(pattern, content, re.DOTALL)
    if match:
        pos = match.group(1)
        block_start = match.start()
        block_end = match.end()
        
        # Find the full end - the block might contain nested braces
        # Find the matching ) for tl1.call(
        start_search = match.start()
        depth = 0
        for i in range(start_search, len(content)):
            if content[i] == '(':
                depth += 1
            elif content[i] == ')':
                depth -= 1
                if depth == 0:
                    block_end = i + 1
                    break
        
        full_block = content[block_start:block_end]
        
        # Extract delay if present (setTimeout with delay)
        delay_match = re.search(r'setTimeout.*?(\d+)\)', full_block)
        delay = delay_match.group(1) if delay_match else 0
        
        replacement = f'''tl1.to({{}}, {{ duration: 1.2, ease: 'none',
  delay: {float(delay)/1000},
  onUpdate: function() {{ document.getElementById('{el_id}').textContent = spring(this.progress(), {{ from: 0, to: {target} }}).toFixed(1); }},
  onComplete: function() {{ document.getElementById('{el_id}').textContent = '{target}'; }}
}}, {pos});'''
        
        content = content[:block_start] + replacement + content[block_end:]
        count += 1
        print(f"  Replaced podium counter for {el_id} -> {target} at pos {pos} delay={delay}ms")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'\nTotal replaced: {count} spring counter blocks')
