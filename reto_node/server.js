const http = require('http');
const fs = require('fs');
const services = require('./services/services.js');
const tableMethods = require('./methods/table.js');

const hostname = "localhost";
const port = 8081;

const server = http.createServer(async (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    let dataUser = '';
    switch (req.url) {
        case '/':
            dataUser = 'home';
            break;
        case '/api/proveedores':
            dataUser = 'proveedores';
            break;
        case '/api/clientes':
            dataUser = 'clientes'
            break;
        default:
            dataUser = 'home';
            break;
    }

    if(dataUser) await render(res, dataUser);

});

    function insertTableIntoHtml(data, dataTemp, dataUser) {
    const tableTag = '<table class="table table-striped">';
    let html = data.substring(0, data.indexOf(tableTag));
    html += `<div style=" text-align: center; margin: 10px;"><h4>Listado de ${dataUser}</h4></div>`;
    html += tableTag + tableMethods.renderTable(
        dataTemp,
        dataUser === 'clientes' ? tableMethods.CLIENTES_COLS : tableMethods.PROVEEDORES_COLS);
    html += data.substring(data.indexOf('</table>'), data.length);
    return html;
}

const render = async (res, dataUser) => {
    const view = dataUser === 'home' ? 'index' : 'table';
    console.log("dataUser", dataUser);

    let dataTemp;
    if(dataUser === 'proveedores') dataTemp = await services.getProveedores();
    else if(dataUser === 'clientes') dataTemp = await services.getClientes();

    fs.readFile(`./views/${view}.html`, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            if (view === 'table' && dataTemp) {
                res.end(insertTableIntoHtml(
                    data, dataTemp,dataUser)
                );
            } else res.end(data);
        }
    })
}

server.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`));