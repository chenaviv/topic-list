<template>
<tr class="topic-item">
  <td>
    {{type}}
  </td>
  <td>
    <template v-if="!editMode">
      {{topic_name}}
    </template>
    <input v-else 
           v-model="editableTopicName"
           ref="editable"
           class="topic-item--edit"
           @keyup.enter="emitEdit"
           @blur="emitEdit"
    />
  </td>
  <td>
    {{doc_num}}
    <span v-if="safeDocNum < 200" class="topic-item--remark">
      <img :src="require('../assets/icons/danger.png')" class="icon"/>
      (need a 200 minimum)
      <button class="txt-btn">Add Documents</button>
    </span>
  </td>
  <td class="topic-item_actions">
    <img :src="require('../assets/icons/zip.png')"
         :class="{enabled: safeType === 1}"
         class="action icon"
         @click="print"
    />
    <img :src="require('../assets/icons/edit.png')"
         :class="{enabled: safeType === 2}"
         class="action icon"
         @click="edit"
    />
    <img :src="require('../assets/icons/bookmark.png')"
         :class="{enabled: false}"
         class="action icon"
    />
    <img :src="require('../assets/icons/trash.png')"
         :class="{enabled: safeType === 3}"
         class="action icon"
         @click="remove"
    />
  </td>
</tr>
</template>

<script>
import TopicService from '@/services/topicService'

export default {
  name: 'topic-item',
  props: {
    type: [String, Number],
    topic_name: String,
    doc_num: [String, Number]
  },
  data() {
    return {
      editMode: false,
      editableTopicName: this.topic_name
    }
  },
  computed: {
    safeType() {
      return +this.type
    },
    safeDocNum() {
      return +this.doc_num
    }
  },
  methods: {
    print() {
      if (this.safeType !== 1) return
      alert('Printing')
    },
    edit() {
      if (this.safeType !== 2) return
      this.editMode = true
      this.$nextTick()
        .then(_ => {
          this.$refs.editable.select()
        })
    },
    emitEdit() {
      this.$emit('edit', this.editableTopicName)
      this.editMode = false
    },
    remove() {
      if (this.safeType !== 3) return
      this.$emit('remove')
    },
  }
}
</script>

<style>

.topic-item .icon {
  width: 1.5rem;
  height: 1.5rem;
}

.topic-item--remark .txt-btn {
  border: none;
  background-color: transparent;
  font-size: 0.8rem;
  color: inherit;
}

.topic-item_actions .action {
  margin-right: 1.5rem;
  cursor: not-allowed;
  opacity: 0.3;
}

.topic-item_actions .action:last-of-type {
  margin-right: 0;
}

.topic-item_actions .enabled {
  cursor: pointer;
  opacity: 1;
}

.topic-item--remark {
  font-size: 0.9rem;
}

.topic-item--remark .icon {
  width: 0.9rem;
  height: 0.9rem; 
  margin-bottom: -2px;
}

.topic-item--edit {
  color: inherit;
  font-size: inherit;
  padding: 4px;
  border-radius: 3px;
  border: 1px solid #89b7d6;
}

</style>
