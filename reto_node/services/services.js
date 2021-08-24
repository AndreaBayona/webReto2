const axios = require('axios');

const PROVEEDORES = 'https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json';
const CLIENTES = 'https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json';

const get = async (route) => {
    const resp = await axios.get(route);
    console.log(resp.data);
    return resp.data;
}

exports.getClientes = async () => get(CLIENTES);
exports.getProveedores = async () => get(PROVEEDORES);
