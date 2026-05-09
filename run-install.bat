@echo off
REM Script: run-install.bat
REM Usage: double-click or run in cmd from project root

echo =============================
echo Installing Node dependencies (npm install)
echo =============================
npm install
if %errorlevel% neq 0 (
  echo.
  echo npm install failed. Check output above.
  pause
  exit /b %errorlevel%
)
echo.
echo Checking for Supabase CLI...
where supabase >nul 2>&1
if %errorlevel% neq 0 (
  echo Supabase CLI not found.
  echo Install with: npm install -g supabase OR follow https://supabase.com/docs/guides/cli
) else (
  supabase --version
)
echo.
echo To link the project: supabase link --project-ref <PROJECT_REF>
echo To push migrations: supabase db push
echo To seed DB (requires SUPABASE_DB_URL set):
echo   set "SUPABASE_DB_URL=postgresql://user:pass@host:5432/postgres"
echo   psql "%%SUPABASE_DB_URL%%" -f supabase/seed.sql
echo.
echo Done.
pause
