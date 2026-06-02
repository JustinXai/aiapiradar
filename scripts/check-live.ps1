# check-live.ps1
# Production live checks — requires network access.
# Run after confirming Cloudflare production commit = origin/main.
$ErrorActionPreference = 'SilentlyContinue'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$allPass = $true

function Get-Req($url) {
    $t = [DateTimeOffset]::Now.ToUnixTimeMilliseconds()
    $sep = '?'
    if ($url -match '?') { $sep = '&' }
    try {
        $r = Invoke-WebRequest -Uri "$url$sep$t" -TimeoutSec 20 -ErrorAction Stop
        return @{ status=$r.StatusCode; content=$r.Content; ok=$true }
    } catch {
        return @{ status=0; content=''; ok=$false }
    }
}

function P($msg) { Write-Host "  [PASS] $msg" -ForegroundColor Green }
function F($msg) { Write-Host "  [FAIL] $msg" -ForegroundColor Red; $script:allPass = $false }

Write-Host ''
Write-Host '=== Production Live Checks ==='
Write-Host ''

# 1. Homepage
Write-Host '[1] Homepage'
$r = Get-Req 'https://aiapiradar.com/'
if ($r.status -eq 200) { P "200 OK" } else { F "expected 200 got $($r.status)" }

# 2. Full sample pages
$pages = @(
    'https://aiapiradar.com/openclaw-wechat/',
    'https://aiapiradar.com/claude-code-token-cost/',
    'https://aiapiradar.com/shipin-shengcheng-api/',
    'https://aiapiradar.com/claude-code-zhongzhuan/',
    'https://aiapiradar.com/openai-api-base-url/',
    'https://aiapiradar.com/api-zhongzhuan-safe/'
)
$idx = 2
foreach ($p in $pages) {
    Write-Host "[$idx] $($p -replace 'https://aiapiradar.com', '')"
    $r = Get-Req $p
    if ($r.status -eq 200) { P "200 OK" } else { F "expected 200 got $($r.status)" }
    $idx++
}

# 3. Sitemap
Write-Host "[$idx] Sitemap"
$r = Get-Req 'https://aiapiradar.com/sitemap.xml'
if ($r.status -eq 200) { P "200 OK" } else { F "expected 200 got $($r.status)" }
$locCount = [regex]::Matches($r.content, '<loc>').Count
Write-Host "  Sitemap URL count: $locCount"
if ($locCount -eq 29) { P "count = 29" } else { F "count = 29 (got $locCount)" }
if ($r.content -match '<loc>https://aiapiradar.com/</loc>') { P "homepage in sitemap" } else { F "homepage missing" }
if ($r.content -notmatch '/404') { P "404 excluded" } else { F "404 found in sitemap" }
$idx++

# 4. Robots
Write-Host "[$idx] Robots.txt"
$r = Get-Req 'https://aiapiradar.com/robots.txt'
if ($r.status -eq 200) { P "200 OK" } else { F "expected 200 got $($r.status)" }
$idx++

# 5. LLMs
Write-Host "[$idx] LLMs.txt"
$r = Get-Req 'https://aiapiradar.com/llms.txt'
if ($r.status -eq 200) { P "200 OK" } else { F "expected 200 got $($r.status)" }
$lines = $r.content -split "`n"
$pageLines = $lines | Where-Object { $_ -match '^- ' -and $_ -match 'aiapiradar.com/' }
Write-Host "  LLMS page count: $($pageLines.Count)"
if ($pageLines.Count -eq 29) { P "count = 29" } else { F "count = 29 (got $($pageLines.Count))" }
if ($r.content -match 'aiapiradar.com/"') { P "homepage in llms" } else { F "homepage missing" }
if ($r.content -notmatch 'aiapiradar.com/404') { P "404 excluded" } else { F "404 found in llms" }
$idx++

# 6. Invalid route 404
Write-Host "[$idx] Invalid route 404"
$nfStatus = 0
$nfContent = ''
try {
    $req = [Net.HttpWebRequest]::Create('https://aiapiradar.com/nonexistent-page-xyz123-test/')
    $req.Timeout = 15000
    $req.AllowAutoRedirect = $false
    $resp = $req.GetResponse()
    $nfStatus = [int]$resp.StatusCode
    $rs = $resp.GetResponseStream()
    $sr = New-Object System.IO.StreamReader($rs)
    $nfContent = $sr.ReadToEnd()
    $sr.Close(); $rs.Close(); $resp.Close()
} catch {
    $we = $_.Exception.GetBaseException()
    if ($we -is [Net.WebException] -and $we.Response) {
        $nfStatus = [int]$we.Response.StatusCode
        $rs = $we.Response.GetResponseStream()
        $sr = New-Object System.IO.StreamReader($rs)
        $nfContent = $sr.ReadToEnd()
        $sr.Close(); $rs.Close()
    }
}
Write-Host "  Status: $nfStatus"
if ($nfStatus -eq 404) { P "404" } else { F "expected 404 got $nfStatus" }
if ($nfContent -match 'not-found') { P "not-found text" } else { F "not-found text missing" }
if ($nfContent -match 'noindex') { P "noindex" } else { F "noindex missing" }
$idx++

# 7. www redirect
Write-Host "[$idx] www redirect"
try {
    $req = [Net.HttpWebRequest]::Create('https://www.aiapiradar.com/openclaw-wechat/')
    $req.Timeout = 15000
    $req.AllowAutoRedirect = $false
    $resp = $req.GetResponse()
    $wwwStatus = [int]$resp.StatusCode
    $wwwLoc = $resp.Headers['Location']
    $resp.Close()
} catch {
    $we = $_.Exception.GetBaseException()
    if ($we -is [Net.WebException] -and $we.Response) {
        $wwwStatus = [int]$we.Response.StatusCode
        $wwwLoc = $we.Response.Headers['Location']
    }
}
Write-Host "  Status: $wwwStatus"
Write-Host "  Location: $wwwLoc"
if ($wwwStatus -eq 301 -or $wwwStatus -eq 302) { P "redirect 301/302" } else { F "expected 301/302 got $wwwStatus" }
if ($wwwLoc -match 'aiapiradar.com/openclaw-wechat/') { P "path preserved" } else { F "path not preserved" }

Write-Host ''
Write-Host '========================================'
if ($allPass) {
    Write-Host 'ALL LIVE CHECKS PASSED' -ForegroundColor Green
} else {
    Write-Host 'SOME LIVE CHECKS FAILED' -ForegroundColor Red
}
Write-Host '========================================'
if ($allPass) { exit 0 } else { exit 1 }
