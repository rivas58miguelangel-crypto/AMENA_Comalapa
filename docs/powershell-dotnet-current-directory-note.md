# Hallazgo técnico: diferencia entre PowerShell Location y .NET CurrentDirectory

## Contexto

Este hallazgo se detectó durante la creación y revisión de `demoQualityGate.ts` en Codex AMENA 36.

## Síntoma observado

PowerShell mostraba como ubicación activa:

```text
C:\Amena\Codex\AMENA_Comalapa
```

Sin embargo, .NET resolvía rutas relativas desde:

```text
C:\Windows\system32
```

Esta diferencia puede ocurrir porque la ubicación administrada por PowerShell y el directorio de trabajo mantenido por .NET no siempre están sincronizados.

## Comando que evidenció el problema

```powershell
Get-Location
[System.Environment]::CurrentDirectory
```

## Comando correctivo usado

```powershell
[System.Environment]::CurrentDirectory = (Get-Location).Path
```

## Riesgo

La diferencia entre ambas ubicaciones puede provocar:

- errores falsos de archivo no encontrado;
- lectura accidental de archivos equivocados;
- resolución incorrecta de rutas relativas;
- diagnósticos incorrectos de encoding;
- conclusiones equivocadas durante revisiones técnicas.

El riesgo aparece especialmente al utilizar APIs .NET con rutas relativas, por ejemplo:

```powershell
[System.IO.File]::ReadAllBytes("ruta\relativa\archivo.ts")
```

## Regla operativa recomendada

Antes de usar APIs .NET con rutas relativas en PowerShell, verificar que los resultados de los siguientes comandos coincidan:

```powershell
Get-Location
[System.Environment]::CurrentDirectory
```

Si no coinciden, sincronizar explícitamente el directorio de trabajo de .NET:

```powershell
[System.Environment]::CurrentDirectory = (Get-Location).Path
```

## Estado

Hallazgo documentado; no implica cambios funcionales en la aplicación.
