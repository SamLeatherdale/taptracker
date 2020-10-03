import {SettingsType, TransactionList, TransactionType} from "../types";

const KEY_TRANSACTIONS = "taptrack.transactions";
const KEY_SETTINGS = "taptrack.settings";

export function getSavedTransactions(): TransactionList {
    const raw = localStorage.getItem(KEY_TRANSACTIONS) || '';
    let savedItems: TransactionList;
    try {
        savedItems = JSON.parse(raw)
    } catch {
        savedItems = {};
    }

    return savedItems;
}
export function storeTransactions(items: TransactionList) {
    localStorage.setItem(KEY_TRANSACTIONS, JSON.stringify(items));
}
export function getSavedSettings(): SettingsType {
    const raw = localStorage.getItem(KEY_SETTINGS) || '';
    let settings;
    try {
        settings = JSON.parse(raw);
    } catch {
        settings = {}
    }
    return {
        rolloverDay: 1,
        transactionCount: 5,
        ...settings,
    }
}
export function storeSettings(settings: SettingsType) {
    localStorage.setItem(KEY_SETTINGS, JSON.stringify(settings));
}