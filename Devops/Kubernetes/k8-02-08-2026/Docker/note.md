Build Process Execution
# Compile image artifacts for Website A
docker build -t static-portal-a:v1.0.0 ./website-a

# Compile image artifacts for Website B
docker build -t static-portal-b:v1.0.0 ./website-b


Running and Validating the Container Runtimes
# Instantiate Website A mapped to Host Port 8081
docker run -d -p 8081:80 --name running-portal-a static-portal-a:v1.0.0

# Instantiate Website B mapped to Host Port 8082
docker run -d -p 8082:80 --name running-portal-b static-portal-b:v1.0.0


Updated Docker Hub Tagging & Push Pipeline
# 1. Tag your local website images with the new naming scheme
docker tag static-portal-a:v1.0.0 mukeshdani9/mukeshui-a:v1.0.0
docker tag static-portal-b:v1.0.0 mukeshdani9/mukeshui-b:v1.0.0

# 2. Push your images to Docker Hub
docker push mukeshdani9/mukeshui-a:v1.0.0
docker push mukeshdani9/mukeshui-b:v1.0.0
