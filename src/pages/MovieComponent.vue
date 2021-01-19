<template>
    <div class="wrap">
        <router-link to="/" class="back-link">
            <div class="back-btn">
                BACK
            </div>
        </router-link>

        <div class="movie-content">
            <div class="image">
                <img v-bind:src="moviePosterSrc">
            </div>

            <div class="text">
                <div class="title">{{ movie.title }}<br>({{ movie.original_title }})</div>
                <div class="sub-title">{{ movie.tagline }}</div>

                <div class="info">
                    <div class="date"><b>Date:</b> {{ formatDate(movie.release_date) }}</div>
                    <div class="rate"><b>Rating:</b> {{ movie.vote_average }}</div>
                </div>
            </div>
        </div>

        <div class="movie-description">{{ movie.overview }}</div>

    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';

    export default {
        name: 'movie',
        props: {
            id: Number
        },

        data(){
            return {
                movie: {},
                moviePosterSrc: '',
                favoriteChecked: false
            }
        },

        methods: {
            onFetchMovie(id) {
                axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${localStorage.getItem('apiKey')}&language=en-US`).then(response => {
                    this.movie = response.data;
                    console.log('single movie', this.movie);

                    if (this.movie.poster_path){
                        this.moviePosterSrc = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.movie.poster_path;
                    }
                }).catch((error) => {
                    console.log('Error while fetching movie', error)
                });
            },

            formatDate(value) {
                if (value) {
                    return moment(String(value)).format('MM.DD.YYYY');
                }
            },
        },

        watch: {
            id: (val) => {
                this.onFetchMovie(val);
            }
        },

        created() {
            this.onFetchMovie(this.id);
        }
    }
</script>

<style>
    .wrap {
        margin: 0 auto;
        padding: 20px;
        width: 70vw;
    }

    .wrap a {
        position: relative;
    }

    .back-btn {
        position: absolute;
        font-size: 19px;
        width: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #000000;
        height: 40px;
        border-radius: 4px;
    }

    .movie-content {
        margin-top: 142px;
        display: flex;
        font-size: 34px;
    }

    .image img {
        max-width: 380px;
        margin-right: 30px;
    }

    .title {

     }

    .sub-title {
        margin-top: 10px;
        font-size: 26px;
    }

    .info {
        margin-top: 40px;
        font-size: 24px;
    }

    .movie-description {
        margin-top: 40px;
        font-size: 24px;
    }
</style>