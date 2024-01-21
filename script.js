const form = document.getElementById('form-atividade');
const inputNomeAtividade = document.getElementById('nome-atividade');
const inputNotaAtividade = document.getElementById('nota-atividade');
const imgAprovado = '<img src="./images/aprovado.png" />';
const imgReprovado = '<img src="./images/reprovado.png" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt('Digite a nota mínima: '));

let linhas = '';

form.addEventListener('submit', function(e){
  e.preventDefault();

  if(addLinha()){
    atualizaTabela();
    atualizaMedia();
  }

  inputNomeAtividade.value = '';
  inputNotaAtividade.value = '';
})

function addLinha() {
  if(atividades.includes(inputNomeAtividade.value)){
    alert(`A atividade ${inputNomeAtividade.value} já foi inserida`);
  } else {
    if(inputNotaAtividade.value > 10 || inputNotaAtividade.value < 0){
      alert(`Nota Inválida, insira um valor entre 0 e 10`);

      return false;
    } else {
      atividades.push(inputNomeAtividade.value);
      notas.push(parseFloat(inputNotaAtividade.value));

      let linha = '<tr>';
      linha += `<td>${inputNomeAtividade.value}</td>`;
      linha += `<td>${inputNotaAtividade.value}</td>`;
      linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
      linha += '</tr>';

      linhas += linha;

      return true;
    }
  }
}

function atualizaTabela() {
  const corpoTabela = document.querySelector('tbody');
  corpoTabela.innerHTML = linhas;
}

function calculaMedia() {
  let soma = 0;
  let res = 0;

  for(i = 0; i < notas.length; i++){
    soma += notas[i];
  }

  res = soma / notas.length;
  parseFloat(res.toFixed(2));

  return res;
}

function atualizaMedia() {
  const mediaFinal = calculaMedia();

  document.getElementById('media-final-valor').innerHTML = mediaFinal;
  document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}
