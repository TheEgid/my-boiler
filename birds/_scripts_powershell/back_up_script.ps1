$envFile = "../.env"
$env = Get-Content $envFile

$envVars = @{}
foreach ($line in $env) {
    $splits = $line.Split("=")
    $envVars[$splits[0]] = $splits[1]
}

$scriptDirectory = Split-Path $script:MyInvocation.MyCommand.Path -Parent
$backupFile = $scriptDirectory + "..\..\_BACKUP\my_backup.sql"

If (Test-Path $backupFile) {
    Remove-Item $backupFile
}

$env:PGPASSWORD = $envVars.NEXT_PUBLIC_DB_PASSWORD_DEV

# //     $command = "sqlite3 $databasePath .dump > $backupFile"
# //     Invoke-Expression $command

# //     Write-Host "SQLite backup completed successfully: $backupFile"

# & pg_dump --data-only -E UTF8 -f $backupFile --username $envVars.NEXT_PUBLIC_DB_USER_DEV --dbname $envVars.NEXT_PUBLIC_DB_NAME_DEV

# & pg_dump -E Unicode -f $backupFile --username $envVars.NEXT_PUBLIC_DB_USER_DEV --dbname $envVars.NEXT_PUBLIC_DB_NAME_DEV

if (Test-Path $backupFile) {
    Write-Output "Backup created successfully."
}
else {
    Write-Output "Backup creation failed."
}
