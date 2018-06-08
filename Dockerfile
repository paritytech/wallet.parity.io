FROM smebberson/alpine-base:3.0.0

# Install nginx
RUN apk --update add nginx 

# Create run dir 
RUN mkdir -p /run/nginx

# Add the files
ADD src /var/lib/nginx/html

# Expose the ports for nginx
EXPOSE 80

# Run service
ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]


