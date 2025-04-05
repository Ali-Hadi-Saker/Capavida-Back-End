import User from '../models/User.js';

export default getUserById = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        res.status(200).json({user: user});
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
}