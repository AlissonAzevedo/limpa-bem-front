<template>
  <div class="sm:flex sm:items-center mt-4 mb-12">
    <div class="sm:flex-auto">
      <h1 class="text-xl font-semibold text-gray-900">Atendimentos do dia</h1>
      <p class="mt-2 text-sm text-gray-700">
        Lista de atendimentos para cada atendente
      </p>
    </div>
    <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
      <button
        @click="openModal"
        type="button"
        class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
      >
        Agendar
      </button>
    </div>
  </div>
  <!-- MODAL ADD SCHEDULE -->
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
                Novo agendamento
              </DialogTitle>
              <div class="mt-2">
                <div class="w-full flex justify-between items-center">
                  <div class="w-1/2 flex flex-col my-2">
                    <span class="my-2">Selecione o Cliente</span>
                    <select
                      required
                      v-model="schedule.client"
                      name="employee"
                      id="employee"
                      class="uppercase mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option
                        v-for="client in clientList"
                        :key="client.id"
                        :value="client.id"
                      >
                        {{ client.name }}
                      </option>
                    </select>
                  </div>
                  <div class="flex flex-col my-2">
                    <span class="my-2">Selecione o Helper</span>
                    <select
                      required
                      v-model="schedule.employee"
                      name="employee"
                      id="employee"
                      class="uppercase mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option
                        v-for="employee in employeeList"
                        :key="employee.id"
                        :value="employee.id"
                      >
                        {{ employee.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="w-full flex flex-col my-2">
                  <span class="my-2">Selecione a forma de pagamento</span>
                  <select
                    required
                    v-model="schedule.payment"
                    name="employee"
                    id="employee"
                    class="uppercase mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option
                      v-for="payment in paymentMethod"
                      :key="payment.id"
                      :value="payment.value"
                    >
                      {{ payment.name }}
                    </option>
                  </select>
                </div>
                <div class="w-full flex flex-col my-2">
                  <span class="my-2">Selecione data e horario</span>
                  <input
                    required
                    v-model="schedule.date"
                    type="datetime-local"
                    class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div class="w-full flex flex-col my-2">
                  <span class="my-2">Selecione o serviço</span>
                  <select
                    required
                    v-model="schedule.service"
                    name="employee"
                    id="employee"
                    class="uppercase mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option
                      v-for="service in serviceList"
                      :disabled="!service.active"
                      :key="service.id"
                      :value="service.id"
                    >
                      {{ service.name }} - {{ formatCurrency(service.price) }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="mt-4 w-full flex justify-end">
                <button
                  type="button"
                  class="mx-2 inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  @click="createSchedule"
                >
                  Criar
                </button>
                <button
                  type="button"
                  class="mx-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Sair
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
  getEmployeesList,
  getClientList,
  getServicesList,
  createSchedule
} from "@/services/schedule.service";

import { formatCurrency } from "@/utils/formatCurrency";

import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
export default {
  data(){
    return {
      isOpen: ref(false),
      employeeList: [],
      clientList: [],
      serviceList: [],
      paymentMethod: [
        {
          id: 1,
          name: "Dinheiro",
          value: "dinheiro",
        },
        {
          id: 2,
          name: "Cartão de Crédito",
          value: "credito",
        },
        {
          id: 3,
          name: "Cartão de Débito",
          value: "debito",
        },
        {
          id: 4,
          name: "Pix",
          value: "pix",
        },
      ],
      schedule: {
        client: "",
        employee: "",
        payment: "",
        date: "",
        service: "",
        status: "pendente",
      },
    }
  },
  components:{
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  },
  methods: {
    async getEmployees() {
      const response = await getEmployeesList();
      this.employeeList = response;
    },
    async getClients() {
      const response = await getClientList();
      this.clientList = response;
    },
    async getServices() {
      const response = await getServicesList();
      this.serviceList = response;
    },
    async createSchedule() {
      const {date} = this.schedule
      const data = date + ':00'
      this.schedule.date = data
      createSchedule(this.schedule);
      this.closeModal()
    },
    closeModal() {
      this.isOpen = false;
    },
    openModal() {
      this.isOpen = true;
    },
  },
  computed: {
    formatCurrency(){
      return formatCurrency;
    }
  },
  mounted() {
    this.getEmployees();
    this.getClients();
    this.getServices();
  },
  watch:{
    'schedule.date'(newValue){
      console.log(newValue)
    }
  }
}
</script>
