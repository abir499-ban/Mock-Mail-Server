# Mock Mail Server

This project is a distributed real-time mock mailing application that enables users to securely upload documents, send/receive mock emails, and receive instant status updates. Leveraging a Next.js frontend, Node.js/Express backend, MongoDB, Redis queues, and WebSockets, the system simulates the email sending process in a scalable, real-time environment making it ideal for studying messaging architecture where real email delivery is not required.

## Project Overview and Features
Secure platform for document sharing via email with:
1. Cloudinary signed URLs for direct client uploads for file attachments.
2. Redis-backed mail processing queue
3. Real-time incoming email updates via WebSockets and Redis Pub Sub
4. MongoDB for persistent storage
5. Separate Mail Consumer for mail processing and staged updates.
6. Secure and robust authentication for users.


## Attaching some screenshots
![image](https://github.com/abir499-ban/Mock-Mail-Server/blob/main/mail_server_frontend/public/assets/Screenshot%202025-06-08%20020842.png)

![image](https://github.com/abir499-ban/Mock-Mail-Server/blob/main/mail_server_frontend/public/assets/Screenshot%202025-06-08%20020914.png)

![image](https://github.com/abir499-ban/Mock-Mail-Server/blob/main/mail_server_frontend/public/assets/Screenshot%202025-06-08%20020930.png)

## System Design
![image](https://github.com/abir499-ban/Mock-Mail-Server/blob/main/mail_server_frontend/public/assets/Screenshot%202025-06-07%20194457.png)
   

##  Tech Stack
**Frontend** : `Next.js`

**UI and Styling**: `Tailwind CSS`  .  `Shadcn`

**Backend** : `Node.js` · `Express` 

**Database** : `MongoDB`

**Cloud Storage** : `Cloudinary`  

**Messaging Queue** : `Redis List`

**Real Time Communication** : `Web Socket`

**Message Broker** : `Redis Pub-Sub`

**Authentication** : `Next-Auth`

## Installation
  **Requirements**:
    -  Node.js ≥ 18
    -  npm
    -  MongoDB (local or Cloud Hosted)
    -  Cloudinary Media Media Library credentials
    -  WSL hosted Redis

1. Fork the Project, then run the commands:
   
```bash 
  git clone https://github.com/abir499-ban/Mock-Mail-Server
  cd Mock-Mail-Server
``` 
  
2. Setting up the dev server
   ```bash
       cd mail_frontend_server
       npm i
   ```

   Create a `.env.local` file at the root of this directory:
    ```bash
        NEXTAUTH_SECRET=<a random string>
      ```
   Start the dev server
   ```bash
         npm run dev
   ```

3. Open a new Terminal for starting the primary backend
   ```bash
          cd server
          npm i
   ```
   Create a .env file at the root of this directoy:
   ```bash
     BACKEND_BASE_URL=<backend port>
    MONGO_DB_URI=<mongo db url>
    SECRET_KEY=<jwt auth secret>
    CLOUD_NAME=<cloudinary cloud name>
    API_KEY=<cloudinary API KEY>
    CLOUD_SECERT=<cloudinary cloud secret>
    REDIS_URL=<redis instance url>
   ```
   Start the server
   ```bash
       npm run start
   ```

4. Start the mail Consumer Service
     ```bash
         cd server/utils
         node redisMailConsumer.js
     ```

5. Open a new Terminal for Setting up the Web socket server.
   ```bash
     cd wss_server
     npm i
     npm run start
   ```
   


    

## What is Project focusses on?
This project spins up a messaging architecture by using Redis both as a queue and as a publish/subscribe (pub/sub) system, which are foundational patterns for distributed messaging in modern applications.

**Messaging Architecture**
In my workflow, when a user sends an email request, the backend registers the email in the database and pushes the mail ID into a Redis queue. This queue decouples the process of receiving email requests from the process of handling and sending emails. A separate mail consumer service (which is just another Node.js running process )  pops mail IDs from the queue, processes them, and then uses Redis pub/sub to notify other components (like the WebSocket server) about status changes. This pattern allows different parts of the system to communicate through messages rather than direct calls, which is a typical feature of messaging architecture. [Read more about Messaging architecture here](https://dev.to/lazypro/message-queue-in-redis-38dm)

**Loose Coupling**
By using Redis queues and pub/sub, the services operate independently. The component that receives email requests does not need to know how or when the emails are processed; it simply enqueues a message. The consumer service, in turn, processes messages as they arrive, and the notification mechanism (via pub/sub and WebSockets) is separately responsible for updating clients. This separation reduces dependencies between services, making the system more modular, maintainable, and resilient to failures in individual components.

**Asynchronous Programming**
Redis queues enable asynchronous workflows: producers (the backend) can enqueue messages instantly and continue handling new requests without waiting for the consumer to finish processing. Consumers (mail processing services) work independently, picking up tasks from the queue as resources allow. Similarly, pub/sub allows notifications to be sent and received without blocking the main application flow, ensuring real-time updates while maintaining high throughput and responsiveness.



------------------------------------------------
Thank you for checking out this project!  
If you have any questions, feedback, or suggestions, feel free to open an issue or submit a pull request.

