@echo off
python -m pip install -r requirements.txt pyinstaller
pyinstaller --noconfirm --clean --name ProSimUltimate --onedir --add-data "templates;templates" --add-data "static;static" run_local.py
 echo.
echo Build finished. See dist\ProSimUltimate\
pause
