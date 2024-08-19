import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, Db } from 'mongodb';
import mongoClientPromise from '@/lib/mongodb'; // Adjust the path based on your setup

export async function GET(req: NextRequest) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("OnlineExam");

    const query = req.nextUrl.searchParams;
    const searchField = query.get('field');
    const searchValue = query.get('value');

    if (!searchField || !searchValue) {
        return NextResponse.json({ success: false, message: 'Missing search parameters' }, { status: 400 });
    }

    try {
        const searchResults = await db.collection('questions').find({
            [searchField]: { $regex: searchValue, $options: 'i' }  // Case-insensitive search
        }).toArray();

        if (searchResults.length === 0) {
            const results = await db.collection('questions').find({
                [`examName`]: { $regex: searchValue, $options: 'i' }  // Case-insensitive search
            }).toArray();

            return NextResponse.json({ success: true, data: results }, { status: 200 });    
        }

        return NextResponse.json({ success: true, data: searchResults }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Failed to fetch search results' }, { status: 500 });
    }
}
