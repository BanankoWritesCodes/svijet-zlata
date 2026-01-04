# Svijet Zlata - Web Aplikacija

Profesionalna web aplikacija za otkup i prodaju zlata i srebra.

## Značajke

- **Landing Page** - Animirani logo loader
- **Kalkulator otkupa** - Step-by-step izračun vrijednosti
- **Cjenik** - Live cijene s animiranim fluktuacijama
- **Inventar** - Pregled artikala s filterima
- **FAQ** - Accordion pitanja/odgovori
- **Kontakt forma** - Slanje upita
- **Admin panel** - Upravljanje cijenama i maržama

## Instalacija na Mac

### 1. Instaliraj Node.js
- Idi na [nodejs.org](https://nodejs.org/)
- Preuzmi LTS verziju
- Instaliraj

### 2. Provjeri instalaciju
```bash
node --version
npm --version
```

### 3. Raspakiraj projekt u Documents
```bash
cd ~/Documents
# Raspakiraj svijet-zlata.zip ovdje
```

### 4. Otvori Terminal i navigiraj do projekta
```bash
cd ~/Documents/svijet-zlata
```

### 5. Instaliraj pakete
```bash
npm install
```

### 6. Pokreni razvojni server
```bash
npm run dev
```

### 7. Otvori u pregledniku
**http://localhost:3000**

## Admin Panel

- **URL:** http://localhost:3000/admin-szlt2024
- **Username:** admin
- **Password:** admin

## Stranice

| Stranica | URL |
|----------|-----|
| Početna | / |
| Kupujem (Kalkulator) | /kupujem |
| Prodajem (Inventar) | /inventory |
| Cjenik | /cjenik |
| FAQ | /faq |
| Kontakt | /kontakt |
| Admin | /admin-szlt2024 |

## Produkcija

```bash
npm run build
npm run start
```

© 2024 Svijet Zlata
