<template>
  <div>
    <Header></Header>

    <div class="container mt-5 pt-5">
      <button @click="$router.push('/')" class="btn btn-outline-primary mb-4">
        <i class="bi bi-arrow-left"></i> Back to Home
      </button>

      <div v-if="movie" class="card shadow-primary p-4 bg-light">
        <div class="row g-4 align-items-start">
          <div class="col-md-5 text-center p-3">
            <img :src="movie.poster" class="img-fluid rounded border border-primary shadow-primary" alt="Movie Poster" style="max-width: 400px; height: auto;"/>
          </div>

          <div class="col-md-7">
            <h2 class="text-primary fw-bold">{{ movie.title }}</h2>
            <p><strong>Directors:</strong> {{ movie.directors?.join(', ') }}</p>
            <p><strong>Writers:</strong> {{ movie.writers.join(', ') }}</p>
            <p><strong>Cast:</strong> {{ movie.cast?.join(', ') }}</p>
            <p><strong>Year:</strong> {{ movie.year }}</p>
            <p><strong>Runtime:</strong> {{ movie.runtime }} mins</p>
            <p><strong>Genres:</strong> {{ movie.genres?.join(', ') }}</p>
            <p><strong>Type:</strong> {{ movie.type }}</p>
            <p><strong>Languages:</strong> {{ movie.languages.join(', ') }}</p>
            <p><strong>Countries:</strong> {{ movie.countries.join(', ') }}</p>
            <p><strong>IMDb Rating:</strong> ⭐ {{ movie.imdb?.rating }} ({{ movie.imdb?.votes }} votes)</p>
            <p><strong>Tomatoes Viewer Rating:</strong> 🍅 {{ movie.tomatoes?.viewer?.rating }} ({{ movie.tomatoes?.viewer?.numReviews }} reviews)</p>
            <p><strong>Website:</strong> <a :href="movie.tomatoes.website" target="_blank" class="text-decoration-underline text-info">{{ movie.tomatoes.website }}</a> </p>
            <p><strong>Production:</strong> {{ movie.tomatoes.production }}</p>
            <hr />
            <p><strong>Plot:</strong> {{ movie.plot }}</p>
            <p><strong>Awards:</strong> {{ movie.awards?.text }}</p>
          </div>
        </div>

        <div class="mt-4 shadow-primary">
          <h5 class="text-primary p-3">Rated Comments</h5>
          <ul class="list-group">
            <li v-for="(comment, index) in comments" :key="index" class="list-group-item">
              <p class="mb-1"><strong>{{ comment.author }}</strong></p>
              <p class="mb-1">Rating: ⭐ {{ comment.rating }}</p>
              <p class="mb-0">{{ comment.text }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div v-else class="text-center text-muted mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Loading movie details...</p>
      </div>
    </div>


    <footer class="bg-primary text-light text-center mt-5 p-4 ">
      <p>&copy; 2025 MovieDB. All rights reserved.</p>
      <p>Contact us at support@moviedb.com | Privacy Policy | Terms of Service</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from './Header.vue'

const route = useRoute()
const movie = ref(null)

const comments = ref([
  {
    author: 'John Doe',
    rating: 4,
    text: 'A brilliant depiction of early Native American life. A historical gem.'
  },
  {
    author: 'Jane Smith',
    rating: 3,
    text: 'Visually interesting but lacks depth in storytelling.'
  }
])

const fetchMovie = async () => {
  try {
    const response = await fetch(`http://localhost:3000/movies/${route.params.id}`)
    movie.value = await response.json()
  } catch (error) {
    console.error('Error fetching movie:', error)
  }
}

onMounted(fetchMovie)
</script>

<style scoped>
body {
  padding-top: 80px;
  background-color: #f5faff;
}
.card img {
  max-height: 400px;
  object-fit: cover;
}
.shadow-primary {
  box-shadow: 0 0 15px rgba(0, 123, 255, 0.4); /* Bootstrap primary blue */
}

</style>
