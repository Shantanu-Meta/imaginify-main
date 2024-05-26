const { default: mongoose, Schema } = require("mongoose");

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  planId: {
    type: Number,
    default: 1,
  },
  creditBalance: {
    type: Number,
    default: 10,
  },
});

let User = mongoose.models.User || mongoose.model('User', UserSchema); 

module.exports = User;



// ⨯ Error: Error: p.create is not a function
//     at l (/var/task/.next/server/app/api/webhook/clerk/route.js:1:55936)
//     at n (/var/task/.next/server/app/api/webhook/clerk/route.js:1:53951)
//     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
//     at async u (/var/task/.next/server/app/api/webhook/clerk/route.js:1:3014)
//     at async /var/task/node_modules/next/dist/compiled/next-server/app-route.runtime.prod.js:6:34666
//     at async eS.execute (/var/task/node_modules/next/dist/compiled/next-server/app-route.runtime.prod.js:6:25813)
//     at async eS.handle (/var/task/node_modules/next/dist/compiled/next-server/app-route.runtime.prod.js:6:35920)
//     at async es (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:16:25461)
//     at async ei.responseCache.get.routeKind (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:1026)
//     at async r3.renderToResponseWithComponentsImpl (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:508)