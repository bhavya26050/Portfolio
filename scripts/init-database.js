// MongoDB Database Initialization Script
// This script sets up the initial collections and indexes for the portfolio

import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DB_NAME = "portfolio"

async function initializeDatabase() {
  console.log("🚀 Initializing MongoDB database...")

  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("✅ Connected to MongoDB")

    const db = client.db(DB_NAME)

    // Create collections
    const collections = ["analytics", "downloads", "contacts"]

    for (const collectionName of collections) {
      try {
        await db.createCollection(collectionName)
        console.log(`✅ Created collection: ${collectionName}`)
      } catch (error) {
        if (error.code === 48) {
          console.log(`ℹ️  Collection ${collectionName} already exists`)
        } else {
          console.error(`❌ Error creating collection ${collectionName}:`, error.message)
        }
      }
    }

    // Create indexes for better performance
    console.log("📊 Creating indexes...")

    // Contacts collection indexes
    await db.collection("contacts").createIndex({ createdAt: -1 })
    await db.collection("contacts").createIndex({ status: 1 })
    await db.collection("contacts").createIndex({ email: 1 })
    console.log("✅ Created indexes for contacts collection")

    // Downloads collection indexes
    await db.collection("downloads").createIndex({ downloadedAt: -1 })
    await db.collection("downloads").createIndex({ type: 1 })
    console.log("✅ Created indexes for downloads collection")

    // Analytics collection indexes
    await db.collection("analytics").createIndex({ timestamp: -1 })
    await db.collection("analytics").createIndex({ event: 1 })
    console.log("✅ Created indexes for analytics collection")

    // Insert sample data (optional)
    console.log("📝 Inserting sample data...")

    // Sample analytics data
    await db.collection("analytics").insertOne({
      event: "portfolio_initialized",
      timestamp: new Date(),
      data: {
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development",
      },
    })

    console.log("🎉 Database initialization completed successfully!")

    // Display collection stats
    console.log("\n📈 Collection Statistics:")
    for (const collectionName of collections) {
      const count = await db.collection(collectionName).countDocuments()
      console.log(`  ${collectionName}: ${count} documents`)
    }
  } catch (error) {
    console.error("❌ Database initialization failed:", error)
    throw error
  } finally {
    await client.close()
    console.log("🔌 Disconnected from MongoDB")
  }
}

// Run the initialization
initializeDatabase()
  .then(() => {
    console.log("✅ Database setup complete!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Database setup failed:", error)
    process.exit(1)
  })
