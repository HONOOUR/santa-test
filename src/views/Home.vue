<template>
  <div v-if="data.questions">
    <!-- Top Slider -->
    <v-subheader>진행사항</v-subheader>    
    <v-slider
      v-if="data.questions"
      v-model="length"
      readonly
      inverse-label
      :color="primaryColor"
      min="1"
      :max="data.questions.length"
      :label="length + '/' + data.questions.length"
    ></v-slider>

    <!-- Question -->
    <QuestionPreview />

    <!-- Answer -->
    <v-card class="mt-4">
      <!-- Tabs -->
      <v-tabs v-model="tabs">
        <v-tab v-for="(question, index) in data.questions" :key="index">
          {{ "Question" + (index + 1) }}
        </v-tab>
      </v-tabs>

      <!-- Tab Items -->
      <v-tabs-items v-model="tabs">
        <v-tab-item v-for="(question, itemIndex) in data.questions" :key="itemIndex">
          <AnswerList :question="question" :queIndex="tabs" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <!-- Question Bottom -->
    <QuestionBottomBar />

    <!-- Submit Dialog -->
    <SubmitDialog />
  </div>
</template>

<script>
  import QuestionPreview from '../components/QuestionPreview';
  import AnswerList from '../components/AnswerList';
  import QuestionBottomBar from '../components/QuestionBottomBar';
  import SubmitDialog from '../components/SubmitDialog';

  export default {
    name: 'Home',
    components: {
      AnswerList, QuestionPreview, QuestionBottomBar, SubmitDialog
    },
    data() {
      return {
        tabs: 0,
        dialog: false,
        underscoreArr: [],
        primaryColor: 'grey darken-3',
      }
    },
    computed: {
      data() {
        return this.$store.state.data;
      },
      length: {
        get() {
          return this.tabs + 1
        },
        set(tabs) {
          this.tabs = tabs -1
        }
      },
    },
    created() {
      this.init();
    },
    methods: {
      async init() {
        // 비동기로 데이터 가져오기
        const { data } = await this.$axios.get('/task_container.json');
        this.$store.commit('setData', data);

        for(let i=0; i<this.data.length; i++) {
          this.$store.commit('selAnswer', { questionId: index });          
        }
      },      
    }
  }
  </script>