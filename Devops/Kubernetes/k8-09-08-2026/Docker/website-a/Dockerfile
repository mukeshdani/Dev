# Establish the lightweight Nginx web server environment
FROM nginx:1.27-alpine

# Remove default static landing page configurations
RUN rm -rf /usr/share/nginx/html/*

# Inject target static source artifacts into the web server root directory
COPY index.html /usr/share/nginx/html/index.html

# Expose standard HTTP interface port mapping
EXPOSE 80

# Execute server binary processes in the container foreground
CMD ["nginx", "-g", "daemon off;"]
