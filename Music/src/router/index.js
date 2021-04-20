import Vue from 'vue'
import Router from 'vue-router'
import user from '@/page/user'
import userPersonality from '@/components/userPersonality'
import userSong from '@/components/userSong'
import userRadio from '@/components/userRadio'
import userRanking from '@/components/userRanking'
import userComment from '@/components/userComment'
import userDetails from '@/page/userDetails'
import audio from '@/components/audio'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'user',
            component: user
        },
        {
            path: '/userPersonality',
            name: 'userPersonality',
            component: userPersonality,
        },
        {
            path: '/userSong',
            name: 'userSong',
            component: userSong,
        },
        {
            path: '/userRadio',
            name: 'userRadio',
            component: userRadio,
        },
        {
            path: '/userRanking',
            name: 'userRanking',
            component: userRanking,
        },
        {
            path: '/userDetails/:id',
            name: 'userDetails',
            component: userDetails,
        },
        {
            path: '/userComment',
            name: 'userComment',
            component: userComment,
        },
        {
            path: '/audio',
            name: 'audio',
            component: audio,
        }
    ]
})
