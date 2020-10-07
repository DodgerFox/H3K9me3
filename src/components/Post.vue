<template id="post">
  <article class="post" :class="{active: active}">
    <div @click="openPost()" class="post-container" :style="{ backgroundImage: 'url(' + article.cover + ')' }" :class="{cover: article.cover}">
        <p class="post-title">{{ article.title }}</p>
        <div class="category">
          <div v-for="cat in article.categories" :key="cat.id" class="category-item" :class="cat.color" @click.stop.prevent="setFilter(cat)">{{cat.name}}</div>
        </div>
        <div class="info">
          <div class="info-wrap">
            <a href="#" class="info__place" v-if="article.place">{{ article.place.name }}</a>
            <p class="info__tag" v-if=" article.tags ">{{ article.tags }}</p>
            <p class="info__date">{{ getDate() }}</p>
          </div>
          <div class="info-wrap">
            <a v-if="this.article.hot" class="info__flame" href="#">
              <img src="@/assets/images/icon_flame.svg">
            </a>
            <a class="info__user" href="#" :style="{ backgroundImage: 'url(' + article.author.avatar + ')' }"></a>
          </div>
        </div>
  </div>
  </article>
</template>

<script>
import moment from 'moment'

  export default {
    props: {
      article: {
        type: Object,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    data: () => ({
      active: false
    }),
    computed: {
      getActive () {
        return this.$store.getters.getActiveEvent
      }
    },
    methods: {
      setFilter(cat) {
        cat.active = true
        this.$store.dispatch('changeFilters', cat)
      },
      openPost () {        
        if (this.type === 'events') {
          if (this.$store.getters.getActiveEvent == this.article) {
            this.$router.push({name: 'event', params: {hash: this.article.hash}})
            this.$store.dispatch('changeMode')
          } else {
            this.$store.dispatch('setActiveEvent', this.article)
          }
        } else {
          this.$store.dispatch('setActiveArticle', this.article)
          this.$router.push({name: 'article', params: {hash: this.article.hash}})
        }
      },
      getDate () {
        return moment(this.article.date).format('DD. MM. YYYY')
      }
    },
    mounted(){
      this.active = this.getActive === this.article ? true : false;

    }
  }
</script>
