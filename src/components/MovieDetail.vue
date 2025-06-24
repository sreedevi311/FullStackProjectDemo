<template>
  <div>
    <div class="container mt-5 pt-5">
      <button @click="$router.push('/')" class="btn btn-outline-primary mb-4">
        <i class="bi bi-arrow-left"></i> Back to Home
      </button>

      <div v-if="movie" class="card shadow-primary p-4 bg-light">
        <div class="row g-4 align-items-start">
          <div class="col-md-5 text-center p-3">
            <img :src="movie.poster" class="img-fluid rounded shadow-primary p-2 m-3" alt="Movie Poster" style="max-width: 400px; height: auto;"/>
          </div>

          <div class="col-md-7">
            <h2 class="text-primary fw-bold">{{ movie.title }}</h2>
            <p><strong>Directors:</strong> {{ movie.directors?.join(', ') }}</p>
            <p><strong>Writers:</strong> {{ movie.writers?.join(', ') }}</p>
            <p><strong>Cast:</strong> {{ movie.cast?.join(', ') }}</p>
            <p><strong>Year:</strong> {{ movie.year }}</p>
            <p><strong>Runtime:</strong> {{ movie.runtime }} mins</p>
            <p><strong>Genres:</strong> {{ movie.genres?.join(', ') }}</p>
            <p><strong>Type:</strong> {{ movie.type }}</p>
            <p v-if="movie.languages"><strong>Languages:</strong> {{ movie.languages.join(', ') }}</p>
            <p><strong>Countries:</strong> {{ movie.countries?.join(', ') }}</p>
            <p><strong>IMDb Rating:</strong> ⭐ {{ movie.imdb?.rating }} ({{ movie.imdb?.votes }} votes)</p>
            <p><strong>Tomatoes Viewer Rating:</strong> 🍅 {{ movie.tomatoes?.viewer?.rating }} ({{ movie.tomatoes?.viewer?.numReviews }} reviews)</p>
            <p v-if="movie.tomatoes.website"><strong>Website:</strong> <a :href="movie.tomatoes.website" target="_blank" class="text-decoration-underline text-info">{{ movie.tomatoes.website }}</a> </p>
            <p v-if="movie.tomatoes.production"><strong>Production:</strong> {{ movie.tomatoes.production }}</p>
            <hr />
            <p><strong>Plot:</strong> {{ movie.plot }}</p>
            <p><strong>Awards:</strong> {{ movie.awards?.text }}</p>
          </div>
        </div>

        <div class="mt-4 shadow-primary rounded">
    <div class="d-flex justify-content-between align-items-center text-primary p-3" @click="showComments = !showComments">
      <h5 class="mb-0">Rated Comments</h5>
      <button
        class="btn btn-sm btn-outline-primary"
        @click="showComments = !showComments"
      >
        <i :class="showComments ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
      </button>
    </div>

    <div v-if="showComments">
      <ul class="list-group">
        <li v-for="(comment, index) in comments" :key="index" class="list-group-item">
          <div class="d-flex align-items-center mb-1">
            <i class="bi bi-person-circle text-primary me-2 fs-4"></i>
            <strong class="me-auto">{{ comment.name }} ⭐</strong>
            <small class="text-muted">commented on: {{ formatDate(comment.date) }}</small>
          </div>
          <div class="text-muted mb-1"><i class="bi bi-envelope me-2"></i>{{ comment.email }}</div>
          <div>{{ comment.text }}</div>
        </li>
      </ul>
    </div>
  </div>
        
      </div>
      <div v-else class="text-center text-muted mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Loading movie details...</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const movie = ref(null)
const showComments = ref(false)
const comments = ref([]);


const fetchMovie = async () => {
  try {
    console.log(route.params.id)
    const response = await fetch(`http://localhost:3000/movies/${route.params.id}`)
    movie.value = await response.json()
  } catch (error) {
    console.error('Error fetching movie:', error)
  }
}

const fetchComments = async () => {
  try {
    const response = await fetch(`http://localhost:3000/movies/comments/${movie.value._id}`);
    comments.value = await response.json();
  } catch (error) {
    console.error('Failed to load comments:', error);
  }
};


function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

onMounted(async () => {
  await fetchMovie();
  await fetchComments(); 
});
</script>

<style scoped>
body {
  padding-top: 80px;
  background-color: #f5faff;
}
.card img {
  max-height: 400px;
  object-fit: cover;
  transform: scale(1.09);
}
.shadow-primary {
  box-shadow: 0 0 15px rgba(0, 123, 255, 0.4); /* Bootstrap primary blue */
}
.btn:hover{
  color:white;
  border:1px solid white;
  background-color: #0d6efd;
}
</style>
