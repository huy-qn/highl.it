import { openDB, DBSchema } from 'idb';

const DB_VERSION = 1;
const DB_NAME = 'highlite-db';
const TABLE_NAME = 'highlights';

interface HighlightValue {
    highlights: string;
    notes?: string;
}

interface HighlightItem {
    key: string;
    value: HighlightValue;
}

interface HighlightsDBSchema extends DBSchema {
    [TABLE_NAME]: HighlightItem;
}

const DB = async () => await openDB<HighlightsDBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
        db.createObjectStore(TABLE_NAME);
    }
});

export const getHighlights = async (urlHash: string): Promise<HighlightValue | undefined> => {
    const db = await DB();
    return db.get(TABLE_NAME, urlHash);
};

export const setHighlights = async (urlHash: string, value: HighlightValue) => {
    const db = await DB();
    let cursor = await db.transaction(TABLE_NAME, 'readwrite').store.openCursor();
    while (cursor) {
        if (cursor.key === urlHash) {
            const updateData = {
                ...cursor.value,
                ...value
            };
            cursor.update(updateData);
            break;
        }
        cursor = await cursor.continue();
    }
};

export const getAllHighlightedUrls = async (): Promise<string[]> => {
    const db = await DB();
    const values = await db.getAllKeys(TABLE_NAME);
    return values.map((encodedUrl: string) => window.atob(encodedUrl));
};