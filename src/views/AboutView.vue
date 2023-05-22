<!-- src/components/Calendar.vue -->
<template>
  <div>
    Francy
    <bryntum-calendar :events="events"></bryntum-calendar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  // BryntumDemoHeader,
  BryntumCalendar,
} from "@bryntum/calendar-vue-3";


export default {
  computed: {
    ...mapState(['events']),
  },
  components: {BryntumCalendar},
  mounted() {
    this.fetchData();
    // Load events from an API or any data source
    // Once you have the events data, commit the mutation to update the state
    //const events = []; // Replace with your events data
    //this.$store.commit('setEvents', events);
  },
  methods: {
    ...mapActions(['fetchData'])
  }
};
</script>
