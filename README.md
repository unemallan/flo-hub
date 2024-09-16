# Setting up a Flo-Hub App on EC2 Instance

## Update Build on EC2 Ubuntu Server

### Step 1: SSH into EC2 Ubuntu Server
  ```bash
  git sync flo-hub
  ```
### Step 2: Install all the required dependencies
  ```bash
  cd flo-hub
  npm install
  #npm update
  ```
### Step 3: Create Production Build
  ```bash
  npm run build
  #clear the old build files
  sudo rm -rf /var/www/vhosts/frontend/*
  #copy the new build files to the frontend folder
  sudo cp -R build/ /var/www/vhosts/frontend/
  ```

## FOR FRESH BUILDS ON NEW EC2 INSTANCES

### Step 1: Launch an AWS EC2 Ubuntu Server

- Log in to the AWS Management Console.
- Navigate to the EC2 Dashboard.
- Click on “Launch Instance” and choose an Amazon Machine Image (AMI)

### Step 2: Connecting to the EC2 Instance

- ssh into the EC2

### Step 3: Installing Node.js, NPM, and Nginx

```bash
sudo apt-get update -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo apt install npm -y
sudo apt install nginx -y
```
### Step 4: Cloning ReactJS App to EC2

- For Public Repository:
  ```bash
  git clone <YOUR-GIT-Repo>
  ```
- For Private Repository:
  ```bash
  git clone <YOUR-GIT-Repo>
  ```

it will ask you for your GitHub username and password. You can use a Personal Access Token instead of a password.  

### Step 5: Install all the required dependencies
  ```bash
  cd <project-folder>
  npm install
  ```
### Step 6: Create Production Build
  ```bash
  npm run build
  ## For Next
  NODE_ENV=production npm run start

  ##For React (OLD)
  sudo mkdir /var/www/vhosts/frontend/
  sudo cp -R build/ /var/www/vhosts/frontend/
  ```
### Step 7: Create Nginx File
with this command, you can check if already a default nginx file exists. You have to remove it.


```bash
cd /etc/nginx/sites-enabled/
sudo rm -rf default
```

- Create a configuration file for Nginx using the following command:
  ```bash
  sudo vim /etc/nginx/sites-available/<nginx-file-name>
  ```

- Paste the provided server configuration inside the file created.

 ### NextJS
   ```bash
  server {
    listen 80 default_server;
    server_name _;

    location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
      }
  }
  ```
 
 ### OLD REACT
  ```bash
  server {
    listen 80 default_server;
    server_name _;

    location / {
        autoindex on;
        root /var/www/vhosts/frontend/build;
        try_files $uri /index.html;
      }
  }
  ```
  
- Activate the configuration using the following command:

  ```bash
  sudo ln -s /etc/nginx/sites-available/<nginx-file-name> /etc/nginx/sites-enabled/
  sudo gpasswd -a www-data ubuntu 
  ```
### Step 8: Start the Application
- Restart Nginx and allow the changes to take place.
  ```bash
  sudo systemctl restart nginx
  sudo service nginx restart
  ```
- Additionally, in case of errors, you can check error logs and status.
### Step 9: Domain and SSL setup
**Domain**

First, you have to Public IP address or ec2 instance as An R3cord of your domain, it can be on any domain provider like GoDaddy. You can also watch the video.

**SSL Setup**

  ```bash
  sudo apt-get install certbot python3-certbot-nginx
  sudo certbot --nginx -d flo-labs.com
  sudo systemctl reload nginx
  ```
##### Make sure CloudFlare is set to use Full SSL instead of flexible, else https will loop

### Step 10: Conclusion
Deploying a ReactJS application on an AWS EC2 instance requires careful configuration and setup. By following these steps, you can successfully launch your application and serve it using Nginx, ensuring a seamless user experience.



# NextUI README

## Next.js & NextUI Template

This is a template for creating applications using Next.js 14 (pages directory) and NextUI (v2).

[Try it on CodeSandbox](https://githubbox.com/nextui-org/next-pages-template)

>Note: Since Next.js 14, the pages router is recommend migrating to the [new App Router](https://nextjs.org/docs/app) to leverage React's latest features
>
>Read more: [Pages Router](https://nextjs.org/docs/pages)

### Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI](https://nextui.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org)
- [Framer Motion](https://www.framer.com/motion)
- [next-themes](https://github.com/pacocoursey/next-themes)

### How to Use

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/nextui-org/next-pages-template
```

#### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

#### Run the development server

```bash
npm run dev
```

#### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

### License

Licensed under the [MIT license](https://github.com/nextui-org/next-pages-template/blob/main/LICENSE).
