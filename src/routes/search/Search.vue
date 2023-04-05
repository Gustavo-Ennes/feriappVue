<template>
  <div class="container">
    <div class="row justify-content-center align-items-start g-2">
      <h1 class="col-12 my-4">Buscando por '{{ searchTerm }}'</h1>
      <div class="col-12 col-md-6" v-if="results?.workers?.length">
        <SearchWorker :workers="results?.workers" />
      </div>
      <div class="col-12 col-md-6" v-if="results?.departments?.length">
        <SearchDepartment :departments="results?.departments" />
      </div>
      <div class="col-12" v-if="results?.vacations?.length">
        <SearchVacation :vacations="results?.vacations" />
      </div>
      <div
        class="col-12"
        v-if="
          !results?.vacations?.length &&
          !results?.workers?.length &&
          !results?.departments?.length
        "
      >
        <p>Não resultados para a busca.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SearchDepartment from "./components/SearchDepartment.vue";
import SearchVacation from "./components/SearchVacation.vue";
import SearchWorker from "./components/SearchWorker.vue";
import { getSearchResults } from "./fetch";
import type { SearchDataInterface } from "./types";

export default {
  name: "Search",
  props: ["searchTerm"],
  data(): SearchDataInterface {
    return {
      results: undefined,
    };
  },
  async beforeMount(): Promise<void> {
    this.doSearch();
  },
  methods: {
    async doSearch(): Promise<void> {
      const { data } = await getSearchResults(this.searchTerm);
      this.results = data?.search;
      console.log(
        "🚀 ~ file: Search.vue:50 ~ doSearch ~ this.results:",
        this.results
      );
    },
  },
  watch: {
    async searchTerm() {
      await this.doSearch();
    },
  },
  components: { SearchDepartment, SearchVacation, SearchWorker },
};
</script>
