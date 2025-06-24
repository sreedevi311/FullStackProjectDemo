<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-primary fixed-top">
      <div class="container-fluid">

        <a class="navbar-brand text-white nav-hover" href="/">MovieDB</a>

        <div class="collapse navbar-collapse justify-content-start ms-3">
          <ul class="navbar-nav gap-5">
            <li class="nav-item">
              <a class="nav-link text-white nav-hover d-flex align-items-center gap-2" href="/">
                <i class="bi bi-house"></i>
                <span>Home</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white nav-hover" href="/directors">Famous Directors</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white nav-hover" href="/actors">Famous Actors</a>
            </li>
          </ul>
        </div>

        <div class="d-flex align-items-center ms-3 me-auto position-relative">
          <input
            class="form-control me-2 search-input shadow"
            type="search"
            placeholder="Search movies..."
            v-model="searchTerm"
            @keyup.enter="submitSearch"
          />
          <button class="btn btn-light me-4 shadow" type="button" @click="submitSearch">
            <i class="bi bi-search text-primary"></i>
          </button>

          <!-- Suggestions Dropdown -->
          <ul
            class="list-group position-absolute bg-white shadow-sm z-3 search-results"
            style="top: 100%; left: 0; width: 600px; max-height: 300px; overflow-y: auto"
            v-if="suggestions.length"
          >
            <li
              class="list-group-item list-group-item-action"
              v-for="movie in suggestions"
              :key="movie._id"
              @click="router.push(`/movies/${movie._id}`)"
            >
              {{ movie.title }}
            </li>
          </ul>
        </div>

        <div class="d-flex align-items-center ms-3 me-4">
          <i class="bi bi-person-circle text-white fs-2" style="cursor: pointer;"></i>
        </div>
      </div>
    </nav>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const searchTerm = ref('')
const suggestions = ref([])
const router = useRouter()

// Fetch suggestions as user types
watch(searchTerm, async (newTerm) => {
  if (newTerm.trim().length === 0) {
    suggestions.value = []
    return
  }

  const res = await fetch(`http://localhost:3000/movies/search?q=${newTerm}`)
  const data = await res.json()
  suggestions.value = data.slice(0, 10)
})

// Navigate to full search results
const submitSearch = () => {
  if (searchTerm.value.trim()) {
    router.push(`/search-results?q=${encodeURIComponent(searchTerm.value)}`)
  }
}
</script>

<style>
.search-results {
  max-height: 300px;         /* or any height you want */
  overflow-y: auto;
  scrollbar-width: none;     /* Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
}

.search-results::-webkit-scrollbar {
  display: none;             /* Chrome, Safari, Opera */
}

</style>
