const bcrypt = require('bcryptjs');

const password = 'admin'; // Здесь укажи свой пароль
const saltRounds = 10;       // Количество раундов соли (рекомендуется от 10 до 12)

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error('❌ Ошибка хеширования:', err);
    } else {
        console.log('✅ Захешированный пароль:', hash);
    }
});
