<template>
  <v-dialog
    v-model="submitDialogModel"
    width="500"
  >
    <v-card :color="color">
      <v-card-title class="white--text">
        답변 제출
      </v-card-title>
      <v-card-text class="pb-0 white--text">
        선택한 답변
        <div v-for="(answer, dialogIndex) in answers" :key="dialogIndex">
          <div v-if="answer">
            Q{{ answer.questionId + 1 }} {{ answer.content }}
          </div>
        </div>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          outlined
          color="white"
          @click="submitAnswer"
        >
          제출
        </v-btn> 
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data() {
      return {
        color: 'grey darken-2',
      }
    },
    computed: {
      submitDialogModel: {
        get() {
          return this.$store.state.submitDialogModel;
        },
        set(tabs) {
          this.$store.commit('setSubmitDialogModel', false);
        }        
      },
      answers(){
        return this.$store.state.answers;
      }
    },
    methods: {
      submitAnswer() {
        this.$store.commit('submitAnswer', true);
        this.$store.commit('setSubmitDialogModel', false);
        this.$router.push({ path: '/my-note' });
      },      
    }
  }
</script>