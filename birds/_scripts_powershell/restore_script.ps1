$envFile = "../birds/.env"
$env = Get-Content $envFile

$envVars = @{}
foreach ($line in $env) {
    $splits = $line.Split("=")
    $envVars[$splits[0]] = $splits[1]
}

$scriptDirectory = Split-Path $script:MyInvocation.MyCommand.Path -Parent
$backupFile = $scriptDirectory + "..\..\_BACKUP\my_backup.sql"

If (Test-Path $backupFile) {
    $env:PGPASSWORD = $envVars.NEXT_PUBLIC_DB_PASSWORD_DEV
    & psql -U postgres -d $envVars.NEXT_PUBLIC_DB_NAME_DEV -f $backupFile
    Write-Output "Restore successfully."
}
else {
    Write-Output "Restore file not found."
}
