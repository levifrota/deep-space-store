import { createStore } from "vuex";

export default createStore({
  state: {
    userFormValid: false,
    addressFormValid: false,
    userData: null,
    paymentData: null,
    addressData: null,
    offerDetails: null,
  },
  mutations: {
    setOfferDetails(state, details) {
      state.offerDetails = details;
    },
    setUserFormValid(state, isValid) {
      state.userFormValid = isValid;
    },
    setAddressFormValid(state, isValid) {
      state.addressFormValid = isValid;
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
    setAddressData(state, addressData) {
      state.addressData = addressData;
    },
    setPaymentData(state, paymentData) {
      state.paymentData = paymentData;
    },
  },
});
