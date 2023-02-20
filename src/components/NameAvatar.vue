<template>
  <div :class="`bg-gray-400 w-10 h-10 rounded-full flex items-center justify-center text-white uppercase font-bold text-lg ${classOverride}`">
    {{ initials }}
  </div>
</template>

<script>
export default {
  name: "NameAvatar",
  props: {
    name: {
      type: String,
      required: true
    },
    classOverride: {
      type: String,
      default: ""
    }
  },
  computed: {
    initials() {
      const names = this.name?.split(' ');
      return names?.map(name => name.charAt(0)).slice(0, 2).join('');
    },
    bgColor() {
      const colors = [
        'pink-400',
        'indigo-400',
        'green-400',
        'yellow-400',
        'purple-400',
        'orange-400'
      ];
      const index = Math.floor(Math.random() * colors.length);
      return colors[index];
    }
  }
};
</script>
