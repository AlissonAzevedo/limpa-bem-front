<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="w-full px-28">
    <h3 class="my-2 flex">
      <UserIcon class="w-6 mr-1" />
      <span>
        {{ name_attendant }}
      </span>
    </h3>
    <ul
      role="list"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <li
        v-for="schedule in schedules"
        :key="schedule.id"
        class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
      >
        <div
          class="w-full flex items-center justify-between p-6 space-x-6"
          @click="openModal(schedule)"
        >
          <div class="flex-1 truncate">
            <div class="flex items-center space-x-3">
              <h3 class="text-gray-900 text-sm font-medium truncate">
                {{ schedule.name_client }}
              </h3>
              <span
                v-if="schedule.status == 'realizado'"
                class="uppercase flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full"
                >{{ schedule.status }}</span
              >
              <span
                v-else-if="schedule.status == 'pendente'"
                class="uppercase flex-shrink-0 inline-block px-2 py-0.5 text-yellow-600 text-xs font-medium bg-yellow-100 rounded-full"
                >{{ schedule.status }}</span
              >
              <span
                v-else
                class="uppercase flex-shrink-0 inline-block px-2 py-0.5 text-red-600 text-xs font-medium bg-red-100 rounded-full"
                >{{ schedule.status }}</span
              >
            </div>
            <p class="mt-1 text-gray-500 text-sm truncate uppercase">
              {{ schedule.name_service }}
            </p>
          </div>
          <NameAvatar :name="schedule.name_client" />
        </div>
      </li>
    </ul>
  </div>

  <!-- MODAL -->
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ this.scheduleModal.name_client }} -
                <span class="uppercase">
                  {{ this.scheduleModal.name_service }}
                </span>
              </DialogTitle>
              <div class="bg-white">
                <div class="flex flex-col">
                  <div class="flex justify-start items-center my-2">
                    <ClockIcon class="w-6 mr-1 text-gray-400" />
                    <label
                      for="first-name"
                      class="block text-sm font-medium text-gray-700"
                      >{{ formatData(this.scheduleModal.date) }}</label
                    >
                  </div>
                  <div class="flex justify-start items-center my-2">
                    <CurrencyDollarIcon class="w-6 mr-1 text-green-400" />
                    <label
                      for="first-name"
                      class="block text-sm font-medium text-gray-700"
                      >{{
                        formatCurrency(this.scheduleModal.service_price)
                      }}</label
                    >
                  </div>
                  <div class="flex justify-start items-center my-2">
                    <UserIcon class="w-6 mr-1 text-gray-400" />
                    <label
                      for="first-name"
                      class="block text-sm font-medium text-gray-700 capitalize"
                      >{{ this.name_attendant }}</label
                    >
                  </div>
                  <div class="flex justify-start items-center my-2">
                    <CreditCardIcon
                      v-if="this.scheduleModal.payment == 'credito'"
                      class="w-6 mr-1 text-gray-400"
                    />
                    <CreditCardIcon
                      v-else-if="this.scheduleModal.payment == 'debito'"
                      class="w-6 mr-1 text-gray-400"
                    />
                    <BanknotesIcon
                      v-else-if="this.scheduleModal.payment == 'dinheiro'"
                      class="w-6 mr-1 text-gray-400"
                    />
                    <DevicePhoneMobileIcon
                      v-else-if="this.scheduleModal.payment == 'pix'"
                      class="w-6 mr-1 text-gray-400"
                    />
                    <label
                      for="first-name"
                      class="block text-sm font-medium text-gray-700 uppercase"
                      >{{ this.scheduleModal.payment }}</label
                    >
                  </div>
                </div>
              </div>
              <div class="mt-4 w-full flex justify-end">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Fechar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  UserIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  BanknotesIcon,
} from "@heroicons/vue/24/solid";

import NameAvatar from "@/components/NameAvatar.vue";

import { ref } from "vue";

import { formatCurrency } from "@/utils/formatCurrency";
import { formatData } from "@/utils/formatData";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

export default {
  components: {
    NameAvatar,
    UserIcon,
    ClockIcon,
    CreditCardIcon,
    BanknotesIcon,
    DevicePhoneMobileIcon,
    CurrencyDollarIcon,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  },
  props: {
    name_attendant: {
      type: String,
      required: true,
    },
    schedules: {
      type: Array,
      required: true,
    },
  },
  computed: {
    formatCurrency() {
      return formatCurrency;
    },
    formatData() {
      return formatData;
    },
  },
  setup() {
    const scheduleModal = {};
    const isOpen = ref(false);

    function closeModal() {
      isOpen.value = false;
    }
    function openModal(schedule) {
      isOpen.value = true;
      this.scheduleModal = schedule;
    }

    return {
      scheduleModal,
      isOpen,
      closeModal,
      openModal,
    };
  },
};
</script>
