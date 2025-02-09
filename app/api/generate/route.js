
// import clientPromise from "@/lib/mongodb"

// export async function POST(request) {

//     const body = await request.json() 
//     const client = await clientPromise;
//     const db = client.db("Shortify")
//     const collection = db.collection("url")

//     // Check if the short url exists
//     const doc = await collection.findOne({shorturl: body.shorturl})
//     if(doc){
//         return Response.json({success: false, error: true,  message: 'URL already exists!' })
//     }

//     const result = await collection.insertOne({
//         url: body.url,
//         shorturl: body.shorturl
//     })

//     return Response.json({success: true, error: false,  message: 'URL Generated Successfully' })
//   }

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    // Validate Request Body
    const body = await request.json().catch(() => null);
    if (!body || !body.url || !body.shorturl) {
        return NextResponse.json({ success: false, error: true, message: "Invalid request body!" });
    }

    // Connect to MongoDB
    let client;
    try {
        client = await clientPromise;
    } catch (error) {
        return NextResponse.json({ success: false, error: true, message: "Database connection failed!" });
    }

    const db = client.db("Shortify");
    const collection = db.collection("url");

    // Check if the short URL already exists
    let doc;
    try {
        doc = await collection.findOne({ shorturl: body.shorturl });
    } catch (error) {
        return NextResponse.json({ success: false, error: true, message: "Database query failed!" });
    }

    if (doc) {
        return NextResponse.json({ success: false, error: true, message: "URL already exists!" });
    }

    // Insert new URL
    try {
        await collection.insertOne({ url: body.url, shorturl: body.shorturl });
    } catch (error) {
        return NextResponse.json({ success: false, error: true, message: "Failed to insert URL!" });
    }

    return NextResponse.json({ success: true, error: false, message: "URL Generated Successfully!" });
}
