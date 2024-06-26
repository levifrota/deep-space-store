<template>
  <v-card class="address-form">
    <v-card-title>Endereço de Entrega</v-card-title>
    <v-card-item>
      <v-form :disabled="isDisabled">
        <v-text-field
          label="CEP"
          v-model="address.zipCode"
          :error-messages="zipCodeError"
          @input="fetchAddressDetails"
        ></v-text-field>
        <v-text-field label="Rua" v-model="address.street"></v-text-field>
        <v-text-field
          label="Bairro"
          v-model="address.neighborhood"
        ></v-text-field>
        <v-text-field
          label="Cidade"
          v-model="address.city"
          readonly
        ></v-text-field>
        <v-text-field
          label="Estado"
          v-model="address.state"
          readonly
        ></v-text-field>
        <v-text-field
          label="Número"
          v-model="address.houseNumber"
        ></v-text-field>
        <v-card-actions>
          <v-btn @click="submitAddressForm" :disabled="isDisabled"
            >Ir para Pagamento</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card-item>
  </v-card>
</template>

<script>
export default {
  name: "AddressForm",
  data() {
    return {
      address: {
        zipCode: "",
        street: "",
        neighborhood: "",
        city: "",
        state: "",
        houseNumber: "",
      },
      zipCodeError: "",
    };
  },
  methods: {
    submitAddressForm() {
      // Handle address form submission
      if (this.address.zipCode !== "" && this.zipCodeError === "") {
        this.$store.commit("setAddressFormValid", true);
        this.$store.commit("setAddressData", this.address);
      } else {
        this.$store.commit("setAddressFormValid", false);
        this.zipCodeError = "Digite um CEP válido";
      }
    },
    // This method fetches the viacep API to validate the CEP code
    fetchAddressDetails() {
      const zipCode = this.address.zipCode.replace(/\D/g, ""); // Remove non-numeric characters
      if (zipCode.length === 8) {
        fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
          .then((response) => response.json())
          .then((data) => {
            if (data.erro) {
              this.zipCodeError = "CEP não encontrado";
              this.address.street = "";
              this.address.neighborhood = "";
              this.address.city = "";
              this.address.state = "";
            } else {
              this.zipCodeError = "";
              this.address.street = data.logradouro;
              this.address.neighborhood = data.bairro;
              this.address.city = data.localidade;
              this.address.state = data.uf;
            }
          })
          .catch((error) => {
            this.zipCodeError = "Algo deu errado.";
            console.error("Error fetching address details:", error);
          });
      } else {
        this.zipCodeError = "O número do CEP deve conter 8 dígitos";
        this.address.street = "";
        this.address.neighborhood = "";
        this.address.city = "";
        this.address.state = "";
      }
    },
  },
  computed: {
    isDisabled() {
      return !this.$store.state.userFormValid;
    },
  },
};
</script>

<style scoped>
.address-form {
  width: 60%;
}
</style>
