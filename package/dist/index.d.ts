type CompareFunction<V> = (a: V, b: V) => number;
declare class Cache<K, V> extends Map<K, V> {
    get size(): number;
    map<U>(fn: (val: V, key: K, map: Cache<K, V>) => U): U[];
    mapVal<U>(fn: (val: V, key: K, map: Cache<K, V>) => U): U[];
    first(): V | undefined;
    find(fn: (val: V, key: K, map: Cache<K, V>) => boolean): V | undefined;
    filter(fn: (val: V, key: K, map: Cache<K, V>) => boolean): Cache<K, V>;
    filterKey(fn: (key: K) => boolean): Cache<K, V>;
    last(): V | undefined;
    lastKey(): K | undefined;
    tap(fn: (map: Cache<K, V>) => void): Cache<K, V>;
    has(k: K): boolean;
    array(): V[];
    keyArray(): K[];
    hasAll(...c: K[]): boolean;
    hasAny(...keys: K[]): boolean;
    some(fn: (val: V, key: K, map: Cache<K, V>) => boolean): boolean;
    random(): V | undefined;
    remove(key: K): boolean;
    removeByValue(fn: (val: V, key: K, map: Cache<K, V>) => boolean): void;
    get(k: K): V | undefined;
    every(fn: (val: V, key: K, map: Cache<K, V>) => boolean): boolean;
    each(fn: (val: V, key: K, map: Cache<K, V>) => void): Cache<K, V>;
    randomKey(): K | undefined;
    equals(cache: Cache<K, V>): boolean;
    difference(cache: Cache<K, V>): K[] | string;
    findKey(fn: (val: V, key: K, map: Cache<K, V>) => boolean): K | undefined;
    sort(compareFn?: CompareFunction<V>): Cache<K, V>;
    clear(): void;
    at(index?: number): V | undefined;
    static defaultCompareFunction<V>(a: V, b: V): number;
}

export { Cache as default };
