@echo off
for /f %%i in (ovafiles.txt) do (
    set FILENAME=%%i
    aws ec2 import-image --description "Imported from %%i" --disk-containers "file://%%i.json" --role-name {{vmimport}}
)