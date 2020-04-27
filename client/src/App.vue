<template>
  <v-app>
    <v-card dark color="primary" flat tile>
      <v-toolbar>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer"
            >VueShare</router-link
          >
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
          <v-btn
            v-for="item in horizontalNavItems"
            :key="item.title"
            :to="item.link"
          >
            <v-icon>{{ item.icon }}</v-icon
            >{{ item.title }}
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
  computed: {
    horizontalNavItems() {
      return [
        { icon: 'mdi-message-text', title: 'Posts', link: '/posts' },
        { icon: 'mdi-lock-open-outline', title: 'Sign In', link: '/signin' },
        { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup' },
      ];
    },
  },
};
</script>
