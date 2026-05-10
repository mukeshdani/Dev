# Nginx Website Deployment Guide

This repository contains the build artifacts required to deploy a website on **Nginx (Linux Web Server)**.

Follow the steps below to deploy the application successfully.

## Prerequisites

* Linux OS (Ubuntu recommended)
* Sudo / root access
* Nginx installed

---

## Step 1: Install Nginx

Run the following commands:

```bash
sudo apt update
sudo apt install nginx -y
```

Start and enable Nginx:

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

Verify installation by opening browser:

```
http://localhost
```

---

## Step 2: Download and Extract Artifacts

1. Download the **ZIP artifacts** from this GitHub repository
2. Extract the ZIP file:

```bash
unzip your-artifact.zip
```

---

## Step 3: Deploy Artifacts to Nginx Directory

Default Nginx web directory:

```
/var/www/html
```

Copy files:

```bash
sudo cp -r * /var/www/html/
```

Set correct permissions:

```bash
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

---

## Step 4: Configure Nginx (Optional but Recommended)

Edit default config:

```bash
sudo nano /etc/nginx/sites-available/default
```

Update root path if needed:

```nginx
server {
    listen 80;
    server_name localhost;

    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Test config:

```bash
sudo nginx -t
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

---

## Access the Application

Open browser:

```
http://localhost
```

Your website should now be live on Nginx 🎉

---

Agar tu bata de ki project **React / Angular / Node / static** kya hai, toh main exact optimized Nginx config bhi bana dunga (reverse proxy, SPA routing, etc.).
