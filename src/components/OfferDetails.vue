<template>
  <v-card>
    <v-card-title>Itens:</v-card-title>
    <CardItem
      v-for="(item, index) in offerDetails.items"
      :key="index"
      :item="item"
    />
    <v-card-item>
      Total:
      <b> R$ {{ totalNewPrice.toString().replace(".", ",") }} </b>
    </v-card-item>
  </v-card>
</template>

<script>
import CardItem from "./CardItem.vue";

export default {
  name: "OfferDetails",
  components: {
    CardItem,
  },
  props: {
    offerDetails: {
      type: Object,
      required: true,
    },
    totalNewPrice: {
      type: Number,
      required: true,
    },
  },
};
</script>
