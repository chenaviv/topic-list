const topics = [
  {
    "type": "1",
    "topic_name": "Markets",
    "doc_num": "246"
  },
  {
    "type": "2",
    "topic_name": "Business Sector",
    "doc_num": "44444444"
  },
  {
    "type": "3",
    "topic_name": "Events",
    "doc_num": "321698"
  },
  {
    "type": "3",
    "topic_name": "Business events",
    "doc_num": "1"
  },
  {
    "type": "2",
    "topic_name": "Deals",
    "doc_num": "44444444"
  }
]

function query() {
  const queriedTopics = JSON.parse(JSON.stringify(topics))
  return Promise.resolve(queriedTopics)
}

function editTopic(topicIdx, editedProperties) {
  const topic = {
    ...topics[topicIdx],
    ...editedProperties
  }
  topics.splice(topicIdx, 1, topic)
  return Promise.resolve(topic)
}

// Did not add an ID. This will not work well in case of duplicate names.
function removeTopic(topicIdx) {
  topics.splice(topicIdx, 1)
  return Promise.resolve()
}

export default {
  query,
  editTopic,
  removeTopic
}
