<template>
  <div class="col-4">
    <button
      class="btn btn-secondary btn-sm"
      type="button"
      @click="handlePageChange(previousPage)"
      v-if="previousPage !== null"
    >
      Anterior
    </button>
  </div>
  <div class="col-4">
    <span
      class="btn btn-sm b-4"
      @click="handlePageChange(1)"
      :disabled="pagination?.totalPages <= 1"
      >1</span
    >

    <span v-if="shouldShowMiddlePaginationPageNumber">...</span>
    <span v-if="shouldShowMiddlePaginationPageNumber" class="btn btn-sm b-4">
      {{ pagination?.pageNumber }}
    </span>

    <span v-if="shouldShowLastPaginationPageNumber">...</span>
    <span
      class="btn btn-sm b-4"
      @click="handlePageChange(pagination?.totalPages)"
      :aria-disabled="pagination?.totalPages === pagination?.totalPages"
      v-if="shouldShowLastPaginationPageNumber"
    >
      {{ pagination?.totalPages }}
    </span>
  </div>
  <div class="col-4">
    <button
      class="btn btn-secondary btn-sm"
      type="button"
      @click="handlePageChange(nextPage)"
      v-if="nextPage !== null"
    >
      Próxima
    </button>
  </div>
</template>

<script lang="ts">
export default {
  props: ["handlePageChange", "pagination"],
  computed: {
    shouldShowMiddlePaginationPageNumber() {
      return (
        this.pagination?.totalPages > 1 &&
        this.pagination.pageNumber !== 1 &&
        this.pagination?.pageNumber !== this.pagination.totalPages
      );
    },
    shouldShowLastPaginationPageNumber() {
      return this.pagination?.totalPages > 1;
    },
    previousPage() {
      return this.pagination && this.pagination.pageNumber > 1
        ? this.pagination.pageNumber - 1
        : null;
    },
    nextPage() {
      return this.pagination &&
        this.pagination.pageNumber < this.pagination.totalPages
        ? this.pagination.pageNumber + 1
        : null;
    }
  }
};
</script>
