Write-Host "🚀 Starting Delphi App..." -ForegroundColor Green
Write-Host ""

# Start Expo development server
Write-Host "Starting Expo development server..." -ForegroundColor Yellow
Start-Process -NoNewWindow -FilePath "npx" -ArgumentList "expo", "start", "--web", "--open"

# Wait for server to start
Write-Host "Waiting for server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

# Check if server is running
Write-Host "Checking server status..." -ForegroundColor Yellow

$port19006 = Get-NetTCPConnection -LocalPort 19006 -ErrorAction SilentlyContinue
$port19000 = Get-NetTCPConnection -LocalPort 19000 -ErrorAction SilentlyContinue

if ($port19006) {
    Write-Host "✅ Server is running on http://localhost:19006" -ForegroundColor Green
    Write-Host "Opening browser..." -ForegroundColor Cyan
    Start-Process "http://localhost:19006"
} elseif ($port19000) {
    Write-Host "✅ Server is running on http://localhost:19000" -ForegroundColor Green
    Write-Host "Opening browser..." -ForegroundColor Cyan
    Start-Process "http://localhost:19000"
} else {
    Write-Host "⚠️  Server may still be starting..." -ForegroundColor Yellow
    Write-Host "You can manually open: http://localhost:19006" -ForegroundColor Cyan
    Write-Host "Or try: http://localhost:19000" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")