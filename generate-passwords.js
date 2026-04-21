const bcrypt = require('bcryptjs');

// Generate password hashes for the default passwords
const passwords = {
    admin: 'admin123',
    worker1: 'worker123',
    worker2: 'worker123',
    worker3: 'worker123'
};

console.log('Password hashes for database:');
console.log('================================');

Object.entries(passwords).forEach(([username, password]) => {
    const hash = bcrypt.hashSync(password, 10);
    console.log(`UPDATE users SET password_hash = '${hash}' WHERE username = '${username}';`);
});

console.log('\nOr use these passwords:');
console.log('========================');
Object.entries(passwords).forEach(([username, password]) => {
    console.log(`${username}: ${password}`);
});

