module.exports = {
    success: {
        s0: {
            code: "GroupCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "GroupUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "GroupFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "GroupDeleted",
            type: "success"
        }
    },
    error: {
        e0: {
            http: 404,
            code: "GroupNotFound",
            type: "error"
        }
    }
}