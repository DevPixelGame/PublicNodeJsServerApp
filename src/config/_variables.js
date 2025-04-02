const production = {
    API_URL: ''
}

const development = {
    API_URL: ''
}

module.exports =
    process.env.NODE_ENV === 'production' ? production : development;
