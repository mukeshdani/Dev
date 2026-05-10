# IIS Website Deployment Guide

This repository contains the build artifacts required to deploy a website on **Windows IIS (Internet Information Services)**.

Follow the steps below to deploy the application successfully.

## Prerequisites

- Windows Operating System
- Administrator access
- Internet Information Services (IIS)

## Step 1: Install IIS on Windows

1. Open **Control Panel**
2. Go to **Programs** → **Turn Windows features on or off**
3. Enable **Internet Information Services (IIS)**
4. Click **OK** and wait for the installation to complete

You can verify IIS installation by opening a browser and navigating to:  
`http://localhost`

## Step 2: Download and Extract Artifacts

1. Download the **ZIP artifacts** from this GitHub repository
2. Extract the ZIP file to a temporary location on your system

## Step 3: Deploy Artifacts to IIS Folder

1. Navigate to the IIS default web directory:
```

C:\inetpub\wwwroot

```
2. Copy all extracted artifact files and folders
3. Paste them into the `wwwroot` directory
4. If prompted, replace existing files

---

## Access the Application

Open a browser and access:
```

[http://localhost](http://localhost)

```

Your website should now be live on IIS 🎉
