import { MongoClient, Db, ObjectId, Filter } from 'mongodb';

const uri = process.env.MONGO_URI || '';
const dbName = 'swami_marvels_db';

if (!uri) {
  console.warn('MONGO_URI is not defined in environment variables.');
}

interface GlobalMongo {
  _mongoClientPromise?: Promise<MongoClient>;
}

declare const global: GlobalMongo & typeof globalThis;

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so the MongoClient is not repeatedly recreated during hot reloads
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, instantiate client per standard serverless lifetime
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getMongoClient(): Promise<MongoClient> {
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}

export function toMongoFilter(id: string): Filter<any> {
  if (ObjectId.isValid(id) && id.length === 24) {
    return { $or: [{ _id: new ObjectId(id) }, { _id: id }, { id }] } as Filter<any>;
  }
  return { $or: [{ _id: id }, { id }] } as Filter<any>;
}

export default clientPromise;
