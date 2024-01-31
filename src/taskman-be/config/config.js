module.exports = {
    mongodb: {
        //uri: 'mongodb+srv://fcabook:fT73qsfEjZ7C@fcabook-jly7a.mongodb.net/test?retryWrites=true&w=majority',
        uri: 'mongodb://localhost:27017/TaskMan',
        collections: {
            task: 'tasks',
            group: 'groups',
            user: 'users',

            // animal: 'animals',
            // sponsor: 'sponsors',
            // specialist: 'specialists',
            // question: 'questions',
            // quiz: 'quizzes',            
            // user_levels: "user_levels"
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
    // email: {
    //     service: "Gmail",
    //     auth: {
    //         user: "mailserverpw@gmail.com",
    //         pass: "ttxirdxzkafhcuel"
    //     }
    // }
}