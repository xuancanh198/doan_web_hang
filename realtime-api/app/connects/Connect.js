const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',    
    password: '',  
    database: 'my_database' 
});

connection.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối MySQL:', err.stack);
        return;
    }
    console.log('Kết nối đến MySQL thành công, ID kết nối:', connection.threadId);
});

module.exports = connection;
