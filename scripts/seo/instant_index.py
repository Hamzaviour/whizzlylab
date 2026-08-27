#!/usr/bin/env python3
"""
Instant Indexing Dispatcher for Whizzly Lab
Submits URLs to IndexNow protocol (Bing, Yandex, Seznam, Naver) and pings search engine sitemaps.
"""

import sys
import os
import json
import argparse
import urllib.parse
import urllib.request
import urllib.error

# Ensure UTF-8 output for Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

DEFAULT_HOST = "whizzlylab.com"
DEFAULT_BASE_URL = "https://whizzlylab.com"
DEFAULT_KEY = "c79f4e2417a840e691c2c31e9a263641"
DEFAULT_KEY_LOCATION = f"https://{DEFAULT_HOST}/{DEFAULT_KEY}.txt"

STATIC_ROUTES = [
    "",
    "/about",
    "/services",
    "/pricing",
    "/contact",
    "/schedule",
    "/privacy",
]

SERVICE_SLUGS = [
    "web-development",
    "machine-learning",
    "ai",
    "automation",
    "data-analytics",
    "business-solutions",
    "computer-vision",
    "data-pipelines",
]

INDEXNOW_ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
]

def get_all_site_urls(base_url: str = DEFAULT_BASE_URL) -> list[str]:
    urls = [f"{base_url.rstrip('/')}{route}" for route in STATIC_ROUTES]
    for slug in SERVICE_SLUGS:
        urls.append(f"{base_url.rstrip('/')}/services/{slug}")
    return sorted(list(set(urls)))

def submit_indexnow(urls: list[str], host: str = DEFAULT_HOST, key: str = DEFAULT_KEY, key_location: str = DEFAULT_KEY_LOCATION, dry_run: bool = False) -> dict:
    payload = {
        "host": host,
        "key": key,
        "keyLocation": key_location,
        "urlList": urls,
    }

    results = {"success": True, "submitted_urls": urls, "endpoints": {}}

    if dry_run:
        print(f"[DRY-RUN] Would submit {len(urls)} URLs to IndexNow with key {key}")
        for u in urls:
            print(f"  - {u}")
        return results

    payload_bytes = json.dumps(payload).encode("utf-8")

    for endpoint in INDEXNOW_ENDPOINTS:
        req = urllib.request.Request(
            endpoint,
            data=payload_bytes,
            headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": "WhizzlyLab-SEO-Agent/1.0"},
            method="POST"
        )
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                status_code = resp.getcode()
                results["endpoints"][endpoint] = {"status": status_code, "ok": status_code in (200, 202)}
                print(f"[IndexNow] {endpoint} -> HTTP {status_code} (Success)")
        except urllib.error.HTTPError as e:
            results["endpoints"][endpoint] = {"status": e.code, "ok": e.code in (200, 202), "error": str(e)}
            print(f"[IndexNow] {endpoint} -> HTTP {e.code}: {e.reason}")
        except Exception as e:
            results["endpoints"][endpoint] = {"status": 0, "ok": False, "error": str(e)}
            print(f"[IndexNow] {endpoint} -> Failed: {e}")

    return results

def ping_sitemaps(base_url: str = DEFAULT_BASE_URL, dry_run: bool = False) -> dict:
    sitemap_url = f"{base_url.rstrip('/')}/sitemap.xml"
    encoded_sitemap = urllib.parse.quote(sitemap_url, safe="")
    
    ping_urls = [
        f"https://www.google.com/ping?sitemap={encoded_sitemap}",
        f"https://www.bing.com/ping?sitemap={encoded_sitemap}",
    ]

    results = {}

    if dry_run:
        print(f"[DRY-RUN] Would ping sitemaps for {sitemap_url}")
        return {"dry_run": True, "sitemap": sitemap_url}

    for ping_url in ping_urls:
        req = urllib.request.Request(
            ping_url,
            headers={"User-Agent": "WhizzlyLab-SEO-Agent/1.0"}
        )
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                results[ping_url] = {"status": resp.getcode(), "ok": True}
                print(f"[Sitemap Ping] {ping_url} -> HTTP {resp.getcode()}")
        except Exception as e:
            results[ping_url] = {"status": 0, "ok": False, "error": str(e)}
            print(f"[Sitemap Ping] {ping_url} -> Note/Handled: {e}")

    return results

def main():
    parser = argparse.ArgumentParser(description="Whizzly Lab Instant Indexing Dispatcher")
    parser.add_argument("--base-url", default=os.getenv("NEXT_PUBLIC_APP_URL", DEFAULT_BASE_URL), help="Base website URL")
    parser.add_argument("--key", default=os.getenv("INDEXNOW_KEY", DEFAULT_KEY), help="IndexNow authentication key")
    parser.add_argument("--url", action="append", help="Specific URL to submit (can be used multiple times)")
    parser.add_argument("--all", action="store_true", default=True, help="Submit all site URLs")
    parser.add_argument("--ping-sitemaps", action="store_true", default=True, help="Ping search engine sitemaps")
    parser.add_argument("--dry-run", action="store_true", help="Simulate submissions without making network calls")

    args = parser.parse_args()

    url_obj = urllib.parse.urlparse(args.base_url)
    host = url_obj.netloc or DEFAULT_HOST
    key_location = f"{args.base_url.rstrip('/')}/{args.key}.txt"

    urls_to_submit = args.url if args.url else get_all_site_urls(args.base_url)

    print(f"=== Whizzly Lab Instant Indexing Dispatcher ===")
    print(f"Target Host: {host}")
    print(f"IndexNow Key: {args.key}")
    print(f"Key Location: {key_location}")
    print(f"Total URLs to Submit: {len(urls_to_submit)}\n")

    indexnow_res = submit_indexnow(urls_to_submit, host=host, key=args.key, key_location=key_location, dry_run=args.dry_run)

    if args.ping_sitemaps:
        print("\n--- Search Engine Sitemap Ping ---")
        sitemap_res = ping_sitemaps(args.base_url, dry_run=args.dry_run)
    else:
        sitemap_res = None

    print("\nInstant Indexing Finished Successfully.")

if __name__ == "__main__":
    main()
