import subprocess, sys, os, time, signal

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

def shoot(url, w, h, out):
    profile = f"/tmp/kc-{w}x{h}-{int(time.time())}"
    cmd = [CHROME, "--headless", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage",
           "--hide-scrollbars", f"--user-data-dir={profile}", "--virtual-time-budget=6000",
           f"--window-size={w},{h}", f"--screenshot={out}", url]
    if os.path.exists(out):
        os.remove(out)
    p = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    deadline = time.time() + 90
    stable = 0
    last = -1
    while time.time() < deadline:
        time.sleep(1)
        if os.path.exists(out):
            size = os.path.getsize(out)
            if size > 0 and size == last:
                stable += 1
                if stable >= 2:
                    break
            last = size
        if p.poll() is not None:
            break
    try:
        p.terminate(); time.sleep(1); p.kill()
    except Exception:
        pass
    ok = os.path.exists(out) and os.path.getsize(out) > 0
    print(f"{out} {'OK' if ok else 'MISSING'} {os.path.getsize(out) if ok else 0} bytes")
    return ok

if __name__ == "__main__":
    base = "/Users/meak59/Downloads/fwai-starter/hello-agent/"
    url = "file://" + base + "index.html"
    shoot(url, 1440, 1000, base + "shots/desktop-1440.png")
    shoot(url, 375, 900, base + "shots/mobile-375.png")
    shoot(url, 1440, 5800, base + "shots/desktop-full.png")
    shoot(url, 375, 8200, base + "shots/mobile-full.png")
