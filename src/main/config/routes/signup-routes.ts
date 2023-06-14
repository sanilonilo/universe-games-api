import {Router} from 'express'

export default (router:Router) => {
    router.post('/signup', (req,res) => {
        res.status(200).send()
    })
}