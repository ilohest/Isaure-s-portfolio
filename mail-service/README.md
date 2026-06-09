# Mail service (contact)

Petit service Node/Express + Nodemailer qui envoie par email les messages du
formulaire de contact. Remplace l'ancien pont **Firestore → Cloud Function**.
Le site statique POST sur `/api/contact` (reverse-proxié par Apache vers ce
service), qui envoie un mail via SMTP. **Aucun message n'est stocké.**

## Local
```bash
cd mail-service
npm install
cp .env.example .env   # renseigner SMTP_*
npm start              # écoute sur :8787, POST /api/contact
```

## Déploiement VPS (Apache + systemd)

1. Copier `mail-service/` sur le VPS (hors du dossier statique servi), ex.
   `/opt/isaure-mail/`, puis `npm install --omit=dev` et créer `.env`.

2. Service systemd `/etc/systemd/system/isaure-mail.service` :
   ```ini
   [Unit]
   Description=Isaure portfolio contact mail service
   After=network.target

   [Service]
   WorkingDirectory=/opt/isaure-mail
   EnvironmentFile=/opt/isaure-mail/.env
   ExecStart=/usr/bin/node server.js
   Restart=always
   User=www-data

   [Install]
   WantedBy=multi-user.target
   ```
   ```bash
   sudo systemctl enable --now isaure-mail
   ```

3. Reverse-proxy Apache (vhost du site) — proxifier `/api/contact` vers le
   service local (le reste du site reste servi en statique) :
   ```apache
   # a2enmod proxy proxy_http
   ProxyPass        /api/contact http://127.0.0.1:8787/api/contact
   ProxyPassReverse /api/contact http://127.0.0.1:8787/api/contact
   ```
   Puis `sudo systemctl reload apache2`.

Le formulaire (`ContactIsaure.vue`) appelle `fetch('/api/contact', …)` en
same-origin : aucune config CORS nécessaire dans ce cas.
