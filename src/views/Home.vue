<template>
  <div>
    <!-- Top Slider -->
    <v-subheader>진행사항</v-subheader>    
    <v-slider
      v-if="max"
      v-model="length"
      readonly
      inverse-label
      color="grey darken-3"
      min="1"
      :max="max"
      :label="length + '/' + max"
    ></v-slider>

    <!-- Question -->
    <v-card>
      <v-card-title>Part6</v-card-title>
      <v-container>
        {{ task.preview }}
      </v-container>
    </v-card>

    <!-- Solve -->
    <v-card class="mt-3">
      <!-- Tabs -->
      <v-tabs v-model="tabs">
        <v-tab v-for="(question, tabQuestionIndex) in task.questions" :key="tabQuestionIndex">
          {{ "Q" + (tabQuestionIndex + 1) }}
        </v-tab>
        <v-spacer></v-spacer>
        <v-switch v-model="isAutoNext" label="문제 넘어가기"></v-switch>
      </v-tabs>

      <!-- Tab Items -->
      <v-tabs-items v-model="tabs">
        <v-tab-item v-for="(question, tabItemQuestionIndex) in task.questions" :key="tabItemQuestionIndex">
          <v-list>
            <v-list-item
              v-for="(answer, answerIndex) in question.view_tree.children[2].children" :key="answerIndex"
              :class="isActiveArr[tabs][answerIndex] && white"
              @click="selAnswer(answer.children[0].children[0].chunk_id, answerIndex)"
            >
              <v-list-item-avatar
                color="black"
              >
                <span class="white--text">{{ answerIndex + 1 }}</span>
              </v-list-item-avatar>
              <v-list-item-content>
                <span>{{ chunckMap[answer.children[0].children[0].chunk_id].text_en }}</span>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <!-- Bottom Appbar -->
    <v-app-bar
      bottom 
      color="grey darken-3"
    >
      <v-btn
        text
        height="100%"
        class="white--text"
      >
        본문 단어 힌트
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        text
        height="100%"
        class="white--text"
      >
        단어 힌트
      </v-btn>      
      <v-btn
        text
        height="100%"
        class="white--text"
      >
        채점하기
      </v-btn>
    </v-app-bar>

    <!-- Submit Dialog -->
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title>
          답변 제출
        </v-card-title>
        <v-card-text class="pb-0">
          <div v-for="(answer, index) in answers" :key="index">
            Q{{ index + 1 }} {{ answer.content }}
          </div>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="secondary"
            @click="goEditAnswer"
          >
            수정
          </v-btn>          
          <v-btn
            outlined
            color="primary"
            @click="submitAnswer"
          >
            제출
          </v-btn> 
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

  export default {
    name: 'Home',
    data() {
      return {
        task: {},
        tabs: 0,
        dialog: false,
        underscoreArr: [],
        answers: [],
        isActiveArr: [],
        white: 'purple',
        isAutoNext: false
      }
    },
    computed: {
      chunckMap() {
        return this.task.chunk_map
      },
      max() {
        if(this.task.questions) {
          return this.task.questions.length;
        }
        return 1;
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
      this.fetchData();
    },
    methods: {
      // Initialize
      async fetchData() {
        const { data } = await this.$axios.get('/task_container.json');
        this.task = data;

        for(const [index1, question] of this.task.questions.entries()) {
          this.isActiveArr.push([])
          this.underscoreArr.push('_______');
          for(let i=0; i <question.view_tree.children[2].children.length; i++) {
            this.isActiveArr[index1].push(false);
          }
        }
      },
      // Answer 선택 시
      selAnswer(chunkId, answerIndex) {
        // 자신이 선택한 값 ex) both
        let content = this.chunckMap[chunkId].text_en;
        // Question의 _____을 선택한 값으로 바꿈.


        for(const item of this.underscoreArr) {
          let replacedText = this.task.preview.replace(this.underscoreArr[this.tabs], `"${content}"`);
          this.task.preview = replacedText;
          this.underscoreArr[this.tabs] = `"${content}"`;
        }
        let replacedText = this.task.preview.replace(this.underscoreArr[this.tabs], `"${content}"`);
        this.task.preview = replacedText;
        this.underscoreArr[this.tabs] = `"${content}"`;
        return;
        // 선택한 답변 답안 목록에 추가.
        this.answers[this.tabs] = {
          answer: String.fromCharCode(answerIndex + 97),
          questionId: this.tabs + 1,
          answerId: chunkId,
          content
        }
        
        // 정렬
        this.answers.sort((a, b) => {
          return a.questionId < b.questionId ? -1 : a.questionId > b.questionId ? 1: 0;
        });

        this.isActiveArr[this.tabs].forEach((item, index) => {
          if(item) {
            this.isActiveArr[this.tabs][index] = false;
          }
        });
        this.isActiveArr[this.tabs][answerIndex] = true;

        // 문제 자동 넘어가기
        if(this.isAutoNext) {
          this.tabs++;
        }
       },
      // Answers 제출 선택
      submitAnswer() {
        // this.$store.commit('setSubmmitted', true);
        this.$router.push({ path: '/my-note' });
      },
      // Answer 수정 선택
      goEditAnswer() {
        this.dialog = false;
        this.tabs = 0;
      },
    }
  }
  </script>

<style scoped>
</style>