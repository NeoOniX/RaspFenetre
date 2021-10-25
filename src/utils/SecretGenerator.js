const bcrypt = require('bcrypt');

class SecretGenerator {
    static generate () {
        return new Promise((resolve, reject) => {
            try {
                let id = (Math.random()*100).toString(36).slice(2);

                bcrypt.genSalt(10, (err,salt) => {
                    if (err) {
                        reject(err);
                    } else {
                        bcrypt.hash(id, salt, (err, hash) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(hash);
                            }
                        });
                    }
                });
            } catch (err) {
                reject(err)
            }
        });
        
    }
}

module.exports = SecretGenerator;