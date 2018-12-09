<template>
<div class="topic-list">
  <TopicListActions @search="filterTxt = $event"/>
  <table class="topic-list__table">
    <thead>
      <tr class="topic-list__header">
        <th>Type</th>
        <th class="topic-list__name">Topic Name</th>
        <th>Positive Training Documents</th>
        <th class="topic-list__actions">Actions</th>
      </tr>
    </thead>
    <tbody>
      <TopicItem class="topic-list__topic"
          v-for="(topic, i) in topicsToDisplay"
          :key="i"
          v-bind="topic"
          @remove="removeTopic(topic.topic_name)"
          @edit="editTopic(topic.topic_name, $event)"
      />
    </tbody>

  </table>  
</div>
</template>

<script>
import TopicService from '@/services/topicService'
import TopicItem from '@/components/TopicItem'
import TopicListActions from '@/components/TopicListActions'

export default {
  name: 'topic-list',
  components: {
    TopicItem,
    TopicListActions
  },
  data() {
    return {
      topics: [],
      filterTxt: ''
    }
  },
  computed: {
    safeFilterTxt() {
      return this.filterTxt.toLowerCase()
    },
    topicsToDisplay() {
      return this.topics.filter(({topic_name}) => topic_name.toLowerCase().includes(this.safeFilterTxt))
    }
  },
  methods: {
    editTopic(topicName, editedTopicName) {
      const topicIdx = this.topics.findIndex(topic => topic.topic_name === topicName)
      console.log({topicIdx})
      TopicService.editTopic(topicIdx, {topic_name: editedTopicName})
        .then(editedTopic => this.topics.splice(topicIdx, 1, editedTopic))
    },
    removeTopic(topicName) {
      const topicIdx = this.topics.findIndex(topic => topic.topic_name === topicName)
      TopicService.removeTopic(topicIdx)
        .then(_ => this.topics.splice(topicIdx, 1))
    }
  },
  created() {
    TopicService.query()
      .then(topics => this.topics = topics)
  }
}
</script>

<style>

.topic-list {
  width: 90%;
  margin: auto;
}

.topic-list__table {
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid #d7d7d7;
}

.topic-list th,
.topic-list td {
  padding: 0.5rem 0;
}

.topic-list th {
  text-align: left;
  border-top: 1px solid #d5e9ef;
  border-bottom: 3px solid #80b8d8;
}

.topic-list td {
  border-top: 1px solid #bebebe;
}

.topic-list__name {
  min-width: 25vw;
}

.topic-list__actions {
  width: 11rem;
}

</style>
