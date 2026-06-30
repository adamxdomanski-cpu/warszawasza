# WARSZAWASZA — mapa kanałów

Kanoniczne URL-e obecności w polu. Źródło prawdy w kodzie: `frontend/lib/channelMap.ts`.

| ID | Rola | Platforma | URL | Etykieta |
|----|------|-----------|-----|----------|
| `WEB_WSZ` | web | www | https://www.warszawasza.online | warszawasza.online |
| `FB_WSZ` | brand_social | Facebook | https://www.facebook.com/profile.php?id=100085586858916 | Warszawasza |
| `IG_WSZ` | brand_social | Instagram | https://www.instagram.com/warszawasza | @warszawasza |
| `IG_WARSALLICA` | operator_social | Instagram | https://www.instagram.com/warsallica/ | @warsallica |
| `TBL_WSZ` | brand_social | Tumblr | https://www.tumblr.com/warszawasza | warszawasza |
| `PIN_WSZ` | brand_social | Pinterest | https://pl.pinterest.com/warszawasza | warszawasza |
| `MAIL_WSZ` | contact | e-mail | hello@warszawasza.online | hello@warszawasza.online |

## FOP

Każdy kanał ma token `fopRef` do linii relacji, np.:

```
rel channel IG:warszawasza
rel channel IG:warsallica
rel channel FB:100085586858916
rel channel TBL:warszawasza
rel channel PIN:warszawasza
```

## UI

- **/origin** — cicha sekcja „Kanały w polu” (bez footera marketingowego).
- Reszta aplikacji — bez nowych badge’y; mapa służy telemetrii i dokumentacji.
