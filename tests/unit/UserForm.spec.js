/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import UserForm from "@/components/UserForm.vue";
import { createStore } from "vuex";

describe("UserForm.vue", () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    // Mock Vuex store
    mockStore = createStore({
      state: {
        userFormValid: false,
        userData: null,
        offerDetails: null,
      },
      mutations: {
        setUserFormValid(state, value) {
          state.userFormValid = value;
        },
        setUserData(state, user) {
          state.userData = user;
        },
      },
    });

    // Mount the component with the mocked store
    wrapper = shallowMount(UserForm, {
      global: {
        plugins: [mockStore],
      },
    });
  });

  it("disables the form when offerDetails is not present", () => {
    // Set the offerDetails state to null
    // mockStore.state.offerDetails = null;

    // Check if the form is disabled
    expect(wrapper.vm.isDisabled).toBe(true);
  });

  it("enables the form when offerDetails is present", () => {
    // Set the offerDetails state
    mockStore.state.offerDetails = "OFFER_CODE";

    // Check if the form is enabled
    expect(wrapper.vm.isDisabled).toBe(false);
  });

  it("validates the user form and updates the store", async () => {
    // Set the user data
    wrapper.setData({
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
      },
    });

    // Trigger the submitUserForm method
    await wrapper.vm.submitUserForm();

    // Check if the store was updated correctly
    expect(mockStore.state.userFormValid).toBe(true);
    expect(mockStore.state.userData).toEqual({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
    });
  });

  it("shows an error message when the name field is empty", async () => {
    // Trigger the submitUserForm method with an empty name
    await wrapper.vm.submitUserForm();

    // Check if the error message is set
    expect(wrapper.vm.nameError).toBe("Campo obrigatório");
    expect(mockStore.state.userFormValid).toBe(false);
  });

  it("shows an error message when the phone number field is empty", async () => {
    // Trigger the submitUserForm method with an empty phone number
    await wrapper.vm.submitUserForm();

    // Check if the error message is set for the phone number
    expect(wrapper.vm.phoneError).toBe("Campo obrigatório");
    expect(mockStore.state.userFormValid).toBe(false);
  });
});
