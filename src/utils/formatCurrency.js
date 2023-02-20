export function formatCurrency(num) {
    var price = (num*1).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    return price
  }