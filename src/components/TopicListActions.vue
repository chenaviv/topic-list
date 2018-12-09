<template>
<div class="topic-list__general-actions">
  <div class="general-actions__search">
    🔍
    <input placeholder="Search Topic Name"
      @input="emitSearch($event.target.value)"
    />
  </div>
  
</div>
</template>

<script>
export default {
  name: 'topic-list-actions',
  methods: {
    emitSearch(val) {
      this.$emit('search', val)
    }
  }
}
</script>

<style>

.topic-list__general-actions {
  margin: 2rem 0.5rem 0.5rem;
}

.general-actions__search {
  border: 1px solid #cfcfcf;
  padding: 4px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  width: 20vw;
}

.general-actions__search input {
  outline: none;
  border: none;
  margin-left: 0.5rem;
  width: calc(100% - 2rem);
  color: inherit;
  font-size: 0.9rem;
}

</style>
