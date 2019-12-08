<template>
  <div>
    <div v-if="!submitted">
      아직 푼 문제가 없습니다.
    </div>
    <div v-else>
      <div v-for="(question, index) in data.questions" :key="index">
        <v-card class="mt-4">
          <v-card-title>Question {{ index + 1 }}</v-card-title>
          <v-card-text class="black--text">
            <div>{{ noteList[index].text_en }}</div> 
            <div>{{ noteList[index].text_kr }}</div> 
          </v-card-text>
          <VAnswerList :queIndex="index" :question="question" :propArr="propArr" />
        </v-card>
      </div>
      <v-card class="mt-4">
        <v-card-title>Vocabularies</v-card-title>
        <v-card-text class="black--text">
          <div v-for="(item, vocaIndex) in data.passage_box.vocabularies" :key="200+vocaIndex">
            {{ item.word }}: {{ item.meaning }}
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
  import AnswerList from '../components/AnswerList';
  import VAnswerList from '../components/VAnswerList';

  export default {
    name: 'MyNote',
    components: {
      AnswerList, VAnswerList
    },
    data() {
      return {
        noteList: [],
        propArr: []
      }
    },
    computed: {
      data() {
        return this.$store.state.data;
      },
      submitted() {
        return this.$store.state.submitted;
      },
      answers() {
        return this.$store.state.answers;
      }
    },
    created() {
      if(this.submitted) {
        this.compareAnswer();
      }
    },
    methods: {
      compareAnswer() {
        for(const [index, question] of this.data.questions.entries()) {
          let chunkId = question.view_tree.children[0].children[0].chunk_id;
          this.noteList.push(this.data.chunk_map[chunkId]);
          
          let commentArr = [[631178, 631179], [631189, 631190], [631200, 631201], [631211, 631212]];
          let wrongArr = [[631180, 631181, 631182], [631191, 631192, 631193], [631202, 631203, 631204], [631213, 631214, 631215]];
          let answer = this.answers[index].answer;
          if(answer === question.correct_answer) {
            this.propArr.push({
              queIndex: index,
              index: answer.charCodeAt(0) - 97,
              class: 'primary',
              code: 'O',
              feedback: {
              comment: commentArr[index],
              wrongAnswer: wrongArr[index],
              }
            });
          } else {
            this.propArr.push({
              queIndex: index,
              index: answer.charCodeAt(0) - 97,
              faildIndex: question.correct_answer.charCodeAt(0) - 97,
              failClass: 'pink lighten-2',
              class: 'grey lighten-1',
              feedback: {
                comment: commentArr[index],
                wrongAnswer: wrongArr[index],
              }
            });            
          }
        }
      }
    }
  }
</script>