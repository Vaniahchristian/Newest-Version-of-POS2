# Export local POS database for Railway import
$out = Join-Path $env:USERPROFILE "Desktop\pos_backup.sql"
& "C:\xampp\mysql\bin\mysqldump.exe" -u root laravel > $out
Write-Host "Exported to $out"
Write-Host "Import on Railway: railway connect mysql, then load this file"
