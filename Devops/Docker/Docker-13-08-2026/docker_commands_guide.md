# RUN vs CMD vs ENTRYPOINT

These three commands are the most confused instructions in Docker.

---

## 1. The Simple Analogy: Building and Driving a Car

Imagine Docker is a car factory. 

* **`RUN` is the Factory Mechanic:** This happens at the factory (`docker build`). The mechanic installs the engine. Once the car leaves the factory, the mechanic's job is completely finished.
* **`CMD` is the Flexible GPS:** This happens when you sit in the car and turn the key (`docker run`). The GPS is set to "Supermarket" by default. But if you shout "Beach!", the car completely ignores the Supermarket and goes to the beach instead. It is easily replaced.
* **`ENTRYPOINT` is the Strict Engine:** This also happens when you turn the key. The engine is programmed to "Drive Forward." If you shout "Honk the horn!", the car does NOT stop driving forward. It drives forward *AND* honks the horn. It glues your command to its core function.

```mermaid
flowchart LR
    subgraph Factory ["1. The Factory (RUN - Build Time)"]
        direction TB
        F1["docker build"]
        F2["Mechanic installs parts<br>RUN install-engine<br>(Happens ONCE)"]
        F1 --> F2
    end
    
    subgraph Driving ["2. Driving the Car (CMD & ENTRYPOINT - Run Time)"]
        direction TB
        D1["docker run"]
        
        subgraph CMD ["CMD (Flexible GPS)"]
            C1["Default: Drive to Supermarket"]
            C2["User says: 'Go to Beach!'"]
            C3["Result: Car ignores Supermarket,<br>drives to Beach."]
            C1 -.-> C2 --> C3
        end
        
        subgraph ENTRY ["ENTRYPOINT (Strict Engine)"]
            E1["Core Function: Drive Forward"]
            E2["User says: 'Honk Horn!'"]
            E3["Result: Car drives forward<br>AND honks horn!"]
            E1 -.-> E2 --> E3
        end
        
        D1 --> CMD
        D1 --> ENTRY
    end
    
    Factory --> Driving
```

---

## 2. The Timeline: When do they happen in code?

Moving back to the technical side, the biggest difference between `RUN` and `CMD`/`ENTRYPOINT` is the timeline. 
* **`RUN`** executes on your laptop while the image is being created. It is used to install software.
* **`CMD` & `ENTRYPOINT`** do absolutely nothing during the build process. They only wake up and execute when the container is finally started on a server.

```mermaid
flowchart LR
    subgraph BuildPhase ["Build Phase (Happens once)"]
        direction TB
        B1["docker build"]
        R["RUN apt-get install python3<br>Executes NOW and saves the software to the image."]
        B1 --> R
    end
    
    Image[/"Locked Docker Image"/]
    
    subgraph RunPhase ["Run Phase (Happens every time)"]
        direction TB
        R1["docker run"]
        C["CMD / ENTRYPOINT<br>Executes NOW to start your application."]
        R1 --> C
    end
    
    BuildPhase --> Image --> RunPhase
```

---

## 3. CMD vs ENTRYPOINT (Technical Behavior)

Here is exactly what happens in your terminal when you try to pass extra arguments to your container.

```mermaid
flowchart TD
    subgraph CMD_Behavior ["CMD Behavior (Easily Overridden)"]
        direction TB
        C_Def["Dockerfile:<br>CMD ['echo', 'Hello']"]
        
        C_Run1["User types:<br>docker run my-app"]
        C_Res1["Container Executes:<br>echo Hello"]
        
        C_Run2["User types:<br>docker run my-app Goodbye"]
        C_Res2["Container Executes:<br>Goodbye<br>(echo Hello is completely ignored and thrown away!)"]
        
        C_Def --> C_Run1 --> C_Res1
        C_Def --> C_Run2 --> C_Res2
    end
    
    subgraph ENTRY_Behavior ["ENTRYPOINT Behavior (Strict Appending)"]
        direction TB
        E_Def["Dockerfile:<br>ENTRYPOINT ['echo', 'Hello']"]
        
        E_Run1["User types:<br>docker run my-app"]
        E_Res1["Container Executes:<br>echo Hello"]
        
        E_Run2["User types:<br>docker run my-app Goodbye"]
        E_Res2["Container Executes:<br>echo Hello Goodbye<br>(Goodbye is glued to the end!)"]
        
        E_Def --> E_Run1 --> E_Res1
        E_Def --> E_Run2 --> E_Res2
    end
```

---

## 4. The Professional Pattern (Using them together)

The absolute best practice in Docker is to use them together. 

You use `ENTRYPOINT` to define the main software that must always run (like `ping` or `npm`), and you use `CMD` to define the default arguments that the user is allowed to change. 

If the user provides no input, it uses the `CMD` default. If the user provides input, it replaces `CMD` but keeps `ENTRYPOINT`!

```mermaid
flowchart TD
    subgraph ProPattern ["The Pro Pattern: ENTRYPOINT + CMD"]
        direction TB
        P_Def["Dockerfile:<br>ENTRYPOINT ['ping']<br>CMD ['google.com']"]
        
        P_Run1["User types:<br>docker run my-ping"]
        P_Res1["Container Executes:<br>ping google.com<br>(Combines both!)"]
        
        P_Run2["User types:<br>docker run my-ping yahoo.com"]
        P_Res2["Container Executes:<br>ping yahoo.com<br>(yahoo.com successfully replaces google.com)"]
        
        P_Def --> P_Run1 --> P_Res1
        P_Def --> P_Run2 --> P_Res2
    end
```

### Summary Rule of Thumb:
* Need to **install** something? Use `RUN`.
* Need to **start** your app, but want users to easily open a `bash` terminal inside it instead? Use `CMD`.
* Building a container that acts like a strict command-line tool? Use `ENTRYPOINT` and `CMD` together.
