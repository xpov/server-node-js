const fs = require('fs');

const firstHandle = (req, res) => {
    const url = req.url;
    const method = req.method;
    
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body><h1>Welcome to my page</h1></body>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Create user</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body><ul><li>User 1</li></ul></body>')
        res.write('<body><ul><li>User 2</li></ul></body>')
        res.write('<body><ul><li>User 3</li></ul></body>')
        res.write('</html>');
        return res.end();
    }
};

module.exports = firstHandle;