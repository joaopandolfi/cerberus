
const Constants = {
    Ports:{
        http:7878,
        https:7879
    },
    Debug: true,
    SSL:{
        Key: "/etc/letsencrypt/live/cerberus/privkey.pem",
        Cert: "/etc/letsencrypt/live/cerberus/fullchain.pem"
    }
}

module.exports = Constants