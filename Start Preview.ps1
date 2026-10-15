$ErrorActionPreference = 'Stop'
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) { $heroNode = $nodeCommand.Source } else {
  $heroNode = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
}
if (-not (Test-Path -LiteralPath $heroNode)) { throw 'Install Node.js 24 or newer, then run this script again.' }
Write-Host 'Open http://127.0.0.1:4173 in a browser. Press Ctrl+C to stop.'
& $heroNode (Join-Path $PSScriptRoot 'scripts\serve.mjs') --port 4173
