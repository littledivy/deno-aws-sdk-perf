import { createServer } from 'http';
import { DynamoDBClient, ListTablesCommand  } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1", // Adjust this to your AWS region
  // requestHandler: new NodeHttpHandler({
  //   httpsAgent: new Agent({
  //     keepAlive: true,
  //     maxSockets: 100,
  //   }),
  // }),
});

const server = createServer(async (req, res) => {
  try {
    await client.send(new ListTablesCommand({}));
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("ok");
  } catch (error) {
    console.error("Failed to query:", error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end("Error querying DynamoDB");
  }
});

server.listen(8080, () => {
  console.log('Server running on port 8080');
});
