class IDGenerator {
    static generate () {
        return (Math.random()*100).toString(36).slice(2);
    }
}

module.exports = IDGenerator;