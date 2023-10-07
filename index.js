const fastify = require("fastify");
const cors = require("@fastify/cors");

require("dotenv").config();
const axios = require("axios");

const getRandomHandleFromAllPages = async (threadId) => {
  const authToken = process.env.AUTH_TOKEN;

  const userHandles = new Set();

  let currentPage = 1;
  let totalCount = null;
  let pageSize = null;

  do {
    try {
      const response = await axios.get(
        `https://api.starsarena.com/threads/answers?threadId=${threadId}&page=${currentPage}&pageSize=12`,
        {
          headers: {
            accept: "application/json",
            authorization: `Bearer ${authToken}`,
            "sec-ch-ua":
              '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
          },
        }
      );

      if (Array.isArray(response.data.threads)) {
        response.data.threads.forEach((item) => {
          userHandles.add(item.userHandle);
        });
      } else {
        console.error("Unexpected response structure:", response.data);
      }

      if (totalCount === null) {
        totalCount = response.data.count;
        pageSize = parseInt(response.data.pageSize, 10);
      }

      currentPage++;
    } catch (error) {
      console.error("Error fetching data:", error);
      break;
    }
  } while (currentPage <= Math.ceil(totalCount / pageSize));

  const handlesArray = [...userHandles];
  const randomHandle =
    handlesArray[Math.floor(Math.random() * handlesArray.length)];

  return {
    randomHandle,
    totalHandles: handlesArray.length,
  };
};

const extractThreadIdFromUrl = (url) => {
  const threadIdPattern = /status\/([\w\-]+)/;
  const match = url.match(threadIdPattern);
  return match && match[1] ? match[1] : null;
};

const server = fastify({
  trustProxy: true,
  ignoreTrailingSlash: true,
  disableRequestLogging: true,
});

server.register(cors, {
  // Allow all origins:
  origin: true,

  // You can customize the CORS policy with additional headers or methods. For example:
  // methods: ['GET', 'PUT', 'POST'],
  // allowedHeaders: ['Content-Type', 'Authorization']
});

// API route definition
server.get("/getRandomHandle", async (request, reply) => {
  const url = request.query.url; // We directly want the URL

  if (!url) {
    return reply
      .status(400)
      .send({ error: "url query parameter is required." });
  }
  const threadId = extractThreadIdFromUrl(url);

  if (!threadId) {
    return reply
      .status(400)
      .send({ error: "Invalid URL format. Couldn't extract threadId." });
  }

  try {
    const result = await getRandomHandleFromAllPages(threadId);
    return result;
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: "Failed to get random handle." });
  }
});

const port = parseInt(process.env.PORT) || 3000;

// Start the server
const start = async () => {
  try {
    console.log("Starting server...");

    await server.listen({ port: port, host: "0.0.0.0" });
    server.log.info(`Server listening on ${server.server.address()}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
