<template>
  <div>
    <!-- Top Slider -->
    <v-slider
      v-if="max"
      v-model="length"
      readonly
      color="red"
      min="1"
      :max="max"
      label="진행사항"
    ></v-slider>
    <!-- Question -->
    <v-card>
      <v-card-title>Part6 - 1</v-card-title>
      <v-container>
        {{ data.preview }}
      </v-container>
    </v-card>
    <!-- Solve -->
    <v-card class="mt-3">
      <!-- Tabs -->
      <v-tabs v-model="tabs">
        <v-tab v-for="(question, queId) in questions" :key="queId">
          {{ "Q" + (queId + 1) }}
        </v-tab>
        <v-spacer></v-spacer>
      </v-tabs>
      <!-- Tab Items -->
      <v-tabs-items v-model="tabs">
        <v-tab-item v-for="(question, queId_) in questions" :key="queId_">
          <v-list>
            <v-list-item
              v-for="(answer, answerId) in question.view_tree.children[2].children" :key="answerId"
              @click="selAnswer(answer.children[0].children[0].chunk_id)"
            >
              <v-list-item-avatar color="black">
                <span class="white--text">{{ answerId + 1 }}</span>
              </v-list-item-avatar>
              <v-list-item-content>
                <span>{{ chunckMap[answer.children[0].children[0].chunk_id].text_en }}</span>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
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
        data: {},
        tabs: 0,
        dialog: false,
      }
    },
    computed: {
      questions() {
        return this.data.questions;
      },
      chunckMap() {
        return this.data.chunk_map
      },
      max() {
        if(this.data.questions) {
          return this.data.questions.length;
        }
        return null;
      },
      length() {
        return this.tabs + 1;
      },
      answers() {
        return this.$store.state.answers;
      }
    },
    created() {
      // 초기 실행 메소드 실행
      this.init();
    },
    methods: {
      // 초기 실행 메소드 정의
      init() {
        // 데이터 Fetch
        this.$axios.get('/task_container.json')
          .then(({ data }) => {
            this.data = data;
          });
      },
      // Answer 선택 시
      selAnswer(chunkId) {
        this.$store.commit("selAnswer", {
          questionId: this.tabs + 1,
          answerId: chunkId,
          content: this.chunckMap[chunkId].text_en
        });
        if(!(this.tabs === 3)) {
          // Tab 넘어가기
          this.tabs++;
        } else {
          // 문제 제출 여부 물어보기.
          this.dialog = true;
        }        
      },
      // Answers 최종 제출
      submitAnswer() {
      },
      // 답변 수정하러 가기
      goEditAnswer() {
        this.dialog = false;
        this.tabs = 0;
      }
    }
  }
  </script>
