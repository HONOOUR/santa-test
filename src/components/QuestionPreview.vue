<template>
  <v-card>
    <v-card-title>Part6</v-card-title>
    <v-container>
      {{ data.preview }}
    </v-container>
  </v-card>  
</template>

<script>
  export default {
    name: 'QuestionPreview',
    computed: {
      data() {
        return this.$store.state.data;
      }
    },
    created() {
      // 본문 내용 ___(n)___ 형태로 수정
      let replacedText = this.data.preview;

      let selectedAnswer = [];
      for(const [index, question] of this.data.questions.entries()) {
        let initialData = `___(${index+1})___`;
        selectedAnswer.push(initialData);
        replacedText = replacedText.replace("_______", initialData);
      }
      this.$store.commit('setSelectedAnswer', selectedAnswer);
      this.$store.commit('setPreview', replacedText);
    }
  }
</script>

<style>

</style>