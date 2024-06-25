<template>
  <v-card-item>
    <div class="d-flex flex-row-reverse align-center justify-center item">
      <div class="item-info">
        <p>{{ item.name }}</p>
        <p>
          De:
          <span class="text-decoration-line-through">
            R$ {{ item.oldPrice.toString().replace(".", ",") }}
          </span>
        </p>
        <p>
          <b>Por: R$ {{ item.newPrice.toString().replace(".", ",") }}</b>
        </p>
      </div>
      <v-img
        :height="50"
        :src="item.image"
        alt="Item image"
        class="offer-image mr-3"
      />
    </div>
    <v-divider :thickness="2"></v-divider>
  </v-card-item>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.offer-image {
  width: 20%;
}
.item-info {
  width: 100%;
}
@media (max-width: 500px) {
  .item {
    flex-direction: column-reverse !important;
  }
  .offer-image {
    width: 50%;
  }
}
</style>
