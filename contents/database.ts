import { openDB, DBSchema, IDBPDatabase } from 'idb';

const DB_VERSION = 1;
const DB_NAME = 'highlite-db';
const TABLE_NAME = 'highlights';

interface HighlightItem {
    key: string;
    value: string;
}

interface HighlightsDBSchema extends DBSchema {
    [TABLE_NAME]: HighlightItem;
}

const DB = async () => await openDB<HighlightsDBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
        db.createObjectStore(TABLE_NAME);
    }
});

export const getHighlights = async (urlHash: string) => {
    const db = await DB();
    return db.get(TABLE_NAME, urlHash);
};

export const setHighlights = async (urlHash: string, value: string) => {
    const db = await DB();
    return db.put(TABLE_NAME, value, urlHash);
};

export const getAllHighlightedUrls = async (): Promise<string[]> => {
    const db = await DB();
    const values = await db.getAllKeys(TABLE_NAME);
    return values.map((encodedUrl: string) => window.atob(encodedUrl));
};