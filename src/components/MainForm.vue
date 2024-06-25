<template>
  <v-container class="main-container d-flex flex-column align-center">
    <div class="d-flex flex-column align-center components-container">
        <OfferDetails
          :offerDetails="offerDetails"
          :totalNewPrice="totalNewPrice()"
        />

      <UserForm />

      <AddressForm />

      <PaymentForm />
    </div>
  </v-container>
</template>

<script>
import UserForm from "./UserForm.vue";
import AddressForm from "./AddressForm.vue";
import PaymentForm from "./PaymentForm.vue";
import OfferDetails from "./OfferDetails.vue";

export default {
  name: "MainForm",
  components: {
    UserForm,
    AddressForm,
    PaymentForm,
    OfferDetails,
  },
  data() {
    return {
      codeError: "",
      showOfferModal: false,
      offerDetails: {},
    };
  },
  methods: {
    // This method will get the API informations
    getProducts() {
      fetch(`https://api.deepspacestore.com/offers/${this.$route.params.id}/`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            this.offerDetails = data[0];  // Access the first element of the array
            this.$store.commit("setOfferDetails", this.offerDetails);
          } else {
            console.error('Error: Data is not in the expected format');
          }
        })
        .catch(error => console.error('Error: ', error));
    },
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
  mounted() {
    this.getProducts(); // Initial fetch when component mounts
  },
};
</script>

<style scoped>
.components-container {
  width: 80%;
}
.offer-input-details {
  width: 60%;
}
@media (max-width: 900px) {
  .components-container {
    width: 100%;
  }
}
@media (max-width: 580px) {
  .offer-input-details {
    flex-direction: column;
    align-items: center !important;
    width: 80%;
  }
  .offer-details {
    margin-top: 2rem;
    width: 80% !important;
  }
}
</style>
