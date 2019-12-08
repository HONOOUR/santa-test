<template>
  <v-list>
    <v-list-item
      v-for="(answer, index) in question.view_tree.children[2].children" :key="index"
      :class="[isActive[index] ? activeColor : '']"
      @click="selAnswer(answer.children[0].children[0].chunk_id, index)"
    >
      <v-list-item-avatar
        color="black"
        style="font-size: 25px"
      >
        <span class="white--text">{{ String.fromCharCode(index + 65) }}</span>
      </v-list-item-avatar>
      <v-list-item-content>
        <span>{{ data.chunk_map[answer.children[0].children[0].chunk_id].text_en }}</span>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
  export default {
    name: 'AnswerList',
    props: {
      queIndex: {
        type: Number,
        required: false,
      },
      question: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isActive: [],
        activeColor: 'grey lighten-1',
      }
    },
    computed: {
      data() {
        return this.$store.state.data;
      },
      selectedAnswer() {
        return this.$store.state.selectedAnswer;
      }
    },
    created() {
      for(let i=0; i<this.question.view_tree.children[2].children.length; i++) {
        // 답변 선택 시 활성화를 위한 배열 초기 작업
        this.isActive.push(false);
      }
    },
    methods: {
      // Answer 선택 시
      selAnswer(chunkId, index) {
        // 자신이 선택한 값 ex) both
        let content = this.data.chunk_map[chunkId].text_en;

        // Question의 ___(n)___ 혹은 이미 선택된 답을 선택한 값으로 바꿈.
        let replacedText = this.data.preview.replace(this.selectedAnswer[this.queIndex], content);
        this.$store.commit('setPreview', replacedText);
        this.$store.commit('changeSelectedAnswer', {
          index: this.queIndex, content
        });

        // 선택한 답변 답안 목록에 추가.
        this.$store.commit('selAnswer', {
          answer: String.fromCharCode(index + 97),
          questionId: this.queIndex,
          answerId: chunkId,
          content
        });

        this.isActive.forEach((item, index) => {
          this.isActive[index] = false;
        });

        this.$set(this.isActive, index, true);
      },
    }
  }
</script>

<style>

</style>