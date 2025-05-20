const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

router.post('/addgoal', async (req, res) => {
    const { teamId, playerId, numberOfGoals = 1 } = req.body;

    try {
        if (!teamId || !playerId) {
            return res.status(400).json({
                success: false,
                message: 'Team ID and Player ID are required'
            });
        }

        if (numberOfGoals < 1) {
            return res.status(400).json({
                success: false,
                message: 'Number of goals must be at least 1'
            });
        }

        const team = await Team.findOneAndUpdate(
            { 
                _id: teamId,
                'players._id': playerId  
            },
            { 
                $inc: { 'players.$.goals': numberOfGoals }  
            },
            { 
                new: true,  
                runValidators: true  
            }
        );

        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Team or player not found'
            });
        }

        const updatedPlayer = team.players.find(player => player._id.toString() === playerId);

        res.status(200).json({
            success: true,
            message: `${numberOfGoals} goal(s) added successfully`,
            data: {
                player: {
                    id: updatedPlayer._id,
                    name: updatedPlayer.name,
                    team: team.teamName,
                    totalGoals: updatedPlayer.goals || 0
                }
            }
        });

    } catch (error) {
        console.error('Error adding goals:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding goals',
            error: error.message
        });
    }
});



module.exports = router;
