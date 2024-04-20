    
module.exports = {
    client: {
      host: "http://localhost:3000"
      // host: https://qrizz-414116.uc.r.appspot.com
      // port: 3000
    },


    server: {
      host: "http://localhost:5001",
      // host: https://backend-dot-qrizz-414116.uc.r.appspot.com
      port: "5001"
    },

    database: {
      mongoURI: "mongodb+srv://sunidhimp41:sunidhi@cluster0.gwsqzss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      host: "localhost",
      port: "5000",
      username: "sunidhimp41",
      password: "sunidhi",
    },


    jwt: {
      secret: "ItsSaturdayToday"
    },


    oAuth: { 
      client_id: "",
      client_secret: ""
    },
  }

