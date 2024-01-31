module.exports = {
    success: {
        s2: {
            http: 200,
            code: "UserFound",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoUsers",
            type: "success"
        },
    },
    error: {
        e1: {
            http: 404,
            code: "UserNotFound",
            type: "error"
        }
    },
    invalid: {
    }
}