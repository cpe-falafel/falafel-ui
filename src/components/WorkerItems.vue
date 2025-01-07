<template>
  <div>
    <WorkerItem
      v-for="(worker, index) in workers"
      :key="index"
      :worker="worker"
      :index="index"
    />
  </div>
</template>

<script>
import WorkerItem from '@/components/WorkerItem.vue';

export default {
  components: {
    WorkerItem,
  },
  props: {
    workers: {
      type: Array,
      required: true,
    },
  },
  methods: {
  },
};
</script>

<style scoped>
.list{
  text-decoration: none;
}
</style>