<template>
  <v-container class="d-flex align-center flex-column">
    <div class="d-flex align-center order-confirmed">
      <h1 class="pr-5">Pedido Confirmado!</h1>
      <v-img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png"
        width="70"
      ></v-img>
    </div>
    <div class="d-flex align-center justify-space-evenly flex-wrap w-100">
    <v-card class="mb-7">
      <v-card-title>Detalhes do pedido:</v-card-title>
      <div class="order-details">
        <v-card-item>
          <div class="order-code d-flex align-center">
            <h3>Código:&nbsp;</h3>
            <p>{{ paymentData.id }}</p>
          </div>

          <h3>Usuário:</h3>
          <div>
            <p><b>Nome:</b> {{ userData.name }}</p>
            <p v-if="userData.email !== ''">
              <b>Email:</b> {{ userData.email }}
            </p>
            <p v-if="userData.phone !== ''">
              <b>Telefone:</b> {{ userData.phone }}
            </p>
          </div>
        </v-card-item>
        <v-card-item>
          <h3>Endereço:</h3>
          <div>
            <p><b>CEP:</b> {{ addressData.zipCode }}</p>
            <p><b>Rua:</b> {{ addressData.street }}</p>
            <p><b>Cidade:</b> {{ addressData.city }}</p>
            <p><b>Bairro:</b> {{ addressData.neighborhood }}</p>
            <p><b>Cidade:</b> {{ addressData.city }}</p>
            <p><b>Estado:</b> {{ addressData.state }}</p>
            <p v-if="addressData.houseNumber !== ''">
              <b>Número:</b> {{ addressData.houseNumber }}
            </p>
          </div>
        </v-card-item>
        <v-card-item>
          <h3>Pagamento:</h3>
          <div>
            <p><b>Método:</b> {{ paymentData.paymentOption }}</p>
          </div>
        </v-card-item>
      </div>
    </v-card>
    <OfferDetails :offerDetails="offerDetails" :totalNewPrice="totalNewPrice" />
  </div>

    <v-card v-if="paymentData.paymentOption === 'Pix'" class="mt-7 payment-selected">
      <v-card-title
        >Prossiga o pagamento com os métodos abaixo. <br>O processamento pode durar até 30 minutos.
    </v-card-title>
      <v-card-item>
        <h3>Código Copia e Cola</h3>
        <div>
          <p ref="code">
            00020126580014BR.GOV.BCB.PIX01365354d1a3-62a5-4c6b-bf8d-7511acfbdb045204000053039865802BR5925Gideao
            Levi de Oliveira F6009SAO PAULO62140510Eqy8WV1jgS6304F02B
          </p>
          <v-btn @click="copyText()">Copiar código</v-btn>
        </div>
        <v-img src="/qr-code.png" :height="300" :width="200" alt="QR Code"></v-img>
      </v-card-item>
    </v-card>
    <v-card class="mt-7 payment-selected" v-else-if="paymentData.paymentOption === 'Boleto Bancário'">
      <v-card-title>Prossiga o pagamento com os métodos abaixo. <br>O processamento pode durar até 2 dias úteis.</v-card-title>
        <div class="d-flex align-center flex-column">
          <p ref="code">
            26090.54834 30320.515635 74000.000005 8 96360000002000
          </p>
          <v-btn @click="copyText()">Copiar código</v-btn>
        </div>
        <v-img src="/boleto.png" :height="200" alt="Boleto"></v-img>
    </v-card>
  </v-container>
  <v-snackbar
    v-model="snackbar"
    :timeout='2000'
  >
    Código copiado!

    <template v-slot:actions>
      <v-btn
        color="green"
        variant="text"
        @click="snackbar = false"
      >
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";
import OfferDetails from "./OfferDetails.vue";

export default {
  name: "OrderConfirmed",
  components: {
    OfferDetails,
  },
  data: () => ({
    snackbar: false,
  }),
  computed: {
    // Calls the state variables
    ...mapState({
      userData: (state) => state.userData,
      paymentData: (state) => state.paymentData,
      addressData: (state) => state.addressData,
      offerData: (state) => state.offerDetails,
    }),
    offerDetails() {
      return this.offerData;
    },
    // Sum of the items' prices with discount
    totalNewPrice() {
      if (this.offerDetails && this.offerDetails.items) {
        return this.offerDetails.items.reduce(
          (total, item) => total + item.newPrice,
          0
        );
      }
      return 0;
    },
  },
  methods: {
    // Method to copy pix or bill code
    copyText() {
      const element = this.$refs.code;
      const tempInput = document.createElement("input");
      tempInput.value = element.textContent;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.order-details {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.payment-selected {
  width: 40vw;
}
@media (max-width: 880px) {
  .order-confirmed {
    flex-direction: column-reverse;
  }
  .order-confirmed h1 {
    text-align: center;
    padding: 0 !important;
  }
  .payment-selected {
    width: 60%;
  }
}
</style>
