class ExistentialProxy {
    /**
     * Proxy wrapper for existential access
     * @param target
     * @param name
     * @returns {Proxy|*}
     */
    get(target, name) {
        return target.terminator === name ?
            target.entity :
            new Proxy(target.get(name), new ExistentialProxy());
    }
}

class ExistentialWrapper {
    /**
     * Lazy wrapper for proxied entities
     * @param entity
     * @param terminator
     */
    constructor(entity, terminator) {
        this.entity = entity;
        this.terminator = terminator;
    }

    /**
     * Getter
     * @param key
     * @returns {ExistentialWrapper}
     */
    get(key) {
        return new ExistentialWrapper(this.contains(key, this.entity) ? this.entity[key] : undefined, this.terminator);
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
    return new Proxy(new ExistentialWrapper(entity, terminator), new ExistentialProxy());
};
