# Starsarena Giveaway Tool

This project is a tool designed for conducting giveaways for the Starsarena website. It's a Node.js based project.
<img width="633" alt="Ekran Resmi 2023-10-07 15 57 18" src="https://github.com/izzetemredemir/starsarena-giveaway-tool/assets/11755605/16280666-86c1-4cdd-8ddc-52b43c9b1a13">


## Getting Started


Begin by cloning the repository:

```bash
git clone https://github.com/izzetemredemir/starsarena-giveaway-tool.git
```

Navigate into the directory:

```bash
cd starsarena-giveaway-tool
```

## Installation

Before running the application, make sure to install the necessary npm packages:

```bash
npm install
```

## .env File Configuration

To ensure the application functions correctly, specific environment variables need to be set in the `.env` file. An example of this file, `.env.example`, is provided in this repository. Use this example to set up your `.env` file:

```bash
cp .env.example .env
```

Within the `.env` file, make sure to provide the necessary Bearer token. This will be essential for certain operations within the application.

## Deploy with Docker

If you'd like to run the application using Docker, you can utilize the following commands:

```bash
# Build the Docker image
docker build -t starsarena-giveaway-tool .

# Start the container
docker run -p 3000:3000 starsarena-giveaway-tool
```

Once executed, your application should be accessible at `http://localhost:3000`.

