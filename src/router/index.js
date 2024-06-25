import { createRouter, createWebHistory } from "vue-router";
import HomeCheckout from "../views/HomeCheckout.vue";
import NotFound from "../views/NotFound.vue";
import OrderPlaced from "../views/OrderPlaced.vue";
import { offers } from "../../mocks/handlers.js"; // Importe a lista de ofertas

const isValidOfferCode = (offerCode) => {
  return offers.some((offer) => offer.id.toLowerCase() === offerCode.toLowerCase());
};

const routes = [
  {
    path: "/:id",
    name: "home",
    component: HomeCheckout,
    beforeEnter: (to, from, next) => {
      if (isValidOfferCode(to.params.id)) {
        next();
      } else {
        next({ name: "not-found" });
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
  },
  {
    path: "/compra-confirmada",
    name: "order-placed",
    component: OrderPlaced,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
