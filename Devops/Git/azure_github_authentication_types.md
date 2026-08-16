# Ways to Authenticate GitHub Actions with Azure

When GitHub Actions needs to talk to Azure (e.g., to run Terraform), it needs to prove who it is. There are **two main ways** to do this if you are using GitHub's free runners, plus **one extra way** if you host your own runners.

Here is the complete, advanced breakdown of Azure Authentication in GitHub Actions.

---

## Method 1: Service Principal with Client Secret (The Traditional Way)

This is the method we used in our previous guides. It involves creating an **App Registration / Service Principal** (a "Robot User") in Azure and generating a physical password for it (the Client Secret).

### How it works:
You generate a JSON block containing the `clientId`, `tenantId`, and `clientSecret`. You save this JSON in GitHub Secrets (`AZURE_CREDENTIALS`) and pass it to the pipeline.

### The Pipeline Code:
```yaml
      - name: Azure Login
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
```

### Pros:
- ✅ **Easy to understand:** It works just like a normal username and password.
- ✅ **Fast setup:** Takes one simple command in the Azure CLI.

### Cons (Why seniors are moving away from it):
- ❌ **Secrets Expire:** Azure Client Secrets usually expire after 1 or 2 years. When they expire, your pipeline crashes suddenly until a human logs in and generates a new secret.
- ❌ **Security Risk:** If a hacker (or disgruntled employee) copies that JSON text from GitHub Settings, they can log into your Azure account from their own personal laptop.

---

## Method 2: OpenID Connect / Federated Identity (The Modern & Recommended Way)

This is the **"Secretless"** way. Both Microsoft and GitHub strongly recommend using OIDC (OpenID Connect) for production. 

### How it works:
Instead of giving GitHub a password, you go into your Azure App Registration and setup a **Federated Credential**. You tell Azure: *"Hey Azure, I trust my specific GitHub Repository named `My-Terraform-Repo`. If it asks for access, just let it in."*

When the pipeline runs, GitHub generates a temporary, cryptographically secure token that lasts only for a few minutes. Azure verifies it, lets the pipeline run, and then the token is immediately destroyed. 

### The Pipeline Code:
Because there is no secret password, you just provide the IDs (Tenant, Subscription, Client). 
**Important:** You MUST give GitHub the `permissions: id-token: write` block so it can generate that temporary token!

```yaml
# ⚠️ This permissions block is REQUIRED for OIDC
permissions:
  id-token: write   
  contents: read

jobs:
  terraform-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Azure Login via OIDC
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
```
*(Notice: There is no `creds` block, and absolutely no `clientSecret`!)*

### Pros:
- ✅ **No Expiration:** You never have to rotate or update passwords again. No more random pipeline crashes!
- ✅ **Highly Secure:** There is no physical password for anyone to steal. Even if someone hacks your GitHub settings, they cannot steal the connection.

### Cons:
- ❌ **Harder to Setup:** You have to manually configure "Federated Credentials" inside the Azure Portal and type in your GitHub repository name exactly right.

---

## Method 3: Managed Identity (For Self-Hosted Runners)

Sometimes, large enterprise companies don't use the free `ubuntu-latest` computers provided by GitHub. Instead, they create their own Virtual Machines (VMs) inside Azure and install the "GitHub Runner" software directly on those VMs.

### How it works:
Because the VM is physically already inside the Azure cloud, you can attach a **Managed Identity** to the VM itself. The VM just says to Azure, *"Hey, I am a VM inside your own network, let me run this Terraform code."*

### The Pipeline Code:
```yaml
      - name: Azure Login via Managed Identity
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.USER_ASSIGNED_MANAGED_IDENTITY_CLIENT_ID }}
```

### Pros & Cons:
- ✅ **Ultimate Security:** No secrets, no external tokens, and the traffic never leaves the Azure private network.
- ❌ **Expensive/Complex:** You have to pay for, secure, and maintain your own Azure VMs 24/7.

---

## Summary: Which one should you use?

| Method | Has a Password? | Setup Difficulty | Security Level | Best For |
|--------|----------------|------------------|----------------|----------|
| **Client Secret** | Yes (JSON) | Easy | Medium | Beginners, Quick Prototyping |
| **OIDC / Federated** | No | Medium | Very High | **Production (Highly Recommended)** |
| **Managed Identity** | No | Hard | Extremely High | Massive Enterprises with Private Networks |
