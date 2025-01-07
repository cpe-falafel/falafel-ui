<template>
    <div class="div-item">
        <p>{{worker.uri}}</p>
        <p>{{worker.apiKey}}</p>
        <div class="div-btn">
            <span class="material-symbols-outlined">delete</span>
        </div>
    </div>
</template>

<script>
import Worker from "@/models/Worker";

export default {
  props: {
    worker: {
      type: Worker,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style scoped>
.div-btn:hover{
    cursor:pointer;
}

.div-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>