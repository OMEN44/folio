ECHO OFF

REM BEGIN CUSTOM
set NODE_VERSION=20
set VSCODE_USER_HOME=..\vscode\
REM END CUSTOM

@call %DEV_TOOLS_HOME%\SetDevEnv.bat

REM echo VSCODE_USER_HOME %VSCODE_USER_HOME%

REM pause

start %VSCODE_HOME%\code.exe --extensions-dir %VSCODE_USER_HOME%\extensions --user-data-dir %VSCODE_USER_HOME%\data