import app from '../server.js';
import serverless from 'serverless-http';

const serverlessHandler = serverless(app);

export default async function handler(req, res) {
  console.log("📥 API request received:", req.method, req.url);
  return serverlessHandler(req, res);
}
