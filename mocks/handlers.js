import { http, HttpResponse } from "msw";

export const offers = [
  {
    id: "OFFER_CODE",
    name: "Oferta Especial",
    items: [
      {
        name: "Fone de Ouvido Bluetooth QCY T17 (Preto)",
        oldPrice: 109.98,
        newPrice: 98.99,
        image:
          "https://m.media-amazon.com/images/I/51TBSJF4B5L._AC_SL1326_.jpg",
      },
      {
        name: "Teclado ABNT2 de membrana com fio",
        oldPrice: 132.89,
        newPrice: 119.98,
        image:
          "https://m.media-amazon.com/images/I/513uhGvfDwL._AC_SL1200_.jpg",
      },
    ],
    paymentOptions: ["Cartão de Crédito", "Pix", "Boleto Bancário"],
  },
];

export const handlers = [
  http.get("https://api.deepspacestore.com/offers/:offerCode", () => {
    return HttpResponse.json(offers);
  }),

  http.post("https://api.deepspacestore.com/offers/:offerCode/create_order", async ({ request }) => {
    const requestBody = await request.json();

    if (requestBody.payment.userCpf === "000.000.000-00") {
      return HttpResponse.error();
    } else {
      return HttpResponse.json({
        content: requestBody,
      });
    }
  }),
];
