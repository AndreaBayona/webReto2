exports.PROVEEDORES_COLS = ["idproveedor", "nombrecompania", "nombrecontacto"];
exports.CLIENTES_COLS = ["idCliente", "NombreCompania", "NombreContacto"];

exports.renderTable = (data, columns) => {
    let table = renderHeaders(columns);
    table += '<tbody>';

    data.forEach((dataRow, index) => {
        let row = '<tr>';

        columns.forEach((colName) => {
            let cell = '<td>' + data[index][colName] + '</td>';
            row += cell;
        })
        row += '</tr>';
        table += row;
    })

    return table.concat('</tbody>');
}

const renderHeaders = (cols) => {
    let header = '<thead>';
    header += '<tr>';
    cols.forEach((data) => {
        header += '<th>' + data + '</th>';
    })
    header += '</tr>';
    return header + '</thead>';
}