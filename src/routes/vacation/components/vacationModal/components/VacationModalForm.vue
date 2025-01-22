<template>
  <form
    @submit.prevent="submitForm(computedForm)"
    class="row justify-content-center align-items-center"
    id="vacationCreateForm"
  >
    <div class="col-xs-12 col-sm-8 my-2">
      <label class="form-label">{{
        type === "dayOff" ? "Selecione o período" : "Quantidade de dias"
      }}</label>
      <select
        class="form-select"
        aria-label="days select"
        v-model="form.daysQtd"
        required
      >
        <option selected :value="null">Selecione a quantidade de dias</option>
        <option
          v-for="{ daysQtd, label } in daysOptions"
          :key="`select-day-option-${daysQtd}`"
          :value="daysQtd"
        >
          {{ label }}
        </option>
      </select>
    </div>
    <div class="col-xs-12 col-sm-4 my-2">
      <label class="form-label">Início</label>
      <input
        class="form-control"
        type="date"
        v-model="form.startDate"
        placeholder="ex: 03/12/1990"
        required
      />
    </div>
    <div class="col-xs-12 col-sm- my-2">
      <label class="form-label">Trabalhador</label>
      <select
        class="form-select"
        aria-label="Worker select"
        v-model="form.worker"
        required
        v-if="workers"
      >
        <option selected :value="null">Selecione o trabalhador</option>
        <option v-for="worker in workers" :key="worker._id" :value="worker._id">
          {{ capitalizeName(worker.name) }}
        </option>
      </select>
      <p v-else>Não há trabalhadores. Você precisa criá-los primeiro.</p>
    </div>
    <div class="col-xs-12 col-sm- my-2">
      <label class="form-label">Chefe</label>
      <select
        class="form-select"
        aria-label="Boss select"
        v-model="form.boss"
        required
        v-if="bosses"
      >
        <option :value="null">Selecione quem autoriza</option>
        <option
          v-for="boss in bosses"
          :key="`boss-${boss._id}`"
          :value="boss._id"
        >
          {{ capitalizeName(boss.name) }}
        </option>
      </select>
      <p v-else>Não há chefes. Você precisa criá-los primeiro.</p>
    </div>
    <div class="col-xs-12 col-sm- my-2" v-if="computedModalType === 'edit'">
      <label class="form-label">Observação</label>
      <textarea class="form-control" v-model="form.observation"></textarea>
    </div>
  </form>
</template>

<script lang="ts">
import { format } from "date-fns";
import type { VacationModalFormDataInterface } from "../../../types";
import { capitalizeName } from "../../../../utils";
import { getDaysOptions, getVacationOptions } from "./options";
import { getBoss, getBosses } from "@/routes/vacation/fetch";
import { useVacationModals } from "@/routes/vacation/composables/modals";

export default {
  async beforeMount() {
    await this.updateBosses();
  },
  name: "VacationModalForm",
  props: ["workers", "submitForm", "vacation", "type"],
  emits: ["formUpdated"],
  data(): VacationModalFormDataInterface {
    return {
      bosses: [],
      form: {
        daysQtd: this.vacation?.daysQtd ?? null,
        worker: this.vacation?.worker._id ?? null,
        type: this.vacation?.type ?? this.type,
        startDate: this.vacation?.startDate ?? format(new Date(), "yyyy-MM-dd"),
        boss: this.vacation?.boss._id ?? null,
        observation: this.vacation?.observation ?? undefined,
        _id: undefined
      }
    };
  },
  methods: {
    capitalizeName,
    async updateBosses() {
      const {
        data: { bosses }
      } = await getBosses();

      this.bosses = bosses ?? [];
    },
    async setForm() {
      if (this.computedModalType === "edit") {
        const startDate = format(
          new Date(this.vacation?.startDate),
          "yyyy-MM-dd"
        );

        this.form = {
          daysQtd: this.vacation.daysQtd,
          startDate,
          worker: this.vacation.worker._id,
          type: this.vacation.type,
          _id: this.vacation._id,
          observation: this.vacation.observation,
          boss:
            this.vacation?.boss?._id ??
            (await getBoss({ isDirector: this.vacation.type === "vacation" }))
              ?._id
        };
      } else {
        this.form = {
          daysQtd: null,
          type: this.type,
          startDate: format(new Date(), "yyyy-MM-dd"),
          worker: null,
          observation: "",
          boss: (await getBoss({ isDirector: this.type === "vacation" }))?._id
        };
      }
    }
  },
  computed: {
    daysOptions() {
      return getDaysOptions(this.type);
    },
    vacationsOptions() {
      return getVacationOptions(this.type);
    },
    computedForm() {
      if (this.form.startDate)
        this.form.startDate = format(
          new Date(this.form.startDate),
          "yyyy-MM-dd"
        );
      return this.form;
    },
    computedModalType() {
      return useVacationModals().createEditModalType.value;
    }
  },
  watch: {
    form: {
      handler() {
        this.$emit("formUpdated", { ...this.form, type: this.type });
      },
      deep: true
    },
    vacation: {
      async handler() {
        this.setForm();
      },
      deep: true
    },
    computedModalType: {
      async handler() {
        this.setForm();
      },
      deep: true
    },
    type: {
      async handler() {
        await this.updateBosses();
      }
    }
  }
};
</script>
