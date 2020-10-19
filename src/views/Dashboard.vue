<template>
  <main class="main">
    <Header />
    <section class="welcome">
      <div class="wrap">
        <img src="@/assets/images/welcome.jpg" class="welcome-image">
        <div class="welcome-content">
          <h2>Welcome to website of scientific experiment</h2>
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p class="text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <router-link tag="div" class="button orange" to="/search">
            <p>Browser</p>
          </router-link>
        </div>
      </div>
        <div class="scroll-down">
          <p class="scroll-down__text">Scroll down</p>
          <img src="@/assets/images/scroll-down.svg" width="40px">
        </div>
    </section>

    <section class="section">
      <div class="wrap">
        <h2 class="section-title">How we did it?</h2>
        <p class="section-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
        <div class="section-block">
          <div class="section-content">
            <h2>1. Welcome to website of scientific experiment</h2>
            <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p class="text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <router-link tag="div" class="button orange" to="/search">
              <p>Search</p>
            </router-link>
          </div>
          <div class="section-image" style="background-image: url('@/assets/images/section-1.jpg');"></div>
        </div>
        <div class="section-block">
          <div class="section-content">
            <h2>2. Welcome to website of scientific experiment</h2>
            <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p class="text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <router-link tag="div" class="button orange" to="/search">
              <p>Search</p>
            </router-link>
          </div>
          <div class="section-image" :style="{ backgroundImage: 'url(@/assets/images/section-1.jpg)' }"></div>
        </div>
      </div>
    </section>
    <section class="section research">
      <div class="wrap">
        <h2 class="section-title">Research results</h2>
        <p class="section-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>

        <Table :max="10" v-if="research" :data="research.table" />
      </div>
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Table from '@/components/Table';

export default {
  name: 'dashboard',
  components: {
    Header,
    Table,
    Footer
  },
  data() {
    return {
      research: []
    }
  },
  computed: {
    getTable () {
      return this.$store.getters.getDashboardTable
    }
  },
  async mounted () {
    this.research = await this.$store.dispatch('getDashboard')
    console.log(this.reseach);
  }
}

</script>
