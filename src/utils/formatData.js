export function formatData(dataString) {
  const data = new Date(dataString);
  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();
  const hora = data.getHours();
  const minutos = data.getMinutes().toString().padStart(2, "0");

  const dataFormatada = `${dia}/${mes}/${ano} às ${hora}:${minutos}`;
  return dataFormatada;
}
