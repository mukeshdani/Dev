# Creating a Virtual Machine

## Overview
*Compute Engine allows you to create virtual machines (VMs) that run different operating systems, including multiple flavors of Linux (Debian, Ubuntu, Suse, Red Hat, CoreOS) and Windows Server, on Google infrastructure. You can run thousands of virtual CPUs on a system that is designed to be fast and to offer strong consistency of performance.*

**In this hands-on lab, you create VM instances of various machine types using the Google Cloud console and the gcloud command line in Cloud Shell. You also learn how to connect an NGINX web server to your VM.**

### What you'll do
*   Create a VM with the Cloud console.
*   Create a VM with the gcloud command line.
*   Deploy a web server and connect it to a VM.

### Prerequisites
Familiarity with standard Linux text editors such as vim, emacs, or nano.

#### Click Activate Cloud Shell Activate Cloud Shell icon at the top of the Google Cloud console.

When you are connected, you are already authenticated, and the project is set to your Project_ID, PROJECT_ID. The output contains a line that declares the Project_ID for this session:

Your Cloud Platform project in this session is set to "PROJECT_ID"
gcloud is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.


##### You can list the active account name with this command:
           gcloud auth list
Click Authorize.

            ACTIVE: *
            ACCOUNT: "ACCOUNT"

##### To set the active account, run:
    $ gcloud config set account `ACCOUNT`
##### You can list the project ID with this command:
      gcloud config list project
output 

    [core]
    project = "PROJECT_ID"

**Set the region and zone**
###### Set the project region for this lab:
        gcloud config set compute/region REGION

###### Create a variable for region:
        export REGION=REGION

###### Create a variable for zone:
        export ZONE=Zone


Note: When you run gcloud on your own machine, the config settings are persisted across sessions. But in Cloud Shell, you need to set this for every new session or reconnection.

## Task 1. Create a new instance from the Cloud console
    In this section, you create new predefined machine types with Compute Engine from the Cloud console.

    In the Cloud console, on the Navigation menu (Navigation menu icon), click Compute Engine > VM Instances.

    This may take a minute to initialize for the first time.

    To create a new instance, click CREATE INSTANCE.

    There are many parameters you can configure when creating a new instance. Use the following for this lab:

    Click Create.

    It should take about a minute for the VM, gcelab, to be created. After gcelab is created, the VM Instances page lists it in the VM instances list.

    To use SSH to connect to the VM, click SSH to the right of the instance name, gcelab.

    This launches an SSH client directly from your browser.

    Note: Learn more about how to use SSH to connect to an instance from the Compute Engine guide, Connect to Linux VMs using Google tools.

## Task 2. Install an NGINX web server
    Now you install an NGINX web server, one of the most popular web servers in the world, to connect your VM to something.

    Update the OS:

            sudo apt-get update

    Expected output:

    Get:1 http://security.debian.org stretch/updates InRelease [94.3 kB]
    Ign http://deb.debian.org strech InRelease
    Get:2 http://deb.debian.org strech-updates InRelease [91.0 kB]
    ...
    Install NGINX:  

    sudo apt-get install -y nginx

    Expected output:

    Reading package lists... Done
    Building dependency tree
    Reading state information... Done
    The following additional packages will be installed:
    ...
    Confirm that NGINX is running:

    ps auwx | grep nginx
    Copied!
    Expected output:

    root      2330  0.0  0.0 159532  1628 ?        Ss   14:06   0:00 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
    www-data  2331  0.0  0.0 159864  3204 ?        S    14:06   0:00 nginx: worker process
    www-data  2332  0.0  0.0 159864  3204 ?        S    14:06   0:00 nginx: worker process
    root      2342  0.0  0.0  12780   988 pts/0    S+   14:07   0:00 grep nginx
    To see the web page, return to the Cloud console and click the External IP link in the row for your machine, or add the External IP value to http://EXTERNAL_IP/ in a new browser window or tab.

This default web page should open:

Default nginx page; Welcome to nginx!

