import { Injectable, Inject, OpaqueToken } from '@angular/core';
import { Util } from '../util/util.service';

export let STORAGE_CONFIG_TOKEN = new OpaqueToken('storage.config');

export interface IStorageConfig {
    keyPrefix?: string;
}

interface IKeyValue {
    key?: string
    id?: string
    value: any
}

@Injectable()
export class StorageService {
    private _prefix: string;

    session: StorageServiceImpl;
    local: StorageServiceImpl;

    constructor(
        util: Util,
        @Inject(STORAGE_CONFIG_TOKEN) config: IStorageConfig
    ) {
        this.session = new StorageServiceImpl(sessionStorage, util, () => this._prefix);
        this.local = new StorageServiceImpl(localStorage, util, () => this._prefix);

        config = config || {};
        this._prefix = config.keyPrefix || '';
    }

    /**
     * Sets the string to prepend to storage keys.
     * @param prefix - the key prefix to use
     * @returns the current value if used as getter or itself (chaining) if used as setter
     */
    keyPrefix(prefix?: string): string {
        if (prefix) {
            this._prefix = prefix || '';
        } else {
            return this._prefix;
        }
    }
}


/**
 * A wrapper around sessionStorage or localStorage.
 */
class StorageServiceImpl {
    constructor(
        private _storage: Storage,
        private _util: Util,
        private _getPrefix: () => string
    ) {}

    /**
     * Adds an item to storage.
     * @returns true if the value was successfully stored, otherwise false
     */
    setItem(key: string, value: any): boolean {
        if (!this._util.isString(key) || this._util.isEmpty(key)) {
            return false;
        }

        if (this._util.isString(value)) {
            this._storage.setItem(this._getPrefix() + key, <string>value);
        } else {
            this._storage.setItem(this._getPrefix() + key, JSON.stringify(value));
        }
        return true;
    }

    /**
     * Gets an item from storage.
     */
    getItem(key: string): any {
        if (!this._util.isString(key) || this._util.isEmpty(key)) {
            return null;
        }

        let value = this._storage.getItem(this._getPrefix() + key);
        try {
            //try to convert to object
            return JSON.parse(value);
        }
        catch (err) {}

        return value;
    }

    /**
     * Removes an item from storage.
     * @returns true if the value was successfully removed, otherwise false
     */
    removeItem(key: string): boolean {
        if (!this._util.isString(key) || this._util.isEmpty(key)) {
            return false;
        }
        this._storage.removeItem(this._getPrefix() + key);
        return true;
    }

    /**
     * Clears all values from storage.
     */
    clear(): void {
        this._storage.clear();
    }

    /**
     * Determines if the specified key is in storage.
     */
    containsKey(key: string): boolean {
        if (!this._util.isString(key) || this._util.isEmpty(key)) {
            return false;
        }

        for (let i = 0; i < this._storage.length; i++) {
            if (this._storage.key(i) === this._getPrefix() + key) {
                return true;
            }
        }
        return false;
    }
}
