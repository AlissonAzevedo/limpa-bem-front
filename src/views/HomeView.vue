<template>
  <div class="w-full flex flex-col justify-center items-center px-4 mt-6">
    <AddSchedule />
    <Card
      v-for="attendant in attendants"
      :key="attendant.id"
      :name_attendant="attendant.name"
      :schedules="attendant.schedule"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import { getAttendantsListToday } from "@/services/schedule.service";
import Card from "@/components/AttendantCard.vue";
import AddSchedule from "@/components/AddSchedule.vue"
export default {
  name: "HomeView",
  components: {
    Card,
    AddSchedule,
  },
  data() {
    const attendants = [];
    return {
      attendants,
    };
  },
  methods: {
    async getAttendantsList() {
      const response = await getAttendantsListToday();
      this.attendants = response;
    },
  },
  mounted() {
    this.getAttendantsList();
  },
};
</script>
