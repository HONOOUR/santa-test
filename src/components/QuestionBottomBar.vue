<template>
  <v-app-bar
    bottom 
    :color="primaryColor"
  >
    <v-spacer></v-spacer>
    <v-btn
      text
      height="100%"
      color="white"
    >
      단어 힌트
    </v-btn>      
    <v-btn
      text
      height="100%"
      color="white"
      @click="onClickSolved"
    >
      채점하기
    </v-btn>
  </v-app-bar>  
</template>

<script>
  export default {
    data() {
      return {
        primaryColor: 'grey darken-3',        
      }
    },
    methods: {
      // 채점하기 클릭 시
      onClickSolved() {
        this.$store.commit('setSubmitDialogModel', true);
      },
    }
  }
</script>

<style>

</style>