import Vue from 'vue'
import VueRouter from 'vue-router'
import MoviesComponent from '../pages/MoviesComponent'
import MovieComponent from '../pages/MovieComponent';


Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/movies',
            name: 'movies',
            component: MoviesComponent,
            props: true,

        },
        {
            path: '/movie/:id',
            name: 'movie',
            component: MovieComponent,
            props: (route) => ({ id: Number(route.params.id) })

        },
        {
            path: '*',
            component: MoviesComponent,
            redirect: '/movies'
        }
    ],
    mode: 'history'
})

