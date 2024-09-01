Notes App Setup with Docker

This README outlines the steps to set up and deploy a "Notes App" using Docker. The setup includes running a MySQL database in a Docker container, building and deploying the Node.js application, and pushing the Docker image to a Docker registry.

Prerequisites
Ubuntu (or a similar Linux distribution)
Docker installed

Setup Instructions

1. Update System Packages :
Update the system package list to ensure you have the latest versions available.

        sudo apt update

2. Install Docker :
Install Docker to run containers on your system.

        sudo apt install docker.io

3. Manage Docker as a Non-Root User :
Add your user to the Docker group to manage Docker without needing sudo.

        sudo usermod -aG docker $USER

Important: Log out and log back in so that your group membership is re-evaluated.

4. Adjust Docker Socket Permissions :
Change the permissions of the Docker socket to avoid permission issues.

        sudo chmod 767 /var/run/docker.sock

5. Create Docker Volumes :
Create a Docker volume to persist MySQL data.

        docker volume create mysqldata

Inspect the volume to ensure it has been created.

        docker volume inspect mysqldata

6. Create a Docker Network :
Create a custom Docker network for the application containers to communicate.

        docker network create notes-app-twotier

Verify the network creation.

        docker network ls

7. Run MySQL Container :
Start a MySQL container with the created volume and network.

        docker run -d -v mysqldata:/var/lib/mysql --network notes-app-twotier --name notes-mysql -e MYSQL_ROOT_PASSWORD=yourpassword -e MYSQL_DATABASE=notes-app -p 3306:3306 mysql:5.7

8. Build the Node.js Application Docker Image :
Build the Docker image for your Node.js application.

        docker build -t notes-app:latest .

9. Run the Node.js Application Container :
Start the Node.js application container, connecting it to the MySQL container.

        docker run -d -p 3000:3000 --network notes-app-twotier --name notes-app-project -e MYSQL_HOST=notes-mysql -e MYSQL_USER=root -e MYSQL_ROOT_PASSWORD=yourpassword -e MYSQL_DATABASE=notes-app notes-app:latest

Alternative: Use Docker Compose to start the containers.

        docker compose up -d

10. Verify Running Containers :
Check the status of your running containers.

        docker ps

11. Push the Docker Image to a Registry :
Log in to Docker Hub (or any other registry).

        docker login -u <your-username>

Tag the Docker image for the registry.

        docker tag notes-app:latest <your-username>/notes-app:latest

Push the Docker image to the registry.

        docker push <your-username>/notes-app:latest

Navigate to http://localhost:3000 in your web browser. You should see the notes app interface, allowing you to add, view, and delete notes.
