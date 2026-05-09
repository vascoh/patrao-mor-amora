@echo off
REM install-supabase.bat - Instala globalmente a Supabase CLI (requer privilégios de administrador)

echo =============================
echo Instalando Supabase CLI globalmente (npm install -g supabase)
echo =============================

echo Nota: execute este script como Administrador se receber erros de permissão.
npm install -g supabase
if %errorlevel% neq 0 (
  echo.
  echo Falha ao instalar Supabase CLI. Tente executar este script com 'Executar como administrador' ou instale manualmente:
  echo   npm install -g supabase
  pause
  exit /b %errorlevel%
)

echo.
echo Verificando instalação...
supabase --version || echo "supabase comando não encontrado; reinicie o terminal if necessary"
echo.
echo Feito.
pause
