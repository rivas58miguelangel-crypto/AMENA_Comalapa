# OPS-0001 - Protocolo Operativo PC Laptop Git

## Pregunta que responde

Como deben sincronizarse PC y Laptop antes y despues de trabajar en el repositorio?

---

# Estado

Protocolo operativo inicial.

Este documento define la rutina de sincronizacion entre PC, Laptop y Git/GitHub. No define reglas generales de continuidad ni niveles conceptuales de madurez.

---

# Principio rector

Git y GitHub son la fuente de verdad operativa para sincronizar trabajo entre equipos.

La PC y la Laptop no deben tratarse como fuentes independientes. Cada equipo debe verificar el estado del repositorio antes de iniciar trabajo y cerrar cambios publicando el resultado cuando corresponda.

---

# Verificacion obligatoria antes de trabajar

Antes de modificar archivos, ejecutar:

```powershell
git fetch origin
git status
```

Confirmar:

* rama actual;
* si la rama local esta sincronizada con origin;
* si el working tree esta limpio;
* ultimo commit local y remoto cuando sea necesario.

Si el equipo esta atrasado y el working tree esta limpio, actualizar con:

```powershell
git pull --ff-only
```

No hacer pull si hay cambios locales sin revisar.

---

# Rutina de inicio

1. Abrir el repositorio local correcto.
2. Ejecutar `git fetch origin`.
3. Ejecutar `git status`.
4. Confirmar que se esta en la rama correcta.
5. Si la rama local esta atrasada y no hay cambios locales, ejecutar `git pull --ff-only`.
6. Revisar el Indice Maestro de Ejecucion cuando el trabajo afecte continuidad del conocimiento.

---

# Rutina de cierre

Al cerrar cambios reales:

1. Ejecutar validaciones necesarias segun el tipo de cambio.
2. Revisar `git status`.
3. Preparar commit solo con archivos correspondientes al trabajo realizado.
4. Crear commit con mensaje claro.
5. Ejecutar `git push` para publicar el estado en GitHub.
6. Confirmar que el equipo queda sincronizado.

Si el usuario indica no hacer commit, no se hace commit aunque existan cambios.

---

# Diferencias operativas entre PC y Laptop

La PC y la Laptop pueden tener diferencias locales de entorno, credenciales o servicios.

Antes de asumir equivalencia entre equipos, verificar:

* archivo `.env` y variables locales;
* acceso a Supabase;
* configuracion de WhatsApp;
* configuracion de Email;
* acceso a VPS;
* configuracion de Vapi;
* permisos Git/GitHub;
* dependencias ya instaladas.

Estas diferencias no deben versionarse si pertenecen a secretos, credenciales o configuracion local sensible.

---

# Contexto operativo sensible

Los siguientes elementos pueden afectar ejecucion local, pruebas o integraciones:

* `.env`;
* Supabase;
* WhatsApp;
* Email;
* VPS;
* Vapi.

Cuando un problema ocurra solo en PC o solo en Laptop, revisar primero estas diferencias antes de modificar codigo o documentacion rectora.

---

# Regla de seguridad

No publicar secretos, tokens, claves privadas ni credenciales.

No modificar archivos de entorno sin instruccion expresa.

No asumir que una integracion externa funciona igual en ambos equipos sin verificacion.

---

# Resultado esperado

Cada sesion de trabajo debe iniciar desde el estado mas reciente de GitHub y cerrar con cambios publicados cuando corresponda, evitando divergencias entre PC y Laptop.
