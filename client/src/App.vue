<template>
  <v-app style="background: #e3e3ee">
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar color="accent" dark flat>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <router-link to="/" tag="h1" class="title pl-3" style="cursor: pointer">VueShare</router-link>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-card dark color="primary" flat tile>
      <v-toolbar>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">VueShare</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
          flex
          prepend-icon="mdi-magnify"
          placeholder="Search posts"
          color="accent"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card>

    <main>
      <router-view />
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    sideNav: false,
  }),

  computed: {
    horizontalNavItems: () => [
      { icon: 'mdi-message-text', title: 'Posts', link: '/posts' },
      { icon: 'mdi-lock-open-outline', title: 'Sign In', link: '/signin' },
      { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup' },
    ],
    sideNavItems: () => [
      { icon: 'mdi-message-text', title: 'Posts', link: '/posts' },
      { icon: 'mdi-lock-open-outline', title: 'Sign In', link: '/signin' },
      { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup' },
    ],
  },

  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
  },
};
</script>
