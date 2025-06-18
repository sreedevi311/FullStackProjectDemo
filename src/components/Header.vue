<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-primary fixed-top">
      <div class="container-fluid">

        <a class="navbar-brand text-white" href="/">MovieDB</a>

        <div class="collapse navbar-collapse justify-content-start ms-5">
          <ul class="navbar-nav gap-5">
            <li class="nav-item">
              <a class="nav-link text-white nav-hover" href="/directors">Famous Directors</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white nav-hover" href="/actors">Famous Actors</a>
            </li>
          </ul>
        </div>

        <div class="d-flex align-items-center ms-3 me-auto">
          <input
            class="form-control me-2 search-input"
            type="search"
            placeholder="Search movies..."
            
          />
          <button class="btn btn-light me-4" type="button">
            <i class="bi bi-search text-primary"></i>
          </button>
        </div>

        <div class="d-flex align-items-center ms-3 me-4">
          <i class="bi bi-person-circle text-white fs-2" style="cursor: pointer;"></i>
        </div>
      </div>
    </nav>
    </div>
</template>