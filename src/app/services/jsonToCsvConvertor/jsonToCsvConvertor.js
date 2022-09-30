import FuseUtils from '@fuse/utils/FuseUtils';

// Documentação da função: https://pt.stackoverflow.com/questions/248692/converter-json-para-excel
class JsonToCsvConvertor extends FuseUtils.EventEmitter {
  convert = (dadosExportar, nomeArquivo, cabecalhos) => {
    const arrData = typeof dadosExportar !== 'object' ? JSON.parse(dadosExportar) : dadosExportar;

    let csv = '';

    // Gerando o cabeçalho da planilha
    if (cabecalhos.length > 0) {
      let row = '';
      for (let i = 0; i < cabecalhos.length; i++) {
        row += '"' + cabecalhos[i] + '";';
      }

      row.slice(0, row.length - 1);
      csv += row + '\r\n';
    }

    // Populando a planilha
    for (let i = 0; i < arrData.length; i++) {
      let row = '';

      for (let index in arrData[i]) {
        row += '"' + arrData[i][index] + '";';
      }

      row.slice(0, row.length - 1);

      csv += row + '\r\n';
    }

    if (csv === '') {
      alert('Erro na exportação dos dados.');
      return;
    }

    const fileName = nomeArquivo;

    const uri = 'data:text/csv;charset=utf-8,' + escape(csv);

    const link = document.createElement('a');
    link.href = uri;

    link.style = 'visibility:hidden';
    link.download = fileName + '.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
}

const instance = new JsonToCsvConvertor();

export default instance;
