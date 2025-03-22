const User = require('../models/User')

const getallusers = ('/', async (req, res) => {
    console.log("hhhhh");
    const allusers = await User.find().lean()
    res.json(allusers)
})

const getuserbyid = ('/', async (req, res) => {
    const { userid } = req.params
    if (!userid) {
        return res.status(400).json({ message: "id is not required" })
    }
    else {
        const user = await User.findById(taskid).lean()
        res.json(user)
    }
})

const createnewuser = ('/', async (req, res) => {
    const { name, username, email, address, phone } = req.body
    if (!name || !username || !email) {
        return res.status(401).json({ message: 'name & username & email are required!' })
    }
    const existingUser = await User.findOne({ username})
    if (existingUser) {
        return res.status(400).json({ message: "Username is already taken" })
    }
    const user = await User.create({ name, username, email, address, phone })
    res.json(user)

})

const updateuser = ('/', async (req, res) => {
    const { _id, name, username, email, address, phone } = req.body
    console.log(req.body)
    if (!name || !username || !email) {
        return res.status(403).json({ message: 'name & username & email are required!' })
    }
    if (!_id)
        return res.status(400).json({ message: 'cant search without _id' })
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(403).json({ message: 'no such as user' })
    }
    const existingUser = await User.findOne({ username})
    if (existingUser && existingUser._id.toString() !== _id.toString()) {
        return res.status(400).json({ message: "Username is already taken" })
    }
    user.name = name
    user.username = username
    user.email = email
    user.address = address
    user.phone = phone
    const updateuser = await user.save()
    res.json(`'${user.name}' updated`)
})

const deleteuser = ('/', async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'user not found' })
    }
    const result = await User.deleteOne(user)
    res.json(`'${result.name}' deleted`)
})
module.exports = { deleteuser, updateuser, createnewuser, getuserbyid, getallusers }   