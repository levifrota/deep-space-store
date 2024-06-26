<template>
  <v-card class="mt-10 mb-10 payment-form">
    <v-card-title>Formas de pagamento</v-card-title>
    <v-card-item>
      <v-form ref="paymentForm" :disabled="isDisabled">
        <v-text-field
          label="CPF"
          v-model="userCpf"
          :error-messages="cpfError"
          v-mask="'###.###.###-##'"
          @input="checkUserCpf"
        ></v-text-field>

        <v-radio-group
          v-model="selectedPaymentOption"
          label="Defina um meio de pagamento"
          :error-messages="radioError"
          :disabled="!isPaymentOptionDisabled"
        >
          <v-radio
            v-for="(paymentOption, index) in paymentOptions"
            :key="index"
            :label="paymentOption"
            :value="paymentOption"
            required
          ></v-radio>
        </v-radio-group>
        <div v-if="selectedPaymentOption === 'Cartão de Crédito'">
          <v-card-title>Insira os dados do cartão</v-card-title>
          <v-text-field
            label="Nome no Cartão"
            v-model="creditCardName"
            :error-messages="cardNameError"
            required
          ></v-text-field>
          <v-text-field
            label="Número do Cartão"
            v-model="creditCardNumber"
            :error-messages="cardNumberError"
            v-mask="'#### #### #### ####'"
            required
          ></v-text-field>
          <v-text-field
            label="Código de Segurança"
            v-model="creditCardSecurityCode"
            :error-messages="cardSecurityCodeError"
            v-mask="'###'"
            required
          ></v-text-field>
          <v-text-field
            label="Data de Validade"
            v-model="creditCardExpiryDate"
            :error-messages="cardExpiryDateError"
            v-mask="'##/##'"
            placeholder="mm/aa"
            required
          ></v-text-field>
        </div>
        <v-card-actions>
          <v-btn :disabled="isDisabled" @click="submitPaymentForm"
            >Finalizar Pedido</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card-item>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PaymentForm",
  data() {
    return {
      paymentOptions: [],
      selectedPaymentOption: null,
      creditCardNumber: "",
      creditCardName: "",
      creditCardSecurityCode: "",
      creditCardExpiryDate: "",
      isLoading: false,
      userCpf: "",
      cpfError: "",
      radioError: "",
      uniqueId: "",
      code: "",
      missingField: "",
      errors: {},
    };
  },
  methods: {
    // Display credit card input error messages
    validateCreditCardFields() {
      let isValid = true;

      if (!this.creditCardName) {
        this.cardNameError = "Nome no Cartão é obrigatório";
        isValid = false;
      } else {
        this.cardNameError = "";
      }

      if (!this.creditCardNumber) {
        this.cardNumberError = "Número do Cartão é obrigatório";
        isValid = false;
      } else {
        this.cardNumberError = "";
      }

      if (!this.creditCardSecurityCode) {
        this.cardSecurityCodeError = "Código de Segurança é obrigatório";
        isValid = false;
      } else {
        this.cardSecurityCodeError = "";
      }

      if (!this.creditCardExpiryDate) {
        this.cardExpiryDateError = "Data de Validade é obrigatória";
        isValid = false;
      } else {
        this.cardExpiryDateError = "";
      }

      return isValid;
    },
    // Gather all payment options in offer
    fetchPaymentOptions() {
      fetch(`https://api.deepspacestore.com/offers/${this.$route.params.id}/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.paymentOptions = data[0].paymentOptions;
        })
        .catch((error) => {
          console.error("Error fetching payment options:", error);
        });
    },
    // Generate an order ID
    generateUniqueId() {
      return "#" + Math.random().toString(36).substring(2, 7);
    },
    // Method to validate CPF
    validateCpf(cpf) {
      const cleanedCpf = cpf.replace(/\D/g, "");
      if (cleanedCpf === "" || !(cleanedCpf.length === 11)) {
        return false;
      }
      return true;
    },

    // Gather all the data from user, address and payment.
    // Then make the validation for user CPF and payment option.
    // After that, the POST request is made.
    submitPaymentForm() {
      // Gather all the necessary data
      this.uniqueId = this.generateUniqueId();

      if (!this.validateCpf(this.userCpf)) {
        this.cpfError = "CPF é obrigatório";
        return;
      }

      if (this.selectedPaymentOption === null) {
        this.radioError = "Escolha um meio de pagamento";
        return;
      }

      // Display error messages
      if (
        this.selectedPaymentOption === "Cartão de Crédito" &&
        !this.validateCreditCardFields()
      ) {
        return;
      }

      const paymentData = {
        userCpf: this.userCpf,
        paymentOption: this.selectedPaymentOption,
        creditCardNumber: this.creditCardNumber,
        creditCardName: this.creditCardName,
        creditCardSecurityCode: this.creditCardSecurityCode,
        creditCardExpiryDate: this.creditCardExpiryDate,
        id: this.uniqueId,
      };

      // Make the POST request
      fetch(
        `https://api.deepspacestore.com/offers/${this.$route.params.id}/create_order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client: this.userData,
            address: this.addressData,
            payment: paymentData,
          }),
        }
      )
        .then(() => {
          // Button redirects to /compra-confirmada page
          this.$router.push({ name: "order-placed" });
          this.$store.commit("setPaymentData", paymentData);
        })
        .catch((error) => {
          // If the user sets a wrong CPF, the error page is displayed
          this.$router.push({
            name: "payment-error",
            params: { id: this.$route.params.id },
          });
          console.error("Error submitting payment form:", error);
        });
    },
    // Rule for the CPF input
    checkUserCpf() {
      if (!this.validateCpf(this.userCpf)) {
        this.cpfError = "CPF Inválido";
      } else {
        this.cpfError = "";
      }
    },
  },
  computed: {
    // Calls the state variables
    ...mapState({
      userData: (state) => state.userData,
      addressData: (state) => state.addressData,
    }),
    // Enables the form if the address is valid
    isDisabled() {
      return !this.$store.state.addressFormValid;
    },
    isPaymentOptionDisabled() {
      return this.validateCpf(this.userCpf);
    },
  },
  mounted() {
    this.fetchPaymentOptions();
  },
};
</script>

<style scoped>
.payment-form {
  width: 60%;
}
</style>
