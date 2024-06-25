<template>
  <div class="payment-confirmed">
    <OrderConfirmed />
  </div>
</template>

<script>
import OrderConfirmed from "@/components/OrderConfirmed.vue";

export default {
  name: "OrderPlaced",
  components: { OrderConfirmed },
};
</script>
