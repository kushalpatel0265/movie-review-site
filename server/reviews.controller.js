import ReviewsDAO from "./reviews.DAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const { movieId , user , review } = req.body
            res.json({ 
                status: "success",
                movieId: movieId,
                user: user,
                review: review
            })
            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                user,
                review
            )
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetReview(req, res, next) {
        try {
            let id = req.params.id || {}
            let review = await ReviewsDAO.getReview(id)
            if (!review) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(review)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.params.id
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                user,
                review
            )

            var { error } = reviewResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update review",
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.params.id
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}