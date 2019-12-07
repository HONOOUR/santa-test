<template>
  <div>
    <v-tabs v-model="tabs">
      <v-tab>
        내가 푼 문제
      </v-tab>
      <v-tab>
        내가 본 강의
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabs">
      <v-tab-item v-if="!submmitted">
        아직 푼 문제가 없습니다.
      </v-tab-item>
      <v-tab-item v-else>
        Part6
      </v-tab-item>      
      <v-tab-item>
        본 강의가 없습니다.
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  export default {
    name: 'MyNote',
    data() {
      return {
        tabs: 0,
        result: [],
      }
    },
    computed: {
      task() {
        return this.$store.state.task;
      },
      answers() {
        return this.$store.state.answers;
      },
      submmitted() {
        return this.$store.state.submmitted;
      }
    },
    created() {
      if(this.submmitted) {
        this.compareAnswer();
        this.solved = true;
      }
    },
    methods: {
      compareAnswer() {
        for(const [index, question] of this.task.questions.entries()) {
          if(this.answers[index].answer === question.correct_answer) {
            this.result.push({})
          } else {
            
          }
        }
      }
    }
  }
</script>