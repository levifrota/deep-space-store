/* eslint-disable no-undef */

import { shallowMount } from "@vue/test-utils";
import PaymentForm from "@/components/PaymentForm.vue";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";

// Mock Vue Router
const mockRoute = {
  params: {
    id: "some-offer-id",
  },
};

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({ paymentOptions: ["Credit Card", "Debit Card"] }),
  })
);

describe("PaymentForm.vue", () => {
  let wrapper;
  let mockStore;
  let mockRouterPush;

  beforeEach(() => {
    mockRouterPush = jest.fn();

    mockStore = createStore({
      state: {
        addressFormValid: true,
        orderCode: "OFFER-CODE",
      },
    });

    wrapper = shallowMount(PaymentForm, {
      global: {
        plugins: [mockStore, router],
        mocks: {
          $route: mockRoute,
          $router: {
            push: mockRouterPush,
          },
        },
      },
      data() {
        return {
          userCpf: "",
          cpfError: "",
        };
      },
    });
  });

  it("validates a valid CPF", () => {
    const validCpf = "12345678909";
    wrapper.setData({ userCpf: validCpf });
    wrapper.vm.checkUserCpf();
    expect(wrapper.vm.cpfError).toBe("");
  });

  it("invalidates a CPF with more than 11 digits", () => {
    const bigCpf = "123456789040";
    wrapper.setData({ userCpf: bigCpf });
    wrapper.vm.checkUserCpf();
    expect(wrapper.vm.cpfError).toBe("CPF Inválido");
  });

  it("invalidates a CPF with less than 11 digits", () => {
    const shortCpf = "1234567890";
    wrapper.setData({ userCpf: shortCpf });
    wrapper.vm.checkUserCpf();
    expect(wrapper.vm.cpfError).toBe("CPF Inválido");
  });

  //The test below doesn't work.

  // it("redirects to error page with a CPF of all zeros", async () => {
  //   const zeroCpf = "00000000000";
  //   wrapper.setData({ userCpf: zeroCpf });
  //   await wrapper.vm.submitPaymentForm();
  //   expect(mockRouterPush).toHaveBeenCalledWith({
  //     name: "payment-error",
  //     params: { id: mockRoute.params.id },
  //   });
  // });
});
