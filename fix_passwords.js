const bcrypt = require('bcryptjs');

async function fixPasswords() {
    try {
        // Generate password hash for admin123
        const password = 'admin123';
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        
        console.log('Password hash for admin123:');
        console.log(hash);
        
        // Generate password hash for worker123
        const workerPassword = 'worker123';
        const workerHash = await bcrypt.hash(workerPassword, saltRounds);
        
        console.log('\nPassword hash for worker123:');
        console.log(workerHash);
        
        console.log('\nSQL commands to update passwords:');
        console.log(`UPDATE users SET password_hash = '${hash}' WHERE username = 'admin';`);
        console.log(`UPDATE users SET password_hash = '${workerHash}' WHERE username IN ('worker1', 'worker2', 'worker3');`);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

fixPasswords();
