import { createStore } from "vuex";

export default createStore({
  state: {
    orderCode: "",
    userFormValid: false,
    addressFormValid: false,
    userData: null,
    paymentData: null,
    addressData: null,
    orderStatus: null,
    offerDetails: null,
  },
  mutations: {
    setOrderCode(state, orderCode) {
      state.orderCode = orderCode;
    },
    setOfferDetails(state, details) {
      state.offerDetails = details;
    },
    clearOfferDetails(state) {
      state.offerDetails = null;
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
