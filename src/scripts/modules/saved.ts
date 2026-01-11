import { getSetting, setSetting } from './browser';

let data: string[] = [];
let fetchedFromStorage = false;

export async function get(): Promise<string[]> {
    if (fetchedFromStorage) {
        return data;
    }

    const results = await getSetting('saved');
    if (results.saved) {
        data = results.saved;
    }

    fetchedFromStorage = true;
    return data;
}

export function add(colour: string): void {
    if (!fetchedFromStorage) {
        get().then(() => {
            addInternal(colour);
        });
    } else {
        addInternal(colour);
    }
}

function addInternal(colour: string): void {
    if (data.indexOf(colour) === -1) {
        data.push(colour);
        setSetting('saved', data);
    }
}

export function remove(index: number): string[] {
    data.splice(index, 1);
    setSetting('saved', data);
    return data;
}

export function clear(): string[] {
    data = [];
    setSetting('saved', data);
    return data;
}
