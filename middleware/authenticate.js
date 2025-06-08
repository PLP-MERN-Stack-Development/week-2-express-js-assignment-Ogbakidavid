// Authentication Middleware
module.exports = ((req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  const expectedApiKey = '1234567890abcdef';

  if (!apiKey) {
    return res.status(401).json({error: "Api key missing" });
  }

  if(apiKey !== expectedApiKey) {
    return res.status(403).json({ error: "Invalid Api key" });
  }

  next();
});