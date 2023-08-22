const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, 'utf-8', (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Erro interno do servidor');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  } else if (req.method === 'POST' && req.url === '/cadastro') {
    
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      const parsedData = JSON.parse(data);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Cadastro realizado com sucesso!' }));
    });
  } else {
    res.writeHead(404);
    res.end('Página não encontrada');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
