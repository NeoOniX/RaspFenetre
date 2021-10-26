class IDGenerator {
    static generate () {
        return Math.random().toString(36).slice(2);
    }
}

module.exports = IDGenerator;