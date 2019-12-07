<template>
  <v-app>
    <v-app-bar
      app
      dark
      hide-on-scroll
      color="grey darken-3"
    >
      <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title 
        class="cursor pl-0"
        @click="navigateTo('/')"
      >
        뤼이드 과제
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        text
        @click="navigateTo('/bonus')"
      >
        <span class="mr-2">Bonus Question</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs
          background-color="transparent"
        >
          <v-tab>Part1</v-tab>
          <v-tab>Part2</v-tab>
          <v-tab>Part3</v-tab>
          <v-tab>Part4</v-tab>
          <v-tab>Part5</v-tab>
          <v-tab>Part6</v-tab>
        </v-tabs>
      </template>        
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!-- Navigation Drawer -->
    <v-navigation-drawer 
      v-model="drawer"
      app
      class="grey darken-3"
    >
      <v-card
        tile
        color="grey darken-4"
      >
        <v-card-title class="white--text text-center">
          <v-container>
            SANTA TOEIC
          </v-container>
        </v-card-title>
      </v-card>
      <v-list 
        class="pt-0 pb-0"
        style="overflow: hidden"
      >
        <v-list-item-group color="white">
          <v-list-item v-for="(menu, i) in menus" :key="i" @click="navigateTo(menu.path)">
            <v-list-item-icon>
              <v-icon color="white" v-text="menu.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text" v-text="menu.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        menus: [
          { text: '학습하기', icon: 'mdi-home', path:"/" },
          { text: '마이노트', icon: 'mdi-note', path:"/my-note" },
        ],        
        drawer: false,
      }
    },
    methods: {
      navigateTo(path) {
        if(!(this.$route.path === path)) {
          this.$router.push({ path: path });
        }
      },
    }
  };
</script>

<style scoped>
  .cursor {
    cursor: pointer;
  }
</style>