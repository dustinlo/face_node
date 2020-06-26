const handleProfileGet = (db) => (req, res) => {
    const { id } = req.params
    let found = false
    db.select('*').from('users').where({id}).then(user=> {(user.length) ? res.json(user[0]): res.status(400).json('User not found')}
        
    ).catch(err => res.status(400).json('error getting users'))
}

module.exports = {
    handleProfileGet: handleProfileGet
}