$DOCKERHUB_USER = "mukeshdani9"

# 1. Login to Docker Hub
# Yeh command aapse Docker Hub ka password/PAT (Personal Access Token) mangegi
docker login -u $DOCKERHUB_USER

# 2. Define Repositories
$repos = @(
    "axion-database-schema",
    "axion-data-simulator",
    "axion-telemetry-query-service",
    "axion-ingestion-service",
    "axion-ui"
)

# 3. Build, and Push
foreach ($repo in $repos) {
    Write-Host "Processing $repo..." -ForegroundColor Green
    
    cd $repo
    
    # Build Image
    docker build -t "$DOCKERHUB_USER/$repo:latest" .
    
    # Push Image to Docker Hub
    docker push "$DOCKERHUB_USER/$repo:latest"
    
    cd ..
    Write-Host "Completed $repo!" -ForegroundColor Cyan
}

Write-Host "All images built and pushed to Docker Hub successfully!" -ForegroundColor Green
