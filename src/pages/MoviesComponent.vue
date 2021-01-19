<template>
    <div>
        <div class="content">
            <div class="search">
                <input type="text" v-on:keyup="onSearchMovies($event.target.value)" placeholder="Search">
            </div>

            <div class="dropdown" :class="{ 'show' : movieList && search}" v-if="movieList">
                <ul class="movie-item" v-for="movie in movieList.data.results.slice(0, 5)" :key="movie.id">
                    <li>
                        <router-link :to="{name: 'movie', params: {id: movie.id}}">
                            <div class="movie">
                                <div class="poster" v-if="movie.poster_path">
                                    <img v-bind:src="moviePosterBaseUrl + movie.poster_path">
                                </div>
                                <div class="text">
                                    <div class="title">{{ movie.title }}</div>
                                    <div class="date"><b>Date:</b> {{ formatDate(movie.release_date) }}</div>
                                    <div class="date"><b>Rating:</b> {{ movie.vote_average }}</div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="movies-content" v-if="movieList && !search">
                <ul class="movie-item" v-for="movie in movieList.data.results" :key="movie.id">
                    <li>
                        <router-link :to="{name: 'movie', params: {id: movie.id}}">
                            <div class="title">{{ movie.title }}</div>
                            <div class="poster" v-if="movie.poster_path">
                                <img v-bind:src="moviePosterBaseUrl + movie.poster_path">
                            </div>
                        </router-link>
                    </li>
                    <div class="fav-ícon">
                        <i class="material-icons"
                           v-if="!movie.favourite"
                           v-on:click="onFavourite(true, movie)">star_border</i>

                        <i class="material-icons"
                           v-if="movie.favourite"
                           v-on:click="onFavourite(false, movie)">star</i>
                    </div>
                </ul>
            </div>

            <v-pagination class="pagination" v-if="movieList && !search"
                          v-model="pagination.page"
                          :length="pagination.total"
                          total-visible="10"
                          @input="onPageChange"></v-pagination>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';

    const apiKey = 'ef817d509d5dbf9ce8b44c73e7bb30b4';
    localStorage.setItem('apiKey', apiKey);

    export default {
        name: 'movies',
        props: {
            id: Number
        },

        data(){
            return{
                moviePosterBaseUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2',
                movieList: null,
                pagination: {
                    page: 1,
                    total: 0
                },
                query: '',
                search: false
            }
        },

        methods: {
            onFetchMovies() {
                axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${this.pagination.page}`).then(response => {
                    this.movieList = response;
                    this.pagination.page = this.movieList.data.page;
                    this.pagination.total = this.movieList.data.total_pages;

                    this.movieList.data.results.forEach(mov => {
                        if (localStorage.getItem(String(mov.id))) {
                            mov.favourite = Boolean(localStorage.getItem(String(mov.id)))
                        } else {
                            mov.favourite = false;
                        }
                    });

                    console.log(this.movieList.data.results);

                }).catch((error) => {
                    console.log('Error while fetching movies', error)
                });
            },

            onSearchMovies(query) {
                if (query) {
                    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`).then(response => {
                        this.movieList = response;
                        this.pagination.page = this.movieList.data.page;
                        this.pagination.total = this.movieList.data.total_pages;
                        this.search = true;
                    }).catch((error) => {
                        console.log('Error while fetching movies', error)
                    });
                } else {
                    this.search = false;
                    this.onFetchMovies();
                }
            },

            formatDate(value) {
                if (value) {
                    return moment(String(value)).format('MM.DD.YYYY');
                }
            },

            onPageChange() {
                this.onFetchMovies();
            },

            onFavourite(fav, movie) {
                console.log(fav, movie);
                if (fav) {
                    movie.favourite = fav;
                    localStorage.setItem(JSON.stringify(movie.id), JSON.stringify(fav));
                } else {
                    localStorage.removeItem(JSON.stringify(movie.id));
                }
                this.onFetchMovies();
            }
        },

        created() {
            this.onFetchMovies();
        }
    }
</script>

<style>
    .search {
        margin: 0 auto;
        padding: 20px;
        width: 70vw;
        display: flex;
    }

    .search input {
        padding: 10px;
        height: 40px;
        min-width: 300px;
        font-size: 19px;
        border-radius: 4px;
        background: white;
        border: 1px solid #000000;
    }

    .search input::placeholder {
        font-size: 19px;
    }

    .movies-content {
        margin: 0 auto;
        padding: 20px 0 60px;
        width: 70vw;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .movies-content ul {
        margin: 20px;
        padding: 0;
    }

    ul li {
        list-style: none;
    }

    .movies-content .title {
        margin-bottom: 10px;
        max-width: 180px;
        font-size: 19px;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
    }

    .movies-content .poster img {
        max-width: 320px;
        max-height: 280px;
        box-shadow: 0 4px 8px 1px rgba(0,0,0, .2), 0 2px 2px 0 rgba(0,0,0, .14), 0 1px 5px 0 rgba(0,0,0, .12);
    }

    .movies-content .movie-item {
        position: relative;
    }

    .movies-content .fav-ícon {
        width: 46px;
        height: 40px;
        position: absolute;
        bottom: 2px;
        background: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px;
        cursor: pointer;
    }

    .theme--light.v-pagination .v-pagination__item--active {
        color: #FFFFFF !important;
        background: grey !important;
    }

    .search input:focus,
    button:focus {
        outline: none;
    }

    .pagination {
        margin: 0 auto;
        padding: 0 0 40px;
        width: 70vw;
    }

    .dropdown {
        margin: 0 auto;
        width: 70vw;
        padding: 20px;
        max-height: 300px;
        transition: all 0.1s ease-out;
        opacity: 0;
    }

    .dropdown.show {
        opacity: 1;
        height: 100%;
    }

    .dropdown .movie-item {
        display: none;
        margin-bottom: 10px;
    }

    .dropdown.show .movie-item {
        display: flex;
    }

    .dropdown.show .movie-item {
        display: flex;
    }

    .dropdown .movie-item:hover {
        background: rgba(255, 255, 255, .6);
    }

    .dropdown .movie-item .movie .text {
        padding: 5px;
    }

    .dropdown .movie-item .movie .text .date {
        margin-top: 0;
        font-size: 16px;
    }

    .dropdown .poster img {
        margin-right: 10px;
        width: 70px;
        height: 100px;
    }

    .dropdown .movie {
        display: flex;
    }
</style>