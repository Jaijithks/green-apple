import mongoose from "mongoose";
import dns from "dns";

/**
 * Configure reliable DNS servers to resolve MongoDB Atlas SRV records on Windows/local networks
 */
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
  if (typeof (dns as any).setDefaultResultOrder === "function") {
    (dns as any).setDefaultResultOrder("ipv4first");
  }
} catch {
  // Ignored in environments where custom DNS cannot be configured
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export function isPlaceholderUri(uri?: string): boolean {
  if (!uri) return true;
  return (
    uri.includes("YOUR_USERNAME") ||
    uri.includes("YOUR_PASSWORD") ||
    uri.includes("YOUR_CLUSTER") ||
    uri.trim() === ""
  );
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;

  if (isPlaceholderUri(uri)) {
    return null;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // Ensure DNS resolvers are configured for Atlas SRV lookup
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
    if (typeof (dns as any).setDefaultResultOrder === "function") {
      (dns as any).setDefaultResultOrder("ipv4first");
    }
  } catch {
    // Ignore in unsupported environments
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      dbName: process.env.MONGODB_DB || "green_apple",
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(uri!, opts).then((m) => {
      console.log("✓ MongoDB Connected to:", m.connection.name);
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error: any) {
    cached.promise = null;
    cached.conn = null;
    console.error("MongoDB connection failed:", error?.message || error);
    return null;
  }
}

export async function getDbStatus(): Promise<{
  isConnected: boolean;
  statusText: string;
  database?: string;
  isPlaceholder: boolean;
}> {
  const uri = process.env.MONGODB_URI;
  const isPlaceholder = isPlaceholderUri(uri);

  if (isPlaceholder) {
    return {
      isConnected: false,
      statusText: "Placeholder Mode (Local Fallback Active)",
      database: process.env.MONGODB_DB || "green_apple",
      isPlaceholder: true,
    };
  }

  try {
    const conn = await connectToDatabase();
    if (conn && mongoose.connection.readyState === 1) {
      return {
        isConnected: true,
        statusText: "Connected (Live MongoDB)",
        database: mongoose.connection.name,
        isPlaceholder: false,
      };
    }
  } catch {
    // Handled below
  }

  return {
    isConnected: false,
    statusText: "Disconnected (Fallback Active)",
    database: process.env.MONGODB_DB || "green_apple",
    isPlaceholder: false,
  };
}
