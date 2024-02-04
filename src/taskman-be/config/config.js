module.exports = {
    mongodb: {
        uri: 'mongodb+srv://2302598:nEF2Gwqx809xO8Eu@mewipwafinal.i0yemtr.mongodb.net/TaskMan?retryWrites=true&w=majority',
        // uri: 'mongodb://localhost:27017/TaskMan',
        collections: {
            task: 'tasks',
            group: 'groups',
            user: 'users'
        }
    },
    auth: {
        expiration_time: 15000,
        issuer: "MN"
    },
    sanitize: {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ\\ ",
        numerical: "0123456789"
    }
}