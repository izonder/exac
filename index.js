class ExistentialProxy {
    /**
     * Proxy wrapper for existential access
     * @param terminator
     */
    constructor(terminator) {
        this.terminator = terminator;
    }

    /**
     * Override get method
     * @param target
     * @param name
     * @returns {Proxy|*}
     */
    get(target, name) {
        return this.terminator === name ?
            target.entity :
            new Proxy(target.get(name), this);
    }
}

class ExistentialWrapper {
    /**
     * Lazy wrapper for proxied entities
     * @param entity
     */
    constructor(entity) {
        this.entity = entity;
    }

    /**
     * Getter
     * @param key
     * @returns {ExistentialWrapper}
     */
    get(key) {
        return new ExistentialWrapper(this.contains(key) ? this.entity[key] : undefined);
    }

    /**
     * Check if the property is exist
     * @param key
     * @returns {boolean}
     */
    contains(key) {
        return this.isObject() && key in this.entity;
    }

    /**
     * Check if it's an object
     * @returns {boolean}
     */
    isObject() {
        return typeof this.entity === 'object' && !!this.entity;
    }
}

const DEFAULT_GETTER = '$';

/**
 * Existential accessor (terminator $ is mandatory)
 * Example: a.b.c.$ <=> a.?b.?c
 * @param entity
 * @param terminator
 * @returns {Proxy}
 */
module.exports = function (entity, terminator = DEFAULT_GETTER) {
    return new Proxy(new ExistentialWrapper(entity), new ExistentialProxy(terminator));
};
