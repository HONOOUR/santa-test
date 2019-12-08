<template>
  <div>
    <v-list>
      <v-list-item
        v-for="(answer, index) in question.view_tree.children[2].children" :key="index"
        :class="[activeProp.index === index && activeProp.class, activeProp.faildIndex === index && activeProp.failClass]"
        @click="selAnswer(answer.children[0].children[0].chunk_id, index)"
      >
        <v-list-item-avatar
          color="black"
          style="font-size: 25px"
        >
          <span v-if="activeProp.code && activeProp.index === index" class="white--text">{{ activeProp.code }}</span>
          <span v-else class="white--text">{{ String.fromCharCode(index + 65) }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <span>{{ data.chunk_map[answer.children[0].children[0].chunk_id].text_en }}</span>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider class="mb-1"></v-divider><v-divider></v-divider>
    <v-card-text>
      <div class="title black--text mb-2">해설</div>
      <div v-for="(item ,index) in propArr[queIndex].feedback.comment" :key="index">
        {{ data.chunk_map[item].text_kr }}
      </div>
    </v-card-text>

    <v-divider class="mb-1"></v-divider><v-divider></v-divider>
    
    <v-card-text>
      <div class="title black--text mb-2">오답 분석</div>
      <div v-for="(item ,index) in propArr[queIndex].feedback.wrongAnswer" :key="index">
        {{ data.chunk_map[item].text_kr }}
      </div>      
    </v-card-text>
  </div>
</template>

<script>
  export default {
    name: 'AnswerList',
    props: {
      queIndex: {
        type: Number,
        required: true,
      },
      question: {
        type: Object,
        required: true,
      },
      propArr: {
        type: Array,
        required: true,
      },
    },    
    computed: {
      data() {
        return this.$store.state.data;
      },
      activeProp() {
        for(const element of this.propArr) {
          if(element.queIndex === this.queIndex) {
            return element;
          }
        }
      }
    },
  }
</script>

<style>

</style> 