import NodeCache from "node-cache";

// Create the cache object with a TTL of 600 seconds
const cache = new NodeCache({ stdTTL: 600 });

export default cache;