Create a Compute Engine instance and add an NGINX Server to your instance with necessary firewall rules.


## Task 3. Create a new instance with gcloud
    Instead of using the Cloud console to create a VM instance, use the command line tool gcloud, which is pre-installed in Google Cloud Shell. Cloud Shell is an interactive shell environment for Google Cloud loaded with all the development tools you need (gcloud, git, and others) and offers a persistent 5-GB home directory.

    Note: If you want to try this on your own machine, read the gcloud command line tool guide.
    In the Cloud Shell, use gcloud to create a new VM instance from the command line:

    gcloud compute instances create gcelab2 --machine-type e2-medium --zone=$ZONE
    Copied!
    Expected output:

     Created [...gcelab2].
     NAME: gcelab2
     ZONE:  Zone
     MACHINE_TYPE: e2-medium
     PREEMPTIBLE:
     INTERNAL_IP: 10.128.0.3
     EXTERNAL_IP: 34.136.51.150
     STATUS: RUNNING


    Create a new instance with gcloud.
    The new instance has these default values:

    The latest Debian 11 (bullseye) image.
    The e2-medium machine type.
    A root persistent disk with the same name as the instance; the disk is automatically attached to the instance.
    When working in your own project, you can specify a custom machine type.

    To see all the defaults, run:

    gcloud compute instances create --help
    Copied!
    Note: You can set the default region and zones that gcloud uses if you are always working within one region/zone and you don't want to append the --zone flag every time.
    To do this, run these commands:

    gcloud config set compute/zone ...

    gcloud config set compute/region ...

    To exit help, press CTRL + C.

    In the Cloud console, on the Navigation menu, click Compute Engine > VM instances.
    Your two new instances should be listed.

    You can also use SSH to connect to your instance via gcloud. Make sure to add your zone, or omit the --zone flag if you've set the option globally:

        gcloud compute ssh gcelab2 --zone=$ZONE
    <ql-code-block>

    __Expected output__:

    <ql-code-block output="">
    WARNING: The public SSH key file for gcloud does not exist.
    WARNING: The private SSH key file for gcloud does not exist.
    WARNING: You do not have an SSH key for gcloud.
    WARNING: [/usr/bin/ssh-keygen] will be executed to generate a key.
    This tool needs to create the directory
    [/home/gcpstaging306_student/.ssh] before being able to generate SSH
    Keys.
    </ql-code-block>
    </ql-code-block>
    Type Y to continue.

    Do you want to continue? (Y/n)

    Generating public/private rsa key pair.
    Enter passphrase (empty for no passphrase)
    After connecting, disconnect from SSH by exiting from the remote shell:

    exit
    
    Task 4. Test your knowledge
    Test your knowledge about Google Cloud by taking the quiz. (Please select multiple correct options if necessary.)


    Through which of the following ways can you create a VM instance in Compute Engine?

    The gcloud command line tool

    The Cloud console

    Congratulations!
    Compute Engine is the foundation of Google Cloud's infrastructure as a service. You created a VM with Compute Engine and can now map your existing server infrastructure, load balancers, and network topology to Google Cloud.

    Finish your quest
    This self-paced lab is part of the Google Cloud Essentials quest. A quest is a series of related labs that form a learning path. Enroll in this quest and get immediate completion credit for taking this lab. See other available quests.

    Take your next lab
    Continue your quest with Getting Started with Cloud Shell and gcloud, or check out the following lab:

    Provision Services with Google Cloud Marketplace
    Next steps / Learn more
    For an overview of VMs, see Virtual Machine Instances.
    Check out how to migrate VMs to the Google Cloud.
    Learn more about subnetworks and network topology.
    And then be sure to choose the right VM type by reviewing Choosing a VM Machine.
    Google Cloud training and certification
    ...helps you make the most of Google Cloud technologies. Our classes include technical skills and best practices to help you get up to speed quickly and continue your learning journey. We offer fundamental to advanced level training, with on-demand, live, and virtual options to suit your busy schedule. Certifications help you validate and prove your skill and expertise in Google Cloud technologies.

