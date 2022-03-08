<template>
  <LineChart :chartData="testData" :options="options" />
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { useGameOfLife } from '../store/gameOfLifeStore';
import { storeToRefs } from 'pinia';
import { range } from 'lodash';

Chart.register(...registerables);

export default defineComponent({
  name: 'ActiveCellsChart',
  components: { LineChart },
  setup() {
    const gameOfLifeStore = useGameOfLife();
    const { cellCountHistory } = storeToRefs(gameOfLifeStore);
    const options = ref({
      responsive: true
    })
    const testData = computed(() => ({
      labels: range(0, cellCountHistory.value.length),
      datasets: [
        {
          label: "aktive Zellen",
          data: cellCountHistory.value,
          borderColor: 'rgb(147, 197, 253)',
        },
      ],
    }));

    return { testData, options };
  },
});
</script>
